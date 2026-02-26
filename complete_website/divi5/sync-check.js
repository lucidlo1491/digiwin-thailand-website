#!/usr/bin/env node
/**
 * sync-check.js — Cross-Locale Sync Gate (Phase 5)
 *
 * Compares Thai page configs against English counterparts.
 * Flags: missing sections, section count mismatch, missing Thai text,
 *        empty builders, build failures.
 *
 * Usage:
 *   node complete_website/divi5/sync-check.js          # check all pairs
 *   node complete_website/divi5/sync-check.js --page home  # check one pair
 *   node complete_website/divi5/sync-check.js --verbose    # show section details
 *
 * Exit: 0 = all pass, 1 = failures found
 */

const fs = require('fs');
const path = require('path');

const VERBOSE = process.argv.includes('--verbose');
const SINGLE = process.argv.find((a, i) => process.argv[i - 1] === '--page');

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', b: '\x1b[1m', d: '\x1b[2m', x: '\x1b[0m' };

// ── EN→TH page pairs ────────────────────────────────────────
// Maps English config name to Thai config name
const PAGE_PAIRS = {
  'home':                         'th-home',
  'partner-program':              'th-partner-program',
  'partner-business-model':       'th-partner-business-model',
  'partner-solutions':            'th-partner-solutions',
  'partner-economics':            'th-partner-economics',
  'products':                     'th-products',
  'erp':                          'th-erp',
  'mes':                          'th-mes',
  'wms':                          'th-wms',
  'aiot':                         'th-aiot',
  'industries':                   'th-industries',
  'automotive':                   'th-automotive',
  'electronics':                  'th-electronics',
  'metal-plastics':               'th-metal-plastics',
  'about':                        'th-about',
  'case-studies':                  'th-case-studies',
  'news':                         'th-news',
  'blog':                         'th-blog',
  'events-listing':               'th-events-listing',
  'boi-compliance-workshop':      'th-boi-compliance-workshop',
  'factory-tour-mes':             'th-factory-tour-mes',
  'manufacturing-expo-2026':      'th-manufacturing-expo-2026',
  'production-transparency-seminar': 'th-production-transparency-seminar',
  'shop-floor-data-workshop':     'th-shop-floor-data-workshop',
  'privacy-policy':               'th-privacy-policy',
  'terms':                        'th-terms',
};

// Thai Unicode range: U+0E00 - U+0E7F
const THAI_REGEX = /[\u0E00-\u0E7F]/;
const THAI_SEGMENT_REGEX = /[\u0E00-\u0E7F]+/g;

// ── Helpers ──────────────────────────────────────────────────

function loadConfig(name) {
  const filePath = path.join(__dirname, 'pages', `${name}.js`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return require(filePath);
  } catch (e) {
    return { _error: e.message };
  }
}

function getSectionNames(config) {
  if (!config || !config.sections) return [];
  return config.sections.map(s => s.name);
}

function buildSection(builder) {
  try {
    const blocks = builder.blocks();
    const html = Array.isArray(blocks) ? blocks.join('') : String(blocks);
    return html;
  } catch (e) {
    return null;
  }
}

function countThaiSegments(html) {
  if (!html) return 0;
  const matches = html.match(THAI_SEGMENT_REGEX);
  return matches ? matches.length : 0;
}

function extractNumbers(html) {
  if (!html) return [];
  // Strip CSS/style blocks and SVG attributes to avoid false positives
  const cleaned = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/style="[^"]*"/gi, '')
    .replace(/opacity="[^"]*"/gi, '')
    .replace(/stroke-width="[^"]*"/gi, '')
    .replace(/\b0\.\d+/g, '')           // remove decimals like 0.1, 0.08
    .replace(/#[0-9a-fA-F]{3,8}/g, '')  // remove hex colors
    .replace(/\d+px/g, '')              // remove px values
    .replace(/\d+ms/g, '')             // remove ms values
    .replace(/\d+rem/g, '')            // remove rem values
    .replace(/\d+em/g, '')             // remove em values
    .replace(/\d+%\s*[,)]/g, '')       // remove CSS percentage values (in gradients etc)
    .replace(/viewBox="[^"]*"/gi, '')   // remove SVG viewBox
    .replace(/\bd="[^"]*"/gi, '')       // remove SVG path data
    .replace(/points="[^"]*"/gi, '')     // remove SVG polyline points
    .replace(/<svg[\s\S]*?<\/svg>/gi, '') // remove entire SVG blocks
    .replace(/class="[^"]*"/gi, '')     // remove class attributes
    .replace(/data-[a-z-]+="[^"]*"/gi, ''); // remove data attributes
  // Extract standalone numbers (stats, percentages, years)
  const matches = cleaned.match(/\b\d[\d,.]*[%+]?\b/g) || [];
  // Filter: only meaningful stats (2+ digits or has % or +)
  return [...new Set(matches.filter(n => n.length >= 2 || n.includes('%') || n.includes('+')))].sort();
}

// ── Main check ───────────────────────────────────────────────

function checkPair(enName, thName) {
  const results = { page: enName, issues: [], warnings: [], passed: [] };

  const enConfig = loadConfig(enName);
  const thConfig = loadConfig(thName);

  // Check configs exist
  if (!enConfig) {
    results.issues.push(`English config '${enName}.js' not found`);
    return results;
  }
  if (!thConfig) {
    results.issues.push(`Thai config '${thName}.js' not found`);
    return results;
  }
  if (enConfig._error) {
    results.issues.push(`English config error: ${enConfig._error}`);
    return results;
  }
  if (thConfig._error) {
    results.issues.push(`Thai config error: ${thConfig._error}`);
    return results;
  }

  // Check 1: Section count parity
  const enSections = getSectionNames(enConfig);
  const thSections = getSectionNames(thConfig);

  if (enSections.length === thSections.length) {
    results.passed.push(`Section count: ${enSections.length}/${enSections.length}`);
  } else {
    results.issues.push(`Section count mismatch: EN=${enSections.length} TH=${thSections.length}`);
  }

  // Check 2: Thai page ID exists
  if (!thConfig.pageId) {
    results.issues.push('Thai config missing pageId');
  } else {
    results.passed.push(`Page ID: ${thConfig.pageId}`);
  }

  // Check 3: extraCSS includes thaiTypographyCSS
  if (typeof thConfig.extraCSS === 'function') {
    const css = thConfig.extraCSS();
    if (css.includes('Noto Sans Thai')) {
      results.passed.push('Thai typography CSS present');
    } else {
      results.warnings.push('extraCSS missing Noto Sans Thai');
    }
  } else {
    results.warnings.push('No extraCSS function (missing Thai typography)');
  }

  // Check 4: Build each Thai section — verify Thai text presence
  let totalThaiSegments = 0;
  let buildFailures = 0;
  let sectionsWithoutThai = [];

  for (const section of (thConfig.sections || [])) {
    if (!section.builder) {
      results.issues.push(`Section '${section.name}' has no builder`);
      continue;
    }

    const html = buildSection(section.builder);
    if (html === null) {
      buildFailures++;
      results.issues.push(`Section '${section.name}' build FAILED`);
      continue;
    }

    const thaiCount = countThaiSegments(html);
    totalThaiSegments += thaiCount;

    if (thaiCount === 0) {
      // Some sections legitimately have no Thai (logo bars, purely visual)
      sectionsWithoutThai.push(section.name);
    }

    if (VERBOSE) {
      results.passed.push(`  ${section.name}: ${thaiCount} Thai segments, ${html.length} chars`);
    }
  }

  if (buildFailures === 0) {
    results.passed.push(`All ${thSections.length} sections build OK`);
  }

  if (totalThaiSegments > 0) {
    results.passed.push(`Total Thai segments: ${totalThaiSegments}`);
  } else {
    results.issues.push('NO Thai text found in any section');
  }

  // Sections without Thai (warning, not error — some are purely visual)
  if (sectionsWithoutThai.length > 0 && sectionsWithoutThai.length < thSections.length) {
    results.warnings.push(`${sectionsWithoutThai.length} section(s) without Thai text: ${sectionsWithoutThai.join(', ')}`);
  }

  // Check 5: Stat parity (compare numbers between EN and TH builds)
  if (enConfig.sections && thConfig.sections) {
    let enNumbers = [];
    let thNumbers = [];

    for (const section of enConfig.sections) {
      if (section.builder) {
        const html = buildSection(section.builder);
        enNumbers.push(...extractNumbers(html));
      }
    }
    for (const section of thConfig.sections) {
      if (section.builder) {
        const html = buildSection(section.builder);
        thNumbers.push(...extractNumbers(html));
      }
    }

    // Check if key stats from EN appear in TH
    const enSet = new Set(enNumbers);
    const thSet = new Set(thNumbers);
    const missingStats = [...enSet].filter(n => {
      // Only flag significant numbers (>= 2 digits, or percentages)
      if (n.length < 2 && !n.includes('%')) return false;
      return !thSet.has(n);
    });

    if (missingStats.length === 0) {
      results.passed.push('Stat parity: all EN numbers found in TH');
    } else if (missingStats.length <= 5) {
      results.warnings.push(`${missingStats.length} EN number(s) not found in TH: ${missingStats.slice(0, 5).join(', ')}`);
    } else {
      results.warnings.push(`${missingStats.length} EN numbers not in TH (showing first 5): ${missingStats.slice(0, 5).join(', ')}...`);
    }
  }

  return results;
}

// ── Run ──────────────────────────────────────────────────────

function run() {
  console.log(`\n${c.b}━━━ Cross-Locale Sync Check ━━━${c.x}\n`);

  const pairs = SINGLE
    ? { [SINGLE]: PAGE_PAIRS[SINGLE] || `th-${SINGLE}` }
    : PAGE_PAIRS;

  let totalPass = 0;
  let totalWarn = 0;
  let totalFail = 0;

  for (const [enName, thName] of Object.entries(pairs)) {
    const result = checkPair(enName, thName);

    const hasIssues = result.issues.length > 0;
    const hasWarnings = result.warnings.length > 0;

    if (hasIssues) {
      totalFail++;
      console.log(`${c.r}✗ ${enName} → ${thName}${c.x}`);
    } else if (hasWarnings) {
      totalWarn++;
      console.log(`${c.y}⚠ ${enName} → ${thName}${c.x}`);
    } else {
      totalPass++;
      console.log(`${c.g}✓ ${enName} → ${thName}${c.x}`);
    }

    // Show details
    for (const p of result.passed) {
      if (VERBOSE) console.log(`  ${c.g}✓${c.x} ${p}`);
    }
    for (const w of result.warnings) {
      console.log(`  ${c.y}⚠${c.x} ${w}`);
    }
    for (const i of result.issues) {
      console.log(`  ${c.r}✗${c.x} ${i}`);
    }
  }

  // Summary
  const total = totalPass + totalWarn + totalFail;
  console.log(`\n${c.b}━━━ Summary ━━━${c.x}`);
  console.log(`  ${c.g}${totalPass} PASS${c.x}  ${c.y}${totalWarn} WARN${c.x}  ${c.r}${totalFail} FAIL${c.x}  (${total} page pairs)\n`);

  if (totalFail > 0) {
    console.log(`${c.r}✗ Sync check FAILED${c.x}\n`);
    process.exit(1);
  } else if (totalWarn > 0) {
    console.log(`${c.y}⚠ Sync check PASSED with warnings${c.x}\n`);
  } else {
    console.log(`${c.g}✓ Sync check PASSED${c.x}\n`);
  }
}

run();
