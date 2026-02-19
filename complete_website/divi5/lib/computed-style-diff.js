/**
 * computed-style-diff.js — Computed Style Comparison Engine (Autopilot v4)
 *
 * Opens HTML ref (temp server) + WP (direct), extracts computed styles
 * from matched element pairs via styleMap config, compares property-by-property.
 *
 * Features:
 * - Fuzzy matching: colors (±5/channel), dimensions (±4px), font stacks (primary only)
 * - Pseudo-element support (::before, ::after)
 * - Missing selector = FAIL (not skip)
 * - Smart deep-scan when pixel diff high but computed mismatches low
 * - Single Puppeteer instance, shared readiness
 * - v4: Fixability classification (FIXABLE / STRUCTURAL) — convergence uses FIXABLE only
 *
 * Usage (standalone):
 *   node complete_website/divi5/lib/computed-style-diff.js --page home [--section hero] [--deep-scan]
 *
 * Usage (library):
 *   const styleDiff = require('./lib/computed-style-diff');
 *   const report = await styleDiff.run({ pageName: 'home', sectionFilter: 'hero' });
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { startServer } = require('./http-server');
const { waitForDiviReady } = require('./wait-for-divi');

const SCREENSHOTS_DIR = path.join(__dirname, '..', '..', '..', 'screenshots');

// ═══════════════════════════════════════════════════════════
// DEFAULT PROPERTIES — 30+ covering all major visual aspects
// ═══════════════════════════════════════════════════════════

const DEFAULT_PROPERTIES = [
  // Typography
  'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform',
  // Colors
  'color', 'background-color', 'background-image',
  // Spacing
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  // Borders & effects
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'border-radius', 'border-top-left-radius', 'border-top-right-radius',
  'border-bottom-left-radius', 'border-bottom-right-radius',
  'box-shadow', 'text-shadow', 'opacity',
  // Layout
  'display', 'position', 'width', 'max-width', 'min-width', 'height',
  'overflow', 'overflow-x', 'overflow-y', 'z-index',
  // Flexbox
  'flex-direction', 'justify-content', 'align-items', 'gap',
  // Visual effects
  'backdrop-filter', '-webkit-backdrop-filter', 'filter', 'transform',
];

// Properties that should NEVER be overridden with !important on .et_pb_* elements
const PROTECTED_PROPERTIES = [
  'display', 'flex-direction', 'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis',
];

// ═══════════════════════════════════════════════════════════
// FIXABILITY CLASSIFICATION (v4)
// ═══════════════════════════════════════════════════════════

/**
 * Patterns that are STRUCTURAL — Divi wrapper vs HTML wrapper differences
 * that cannot be fixed without breaking Divi's layout engine.
 */
const STRUCTURAL_PATTERNS = [
  // Divi section wrapper vs HTML section — always different
  { labelPattern: /Section BG/i, properties: ['display', 'flex-direction', 'align-items', 'gap', 'justify-content', 'flex-wrap'] },
  // Divi section padding (handled by inner wrapper, not section)
  { labelPattern: /Section BG/i, properties: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'] },
  // Divi section background (handled by inner wrapper)
  { labelPattern: /Section BG/i, properties: ['background-color', 'background-image'] },
  // Divi section overflow
  { labelPattern: /Section BG/i, properties: ['overflow', 'overflow-x', 'overflow-y'] },
];

/**
 * Classify a mismatch as FIXABLE or STRUCTURAL.
 *
 * STRUCTURAL = inherent Divi wrapper difference that cannot be overridden.
 * FIXABLE = can be fixed via CSS in the builder's css() function.
 *
 * @param {{label: string, property: string}} mismatch
 * @returns {'FIXABLE' | 'STRUCTURAL'}
 */
function classifyMismatch(mismatch) {
  // Protected properties on any element
  if (PROTECTED_PROPERTIES.includes(mismatch.property)) {
    return 'STRUCTURAL';
  }
  // Section BG structural patterns
  for (const pat of STRUCTURAL_PATTERNS) {
    if (pat.labelPattern.test(mismatch.label) && pat.properties.includes(mismatch.property)) {
      return 'STRUCTURAL';
    }
  }
  // Width/height on Section BG (content reflow from wrapper differences)
  if (/Section BG/i.test(mismatch.label) && /^(width|height|min-width)$/.test(mismatch.property)) {
    return 'STRUCTURAL';
  }
  return 'FIXABLE';
}

// ═══════════════════════════════════════════════════════════
// FUZZY MATCHING ENGINE
// ═══════════════════════════════════════════════════════════

/**
 * Parse a CSS color string to RGBA components.
 * Handles: rgb(), rgba(), hex (#rgb, #rrggbb, #rrggbbaa), named colors → pass through.
 */
function parseColor(str) {
  if (!str || str === 'none' || str === 'transparent') {
    return { r: 0, g: 0, b: 0, a: 0, valid: true };
  }

  // rgba(r, g, b, a)
  let m = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1, valid: true };
  }

  // hex
  m = str.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let hex = m[1];
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    if (hex.length === 4) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a, valid: true };
  }

  return { valid: false, raw: str };
}

/**
 * Compare two color strings with fuzzy tolerance.
 * ±5 per channel, ±0.05 alpha.
 */
function colorsMatch(a, b) {
  const ca = parseColor(a);
  const cb = parseColor(b);
  if (!ca.valid || !cb.valid) return a === b;
  return Math.abs(ca.r - cb.r) <= 5
    && Math.abs(ca.g - cb.g) <= 5
    && Math.abs(ca.b - cb.b) <= 5
    && Math.abs(ca.a - cb.a) <= 0.05;
}

/**
 * Parse a dimension string to numeric px value.
 * Handles: "123px", "0px", "auto", "normal", etc.
 */
function parseDimension(str) {
  if (!str) return null;
  const m = str.match(/^(-?[\d.]+)px$/);
  return m ? parseFloat(m[1]) : null;
}

/**
 * Compare two dimension strings with ±4px tolerance.
 */
function dimensionsMatch(a, b) {
  const da = parseDimension(a);
  const db = parseDimension(b);
  if (da !== null && db !== null) return Math.abs(da - db) <= 4;
  return a === b;
}

/**
 * Extract the primary font family from a font stack.
 * "Noto Sans", "Helvetica Neue", sans-serif → "Noto Sans"
 */
function parsePrimaryFont(stack) {
  if (!stack) return '';
  const generics = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace'];
  const families = stack.split(',').map(f => f.trim().replace(/^["']|["']$/g, ''));
  for (const f of families) {
    if (!generics.includes(f.toLowerCase())) return f;
  }
  return families[0] || '';
}

/**
 * Resolve font-weight keywords to numeric.
 */
function normalizeWeight(w) {
  if (!w) return w;
  const map = { normal: '400', bold: '700', lighter: '300', bolder: '700' };
  return map[w.toLowerCase()] || w;
}

/**
 * Normalize identity transform to 'none'.
 * matrix(1, 0, 0, 1, 0, 0) → 'none'
 */
function normalizeTransform(t) {
  if (!t) return 'none';
  if (t === 'none') return 'none';
  if (/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/.test(t)) return 'none';
  return t;
}

/**
 * Normalize line-height 'normal' to empty (can't reliably compare across fonts).
 */
function normalizeLineHeight(v) {
  if (v === 'normal') return 'normal'; // Leave as-is for comparison flagging
  return v;
}

/**
 * Determine if a property is color-like.
 */
function isColorProperty(prop) {
  return /color/i.test(prop) && prop !== 'color-scheme';
}

/**
 * Determine if a property is dimension-like.
 */
function isDimensionProperty(prop) {
  return /^(padding|margin|width|height|min-width|max-width|min-height|max-height|top|right|bottom|left|gap|border.*width|border.*radius|font-size|line-height|letter-spacing)/.test(prop);
}

/**
 * Smart comparison of two computed style values for a given property.
 * Returns { match: boolean, reason?: string }.
 */
function compareValues(property, refValue, wpValue) {
  // Normalize nullish
  const rv = (refValue || '').trim();
  const wv = (wpValue || '').trim();

  // Exact match
  if (rv === wv) return { match: true };

  // Font family — compare primary font only
  if (property === 'font-family') {
    const refPrimary = parsePrimaryFont(rv);
    const wpPrimary = parsePrimaryFont(wv);
    if (refPrimary.toLowerCase() === wpPrimary.toLowerCase()) return { match: true };
    return { match: false, reason: `Primary font: "${refPrimary}" vs "${wpPrimary}"` };
  }

  // Font weight — normalize keywords
  if (property === 'font-weight') {
    if (normalizeWeight(rv) === normalizeWeight(wv)) return { match: true };
    return { match: false, reason: `Weight: ${rv} vs ${wv}` };
  }

  // Transform — normalize identity
  if (property === 'transform') {
    if (normalizeTransform(rv) === normalizeTransform(wv)) return { match: true };
    return { match: false };
  }

  // Line height — flag 'normal' vs numeric as informational
  if (property === 'line-height') {
    if (rv === 'normal' || wv === 'normal') {
      // Can't reliably compare — different per font, flag it
      return { match: false, reason: `"normal" vs computed value — font-dependent` };
    }
    return dimensionsMatch(rv, wv) ? { match: true } : { match: false };
  }

  // Colors
  if (isColorProperty(property)) {
    return colorsMatch(rv, wv) ? { match: true } : { match: false };
  }

  // Dimensions
  if (isDimensionProperty(property)) {
    return dimensionsMatch(rv, wv) ? { match: true } : { match: false };
  }

  // Background-image — detect SVG data URI presence/absence
  if (property === 'background-image') {
    const refHasBg = rv !== 'none' && rv !== '';
    const wpHasBg = wv !== 'none' && wv !== '';
    if (!refHasBg && !wpHasBg) return { match: true };
    if (refHasBg !== wpHasBg) return { match: false, reason: refHasBg ? 'Ref has bg-image, WP missing' : 'WP has bg-image, ref missing' };
    // Both have backgrounds — string comparison (gradients etc. may differ in format)
    // Try to normalize rgb vs rgba
    const rvNorm = rv.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, 'rgba($1, $2, $3, 1)');
    const wvNorm = wv.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, 'rgba($1, $2, $3, 1)');
    if (rvNorm === wvNorm) return { match: true };
    return { match: false, reason: 'Background image differs (format or content)' };
  }

  // Opacity — numeric comparison
  if (property === 'opacity') {
    const ro = parseFloat(rv);
    const wo = parseFloat(wv);
    if (!isNaN(ro) && !isNaN(wo) && Math.abs(ro - wo) < 0.05) return { match: true };
    return { match: false };
  }

  // Box-shadow / text-shadow — extract color + dimensions for fuzzy match
  if (property === 'box-shadow' || property === 'text-shadow') {
    if (rv === 'none' && wv === 'none') return { match: true };
    if ((rv === 'none') !== (wv === 'none')) return { match: false, reason: `One has shadow, other doesn't` };
    // Rough match: both non-none shadows, tolerate minor differences
    return { match: false, reason: 'Shadow values differ' };
  }

  // Default: exact string match
  return { match: false };
}

// ═══════════════════════════════════════════════════════════
// STYLE EXTRACTION
// ═══════════════════════════════════════════════════════════

/**
 * Extract computed styles from elements on a Puppeteer page.
 *
 * @param {import('puppeteer').Page} page
 * @param {Array<{label: string, selector: string, pseudo?: string}>} selectors
 * @param {string[]} properties
 * @returns {Map<string, {found: boolean, styles: Object}>}
 */
async function extractStyles(page, selectors, properties) {
  const results = new Map();

  for (const entry of selectors) {
    const data = await page.evaluate((sel, pseudo, props) => {
      const el = document.querySelector(sel);
      if (!el) return { found: false };

      const style = pseudo
        ? window.getComputedStyle(el, pseudo)
        : window.getComputedStyle(el);

      const values = {};
      for (const prop of props) {
        values[prop] = style.getPropertyValue(prop);
      }
      return { found: true, styles: values };
    }, entry.selector, entry.pseudo || null, properties);

    results.set(entry.label, data);
  }

  return results;
}

/**
 * Run a deep scan — extract ALL computed properties (not just defaults).
 * Used when pixel diff is high but standard diff shows few mismatches.
 */
async function extractAllStyles(page, selector, pseudo) {
  return page.evaluate((sel, ps) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const style = ps ? window.getComputedStyle(el, ps) : window.getComputedStyle(el);
    const all = {};
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      all[prop] = style.getPropertyValue(prop);
    }
    return all;
  }, selector, pseudo || null);
}

// ═══════════════════════════════════════════════════════════
// COMPARISON ENGINE
// ═══════════════════════════════════════════════════════════

/**
 * Compare extracted styles between ref and WP for a styleMap config.
 *
 * @param {Map} refMap — from extractStyles on ref page
 * @param {Map} wpMap — from extractStyles on WP page
 * @param {Array} styleMapConfig — [{label, htmlSel, wpSel, pseudo?}]
 * @returns {Array<{label, property, refValue, wpValue, match, reason?, missing?}>}
 */
function compareStyles(refMap, wpMap, styleMapConfig) {
  const results = [];

  for (const entry of styleMapConfig) {
    const refData = refMap.get(entry.label);
    const wpData = wpMap.get(entry.label);

    // Missing selector = FAIL (not skip) — R1#2
    if (!refData?.found) {
      results.push({
        label: entry.label, property: '*', refValue: 'MISSING', wpValue: '—',
        match: false, missing: 'ref', reason: `Selector not found in HTML ref: ${entry.htmlSel}`,
      });
      continue;
    }
    if (!wpData?.found) {
      results.push({
        label: entry.label, property: '*', refValue: '—', wpValue: 'MISSING',
        match: false, missing: 'wp', reason: `Selector not found in WordPress: ${entry.wpSel}`,
      });
      continue;
    }

    // Compare each property
    for (const prop of Object.keys(refData.styles)) {
      const rv = refData.styles[prop];
      const wv = wpData.styles[prop];
      const comparison = compareValues(prop, rv, wv);

      results.push({
        label: entry.label,
        property: prop,
        refValue: rv,
        wpValue: wv,
        match: comparison.match,
        reason: comparison.reason,
      });
    }
  }

  return results;
}

// ═══════════════════════════════════════════════════════════
// MAIN RUNNER
// ═══════════════════════════════════════════════════════════

/**
 * Run computed style diff for a page.
 *
 * @param {object} opts
 * @param {string} opts.pageName — e.g. 'home'
 * @param {string} [opts.sectionFilter] — limit to one section
 * @param {boolean} [opts.deepScan] — use ALL computed properties instead of defaults
 * @param {string[]} [opts.properties] — override default property list
 * @returns {{ sections: Array, mismatches: Array, summary: string, jsonPath: string }}
 */
async function run({ pageName, sectionFilter, deepScan = false, properties }) {
  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(configPath)) {
    throw new Error(`Page config not found: ${configPath}`);
  }

  const pageConfig = require(configPath);
  const sections = pageConfig.verify?.sections || [];
  const htmlFile = pageConfig.protoFile || 'index.html';
  const wpUrl = pageConfig.verify?.wpUrl;

  if (!wpUrl) throw new Error(`No wpUrl in page config for ${pageName}`);

  // Filter sections with styleMap
  let targetSections = sections.filter(s => s.styleMap && s.styleMap.length > 0);
  if (sectionFilter) {
    targetSections = targetSections.filter(s => s.name === sectionFilter);
  }

  if (targetSections.length === 0) {
    console.log('  No sections with styleMap config found.');
    return { sections: [], mismatches: [], summary: '0 sections checked', jsonPath: '' };
  }

  const props = properties || DEFAULT_PROPERTIES;

  // Start temp server for HTML ref
  const { port, close } = await startServer();
  const refUrl = `http://127.0.0.1:${port}/${htmlFile}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 120000,
    args: ['--ignore-certificate-errors', '--no-sandbox', '--font-render-hinting=none'],
  });

  const allResults = [];
  const allMismatches = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // ── Extract from HTML ref ──
    console.log(`  Loading HTML reference: ${refUrl}`);
    await page.goto(refUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      for (const family of ['Noto Sans', 'JetBrains Mono']) {
        try { await document.fonts.load(`400 16px "${family}"`); } catch {}
        try { await document.fonts.load(`700 16px "${family}"`); } catch {}
      }
    });
    // Force scroll-animated elements visible
    await page.evaluate(() => {
      document.querySelectorAll('.dw-trust-card, .dw-check-card, .dw-result-card, .dw-value-prop').forEach(el => {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
      });
    });
    await new Promise(r => setTimeout(r, 1000));

    // Extract ref styles
    const refMaps = new Map();
    for (const section of targetSections) {
      const selectors = section.styleMap.map(sm => ({
        label: sm.label,
        selector: sm.htmlSel,
        pseudo: sm.pseudo,
      }));
      const map = await extractStyles(page, selectors, props);
      refMaps.set(section.name, map);
    }

    // ── Extract from WordPress ──
    console.log(`  Loading WordPress: ${wpUrl}`);
    // Warm-up load (Divi CSS regeneration)
    await page.goto(wpUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 3000));

    // Main load
    await page.goto(wpUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForDiviReady(page, { verbose: true });

    // Hide WP admin bar
    await page.evaluate(() => {
      const bar = document.getElementById('wpadminbar');
      if (bar) bar.style.display = 'none';
      document.documentElement.style.marginTop = '0px';
    });

    // Extract WP styles
    const wpMaps = new Map();
    for (const section of targetSections) {
      const selectors = section.styleMap.map(sm => ({
        label: sm.label,
        selector: sm.wpSel,
        pseudo: sm.pseudo,
      }));
      const map = await extractStyles(page, selectors, props);
      wpMaps.set(section.name, map);
    }

    // ── Compare ──
    for (const section of targetSections) {
      const refMap = refMaps.get(section.name);
      const wpMap = wpMaps.get(section.name);
      const comparison = compareStyles(refMap, wpMap, section.styleMap);

      const mismatches = comparison.filter(r => !r.match);

      // Deep scan trigger: if few mismatches but we suspect more
      if (deepScan && mismatches.length < 3) {
        console.log(`  Deep-scanning ${section.name} (extended property set)...`);
        for (const sm of section.styleMap) {
          const refAll = await extractAllStyles(page, sm.htmlSel, sm.pseudo);
          // Navigate back to WP if needed (we're on WP already)
          const wpAll = await extractAllStyles(page, sm.wpSel, sm.pseudo);
          if (refAll && wpAll) {
            for (const prop of Object.keys(refAll)) {
              // Skip already-checked properties
              if (props.includes(prop)) continue;
              const cmp = compareValues(prop, refAll[prop], wpAll[prop]);
              if (!cmp.match) {
                mismatches.push({
                  label: sm.label, property: prop,
                  refValue: refAll[prop], wpValue: wpAll[prop],
                  match: false, reason: cmp.reason, deepScan: true,
                });
              }
            }
          }
        }
      }

      allResults.push({
        section: section.name,
        total: comparison.length,
        matches: comparison.filter(r => r.match).length,
        mismatches: mismatches.length,
        details: comparison,
      });

      allMismatches.push(...mismatches.map(m => ({
        section: section.name,
        ...m,
        fixability: classifyMismatch(m),
        protected: PROTECTED_PROPERTIES.includes(m.property),
      })));
    }
  } finally {
    await browser.close();
    await close();
  }

  // ── Output ──
  const jsonPath = path.join(SCREENSHOTS_DIR, `style-diff-${pageName}.json`);
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });

  const fixableCount = allMismatches.filter(m => m.fixability === 'FIXABLE').length;
  const structuralCount = allMismatches.filter(m => m.fixability === 'STRUCTURAL').length;

  const output = {
    timestamp: new Date().toISOString(),
    page: pageName,
    sectionFilter: sectionFilter || null,
    totalMismatches: allMismatches.length,
    fixableMismatches: fixableCount,
    structuralMismatches: structuralCount,
    sections: allResults,
    mismatches: allMismatches,
    protectedProperties: PROTECTED_PROPERTIES,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));

  // Console report
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║         COMPUTED STYLE DIFF (v4)                        ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  for (const section of allResults) {
    const sectionMismatches = allMismatches.filter(m => m.section === section.section);
    const sFixable = sectionMismatches.filter(m => m.fixability === 'FIXABLE').length;
    const sStructural = sectionMismatches.filter(m => m.fixability === 'STRUCTURAL').length;
    const icon = sFixable === 0 ? '✓' : '✗';
    console.log(`  ${icon} ${section.section}: ${section.matches}/${section.total} match | ${sFixable} fixable, ${sStructural} structural`);
  }

  // Show FIXABLE mismatches in detail
  const fixableMismatches = allMismatches.filter(m => m.fixability === 'FIXABLE');
  if (fixableMismatches.length > 0) {
    console.log('\n  ── FIXABLE Mismatches ──');
    for (const m of fixableMismatches) {
      const reason = m.reason ? ` (${m.reason})` : '';
      const ds = m.deepScan ? ' [deep-scan]' : '';
      console.log(`  [${m.section}] ${m.label} → ${m.property}: ref="${m.refValue}" vs wp="${m.wpValue}"${reason}${ds}`);
    }

    // Fix recipes (only for FIXABLE)
    console.log('\n  ── Fix Recipes ──');
    const categories = categorizeMismatches(fixableMismatches);
    for (const [cat, items] of Object.entries(categories)) {
      if (items.length === 0) continue;
      console.log(`  ${cat}: ${items.length} issue(s)`);
      console.log(`    → ${FIX_RECIPES[cat] || 'Manual inspection needed'}`);
    }
  }

  // Show STRUCTURAL count as summary only
  if (structuralCount > 0) {
    console.log(`\n  ── STRUCTURAL (${structuralCount} — expected, not fixable) ──`);
    const structuralBySection = {};
    for (const m of allMismatches.filter(m => m.fixability === 'STRUCTURAL')) {
      structuralBySection[m.section] = (structuralBySection[m.section] || 0) + 1;
    }
    for (const [section, count] of Object.entries(structuralBySection)) {
      console.log(`  [${section}] ${count} structural differences (Divi wrapper vs HTML wrapper)`);
    }
  }

  const summary = `${fixableCount} fixable, ${structuralCount} structural, ${allMismatches.length} total across ${allResults.length} sections`;
  console.log(`\n  Summary: ${summary}`);
  console.log(`  Convergence metric: ${fixableCount} FIXABLE mismatches`);
  console.log(`  JSON: ${jsonPath}`);

  return { sections: allResults, mismatches: allMismatches, fixableCount, structuralCount, summary, jsonPath };
}

// ═══════════════════════════════════════════════════════════
// FIX RECIPES
// ═══════════════════════════════════════════════════════════

const FIX_RECIPES = {
  FONT: 'Check font loading → Check D46 mangling → Fix: !important on .et_pb_text .et_pb_text_inner p',
  COLOR: 'Check Divi default bleeding → Fix: !important on .et_pb_section_N specific selector',
  SPACING: 'Check Divi default padding (4% lr on rows) → Fix: padding:0 !important on .et_pb_row',
  BACKGROUND: 'Check Divi inline styles → Fix: !important on BOTH background AND background-image',
  LAYOUT: 'Check Divi max-width:1080px → Fix: max-width:100% !important on .et_pb_row_N',
  OVERFLOW: 'Check overflow:hidden clipping decorations → Fix: overflow:visible !important',
  MISSING: 'Element not found in DOM — check builder blocks() output',
};

/**
 * Categorize mismatches into fix recipe categories.
 */
function categorizeMismatches(mismatches) {
  const categories = { FONT: [], COLOR: [], SPACING: [], BACKGROUND: [], LAYOUT: [], OVERFLOW: [], MISSING: [], OTHER: [] };

  for (const m of mismatches) {
    if (m.missing) { categories.MISSING.push(m); continue; }
    if (/font/.test(m.property)) { categories.FONT.push(m); continue; }
    if (isColorProperty(m.property)) { categories.COLOR.push(m); continue; }
    if (/^(padding|margin|gap)/.test(m.property)) { categories.SPACING.push(m); continue; }
    if (/background/.test(m.property)) { categories.BACKGROUND.push(m); continue; }
    if (/^(width|max-width|min-width|display|position)/.test(m.property)) { categories.LAYOUT.push(m); continue; }
    if (/overflow/.test(m.property)) { categories.OVERFLOW.push(m); continue; }
    categories.OTHER.push(m);
  }

  return categories;
}

module.exports = {
  run,
  extractStyles,
  compareStyles,
  compareValues,
  classifyMismatch,
  DEFAULT_PROPERTIES,
  PROTECTED_PROPERTIES,
  STRUCTURAL_PATTERNS,
  FIX_RECIPES,
  // Fuzzy helpers (exported for testing)
  parseColor, colorsMatch, parseDimension, dimensionsMatch,
  parsePrimaryFont, normalizeWeight, normalizeTransform,
};

// ═══════════════════════════════════════════════════════════
// CLI MODE
// ═══════════════════════════════════════════════════════════

if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };
  const hasFlag = (flag) => args.includes(flag);

  const pageName = getArg('--page');
  if (!pageName) {
    console.error('Usage: node computed-style-diff.js --page <name> [--section <name>] [--deep-scan]');
    process.exit(1);
  }

  console.log(`▸ Running computed style diff for: ${pageName}`);
  run({
    pageName,
    sectionFilter: getArg('--section'),
    deepScan: hasFlag('--deep-scan'),
  })
    .then(report => {
      if (report.mismatches.length > 0) {
        process.exit(1); // Non-zero = mismatches found
      }
    })
    .catch(err => {
      console.error(`✗ Failed: ${err.message}`);
      process.exit(2);
    });
}
