#!/usr/bin/env node
/**
 * test-pipeline.js — Unit tests for Divi 5 build pipeline tools
 *
 * Tests:
 *   1. CSS Sanitizer: 5 artifact patterns detected and fixed
 *   2. CSS Validity: !important!important, brace balance
 *   3. Cross-Contamination: foreign selectors detected across sections
 *   4. Reference Pattern Matcher: known patterns flagged
 *   5. Super D Variant: HTML/CSS variant mismatch
 *   6. Scaffold Media Query Scoping: only matching rules included
 *   7. CSS Assembler: sanitizer wired into assemble()
 *
 * Usage:
 *   node complete_website/divi5/test-pipeline.js
 *
 * Exit: 0 = all pass, 1 = failures found
 */

const path = require('path');

// ─────────────────────────────────────────────
// Test framework (same pattern as test-styles.js)
// ─────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, label) {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push(label);
    console.log(`  \x1b[31m✗ ${label}\x1b[0m`);
  }
}

function assertEqual(actual, expected, label) {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    failures.push(label);
    console.log(`  \x1b[31m✗ ${label}\x1b[0m`);
    console.log(`    Expected: ${JSON.stringify(expected)}`);
    console.log(`    Actual:   ${JSON.stringify(actual)}`);
  }
}

// ─────────────────────────────────────────────
// Load modules under test
// ─────────────────────────────────────────────
const lintCSS = require('./lib/lint-css');
const cssAssembler = require('./lib/css-assembler');

// ═════════════════════════════════════════════
// 1. CSS SANITIZER
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ CSS Sanitizer (5 patterns)\x1b[0m');

// 1a. Missing semicolon: ` ;property:value`
{
  const input = '.foo{color:red\n ;line-height:1.6}';
  const output = lintCSS.sanitizeSectionCSS(input);
  assert(!output.includes('\n ;'), 'Sanitizer fixes missing semicolon pattern');
  assert(output.includes('line-height:1.6'), 'Sanitizer preserves line-height value');
}

// 1b. Stacked duplicate -webkit-font-smoothing
{
  const input = '.bar{\n  -webkit-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  color:blue}';
  const output = lintCSS.sanitizeSectionCSS(input);
  const count = (output.match(/-webkit-font-smoothing/g) || []).length;
  assertEqual(count, 1, 'Sanitizer collapses 3x stacked font-smoothing to 1');
}

// 1c. Stacked duplicate line-height !important
{
  const input = '.baz{\n  line-height: 25.6px !important;\n  line-height: 1.6 !important;\n  color:red}';
  const output = lintCSS.sanitizeSectionCSS(input);
  const count = (output.match(/line-height/g) || []).length;
  assertEqual(count, 1, 'Sanitizer collapses 2x stacked line-height !important to 1');
  assert(output.includes('1.6 !important'), 'Sanitizer keeps last line-height value');
}

// 1d. Stray backslash on its own line
{
  const input = '.foo{color:red}\n\\\n.bar{color:blue}';
  const output = lintCSS.sanitizeSectionCSS(input);
  assert(!output.match(/^\s*\\\s*$/m), 'Sanitizer removes stray backslash line');
  assert(output.includes('.foo{color:red}'), 'Sanitizer preserves surrounding rules');
  assert(output.includes('.bar{color:blue}'), 'Sanitizer preserves rules after backslash');
}

// 1e. Clean input passes through unchanged
{
  const input = '.clean{color:red;font-size:16px}';
  assertEqual(lintCSS.sanitizeSectionCSS(input), input, 'Sanitizer passes clean CSS unchanged');
}

// 1f. Null/empty input
{
  assertEqual(lintCSS.sanitizeSectionCSS(''), '', 'Sanitizer handles empty string');
  assertEqual(lintCSS.sanitizeSectionCSS(null), null, 'Sanitizer handles null');
  assertEqual(lintCSS.sanitizeSectionCSS(undefined), undefined, 'Sanitizer handles undefined');
}

// ═════════════════════════════════════════════
// 2. CSS VALIDITY
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ CSS Validity (2 checks)\x1b[0m');

// 2a. Double !important detection
{
  const errors = lintCSS.checkValidity('.foo{color:red !important!important}');
  assert(errors.length > 0, 'Detects !important!important');
  assertEqual(errors[0].rule, 'DOUBLE_IMPORTANT', 'Reports DOUBLE_IMPORTANT rule');
}

// 2b. Clean CSS passes
{
  const errors = lintCSS.checkValidity('.foo{color:red !important}');
  assertEqual(errors.length, 0, 'Clean !important passes validity');
}

// 2c. Brace imbalance
{
  const errors = lintCSS.checkValidity('.foo{color:red');
  assert(errors.some(e => e.rule === 'BRACE_IMBALANCE'), 'Detects missing closing brace');
}

// 2d. Balanced braces pass
{
  const errors = lintCSS.checkValidity('.foo{color:red}.bar{font:16px}');
  assert(!errors.some(e => e.rule === 'BRACE_IMBALANCE'), 'Balanced braces pass');
}

// ═════════════════════════════════════════════
// 3. CROSS-CONTAMINATION DETECTOR
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ Cross-Contamination Detector\x1b[0m');

// 3a. Contaminated section: CSS has selectors from another section's HTML
{
  const sections = [
    {
      name: 'integration',
      builder: {
        blocks: () => '<div class="integration-section"><h2>Title</h2></div>',
        css: () => '.integration-section{padding:80px}.problems-grid{display:grid}.capabilities-grid{gap:24px}.mobile-modules-grid{gap:16px}.transformation-table{width:100%}',
      },
    },
    {
      name: 'problems',
      builder: {
        blocks: () => '<div class="problems-grid"><div class="problem-card">Pain</div></div>',
        css: () => '.problems-grid{display:grid}',
      },
    },
    {
      name: 'capabilities',
      builder: {
        blocks: () => '<div class="capabilities-grid"><div class="cap-card">Feature</div></div>',
        css: () => '.capabilities-grid{gap:24px}',
      },
    },
    {
      name: 'mobile',
      builder: {
        blocks: () => '<div class="mobile-modules-grid"><div>Module</div></div>',
        css: () => '.mobile-modules-grid{gap:16px}',
      },
    },
    {
      name: 'transformation',
      builder: {
        blocks: () => '<table class="transformation-table"><tr><td>Before</td></tr></table>',
        css: () => '.transformation-table{width:100%}',
      },
    },
  ];

  const warnings = lintCSS.checkCrossContamination(sections);
  assert(warnings.length > 0, 'Detects cross-contamination in integration section');
  assert(warnings[0].section === 'integration', 'Contamination is in integration section');
  assert(warnings[0].foreignClasses.includes('problems-grid'), 'Identifies .problems-grid as foreign');
}

// 3b. Clean section: CSS only has its own classes
{
  const sections = [
    {
      name: 'hero',
      builder: {
        blocks: () => '<div class="hero-section"><h1 class="hero-title">Title</h1></div>',
        css: () => '.hero-section{padding:100px}.hero-title{font-size:48px}',
      },
    },
    {
      name: 'footer',
      builder: {
        blocks: () => '<div class="footer-section"><p>Footer</p></div>',
        css: () => '.footer-section{padding:40px}',
      },
    },
  ];

  const warnings = lintCSS.checkCrossContamination(sections);
  assertEqual(warnings.length, 0, 'Clean sections produce no contamination warnings');
}

// ═════════════════════════════════════════════
// 4. REFERENCE PATTERN MATCHER
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ Reference Pattern Matcher\x1b[0m');

// 4a. Integration hub pattern detected in scaffold output
{
  const sections = [
    {
      name: 'integration',
      builder: {
        blocks: () => '<div class="integration-visual"><div class="integration-node"><div class="integration-node-icon">ERP</div></div><div class="integration-arrow">&harr;</div></div>',
        css: () => '/* AUTO-GENERATED */\n/* TODO: Review */\n.x{padding:1px}',
      },
    },
  ];

  const warnings = lintCSS.checkReferencePatterns(sections);
  assert(warnings.length > 0, 'Detects integration-hub pattern in scaffold section');
  assert(warnings[0].reference === 'mes-integration.js', 'Suggests mes-integration.js as reference');
}

// 4b. CTA pattern detected
{
  const sections = [
    {
      name: 'cta',
      builder: {
        blocks: () => '<div class="product-detail-cta"><h2 class="product-detail-cta-title">Transform</h2><div class="product-detail-cta-buttons"><a>Talk</a></div></div>',
        css: () => '/* AUTO-GENERATED */\n.cta{padding:80px}',
      },
    },
  ];

  const warnings = lintCSS.checkReferencePatterns(sections);
  assert(warnings.length > 0, 'Detects product-detail-cta pattern');
  assert(warnings[0].reference === 'erp-product-detail-cta.js', 'Suggests erp-product-detail-cta.js as reference');
}

// 4c. Clean section — no false pattern match
{
  const sections = [
    {
      name: 'hero',
      builder: {
        blocks: () => '<div class="hero-section"><h1>Title</h1><p>Subtitle</p></div>',
        css: () => '.hero-section{padding:100px}',
      },
    },
  ];

  const warnings = lintCSS.checkReferencePatterns(sections);
  assertEqual(warnings.length, 0, 'Clean hero produces no pattern warnings');
}

// ═════════════════════════════════════════════
// 5. SUPER D VARIANT VALIDATOR
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ Super D Variant Validator\x1b[0m');

// 5a. Mismatched variant detected
{
  const sections = [
    {
      name: 'hero',
      builder: {
        blocks: () => '<div class="dw-d-bg dw-d-bg--gradient"></div>',
        css: () => 'background-image:url(data:image/svg+xml;base64,abc);/* digiwin-d-particle */',
      },
    },
  ];

  const warnings = lintCSS.checkSuperDVariants(sections);
  assert(warnings.length > 0, 'Detects Super D variant mismatch (gradient vs particle)');
  assertEqual(warnings[0].expected, 'gradient', 'Expected variant is gradient');
  assertEqual(warnings[0].actual, 'particle', 'Actual variant is particle');
}

// 5b. Matching variant passes
{
  const sections = [
    {
      name: 'hero',
      builder: {
        blocks: () => '<div class="dw-d-bg dw-d-bg--gradient"></div>',
        css: () => '/* digiwin-d-gradient */',
      },
    },
  ];

  const warnings = lintCSS.checkSuperDVariants(sections);
  assertEqual(warnings.length, 0, 'Matching Super D variant produces no warning');
}

// ═════════════════════════════════════════════
// 6. CSS ASSEMBLER — SANITIZER INTEGRATION
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ CSS Assembler — Sanitizer Integration\x1b[0m');

// 6a. Sanitizer runs during assemble()
{
  const sections = [
    '.foo{color:red\n ;line-height:1.6}',            // missing semicolon
    '.bar{\n  -webkit-font-smoothing: auto;\n  -webkit-font-smoothing: auto;\n  color:blue}', // stacked
  ];

  const result = cssAssembler.assemble(sections);
  assert(!result.includes('\n ;line-height'), 'assemble() cleans missing semicolons');
  const fsCounts = (result.match(/-webkit-font-smoothing: auto;/g) || []).length;
  // Global theme reset also has font-smoothing, so just check the section's isn't duplicated
  assert(fsCounts <= 2, 'assemble() collapses stacked font-smoothing');
}

// 6b. Global theme reset present
{
  const result = cssAssembler.assemble(['.test{color:red}']);
  assert(result.includes('GLOBAL DIVI THEME RESET'), 'assemble() includes GLOBAL_THEME_RESET');
  assert(result.includes('.section-title{line-height:1.6'), 'GLOBAL_THEME_RESET has section-title reset');
  assert(result.includes('.section-subtitle{margin-left:auto'), 'GLOBAL_THEME_RESET has section-subtitle reset');
}

// 6c. Shared keyframes present
{
  const result = cssAssembler.assemble([]);
  assert(result.includes('@keyframes fadeIn'), 'assemble() includes fadeIn keyframe');
  assert(result.includes('@keyframes grain'), 'assemble() includes grain keyframe');
}

// ═════════════════════════════════════════════
// 7. FULL RUN — INTEGRATION TEST
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ Full Lint Run — Integration\x1b[0m');

// 7a. Full run returns errors + warnings
{
  const sections = [
    {
      name: 'clean-section',
      builder: {
        blocks: () => '<div class="clean"><h2>Title</h2></div>',
        css: () => '.clean{padding:80px}',
      },
    },
  ];
  const result = lintCSS.run(sections, '.clean{padding:80px}');
  assertEqual(result.errors.length, 0, 'Clean section has 0 errors');
  assertEqual(result.warnings.length, 0, 'Clean section has 0 warnings');
}

// 7b. Full run catches validity errors
{
  const sections = [];
  const result = lintCSS.run(sections, '.foo{color:red !important!important}');
  assert(result.errors.length > 0, 'Full run catches !important!important');
}

// ═════════════════════════════════════════════
// 8. REGRESSION GUARDS — bugs that were fixed
// ═════════════════════════════════════════════
console.log('\n\x1b[36m▸ Regression Guards (fixed bugs)\x1b[0m');

// 8a. WMS integration contamination (Feb 23, 2026)
// Bug: scaffold-builder included .problems-grid, .capabilities-grid etc
// in integration section's media queries
{
  const sections = [
    {
      name: 'integration',
      builder: {
        blocks: () => '<div class="integration-section"><div class="integration-visual"><div class="integration-node">ERP</div><div class="integration-arrow">&harr;</div></div></div>',
        css: () => '.integration-section{padding:80px}.integration-visual{display:flex}.integration-node{padding:20px}.integration-arrow{font-size:20px}',
      },
    },
    {
      name: 'problems',
      builder: {
        blocks: () => '<div class="problems-grid"><div class="problem-card">Pain</div></div>',
        css: () => '.problems-grid{display:grid}',
      },
    },
  ];

  const warnings = lintCSS.checkCrossContamination(sections);
  assertEqual(warnings.length, 0, 'Regression: clean integration section has no contamination');
}

// 8b. Stacked font-smoothing from auto-fix (Feb 22, 2026)
// Bug: auto-fix appended -webkit-font-smoothing: auto multiple times
{
  const input = '.foo{\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  -webkit-font-smoothing: auto !important;\n  color:red}';
  const output = lintCSS.sanitizeSectionCSS(input);
  const count = (output.match(/-webkit-font-smoothing/g) || []).length;
  assertEqual(count, 1, 'Regression: 7x stacked font-smoothing collapsed to 1');
}

// 8c. Missing semicolon from batch fix (Feb 22, 2026)
// Bug: batch fix scripts injected ` ;line-height:1.6;-webkit-font-smoothing:auto`
{
  const input = '.hero-badge{font-size:14px\n ;line-height:1.6;-webkit-font-smoothing:auto}';
  const output = lintCSS.sanitizeSectionCSS(input);
  assert(!output.includes('\n ;'), 'Regression: missing semicolon pattern fixed');
  assert(output.includes('font-size:14px;'), 'Regression: semicolon added after existing value');
}

// ─────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────
console.log(`\n\x1b[1m━━━ Pipeline Tests ━━━\x1b[0m`);
console.log(`  Passed: \x1b[32m${passed}\x1b[0m`);
if (failed > 0) {
  console.log(`  Failed: \x1b[31m${failed}\x1b[0m`);
  console.log(`\n  Failures:`);
  failures.forEach(f => console.log(`    \x1b[31m✗ ${f}\x1b[0m`));
  console.log('');
  process.exit(1);
} else {
  console.log(`  \x1b[32m\x1b[1m✓ All ${passed} tests passed\x1b[0m\n`);
  process.exit(0);
}
