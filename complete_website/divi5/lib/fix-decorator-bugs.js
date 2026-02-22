#!/usr/bin/env node
/**
 * fix-decorator-bugs.js — One-time comprehensive fix for recurring decorator issues
 *
 * Fixes three classes of bugs across ALL section builder files:
 *   1. !important!important → !important (invalid CSS syntax, 65 instances in 5 files)
 *   2. ${P}- prefixed pseudo/hover selectors → original class names (10 files, dead CSS)
 *   3. dw-d-bg in blocks() but no Super D CSS → inject superD.css() (5 files)
 *
 * Usage:
 *   node complete_website/divi5/lib/fix-decorator-bugs.js [--dry-run] [--live]
 *   Default: dry-run (shows what would change). Use --live to apply.
 */

const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, '..', 'pages', 'sections');
const LIVE = process.argv.includes('--live');

let totalFixes = 0;
let filesModified = 0;

// ════════════════════════════════════════════════════════════════
// PASS 1: Fix !important!important → !important
// ════════════════════════════════════════════════════════════════
function fixDoubleImportant(filePath, content) {
  const count = (content.match(/!important!important/g) || []).length;
  if (count === 0) return { content, count: 0 };
  const fixed = content.replace(/!important!important/g, '!important');
  return { content: fixed, count };
}

// ════════════════════════════════════════════════════════════════
// PASS 2: Fix ${P}- prefixed pseudo/hover selectors
// Finds patterns like .${P}-section::before and replaces with
// the actual class name from the blocks() HTML.
// ════════════════════════════════════════════════════════════════
function fixOrphanPrefixSelectors(filePath, content) {
  let count = 0;

  // Extract the P value
  const pMatch = content.match(/const\s+P\s*=\s*['"](\w+)['"]/);
  if (!pMatch) return { content, count: 0 };
  const P = pMatch[1];

  // Extract class names from blocks() function body (full scan, not truncated)
  const blocksFnStart = content.search(/function\s+blocks\s*\(\)\s*\{/);
  if (blocksFnStart === -1) return { content, count: 0 };
  // Find the closing brace of blocks() by tracking depth
  let depth = 0;
  let blocksFnEnd = blocksFnStart;
  for (let i = content.indexOf('{', blocksFnStart); i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) { blocksFnEnd = i; break; } }
  }
  const blocksSection = content.substring(blocksFnStart, blocksFnEnd + 1);

  // Find all class="..." in blocks HTML
  const classesInHtml = new Set();
  const classRegex = /class="([^"]+)"/g;
  let m;
  while ((m = classRegex.exec(blocksSection)) !== null) {
    m[1].split(/\s+/).forEach(c => classesInHtml.add(c));
  }

  // Find all .${P}-xxx patterns in CSS (pseudo-elements and hover)
  // Pattern: .PREFIX-something::before/after or .PREFIX-something:hover
  const prefixPattern = new RegExp(`\\.\\$\\{P\\}-(\\w[\\w-]*)`, 'g');
  const orphans = new Set();
  let pm;
  while ((pm = prefixPattern.exec(content)) !== null) {
    const resolvedClass = `${P}-${pm[1]}`;
    if (!classesInHtml.has(resolvedClass)) {
      orphans.add(pm[1]); // the suffix after ${P}-
    }
  }

  if (orphans.size === 0) return { content, count: 0 };

  // For each orphan, try to find the real class name in HTML
  // Strategy: look for a class that ends with the same suffix
  let fixed = content;
  for (const suffix of orphans) {
    // Find matching class in HTML (e.g., suffix="section" → "integration-section")
    const candidates = [...classesInHtml].filter(c => c.endsWith(`-${suffix}`) || c === suffix);

    if (candidates.length === 1) {
      // Unambiguous match — replace .${P}-suffix with .realClass
      const from = `.\${P}-${suffix}`;
      const to = `.${candidates[0]}`;
      const beforeLen = fixed.length;
      fixed = fixed.split(from).join(to);
      const replacements = (beforeLen - fixed.length) / (from.length - to.length);
      if (fixed !== content) count += Math.abs(replacements) || 1;
    } else if (candidates.length > 1) {
      // Multiple matches — pick the longest (most specific)
      const best = candidates.sort((a, b) => b.length - a.length)[0];
      const from = `.\${P}-${suffix}`;
      const to = `.${best}`;
      fixed = fixed.split(from).join(to);
      count++;
    }
    // If no candidate, leave as-is (will be caught by lint)
  }

  return { content: fixed, count };
}

// ════════════════════════════════════════════════════════════════
// PASS 3: Add Super D CSS where dw-d-bg exists but no styling
// ════════════════════════════════════════════════════════════════
function fixMissingSuperD(filePath, content) {
  // Check if blocks() has dw-d-bg
  if (!content.includes('dw-d-bg')) return { content, count: 0 };

  // Check if css() already has Super D styling (Base64 SVG or superD require)
  if (content.includes('data:image/svg+xml;base64') && content.includes('dw-d-bg')) {
    return { content, count: 0 }; // Already has Super D CSS
  }
  if (content.includes("require('../../lib/super-d')") || content.includes("require('../lib/super-d')")) {
    return { content, count: 0 }; // Already imports super-d
  }

  // Determine Super D variant from HTML classes
  const hasBold = content.includes('dw-d-bg--bold');
  const hasGlow = content.includes('dw-d-glow');
  const hasParticle = content.includes('dw-d-bg--particle');
  const hasBottom = content.includes('dw-d-bg--bottom');

  const hasGradient = content.includes('dw-d-bg--gradient');
  const variant = hasParticle ? 'particle' : hasGradient ? 'gradient' : 'outline';
  const modifiers = [];
  if (hasBold) modifiers.push('bold');
  if (hasGlow) modifiers.push('glow');
  const position = hasBottom ? 'bottom' : 'right';

  // Add require statement after the last require
  let fixed = content;
  const lastRequire = fixed.lastIndexOf("require('../../lib/templates/");
  const altRequire = fixed.lastIndexOf("require('../../lib/");
  const insertAfterRequire = Math.max(lastRequire, altRequire);

  if (insertAfterRequire === -1) {
    // No existing requires from lib — add after const base require
    const baseReq = fixed.indexOf("require('../../lib/templates/_base')");
    if (baseReq === -1) return { content, count: 0 };
    const lineEnd = fixed.indexOf('\n', baseReq);
    fixed = fixed.substring(0, lineEnd + 1) +
      "const superD = require('../../lib/super-d');\n" +
      fixed.substring(lineEnd + 1);
  } else {
    // Add after the last require line
    const lineEnd = fixed.indexOf('\n', insertAfterRequire);
    if (!fixed.includes("const superD")) {
      fixed = fixed.substring(0, lineEnd + 1) +
        "const superD = require('../../lib/super-d');\n" +
        fixed.substring(lineEnd + 1);
    }
  }

  // Add Super D CSS inside the css() function, before the closing `.trim()`
  const trimPos = fixed.lastIndexOf('`.trim()');
  if (trimPos === -1) return { content, count: 0 };

  const modStr = modifiers.length > 0 ? `, modifiers: [${modifiers.map(m => `'${m}'`).join(', ')}]` : '';
  const superDCSS = `\n/* Super D decoration */\n\${superD.css('dw-d-bg', { variant: '${variant}', position: '${position}'${modStr} })}\n`;

  fixed = fixed.substring(0, trimPos) + superDCSS + fixed.substring(trimPos);

  return { content: fixed, count: 1 };
}

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════
console.log(`\n▸ Decorator Bug Fix — ${LIVE ? 'LIVE' : 'DRY RUN'}`);
console.log(`  Scanning: ${SECTIONS_DIR}\n`);

const files = fs.readdirSync(SECTIONS_DIR)
  .filter(f => f.endsWith('.js') && !f.endsWith('.bak'));

const report = { doubleImportant: [], orphanSelectors: [], missingSuperD: [] };

for (const file of files) {
  const filePath = path.join(SECTIONS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pass 1
  const p1 = fixDoubleImportant(filePath, content);
  if (p1.count > 0) {
    report.doubleImportant.push({ file, count: p1.count });
    content = p1.content;
    modified = true;
    totalFixes += p1.count;
  }

  // Pass 2
  const p2 = fixOrphanPrefixSelectors(filePath, content);
  if (p2.count > 0) {
    report.orphanSelectors.push({ file, count: p2.count });
    content = p2.content;
    modified = true;
    totalFixes += p2.count;
  }

  // Pass 3
  const p3 = fixMissingSuperD(filePath, content);
  if (p3.count > 0) {
    report.missingSuperD.push({ file, count: p3.count });
    content = p3.content;
    modified = true;
    totalFixes += p3.count;
  }

  if (modified) {
    filesModified++;
    if (LIVE) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✓ ${file} — fixed`);
    } else {
      console.log(`  ○ ${file} — would fix`);
    }
  }
}

// Report
console.log('\n── Report ──');

if (report.doubleImportant.length > 0) {
  console.log(`\nPass 1: !important!important → !important (${report.doubleImportant.reduce((s, r) => s + r.count, 0)} fixes in ${report.doubleImportant.length} files)`);
  report.doubleImportant.forEach(r => console.log(`  ${r.file}: ${r.count} instances`));
}

if (report.orphanSelectors.length > 0) {
  console.log(`\nPass 2: Orphan \${P}- selectors → real class names (${report.orphanSelectors.reduce((s, r) => s + r.count, 0)} fixes in ${report.orphanSelectors.length} files)`);
  report.orphanSelectors.forEach(r => console.log(`  ${r.file}: ${r.count} selectors`));
}

if (report.missingSuperD.length > 0) {
  console.log(`\nPass 3: Missing Super D CSS injected (${report.missingSuperD.length} files)`);
  report.missingSuperD.forEach(r => console.log(`  ${r.file}`));
}

console.log(`\n  Total: ${totalFixes} fixes across ${filesModified} files`);
if (!LIVE) {
  console.log('  Run with --live to apply.\n');
} else {
  console.log('  All fixes applied.\n');
}
