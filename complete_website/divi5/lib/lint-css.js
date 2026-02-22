/**
 * lint-css.js — CSS lint gates for Divi 5 build pipeline
 *
 * Two zero-false-positive checks that run on every build:
 *   1. CSS Validity: !important!important, brace balance
 *   2. Super D Variant: HTML modifier classes vs actual SVG variant in css()
 *
 * Usage (standalone diagnostic):
 *   node complete_website/divi5/lib/lint-css.js --page home
 *
 * Usage (from build-page.js):
 *   const lintCSS = require('./lib/lint-css');
 *   const result = lintCSS.run(sections, pageLevelCSS);
 *   if (result.errors.length > 0) process.exit(1);
 */

const path = require('path');

// ════════════════════════════════════════════════════════════════
// LINT 1: CSS VALIDITY HARD GATE
// ════════════════════════════════════════════════════════════════

function checkValidity(css) {
  const errors = [];

  // !important!important — always invalid
  const doubleImportant = (css.match(/!important!important/g) || []).length;
  if (doubleImportant > 0) {
    errors.push({
      rule: 'DOUBLE_IMPORTANT',
      message: `${doubleImportant} instance(s) of !important!important (invalid CSS)`,
      fix: 'Run: node divi5/lib/fix-decorator-bugs.js --live',
    });
  }

  // Brace balance — unbalanced braces = broken CSS
  const opens = (css.match(/\{/g) || []).length;
  const closes = (css.match(/\}/g) || []).length;
  if (opens !== closes) {
    errors.push({
      rule: 'BRACE_IMBALANCE',
      message: `Brace imbalance: ${opens} opening vs ${closes} closing`,
      fix: 'Check for missing or extra { or } in section css() functions',
    });
  }

  return errors;
}

// ════════════════════════════════════════════════════════════════
// LINT 2: SUPER D VARIANT VALIDATOR
// ════════════════════════════════════════════════════════════════

/**
 * For each section, check that the Super D variant in css() matches
 * the modifier classes in blocks() HTML.
 *
 * HTML class → expected variant:
 *   dw-d-bg--gradient → 'gradient'
 *   dw-d-bg--particle → 'particle'
 *   neither           → 'outline' (default)
 */
function checkSuperDVariants(sections) {
  const warnings = [];

  for (const section of sections) {
    const builder = section.builder;

    // Get blocks HTML
    let blocksOut;
    try {
      const raw = typeof builder.blocks === 'function' ? builder.blocks() : '';
      blocksOut = Array.isArray(raw) ? raw.join('') : String(raw);
    } catch (_) { continue; }

    if (!blocksOut.includes('dw-d-bg')) continue;

    // Determine expected variant from HTML modifier classes
    const hasGradient = blocksOut.includes('dw-d-bg--gradient');
    const hasParticle = blocksOut.includes('dw-d-bg--particle');
    const expected = hasParticle ? 'particle' : hasGradient ? 'gradient' : 'outline';

    // Get CSS output
    let cssOut;
    try {
      cssOut = typeof builder.css === 'function' ? builder.css() : '';
    } catch (_) { continue; }

    if (!cssOut) continue;

    // Detect actual variant from CSS:
    // 1. Check for SVG filename in Base64 data URI
    // 2. Check for superD.css() call pattern in source
    let actual = null;

    if (cssOut.includes('digiwin-d-gradient')) actual = 'gradient';
    else if (cssOut.includes('digiwin-d-particle')) actual = 'particle';
    else if (cssOut.includes('digiwin-d-outline')) actual = 'outline';

    // If we can't determine from decoded SVG name, try Base64 matching
    // Each SVG variant has distinct early content — check the Base64 string
    if (!actual && cssOut.includes('data:image/svg+xml;base64,')) {
      // We can't easily decode inline, but we can check if the require('./super-d')
      // call exists in the source file. The variant is passed as an arg there.
      // For now, if there's a Base64 SVG but we can't identify it, skip.
      actual = null;
    }

    // No Super D CSS at all
    if (!actual && !cssOut.includes('data:image/svg+xml;base64,')) {
      // Already caught by the existing SUPER D LINT in build-page.js
      continue;
    }

    if (actual && actual !== expected) {
      warnings.push({
        rule: 'SUPER_D_VARIANT_MISMATCH',
        section: section.name,
        expected,
        actual,
        message: `Section "${section.name}": HTML expects Super D variant '${expected}' but css() uses '${actual}'`,
        fix: `Change variant: '${actual}' → '${expected}' in the superD.css() call`,
      });
    }
  }

  return warnings;
}

// ════════════════════════════════════════════════════════════════
// PUBLIC API
// ════════════════════════════════════════════════════════════════

/**
 * Run all lint checks.
 * @param {Array} sections — page config sections array
 * @param {string} pageLevelCSS — assembled CSS string
 * @returns {{ errors: Array, warnings: Array }}
 */
function run(sections, pageLevelCSS) {
  const errors = checkValidity(pageLevelCSS);
  const warnings = checkSuperDVariants(sections);
  return { errors, warnings };
}

module.exports = { run, checkValidity, checkSuperDVariants };

// ════════════════════════════════════════════════════════════════
// CLI
// ════════════════════════════════════════════════════════════════

if (require.main === module) {
  const fs = require('fs');
  const args = process.argv.slice(2);
  const pageIdx = args.indexOf('--page');
  const pageName = pageIdx !== -1 ? args[pageIdx + 1] : null;

  if (!pageName) {
    console.error('Usage: node lint-css.js --page <name>');
    process.exit(1);
  }

  const configPath = path.join(__dirname, '..', 'pages', `${pageName}.js`);
  if (!fs.existsSync(configPath)) {
    console.error(`Page config not found: ${configPath}`);
    process.exit(1);
  }

  const pageConfig = require(configPath);
  const cssAssembler = require('./css-assembler');

  // Build CSS from all sections
  const allCSS = [];
  for (const section of (pageConfig.sections || [])) {
    try {
      const css = typeof section.builder.css === 'function' ? section.builder.css() : '';
      if (css) allCSS.push(css);
    } catch (_) { /* skip */ }
  }
  const pageLevelCSS = cssAssembler.assemble(allCSS);

  console.log(`\n▸ CSS Lint — ${pageName}`);
  const result = run(pageConfig.sections || [], pageLevelCSS);

  if (result.errors.length > 0) {
    console.error(`\n  ✗ ${result.errors.length} ERROR(s) (build would fail):`);
    result.errors.forEach(e => {
      console.error(`    ${e.rule}: ${e.message}`);
      console.error(`      Fix: ${e.fix}`);
    });
  }

  if (result.warnings.length > 0) {
    console.warn(`\n  ⚠ ${result.warnings.length} WARNING(s):`);
    result.warnings.forEach(w => {
      console.warn(`    ${w.rule}: ${w.message}`);
      console.warn(`      Fix: ${w.fix}`);
    });
  }

  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log('  ✓ All checks pass');
  }

  process.exit(result.errors.length > 0 ? 1 : 0);
}
