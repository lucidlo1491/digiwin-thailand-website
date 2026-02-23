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
// LINT 3: CROSS-CONTAMINATION DETECTOR
// ════════════════════════════════════════════════════════════════

/**
 * Detect CSS selectors in a section that reference classes NOT used in
 * that section's HTML. This catches scaffold-builder artifacts where
 * media queries pulled in rules for other sections.
 *
 * Allowlist: generic classes that legitimately appear in CSS without HTML
 * (e.g., .et_pb_section, .sr-only, Divi overrides, Super D, _base helpers).
 */
const CROSS_CONTAM_ALLOWLIST = new Set([
  // Divi infrastructure
  'et_pb_section', 'et_pb_row', 'et_pb_column', 'et_pb_code', 'et_pb_code_inner',
  'et_pb_text', 'et_pb_text_inner', 'et_pb_module', 'et_pb_all_tabs',
  // Shared helpers from _base.js and css-assembler.js
  'sr-only', 'dw-d-bg', 'dw-d-parallax', 'dw-d-glow', 'dw-wave-flow',
  'section-title', 'section-subtitle', 'section-header',
  // Reduced-motion targets (commonly in prefers-reduced-motion blocks)
  'capability-box', 'integration-node', 'integration-link', 'problem-card', 'mobile-module',
  'css', // artifact from template literal interpolation
]);

function checkCrossContamination(sections) {
  const warnings = [];

  for (const section of sections) {
    const builder = section.builder;

    // Get blocks HTML
    let blocksOut;
    try {
      const raw = typeof builder.blocks === 'function' ? builder.blocks() : '';
      blocksOut = Array.isArray(raw) ? raw.join('') : String(raw);
    } catch (_) { continue; }

    // Get CSS output
    let cssOut;
    try {
      cssOut = typeof builder.css === 'function' ? builder.css() : '';
    } catch (_) { continue; }
    if (!cssOut) continue;

    // Extract class names from HTML
    const htmlClasses = new Set();
    const classRe = /class="([^"]*)"/g;
    let m;
    while ((m = classRe.exec(blocksOut)) !== null) {
      m[1].split(/\s+/).filter(Boolean).forEach(c => htmlClasses.add(c));
    }

    // Extract class selectors from CSS (only top-level selectors, not inside values)
    const foreignClasses = [];
    const selectorRe = /([^{}@]+)\{/g;
    let sm;
    while ((sm = selectorRe.exec(cssOut)) !== null) {
      const selector = sm[1];
      const classRefs = selector.match(/\.[\w-]+/g) || [];
      for (const ref of classRefs) {
        const cls = ref.substring(1); // strip dot
        if (!htmlClasses.has(cls)
            && !CROSS_CONTAM_ALLOWLIST.has(cls)
            && !cls.startsWith('et_pb_')
            && !cls.startsWith('dw-d-')
            && !cls.startsWith('dw-wave')) {
          foreignClasses.push(cls);
        }
      }
    }

    // Deduplicate
    const unique = [...new Set(foreignClasses)];

    // Cross-reference against OTHER sections on the same page to confirm contamination.
    // A class is "confirmed foreign" if it appears in another section's blocks() HTML.
    const confirmedForeign = unique.filter(cls => {
      for (const other of sections) {
        if (other.name === section.name) continue;
        try {
          const otherRaw = typeof other.builder.blocks === 'function' ? other.builder.blocks() : '';
          const otherHTML = Array.isArray(otherRaw) ? otherRaw.join('') : String(otherRaw);
          if (otherHTML.includes(cls)) return true;
        } catch (_) { /* skip */ }
      }
      return false;
    });

    if (confirmedForeign.length > 3) {
      warnings.push({
        rule: 'CROSS_CONTAMINATION',
        section: section.name,
        foreignClasses: confirmedForeign,
        message: `Section "${section.name}": CSS has ${confirmedForeign.length} selectors from OTHER sections: ${confirmedForeign.slice(0, 6).map(c => '.'+c).join(', ')}${confirmedForeign.length > 6 ? '...' : ''}`,
        fix: `Remove selectors belonging to other sections from this section's css().`,
      });
    }
  }

  return warnings;
}

// ════════════════════════════════════════════════════════════════
// LINT 4: REFERENCE PATTERN MATCHER
// ════════════════════════════════════════════════════════════════

/**
 * Known section patterns that have clean, hand-tuned reference files.
 * Each pattern has HTML fingerprints (strings that identify the pattern)
 * and a reference file to use instead of scaffold output.
 *
 * When a section matches a pattern, warn the developer to use the reference.
 */
const REFERENCE_PATTERNS = [
  {
    name: 'integration-hub',
    fingerprints: ['integration-visual', 'integration-node', 'integration-arrow'],
    minMatches: 3,
    reference: 'mes-integration.js',
    description: 'Integration hub with node icons and arrows',
  },
  {
    name: 'product-detail-cta',
    fingerprints: ['product-detail-cta', 'product-detail-cta-title', 'product-detail-cta-buttons'],
    minMatches: 2,
    reference: 'erp-product-detail-cta.js',
    description: 'Product page bottom CTA with gradient background',
  },
  {
    name: 'capability-grid',
    fingerprints: ['capability-box', 'capability-box-icon', 'capability-features', 'capability-box-title'],
    minMatches: 3,
    reference: 'wms-capabilities.js',
    description: 'Capability cards with icons and feature lists',
  },
  {
    name: 'problems-grid',
    fingerprints: ['problem-card', 'problem-icon', 'problem-title', 'problems-grid'],
    minMatches: 3,
    reference: 'wms-problems.js',
    description: 'Problem cards grid showing pain points',
  },
];

function checkReferencePatterns(sections) {
  const warnings = [];

  for (const section of sections) {
    const builder = section.builder;

    let blocksOut;
    try {
      const raw = typeof builder.blocks === 'function' ? builder.blocks() : '';
      blocksOut = Array.isArray(raw) ? raw.join('') : String(raw);
    } catch (_) { continue; }

    let cssOut;
    try {
      cssOut = typeof builder.css === 'function' ? builder.css() : '';
    } catch (_) { continue; }

    const cssLines = cssOut.split('\n').length;
    const hasAutoGenComment = cssOut.includes('AUTO-GENERATED') || cssOut.includes('TODO: Review');

    for (const pattern of REFERENCE_PATTERNS) {
      // Only match fingerprints in blocks() HTML — not CSS (contaminated CSS gives false positives)
      const matches = pattern.fingerprints.filter(f => blocksOut.includes(f));
      if (matches.length >= pattern.minMatches) {
        // Skip if this section IS the reference (clean CSS, name matches ref tail)
        const refBaseName = pattern.reference.replace('.js', '');
        if (refBaseName === section.name || refBaseName.endsWith('-' + section.name)) {
          if (!hasAutoGenComment && cssLines <= 150) continue;
        }

        if (hasAutoGenComment || cssLines > 150) {
          warnings.push({
            rule: 'REFERENCE_PATTERN',
            section: section.name,
            pattern: pattern.name,
            reference: pattern.reference,
            message: `Section "${section.name}" matches "${pattern.name}" pattern. Use ${pattern.reference} as reference (${pattern.description}).`,
            fix: `Rewrite css() following the clean pattern in ${pattern.reference}. Don't incrementally patch scaffold output.`,
          });
        }
      }
    }
  }

  return warnings;
}

// ════════════════════════════════════════════════════════════════
// LINT 5: CSS SANITIZER — fixes known scaffold/auto-fix artifacts
// ════════════════════════════════════════════════════════════════

/**
 * Sanitize a section's CSS string, fixing known artifact patterns
 * from scaffold-builder and batch fix scripts.
 *
 * Runs during assembly (before push), so artifacts never reach WordPress.
 *
 * Patterns fixed:
 *   1. Missing semicolon: ` ;property:value` → proper declaration
 *   2. Stacked duplicate -webkit-font-smoothing (2+ occurrences → 1)
 *   3. Stacked duplicate line-height !important (2+ occurrences → 1)
 *   4. Stray backslash on its own line
 *   5. Trailing semicolons before opening brace: `value ;\n{` → `value;\n{`
 */
function sanitizeSectionCSS(css) {
  if (!css) return css;
  let out = css;

  // 1. Fix ` ;property:value` — missing semicolon before injected properties
  //    Pattern: `<existing-value>\n ;line-height:` or `<existing-value>\n ;-webkit-font-smoothing:`
  out = out.replace(/\n\s*;([\w-]+\s*:)/g, ';\n            $1');

  // 2. Collapse stacked duplicate `-webkit-font-smoothing` lines (keep last)
  //    Matches 2+ consecutive `-webkit-font-smoothing: auto [!important];` with optional whitespace
  out = out.replace(
    /(\s*-webkit-font-smoothing:\s*auto\s*(?:!important)?\s*;?\s*\n\s*){2,}/g,
    '\n            -webkit-font-smoothing: auto;\n'
  );

  // 3. Collapse stacked duplicate `line-height` with !important (keep last)
  //    Pattern: multiple `line-height: Xpx !important;` lines in a row
  out = out.replace(
    /(\s*line-height:\s*[\d.]+(?:px)?\s*!important\s*;\s*\n\s*){2,}/g,
    (match) => {
      // Extract the LAST line-height value from the stack
      const lastMatch = match.match(/line-height:\s*([\d.]+(?:px)?)\s*!important/g);
      const lastVal = lastMatch ? lastMatch[lastMatch.length - 1] : 'line-height: 1.6 !important';
      return `\n            ${lastVal};\n`;
    }
  );

  // 4. Remove stray backslash on its own line (scaffold artifact)
  out = out.replace(/^\s*\\\s*$/gm, '');

  // 5. Remove empty lines between property and closing brace that have only whitespace
  //    (cleanup after other fixes)
  out = out.replace(/;\s*\n\s*\n\s*}/g, ';\n        }');

  return out;
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
  const warnings = [
    ...checkSuperDVariants(sections),
    ...checkCrossContamination(sections),
    ...checkReferencePatterns(sections),
  ];
  return { errors, warnings };
}

module.exports = { run, checkValidity, checkSuperDVariants, checkCrossContamination, checkReferencePatterns, sanitizeSectionCSS };

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
