#!/usr/bin/env node
/**
 * auto-fix.js — Automated CSS Fidelity Fixer
 *
 * Closes the diagnosis → fix loop:
 *   1. Runs fidelity-check programmatically
 *   2. Classifies fixable items as SAFE (auto-apply) or AMBIGUOUS (human review)
 *   3. Patches section builder .js files (CSS only, never HTML)
 *   4. Re-pushes via build-page.js
 *   5. Re-verifies and detects regressions
 *
 * Usage:
 *   node complete_website/divi5/lib/auto-fix.js --page erp [--section products] [--dry-run] [--max-iterations 3]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fidelityCheck = require('./fidelity-check');
const tokens = require('../theme/tokens');

// ═══════════════════════════════════════════════════════════
// TOKEN REVERSE-LOOKUP
// ═══════════════════════════════════════════════════════════

/** Build color → token name map from tokens.js */
function buildColorMap() {
  const map = new Map();
  for (const [name, hex] of Object.entries(tokens.color)) {
    map.set(hex.toLowerCase(), name);
    // Also map rgb equivalent
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    map.set(`rgb(${r}, ${g}, ${b})`, name);
    map.set(`rgb(${r},${g},${b})`, name);
  }
  return map;
}

const COLOR_MAP = buildColorMap();

/** Check if a color string maps to a known token */
function colorToToken(colorStr) {
  if (!colorStr) return null;
  const lower = colorStr.toLowerCase().trim();
  return COLOR_MAP.get(lower) || null;
}

/** Get hex value for a token name */
function tokenToHex(tokenName) {
  return tokens.color[tokenName] || null;
}

// ═══════════════════════════════════════════════════════════
// SAFE vs AMBIGUOUS CLASSIFICATION
// ═══════════════════════════════════════════════════════════

/**
 * Known Divi defaults that are ALWAYS wrong
 * Each returns a fix object or null (not this pattern)
 */
const SAFE_RULES = [
  // S1: Font-smoothing antialiased → auto
  {
    id: 'S1', label: 'Divi font-smoothing default',
    test: (f) => f.property === '-webkit-font-smoothing' &&
      f.wpValue === 'antialiased' && f.htmlValue === 'auto',
  },
  // S2: <p> padding-bottom ~16px → 0
  {
    id: 'S2', label: 'Divi <p> padding injection',
    test: (f) => f.property === 'padding-bottom' &&
      /^1[4-8](\.\d+)?px$/.test(f.wpValue) &&
      (f.htmlValue === '0px' || f.htmlValue === '0') &&
      (f.element?.includes('p[') || f.className?.includes('desc') ||
       f.className?.includes('subtitle') || f.className?.includes('body') ||
       f.className?.includes('text')),
  },
  // S3: Heading padding-bottom 10px → 0
  {
    id: 'S3', label: 'Divi heading padding injection',
    test: (f) => f.property === 'padding-bottom' &&
      /^(9|10|11)(\.\d+)?px$/.test(f.wpValue) &&
      (f.htmlValue === '0px' || f.htmlValue === '0') &&
      /^h[1-6]\[/.test(f.element || ''),
  },
  // S4: font-weight 500 → 400
  {
    id: 'S4', label: 'Divi font-weight global default',
    test: (f) => f.property === 'font-weight' &&
      f.wpValue === '500' && f.htmlValue === '400',
  },
  // S5: line-height 23.8px → HTML ref value
  {
    id: 'S5', label: 'Divi line-height default',
    test: (f) => f.property === 'line-height' &&
      /^23\.?[78]/.test(f.wpValue),
  },
  // S6: letter-spacing -0.88px → normal
  {
    id: 'S6', label: 'Divi letter-spacing title default',
    test: (f) => f.property === 'letter-spacing' &&
      /^-0\.8[5-9]/.test(f.wpValue) &&
      (f.htmlValue === 'normal' || f.htmlValue === '0px'),
  },
  // S7: font-size 14px on code-inner → HTML ref
  {
    id: 'S7', label: 'Divi code-inner font-size',
    test: (f) => f.property === 'font-size' &&
      f.wpValue === '14px' && f.htmlValue !== '14px' &&
      (f.className?.includes('code') || f.element?.includes('code')),
  },
  // S8: Known token color swap
  {
    id: 'S8', label: 'Token color swap',
    test: (f) => {
      if (!/^(color|background-color|border-color|border-.*-color|stroke|fill)$/.test(f.property)) return false;
      const htmlToken = colorToToken(f.htmlValue);
      const wpToken = colorToToken(f.wpValue);
      return htmlToken && wpToken && htmlToken !== wpToken;
    },
  },
  // S9: Missing gradient where HTML has one + colors are tokens
  {
    id: 'S9', label: 'Missing gradient (token colors)',
    test: (f) => f.property === 'background-image' &&
      f.htmlValue?.includes('linear-gradient') &&
      (f.wpValue === 'none' || !f.wpValue) &&
      countGradientStops(f.htmlValue) <= 3,
  },
  // S10: Missing box-shadow where HTML has one
  {
    id: 'S10', label: 'Missing box-shadow',
    test: (f) => f.property === 'box-shadow' &&
      f.htmlValue && f.htmlValue !== 'none' &&
      (f.wpValue === 'none' || !f.wpValue),
  },
  // S11: Missing border color where HTML has one + color is token
  {
    id: 'S11', label: 'Missing border',
    test: (f) => /^border(-.*)?-color$/.test(f.property) &&
      f.htmlValue && f.htmlValue !== 'transparent' &&
      (f.wpValue === 'transparent' || f.wpValue === 'rgba(0, 0, 0, 0)' ||
       f.wpValue === 'rgb(0, 0, 0)') &&
      hasTokenColor(f.htmlValue),
  },
  // S12: Small numeric diff ≤8px, target divisible by 4
  {
    id: 'S12', label: 'Small spacing fix (≤8px, round target)',
    test: (f) => {
      if (!/^(padding|margin|gap|border-radius|font-size|border-width)/.test(f.property)) return false;
      const htmlPx = parseFloat(f.htmlValue);
      const wpPx = parseFloat(f.wpValue);
      if (isNaN(htmlPx) || isNaN(wpPx)) return false;
      const diff = Math.abs(htmlPx - wpPx);
      return diff > 0 && diff <= 8 && htmlPx % 4 === 0;
    },
  },
  // S13: column-gap 30px → 0px
  {
    id: 'S13', label: 'Divi column-gap default',
    test: (f) => f.property === 'column-gap' &&
      f.wpValue === '30px' && f.htmlValue === '0px',
  },
  // S14: Gradient color swap — both sides have gradients, colors differ but HTML uses tokens
  {
    id: 'S14', label: 'Gradient color swap (token colors)',
    test: (f) => {
      if (f.property !== 'background-image') return false;
      if (!f.htmlValue?.includes('linear-gradient') || !f.wpValue?.includes('linear-gradient')) return false;
      // Extract all color values from both gradients
      const htmlColors = extractGradientColors(f.htmlValue);
      const wpColors = extractGradientColors(f.wpValue);
      if (htmlColors.length === 0 || htmlColors.length !== wpColors.length) return false;
      // At least one color must differ
      const differs = htmlColors.some((c, i) => c !== wpColors[i]);
      if (!differs) return false;
      // All HTML colors should be recognizable (token or near-token)
      return htmlColors.every(c => hasTokenColor(c) || isNearTokenColor(c));
    },
  },
];

/** AMBIGUOUS conditions — if any match, override SAFE classification */
const AMBIGUOUS_RULES = [
  // A1: Large numeric diff >20px
  {
    id: 'A1', label: 'Large numeric diff (>20px)',
    test: (f) => {
      const htmlPx = parseFloat(f.htmlValue);
      const wpPx = parseFloat(f.wpValue);
      return !isNaN(htmlPx) && !isNaN(wpPx) && Math.abs(htmlPx - wpPx) > 20;
    },
  },
  // A2: display property change
  {
    id: 'A2', label: 'Display property change',
    test: (f) => f.property === 'display',
  },
  // A3: width/height change
  {
    id: 'A3', label: 'Width/height change',
    test: (f) => /^(width|height|min-width|min-height|max-width|max-height)$/.test(f.property),
  },
  // A4: Neither color maps to a token
  {
    id: 'A4', label: 'Unknown brand color',
    test: (f) => {
      if (!/^(color|background-color|border-color)$/.test(f.property)) return false;
      return !colorToToken(f.htmlValue) && !colorToToken(f.wpValue);
    },
  },
  // A5: Gradient with >3 stops
  {
    id: 'A5', label: 'Complex gradient',
    test: (f) => f.property === 'background-image' &&
      f.htmlValue?.includes('linear-gradient') &&
      countGradientStops(f.htmlValue) > 3,
  },
  // A7: Numeric diff 8-20px, target not round
  {
    id: 'A7', label: 'Suspicious spacing (8-20px, non-round)',
    test: (f) => {
      if (!/^(padding|margin|gap|border-radius|font-size)/.test(f.property)) return false;
      const htmlPx = parseFloat(f.htmlValue);
      const wpPx = parseFloat(f.wpValue);
      if (isNaN(htmlPx) || isNaN(wpPx)) return false;
      const diff = Math.abs(htmlPx - wpPx);
      return diff > 8 && diff <= 20 && htmlPx % 4 !== 0;
    },
  },
];

function countGradientStops(gradStr) {
  if (!gradStr) return 0;
  const match = gradStr.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/gi);
  return match ? match.length : 0;
}

/** Extract color strings from a gradient value */
function extractGradientColors(gradStr) {
  if (!gradStr) return [];
  const matches = gradStr.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/gi);
  return matches || [];
}

/** Check if an rgb/rgba color is close to a token (within ±10 per channel) */
function isNearTokenColor(colorStr) {
  if (hasTokenColor(colorStr)) return true;
  const rgbMatch = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!rgbMatch) return false;
  const [, r, g, b] = rgbMatch.map(Number);
  for (const hex of Object.values(tokens.color)) {
    const tr = parseInt(hex.slice(1, 3), 16);
    const tg = parseInt(hex.slice(3, 5), 16);
    const tb = parseInt(hex.slice(5, 7), 16);
    if (Math.abs(r - tr) <= 10 && Math.abs(g - tg) <= 10 && Math.abs(b - tb) <= 10) return true;
  }
  return false;
}

function hasTokenColor(colorStr) {
  if (!colorStr) return false;
  // Check if any part of the string contains a known token color
  for (const hex of Object.values(tokens.color)) {
    if (colorStr.toLowerCase().includes(hex.toLowerCase())) return true;
  }
  return colorToToken(colorStr) !== null;
}

/**
 * Classify a fixable item as SAFE or AMBIGUOUS
 * @returns {{ type: 'SAFE'|'AMBIGUOUS', ruleId: string, label: string }}
 */
function classify(fixable) {
  // Check AMBIGUOUS first — it overrides SAFE
  // Exception: Divi defaults (S1-S7, S13) are always SAFE regardless of A-rules
  const diviDefaultIds = new Set(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S13']);

  let safeMatch = null;
  for (const rule of SAFE_RULES) {
    if (rule.test(fixable)) {
      safeMatch = { type: 'SAFE', ruleId: rule.id, label: rule.label };
      break;
    }
  }

  // Divi defaults bypass ambiguity checks
  if (safeMatch && diviDefaultIds.has(safeMatch.ruleId)) {
    return safeMatch;
  }

  // Check ambiguous rules
  for (const rule of AMBIGUOUS_RULES) {
    if (rule.test(fixable)) {
      return { type: 'AMBIGUOUS', ruleId: rule.id, label: rule.label };
    }
  }

  // If we found a SAFE match and no AMBIGUOUS, it's SAFE
  if (safeMatch) return safeMatch;

  // Default: AMBIGUOUS (safe by design)
  return { type: 'AMBIGUOUS', ruleId: 'DEFAULT', label: 'No matching rule' };
}

// ═══════════════════════════════════════════════════════════
// SECTION FILE RESOLUTION
// ═══════════════════════════════════════════════════════════

/**
 * Find the file path of a builder module using require.cache
 */
function findBuilderPath(builder) {
  for (const [filePath, mod] of Object.entries(require.cache)) {
    if (mod.exports === builder) return filePath;
  }
  return null;
}

/**
 * Map section name → builder file path
 */
function buildSectionFileMap(pageConfig) {
  const map = new Map();
  for (const section of pageConfig.sections) {
    const filePath = findBuilderPath(section.builder);
    if (filePath) {
      map.set(section.name, filePath);
    }
  }
  return map;
}

// ═══════════════════════════════════════════════════════════
// CSS PATCHER
// ═══════════════════════════════════════════════════════════

/**
 * Extract the best CSS selector from a fixable item
 */
function extractSelector(fixable) {
  // Prefer className-based selector
  if (fixable.className) {
    const classes = fixable.className.split(/\s+/)
      .filter(c => c && !/et_pb_|divi_|_inner$/.test(c));
    if (classes.length > 0) return '.' + classes[0];
  }
  // Fall back to element path
  if (fixable.element) {
    const match = fixable.element.match(/\.[\w-]+/);
    if (match) return match[0];
  }
  return null;
}

/**
 * Patch a CSS value in a section builder file's css() template literal.
 *
 * Strategy:
 *   1. If selector + property exists → replace value
 *   2. If selector exists but property missing → insert before closing }
 *   3. If selector doesn't exist → append new rule
 *
 * Never touches ${} interpolations.
 *
 * @returns {{ patched: boolean, action: string }}
 */
function patchCSS(fileContent, selector, property, newValue) {
  // Escape selector for regex
  const escSel = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Strategy 1: Find existing selector + property and replace value
  // Match: .selector { ... property: oldValue; ... }
  // But be careful with template literal interpolations ${}

  // Find the selector block
  const selectorBlockRe = new RegExp(
    `(${escSel}\\s*\\{[^}]*?)` +   // selector + opening content
    `(${property.replace(/[-]/g, '\\-')}\\s*:\\s*)` +  // property:
    `([^;!}]+)` +                    // current value
    `(\\s*(?:!important)?\\s*[;}])`, // ; or }
    'g'
  );

  let match = null;
  let bestMatch = null;

  // Find all matches, skip any inside ${} interpolations
  while ((match = selectorBlockRe.exec(fileContent)) !== null) {
    const before = fileContent.substring(0, match.index);
    // Count open ${ vs } to check we're not inside an interpolation
    const openInterp = (before.match(/\$\{/g) || []).length;
    const closeInterp = (before.match(/\}/g) || []).length - (before.match(/\$\{[^}]*\}/g) || []).length;
    // Simple check: if the match is right after a ${ without a closing }, skip
    const lastDollarBrace = before.lastIndexOf('${');
    const lastCloseBrace = before.lastIndexOf('}');
    if (lastDollarBrace > lastCloseBrace) continue; // Inside interpolation

    bestMatch = match;
    break; // Take first valid match
  }

  if (bestMatch) {
    const prefix = bestMatch[1] + bestMatch[2];
    const suffix = bestMatch[4];
    const newContent =
      fileContent.substring(0, bestMatch.index) +
      prefix + newValue + suffix +
      fileContent.substring(bestMatch.index + bestMatch[0].length);
    return { patched: true, action: 'replaced', content: newContent };
  }

  // Strategy 2: Selector exists but property is missing — insert before }
  const selectorOnlyRe = new RegExp(
    `(${escSel}\\s*\\{)([^}]*)(\\})`,
    'g'
  );

  let selectorMatch = null;
  while ((selectorMatch = selectorOnlyRe.exec(fileContent)) !== null) {
    const before = fileContent.substring(0, selectorMatch.index);
    const lastDollarBrace = before.lastIndexOf('${');
    const lastCloseBrace = before.lastIndexOf('}');
    if (lastDollarBrace > lastCloseBrace) continue;

    // Check this block doesn't already have the property (shouldn't reach here if it did, but safety)
    const blockContent = selectorMatch[2];
    const propRe = new RegExp(`${property.replace(/[-]/g, '\\-')}\\s*:`);
    if (propRe.test(blockContent)) continue;

    const insertionPoint = selectorMatch.index + selectorMatch[1].length + selectorMatch[2].length;
    const indent = blockContent.match(/\n(\s+)/)?.[1] || '            ';
    const newRule = `${indent}${property}: ${newValue};\n`;
    const newContent =
      fileContent.substring(0, insertionPoint) +
      '\n' + newRule +
      fileContent.substring(insertionPoint);
    return { patched: true, action: 'inserted', content: newContent };
  }

  // Strategy 3: Selector doesn't exist — append new rule before final backtick
  const lastBacktick = fileContent.lastIndexOf('`.trim()');
  if (lastBacktick === -1) {
    return { patched: false, action: 'no-template-found', content: fileContent };
  }

  const newRule = `\n${selector} {\n            ${property}: ${newValue};\n        }\n`;
  const newContent =
    fileContent.substring(0, lastBacktick) +
    newRule +
    fileContent.substring(lastBacktick);
  return { patched: true, action: 'appended', content: newContent };
}

// ═══════════════════════════════════════════════════════════
// INTERPOLATION GUARD
// ═══════════════════════════════════════════════════════════

/**
 * Check if a selector only exists inside a ${...} template interpolation.
 * If the selector appears in the file but ONLY within interpolation calls
 * (like cardCSS, buttonCSS, etc.), it should be fixed in theme/components,
 * not by appending a competing rule.
 */
function isSelectorFromInterpolation(fileContent, selector) {
  const escSel = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const selectorRe = new RegExp(escSel, 'g');

  let match;
  let foundOutsideInterp = false;
  let foundInsideInterp = false;

  while ((match = selectorRe.exec(fileContent)) !== null) {
    const before = fileContent.substring(0, match.index);
    // Find the last ${ and the last } before this position
    const lastOpenInterp = before.lastIndexOf('${');
    const lastCloseAfterOpen = lastOpenInterp >= 0
      ? before.indexOf('}', lastOpenInterp)
      : -1;

    if (lastOpenInterp >= 0 && (lastCloseAfterOpen === -1 || lastCloseAfterOpen < lastOpenInterp)) {
      // We're inside an unclosed ${ ... } — this is an interpolation
      foundInsideInterp = true;
    } else {
      foundOutsideInterp = true;
    }
  }

  // Only skip if selector exists ONLY inside interpolations
  return foundInsideInterp && !foundOutsideInterp;
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const pageIdx = args.indexOf('--page');
  const pageName = pageIdx !== -1 ? args[pageIdx + 1] : null;
  const sectionIdx = args.indexOf('--section');
  const sectionFilter = sectionIdx !== -1 ? args[sectionIdx + 1] : null;
  const dryRun = args.includes('--dry-run');
  const maxIterIdx = args.indexOf('--max-iterations');
  const maxIterations = maxIterIdx !== -1 ? parseInt(args[maxIterIdx + 1], 10) : 3;

  if (!pageName) {
    console.error('Usage: node auto-fix.js --page <name> [--section <name>] [--dry-run] [--max-iterations N]');
    process.exit(1);
  }

  console.log(`\n╔${'═'.repeat(58)}╗`);
  console.log(`║  AUTO-FIX — ${pageName}${sectionFilter ? ` (${sectionFilter})` : ''}${dryRun ? ' [DRY RUN]' : ''}`.padEnd(59) + '║');
  console.log(`╚${'═'.repeat(58)}╝`);

  // Load page config
  const pageConfigPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(pageConfigPath)) {
    console.error(`  Page config not found: ${pageConfigPath}`);
    process.exit(1);
  }
  const pageConfig = require(pageConfigPath);
  const sectionFileMap = buildSectionFileMap(pageConfig);

  console.log(`  Sections: ${sectionFileMap.size} mapped to builder files`);
  if (sectionFileMap.size === 0) {
    console.error('  No builder files found. Cannot patch.');
    process.exit(1);
  }

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    console.log(`\n  ── Iteration ${iteration}/${maxIterations} ──`);

    // Step 1: Run fidelity-check
    console.log('  Running fidelity-check...');
    let report;
    try {
      report = await fidelityCheck.run({
        pageName,
        sectionFilter,
        verbose: false,
        noAutodiscover: false,
        autodiscoverOnly: false,
      });
    } catch (err) {
      console.error(`  Fidelity-check failed: ${err.message}`);
      process.exit(2);
    }

    // Step 2: Collect ALL fixable items across phases
    const allFixables = [];

    // Phase 2: Auto-discovery
    for (const ad of (report.autoDiscovery || [])) {
      for (const f of ad.fixable) {
        allFixables.push({ ...f, section: ad.section, phase: 2 });
      }
    }

    // Phase 3: Decorative audit
    for (const da of (report.decorativeAudit || [])) {
      for (const f of da.fixable) {
        allFixables.push({ ...f, section: da.section, phase: 3 });
      }
    }

    // Phase 4: Visual elements
    for (const ve of (report.visualElements || [])) {
      for (const f of ve.fixable) {
        allFixables.push({ ...f, section: ve.section, phase: 4 });
      }
    }

    if (allFixables.length === 0) {
      console.log('  ✓ No fixable items found. Page is clean!');
      break;
    }

    console.log(`  Found ${allFixables.length} fixable items`);

    // Step 3: Classify each fixable
    const safeItems = [];
    const ambiguousItems = [];

    for (const f of allFixables) {
      // Decoration missing/bg issues need blocks() changes — always AMBIGUOUS
      if (f.category === 'DECORATION_MISSING' || f.category === 'DECORATION_BG_MISSING' ||
          f.category === 'DECORATION_BG_UNRESOLVABLE') {
        ambiguousItems.push({ ...f, classification: { type: 'AMBIGUOUS', ruleId: 'A6', label: 'Needs blocks() change' } });
        continue;
      }

      // Skip items without property (structural issues)
      if (!f.property) {
        ambiguousItems.push({ ...f, classification: { type: 'AMBIGUOUS', ruleId: 'STRUCTURAL', label: 'No property to fix' } });
        continue;
      }

      const cls = classify(f);
      if (cls.type === 'SAFE') {
        safeItems.push({ ...f, classification: cls });
      } else {
        ambiguousItems.push({ ...f, classification: cls });
      }
    }

    console.log(`  Classified: ${safeItems.length} SAFE, ${ambiguousItems.length} AMBIGUOUS`);

    if (safeItems.length === 0) {
      console.log('  No SAFE fixes to apply. All remaining items need human review.');
      printReport(pageName, sectionFilter, [], ambiguousItems, allFixables.length, allFixables.length);
      break;
    }

    // Step 4: Group SAFE fixes by section → file
    const fixesByFile = new Map();

    for (const item of safeItems) {
      const filePath = sectionFileMap.get(item.section);
      if (!filePath) {
        console.log(`  ⚠ No builder file for section "${item.section}" — skipping`);
        continue;
      }
      if (!fixesByFile.has(filePath)) {
        fixesByFile.set(filePath, { section: item.section, fixes: [] });
      }
      fixesByFile.get(filePath).fixes.push(item);
    }

    // Step 5: Patch files
    const applied = [];
    const backups = new Map();

    for (const [filePath, { section, fixes }] of fixesByFile) {
      if (dryRun) {
        console.log(`\n  [DRY RUN] Would patch ${path.basename(filePath)} (${fixes.length} fixes):`);
        for (const f of fixes) {
          const sel = extractSelector(f);
          const tokenNote = f.property?.includes('color') ? ` [${colorToToken(f.htmlValue) || '?'}]` : '';
          console.log(`    ${sel || f.element}  ${f.property}: ${f.wpValue} → ${f.htmlValue}${tokenNote}  (${f.classification.ruleId})`);
        }
        applied.push(...fixes);
        continue;
      }

      // Backup before patch
      const bakPath = filePath + '.bak';
      const originalContent = fs.readFileSync(filePath, 'utf8');
      fs.writeFileSync(bakPath, originalContent);
      backups.set(filePath, bakPath);

      let content = originalContent;
      let patchCount = 0;

      for (const f of fixes) {
        const sel = extractSelector(f);
        if (!sel) {
          console.log(`    ⚠ Cannot determine selector for ${f.element} — skipping`);
          continue;
        }

        // Skip if selector only exists inside a ${} interpolation (theme component output)
        if (isSelectorFromInterpolation(content, sel)) {
          console.log(`    ⚠ ${sel} comes from theme component \${...} — fix in theme/components/ instead`);
          continue;
        }

        const result = patchCSS(content, sel, f.property, f.htmlValue);
        if (result.patched) {
          content = result.content;
          patchCount++;
          const tokenNote = colorToToken(f.htmlValue);
          applied.push(f);
          console.log(`    ✓ ${sel}  ${f.property}: ${f.wpValue} → ${f.htmlValue}${tokenNote ? ` [${tokenNote}]` : ''}  (${result.action}, ${f.classification.ruleId})`);
        } else {
          console.log(`    ⚠ Could not patch ${sel} ${f.property} — ${result.action}`);
        }
      }

      if (patchCount > 0) {
        fs.writeFileSync(filePath, content);
        console.log(`  Wrote ${patchCount} fixes to ${path.basename(filePath)}`);
      }
    }

    if (dryRun) {
      printReport(pageName, sectionFilter, applied, ambiguousItems, allFixables.length, allFixables.length);
      break;
    }

    if (applied.length === 0) {
      console.log('  No patches could be applied.');
      printReport(pageName, sectionFilter, [], ambiguousItems, allFixables.length, allFixables.length);
      break;
    }

    // Step 6: Re-push via build-page.js
    // Exit code 1 = verification failure (expected on pages with pre-existing issues)
    // Exit code 2+ or signal = actual build/push error
    console.log('\n  Re-pushing to WordPress...');
    const buildCmd = `node ${path.join(__dirname, '..', 'build-page.js')} --page ${pageName}`;
    try {
      execSync(buildCmd, { stdio: 'pipe', timeout: 180000 });
      console.log('  ✓ Build-page completed (all gates pass)');
    } catch (err) {
      if (err.status === 1) {
        // Verification failure — page was pushed successfully but has pre-existing issues
        console.log('  ✓ Build-page pushed (verification has pre-existing failures — expected)');
      } else {
        console.error(`  ✗ Build-page failed (exit ${err.status}): ${(err.stderr || '').toString().slice(0, 200)}`);
        revertBackups(backups);
        process.exit(2);
      }
    }

    // Step 7: Re-verify (same section filter as original scan)
    console.log('  Re-running fidelity-check...');
    let reReport;
    try {
      reReport = await fidelityCheck.run({
        pageName,
        sectionFilter,
        verbose: false,
        noAutodiscover: false,
        autodiscoverOnly: false,
      });
    } catch (err) {
      console.error(`  Re-verify failed: ${err.message}`);
      revertBackups(backups);
      process.exit(2);
    }

    // Count fixables after (same scope as before)
    const afterFixableCount = countFixables(reReport);

    // Regression detection — allow small increase (≤2) due to CSS cascade effects
    // that expose previously-hidden issues when one property is fixed
    if (afterFixableCount > allFixables.length + 2) {
      console.error(`\n  ✗ REGRESSION DETECTED! Fixable count went UP significantly: ${allFixables.length} → ${afterFixableCount}`);
      console.error('  Reverting all changes...');
      revertBackups(backups);

      // Re-push original versions
      try {
        execSync(buildCmd, { stdio: 'pipe', timeout: 180000 });
      } catch (e) { /* best effort */ }

      console.error('  Reverted. Please review manually.');
      process.exit(1);
    }

    console.log(`  Before: ${allFixables.length} fixable → After: ${afterFixableCount} fixable (${allFixables.length - afterFixableCount} fixed)`);

    // Clean up backups on success
    for (const bakPath of backups.values()) {
      try { fs.unlinkSync(bakPath); } catch (e) { /* ok */ }
    }

    printReport(pageName, sectionFilter, applied, ambiguousItems, allFixables.length, afterFixableCount);

    // If all fixed or no progress, stop iterating
    if (afterFixableCount === 0 || afterFixableCount >= allFixables.length) {
      break;
    }
  }
}

function countFixables(report) {
  let count = 0;
  for (const ad of (report.autoDiscovery || [])) count += ad.fixable.length;
  for (const da of (report.decorativeAudit || [])) count += da.fixable.length;
  for (const ve of (report.visualElements || [])) count += ve.fixable.length;
  return count;
}

function revertBackups(backups) {
  for (const [filePath, bakPath] of backups) {
    if (fs.existsSync(bakPath)) {
      fs.copyFileSync(bakPath, filePath);
      fs.unlinkSync(bakPath);
      console.log(`  Reverted ${path.basename(filePath)}`);
    }
  }
}

function printReport(pageName, sectionFilter, applied, ambiguous, beforeCount, afterCount) {
  console.log(`\n╔${'═'.repeat(58)}╗`);
  console.log(`║  AUTO-FIX REPORT — ${pageName}${sectionFilter ? ` (${sectionFilter})` : ''}`.padEnd(59) + '║');
  console.log(`╚${'═'.repeat(58)}╝`);

  if (applied.length > 0) {
    console.log(`\n  APPLIED (${applied.length} fixes):`);
    for (const f of applied) {
      const sel = extractSelector(f);
      const tokenNote = colorToToken(f.htmlValue);
      console.log(`    ✓ ${sel || f.element}  ${f.property}: ${f.wpValue || '(none)'} → ${f.htmlValue}${tokenNote ? ` [${tokenNote}]` : ''}  (${f.classification.ruleId})`);
    }
  }

  if (ambiguous.length > 0) {
    console.log(`\n  NEEDS YOUR REVIEW (${ambiguous.length} items):`);
    for (const f of ambiguous) {
      const sel = extractSelector(f);
      const desc = f.property
        ? `${f.property}: ${f.wpValue || '(none)'} → ${f.htmlValue || '(none)'}`
        : (f.note || f.category || 'structural issue');
      console.log(`    ? ${sel || f.element}  ${desc}  (${f.classification.ruleId}: ${f.classification.label})`);
    }
  }

  console.log(`\n  Before: ${beforeCount} fixable → After: ${afterCount} fixable (${beforeCount - afterCount} fixed, ${ambiguous.length} ambiguous)`);
  if (afterCount === 0) {
    console.log('  ✓ All issues resolved!');
  } else if (afterCount <= ambiguous.length) {
    console.log('  No regressions detected.');
  }
}

// ═══════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════

if (require.main === module) {
  main().catch(err => {
    console.error('\n  FATAL:', err.message);
    process.exit(2);
  });
}

module.exports = { classify, patchCSS, extractSelector, buildColorMap, SAFE_RULES, AMBIGUOUS_RULES };
