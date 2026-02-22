#!/usr/bin/env node
/**
 * scaffold-builder.js — Generate Divi 5 builder files from HTML prototypes
 *
 * Reads an HTML prototype, extracts section boundaries + CSS, and generates
 * complete builder .js files with all Divi overrides pre-applied.
 *
 * Usage:
 *   node complete_website/divi5/lib/scaffold-builder.js --page business-model [--dry-run]
 *   # Generates: pages/business-model.js + pages/sections/business-model-*.js
 *
 * What it does:
 *   1. Reads the HTML prototype file
 *   2. Extracts <section> boundaries (class + content + inline styles)
 *   3. Extracts matching CSS from the page's <style> block
 *   4. Generates complete builder .js files with:
 *      - blocks() wrapping HTML in base.wrapInDiviSection()
 *      - css() with transplanted CSS + Divi overrides pre-applied
 *      - fontSmoothingReset(), reducedMotion(), BREAKPOINTS, diviListReset
 *   5. Generates the page config .js with section list
 *
 * Does NOT:
 *   - Resolve computed styles (preserves clamp(), CSS vars, media queries as-is)
 *   - Replace existing builder files (skips if file exists, use --force to overwrite)
 */

const fs = require('fs');
const path = require('path');

// ════════════════════════════════════════════════════════════════
// CLI
// ════════════════════════════════════════════════════════════════
const args = process.argv.slice(2);
function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}
const hasFlag = (flag) => args.includes(flag);

const pageName = getArg('--page');
const DRY_RUN = hasFlag('--dry-run');
const FORCE = hasFlag('--force');

if (!pageName) {
  console.error('Usage: node scaffold-builder.js --page <name> [--dry-run] [--force]');
  console.error('\nExamples:');
  console.error('  node scaffold-builder.js --page business-model');
  console.error('  node scaffold-builder.js --page partner-program --dry-run');
  process.exit(1);
}

// ════════════════════════════════════════════════════════════════
// PATHS
// ════════════════════════════════════════════════════════════════
const COMPLETE_DIR = path.join(__dirname, '..', '..');
const PAGES_DIR = path.join(__dirname, '..', 'pages');
const SECTIONS_DIR = path.join(PAGES_DIR, 'sections');

const protoArg = getArg('--proto');
const protoPath = protoArg
  ? path.resolve(COMPLETE_DIR, protoArg)
  : path.join(COMPLETE_DIR, `${pageName}.html`);
if (!fs.existsSync(protoPath)) {
  console.error(`Prototype not found: ${protoPath}`);
  console.error(`Available HTML files:`);
  const htmlFiles = fs.readdirSync(COMPLETE_DIR)
    .filter(f => f.endsWith('.html') && !f.startsWith('clonewebx'))
    .slice(0, 20);
  htmlFiles.forEach(f => console.error(`  ${f.replace('.html', '')}`));
  process.exit(1);
}

// Ensure sections/ dir exists
if (!fs.existsSync(SECTIONS_DIR)) {
  fs.mkdirSync(SECTIONS_DIR, { recursive: true });
}

console.log(`\n▸ Scaffolding builders for: ${pageName}`);
console.log(`  Prototype: ${protoPath}`);

// ════════════════════════════════════════════════════════════════
// PARSE HTML PROTOTYPE
// ════════════════════════════════════════════════════════════════
const html = fs.readFileSync(protoPath, 'utf-8');

/**
 * Extract inline <style> block content from <head>.
 */
function extractStyleBlock(html) {
  // Match the first <style> block in <head>
  const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
  if (!headMatch) return '';

  const styleMatch = headMatch[0].match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return styleMatch ? styleMatch[1].trim() : '';
}

/**
 * Extract <section> elements from <main>.
 * Returns array of { index, className, id, inlineStyle, innerHTML, outerHTML, startLine }.
 */
function extractSections(html) {
  const sections = [];
  // Find <main> content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error('  ⚠ No <main> element found');
    return sections;
  }
  const mainContent = mainMatch[1];

  // Find all top-level <section> tags
  // We use a simple state machine since sections can be nested
  const sectionRegex = /<section\b([^>]*)>/gi;
  let match;
  let idx = 0;

  while ((match = sectionRegex.exec(mainContent)) !== null) {
    const attrs = match[1];
    const startPos = match.index;

    // Extract class
    const classMatch = attrs.match(/class="([^"]*)"/);
    const className = classMatch ? classMatch[1].trim() : '';

    // Extract id
    const idMatch = attrs.match(/id="([^"]*)"/);
    const id = idMatch ? idMatch[1] : '';

    // Extract inline style
    const styleMatch = attrs.match(/style="([^"]*)"/);
    const inlineStyle = styleMatch ? styleMatch[1] : '';

    // Find matching closing tag (handle nesting)
    let depth = 1;
    let pos = match.index + match[0].length;
    while (depth > 0 && pos < mainContent.length) {
      const openNext = mainContent.indexOf('<section', pos);
      const closeNext = mainContent.indexOf('</section>', pos);
      if (closeNext === -1) break;
      if (openNext !== -1 && openNext < closeNext) {
        depth++;
        pos = openNext + 8;
      } else {
        depth--;
        if (depth === 0) {
          const innerHTML = mainContent.substring(match.index + match[0].length, closeNext).trim();
          const outerHTML = mainContent.substring(match.index, closeNext + '</section>'.length);

          // Calculate approximate line number
          const beforeSection = html.substring(0, html.indexOf(mainContent) + startPos);
          const startLine = (beforeSection.match(/\n/g) || []).length + 1;

          sections.push({
            index: idx++,
            className,
            id,
            inlineStyle,
            innerHTML,
            outerHTML,
            startLine,
          });
        }
        pos = closeNext + '</section>'.length;
      }
    }
  }

  return sections;
}

/**
 * Derive a short section name from class or position.
 * e.g. "dw-partner-hero" → "hero", "reality-section" → "reality",
 *      "transform-section" → "transform", "market-timing" → "market-timing"
 */
function deriveSectionName(section, pageName) {
  let name = section.className
    .split(/\s+/)[0]  // First class only
    .replace(/^dw-/, '')
    .replace(new RegExp(`^${pageName.replace(/-/g, '[-_]?')}-?`), '')
    .replace(/-section$/, '')
    .replace(/-wrapper$/, '')
    .replace(/-container$/, '');

  // If name is empty or very generic, use index
  if (!name || name.length < 2) {
    name = `section-${section.index + 1}`;
  }

  return name;
}

/**
 * Deduplicate section names by appending -2, -3, etc.
 */
function deduplicateNames(sections) {
  const seen = {};
  sections.forEach(s => {
    if (seen[s.name] !== undefined) {
      seen[s.name]++;
      s.name = `${s.name}-${seen[s.name]}`;
    } else {
      seen[s.name] = 1;
    }
  });
}

/**
 * Extract all CSS class names used in a section's HTML.
 */
function extractClassNames(html) {
  const classes = new Set();
  const re = /class="([^"]*)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    m[1].split(/\s+/).filter(Boolean).forEach(c => classes.add(c));
  }
  return [...classes];
}

/**
 * Extract CSS rules from a stylesheet string that match any of the given class names.
 * Preserves media queries and their contents.
 */
function extractMatchingCSS(styleBlock, classNames) {
  if (!styleBlock || classNames.length === 0) return { rules: [], mediaQueries: [] };

  const classSet = new Set(classNames);
  const rules = [];
  const mediaQueries = [];

  // Build regex to match any class selector
  const classPattern = classNames
    .map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const selectorRegex = new RegExp(`\\.(${classPattern})\\b`);

  // Split into top-level blocks (rules + media queries)
  // Simple approach: track brace depth
  let i = 0;
  while (i < styleBlock.length) {
    // Skip whitespace and comments
    const wsMatch = styleBlock.substring(i).match(/^\s+/);
    if (wsMatch) { i += wsMatch[0].length; continue; }
    const commentMatch = styleBlock.substring(i).match(/^\/\*[\s\S]*?\*\//);
    if (commentMatch) { i += commentMatch[0].length; continue; }

    // Check for @media
    const mediaMatch = styleBlock.substring(i).match(/^@media\s*\([^)]*\)\s*\{/);
    if (mediaMatch) {
      const mediaStart = i;
      i += mediaMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < styleBlock.length) {
        if (styleBlock[i] === '{') depth++;
        else if (styleBlock[i] === '}') depth--;
        i++;
      }
      const mediaBlock = styleBlock.substring(mediaStart, i).trim();
      // Check if any rules inside match our classes
      if (selectorRegex.test(mediaBlock)) {
        mediaQueries.push(mediaBlock);
      }
      continue;
    }

    // Check for @keyframes
    const keyframesMatch = styleBlock.substring(i).match(/^@keyframes\s+[\w-]+\s*\{/);
    if (keyframesMatch) {
      const kfStart = i;
      i += keyframesMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < styleBlock.length) {
        if (styleBlock[i] === '{') depth++;
        else if (styleBlock[i] === '}') depth--;
        i++;
      }
      // Include keyframes if referenced by our classes' animation names
      rules.push(styleBlock.substring(kfStart, i).trim());
      continue;
    }

    // Regular rule: selector { ... }
    const ruleMatch = styleBlock.substring(i).match(/^([^{}@]+)\{/);
    if (ruleMatch) {
      const selector = ruleMatch[1].trim();
      const ruleStart = i;
      i += ruleMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < styleBlock.length) {
        if (styleBlock[i] === '{') depth++;
        else if (styleBlock[i] === '}') depth--;
        i++;
      }
      if (selectorRegex.test(selector)) {
        rules.push(styleBlock.substring(ruleStart, i).trim());
      }
      continue;
    }

    // Skip unknown characters
    i++;
  }

  return { rules, mediaQueries };
}

/**
 * Load styles.css from the same directory as the HTML prototype.
 * Follows the <link rel="stylesheet" href="..."> reference.
 */
function loadExternalStylesheet(htmlContent, protoDir) {
  const linkMatch = htmlContent.match(/<link\s+rel="stylesheet"\s+href="([^"]*styles\.css)"/i)
    || htmlContent.match(/<link\s+href="([^"]*styles\.css)"\s+rel="stylesheet"/i);
  if (!linkMatch) return { css: '', path: null };

  const href = linkMatch[1];
  const cssPath = path.resolve(protoDir, href);
  if (!fs.existsSync(cssPath)) return { css: '', path: cssPath };

  return { css: fs.readFileSync(cssPath, 'utf-8'), path: cssPath };
}

/**
 * Extract CSS rules from styles.css that match a section's classes.
 * Categorizes rules into: base, hover, pseudo, hidden (display:none), keyframes.
 *
 * @param {string} stylesheet — full styles.css content
 * @param {string[]} classNames — classes used in the section HTML
 * @returns {object} { base, hover, pseudo, hidden, keyframes, sharedComponents }
 */
function extractExternalCSS(stylesheet, classNames) {
  const result = { base: [], hover: [], pseudo: [], hidden: [], keyframes: [], sharedComponents: [] };
  if (!stylesheet || classNames.length === 0) return result;

  // Also look for shared component classes referenced in the HTML
  // These are classes that exist in the HTML but have rules in styles.css
  const classPattern = classNames
    .map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const selectorRegex = new RegExp(`\\.(${classPattern})\\b`);

  // Parse stylesheet into blocks
  let i = 0;
  while (i < stylesheet.length) {
    // Skip whitespace
    const wsMatch = stylesheet.substring(i).match(/^\s+/);
    if (wsMatch) { i += wsMatch[0].length; continue; }
    // Skip comments
    const commentMatch = stylesheet.substring(i).match(/^\/\*[\s\S]*?\*\//);
    if (commentMatch) { i += commentMatch[0].length; continue; }

    // @media block
    const mediaMatch = stylesheet.substring(i).match(/^@media\s*\([^)]*\)\s*\{/);
    if (mediaMatch) {
      const start = i;
      i += mediaMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < stylesheet.length) {
        if (stylesheet[i] === '{') depth++;
        else if (stylesheet[i] === '}') depth--;
        i++;
      }
      const block = stylesheet.substring(start, i).trim();
      if (selectorRegex.test(block)) {
        result.base.push(block);
      }
      continue;
    }

    // @keyframes block
    const kfMatch = stylesheet.substring(i).match(/^@keyframes\s+([\w-]+)\s*\{/);
    if (kfMatch) {
      const start = i;
      i += kfMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < stylesheet.length) {
        if (stylesheet[i] === '{') depth++;
        else if (stylesheet[i] === '}') depth--;
        i++;
      }
      result.keyframes.push(stylesheet.substring(start, i).trim());
      continue;
    }

    // Regular rule
    const ruleMatch = stylesheet.substring(i).match(/^([^{}@]+)\{/);
    if (ruleMatch) {
      const selector = ruleMatch[1].trim();
      const start = i;
      i += ruleMatch[0].length;
      let depth = 1;
      while (depth > 0 && i < stylesheet.length) {
        if (stylesheet[i] === '{') depth++;
        else if (stylesheet[i] === '}') depth--;
        i++;
      }
      const ruleText = stylesheet.substring(start, i).trim();

      if (selectorRegex.test(selector)) {
        // Categorize
        if (/display\s*:\s*none/.test(ruleText)) {
          result.hidden.push(ruleText);
        } else if (/:hover\b/.test(selector)) {
          result.hover.push(ruleText);
        } else if (/::?(?:before|after)\b/.test(selector)) {
          result.pseudo.push(ruleText);
        } else {
          result.base.push(ruleText);
        }
      }
      continue;
    }
    i++;
  }

  return result;
}

/**
 * Remap class names in a CSS rule to use the ${P} prefix pattern.
 *
 * Strategy: Find the longest common prefix among the section's class names,
 * then replace it with `${P}`. Falls back to replacing each known class.
 *
 * e.g. classNames = ['solution-card', 'solution-icon', 'solution-section']
 *      commonPrefix = 'solution'
 *      '.solution-card:hover' → '.${P}-card:hover'
 *      '.solution-icon' → '.${P}-icon'
 *
 * @param {string} cssRule — full CSS rule text
 * @param {string[]} classNames — classes used in the section
 * @returns {string} remapped CSS rule
 */
function remapClassesToPrefix(cssRule, classNames) {
  if (classNames.length === 0) return cssRule;

  // Find the dominant prefix: the first word (before first '-') that appears
  // most frequently among the class names. Excludes generic prefixes like 'dw'.
  const prefixCounts = {};
  classNames.forEach(cls => {
    const firstWord = cls.split('-')[0];
    if (firstWord.length >= 3 && firstWord !== 'dw') {
      prefixCounts[firstWord] = (prefixCounts[firstWord] || 0) + 1;
    }
    // Also try two-word prefix (e.g. 'partner-hero' from 'partner-hero-title')
    const parts = cls.split('-');
    if (parts.length >= 2) {
      const twoWord = parts[0] + '-' + parts[1];
      if (twoWord.length >= 5 && parts[0] !== 'dw') {
        prefixCounts[twoWord] = (prefixCounts[twoWord] || 0) + 1;
      }
    }
  });

  // Pick the prefix with most matches (prefer longer prefixes on tie)
  const sorted = Object.entries(prefixCounts)
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  const dominant = sorted.length > 0 ? sorted[0][0] : '';

  if (dominant.length < 3) {
    // No good prefix found — replace each class individually
    let result = cssRule;
    const byLength = [...classNames].sort((a, b) => b.length - a.length);
    byLength.forEach(cls => {
      const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp('\\.' + escaped + '\\b', 'g'), '.\\${P}-' + cls);
    });
    return result;
  }

  // Replace .{dominant}-{suffix} with ${P}-{suffix}
  // Also handle .{dominant} alone (maps to ${P}-section or just ${P})
  const escaped = dominant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let result = cssRule.replace(
    new RegExp('\\.' + escaped + '(-[\\w-]+)?\\b', 'g'),
    (match, suffix) => '.\\${P}' + (suffix || '')
  );

  return result;
}

/**
 * Minify a CSS rule: collapse whitespace, remove newlines.
 * Produces single-line rules matching the builder's CSS style.
 */
function minifyRule(rule) {
  return rule
    .replace(/\s*\n\s*/g, '')          // Remove newlines
    .replace(/\s*\{\s*/g, '{')          // Tighten braces
    .replace(/\s*\}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')           // Tighten colons
    .replace(/\s*;\s*/g, ';')           // Tighten semicolons
    .replace(/;\}/g, '}')               // Remove trailing semicolons before }
    .trim();
}

/**
 * Check if a CSS rule's selectors can be cleanly remapped to ${P} prefix.
 * Returns true if ALL class selectors in the rule belong to the section's
 * dominant prefix family. Returns false if the rule uses shared global
 * classes (dw-btn-*, dw-partner-*) that don't follow the section pattern.
 */
function canAutoRemap(cssRule, classNames) {
  // Find dominant prefix
  const prefixCounts = {};
  classNames.forEach(cls => {
    const firstWord = cls.split('-')[0];
    if (firstWord.length >= 3 && firstWord !== 'dw') {
      prefixCounts[firstWord] = (prefixCounts[firstWord] || 0) + 1;
    }
  });
  const sorted = Object.entries(prefixCounts)
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  const dominant = sorted.length > 0 ? sorted[0][0] : '';
  if (dominant.length < 3) return false;

  // Only examine class selectors in the SELECTOR part (before the opening brace)
  const selectorPart = cssRule.split('{')[0] || '';
  const classRefs = selectorPart.match(/\.[\w-]+/g) || [];
  if (classRefs.length === 0) return false;
  return classRefs.every(ref => {
    const cls = ref.substring(1); // strip the dot
    return cls.startsWith(dominant + '-') || cls === dominant;
  });
}

/**
 * Format external CSS extraction into live CSS + warning comments for the builder.
 *
 * Returns content ready for direct insertion into a JS template literal.
 * - hover + pseudo with section-specific classes → LIVE CSS with \${P} (auto-remapped)
 * - hover + pseudo with global classes → WARNING comments (manual port needed)
 * - hidden → WARNING comments (do not include)
 * - base → REFERENCE comments (for manual review)
 *
 * @param {object} extCSS — from extractExternalCSS()
 * @param {string[]} classNames — section's class names for remapping
 * @returns {string} template-literal-ready CSS block
 */
function formatExternalCSSReport(extCSS, classNames) {
  const sections = [];

  // Escape for template literal (comments only — live CSS uses ${P} interpolation)
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  // Split hover/pseudo rules into auto-remappable vs manual
  const autoHover = [];
  const manualHover = [];
  extCSS.hover.forEach(r => {
    if (canAutoRemap(r, classNames)) autoHover.push(r);
    else manualHover.push(r);
  });

  const autoPseudo = [];
  const manualPseudo = [];
  extCSS.pseudo.forEach(r => {
    if (canAutoRemap(r, classNames)) autoPseudo.push(r);
    else manualPseudo.push(r);
  });

  // Auto-remapped hover rules (live CSS)
  if (autoHover.length > 0) {
    sections.push('/* === HOVER STATES (auto-ported from styles.css) === */');
    autoHover.forEach(r => {
      sections.push(minifyRule(remapClassesToPrefix(r, classNames)));
    });
  }

  // Auto-remapped pseudo rules (live CSS)
  if (autoPseudo.length > 0) {
    sections.push('/* === PSEUDO-ELEMENTS (auto-ported from styles.css) === */');
    autoPseudo.forEach(r => {
      sections.push(minifyRule(remapClassesToPrefix(r, classNames)));
    });
  }

  // Manual hover rules (global classes — need human review)
  if (manualHover.length > 0) {
    sections.push('/* TODO: HOVER STATES using global classes (port manually) */');
    manualHover.forEach(r => sections.push('/* ' + esc(minifyRule(r)) + ' */'));
  }

  // Manual pseudo rules
  if (manualPseudo.length > 0) {
    sections.push('/* TODO: PSEUDO-ELEMENTS using global classes (port manually) */');
    manualPseudo.forEach(r => sections.push('/* ' + esc(minifyRule(r)) + ' */'));
  }

  if (extCSS.hidden.length > 0) {
    sections.push('/* WARNING: HIDDEN in styles.css (display:none) — DO NOT include in builder HTML */');
    extCSS.hidden.forEach(r => sections.push('/* ' + esc(r).replace(/\n/g, '\n * ') + ' */'));
  }

  if (extCSS.base.length > 0) {
    sections.push('/* REF: BASE RULES from styles.css (check against inline CSS above) */');
    extCSS.base.forEach(r => sections.push('/* ' + esc(minifyRule(r)) + ' */'));
  }

  return sections.join('\n');
}

/**
 * Escape a string for use inside JS template literals.
 */
function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

/**
 * Generate a CSS prefix from section name.
 * e.g. "market-timing" → "mkt", "hero" → "hero", "pain-revenue" → "pain"
 */
function generatePrefix(sectionName) {
  const parts = sectionName.split('-');
  if (parts.length === 1 && parts[0].length <= 6) return parts[0];
  // Abbreviate: first 3 chars of first word
  return parts[0].substring(0, 3) + (parts[1] ? parts[1].substring(0, 1) : '');
}

/**
 * Clean section inner HTML for use in builder:
 * - Remove HTML comments
 * - Normalize indentation
 * - Strip data-* attributes that won't work in Divi
 */
function cleanInnerHTML(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')  // Remove comments
    .replace(/\s+data-(?:scroll|parallax|aos)[^"]*"[^"]*"/g, '')  // Strip animation data attrs
    .trim();
}

// ════════════════════════════════════════════════════════════════
// A3: TEMPLATE SUGGESTION HEURISTIC
// ════════════════════════════════════════════════════════════════

/**
 * Suggest a matching template based on section characteristics.
 * Returns a JS comment string (not code) — human reviews before adopting.
 */
function suggestTemplate(section) {
  const html = section.outerHTML.toLowerCase();
  const cls = section.className.toLowerCase();
  const allCSS = section.cssRules.join(' ').toLowerCase();

  // Dark background + cards
  if ((/dark|navy|#000864|#000432/.test(allCSS) || /dark/.test(cls)) && /card/.test(html)) {
    return '\n// TEMPLATE HINT: matches "card-grid-dark". See home-trust-anchors.js for example.';
  }
  // Light cards
  if (/card/.test(html) && !/dark/.test(cls) && !/navy/.test(allCSS)) {
    return '\n// TEMPLATE HINT: matches "card-grid-light". See home-factory-checks.js for example.';
  }
  // Stats / counters
  if (/data-target|counter|stat/.test(html) && /particle|ocean|banner/.test(cls)) {
    return '\n// TEMPLATE HINT: matches "stats-banner". See home-stats.js for example.';
  }
  // CTA gradient
  if ((/gradient/.test(allCSS) || /cta/.test(cls)) && /btn|button|Let.*Talk/i.test(html)) {
    return '\n// TEMPLATE HINT: matches "cta-gradient". See home-cta.js for example.';
  }
  // Hero with gradient
  if (/hero/.test(cls) && (/gradient/.test(allCSS) || /linear-gradient/.test(allCSS))) {
    return '\n// TEMPLATE HINT: matches "hero-gradient". See home-hero.js for example.';
  }
  // Logo marquee
  if (/marquee|logo-bar|client/.test(cls)) {
    return '\n// TEMPLATE HINT: matches "logo-marquee". See home-logo-bar.js for example.';
  }
  // Tabs
  if (/tab-btn|tab-content|tab-panel/.test(html)) {
    return '\n// TEMPLATE HINT: matches "tab-content". See the tab-content template.';
  }
  return '';
}

// ════════════════════════════════════════════════════════════════
// A2: REMAP CLASS NAMES IN HTML OUTPUT
// ════════════════════════════════════════════════════════════════

/**
 * Apply ${P} prefix remapping to HTML content (class attributes + SVG ids).
 * Uses the same dominant-prefix logic as remapClassesToPrefix() for CSS.
 */
function remapHTMLClasses(html, classNames) {
  if (classNames.length === 0) return html;

  // Find dominant prefix (same algorithm as remapClassesToPrefix)
  const prefixCounts = {};
  classNames.forEach(cls => {
    const firstWord = cls.split('-')[0];
    if (firstWord.length >= 3 && firstWord !== 'dw') {
      prefixCounts[firstWord] = (prefixCounts[firstWord] || 0) + 1;
    }
    const parts = cls.split('-');
    if (parts.length >= 2) {
      const twoWord = parts[0] + '-' + parts[1];
      if (twoWord.length >= 5 && parts[0] !== 'dw') {
        prefixCounts[twoWord] = (prefixCounts[twoWord] || 0) + 1;
      }
    }
  });
  const sorted = Object.entries(prefixCounts)
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length);
  const dominant = sorted.length > 0 ? sorted[0][0] : '';
  if (dominant.length < 3) return html;

  const escaped = dominant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Remap class="..." values: replace dominant prefix with ${P}
  let result = html.replace(/class="([^"]*)"/g, (match, value) => {
    const remapped = value.replace(
      new RegExp('\\b' + escaped + '(-[\\w-]+)?\\b', 'g'),
      (m, suffix) => '\\${P}' + (suffix || '')
    );
    return `class="${remapped}"`;
  });

  // Remap SVG id/url() references to prevent cross-section collisions
  result = result.replace(
    new RegExp('id="(' + escaped + '[-\\w]*)"', 'g'),
    (m, id) => `id="\\${P}-${id.replace(new RegExp('^' + escaped), '').replace(/^-/, '')}"`
  );
  result = result.replace(
    new RegExp('url\\(#(' + escaped + '[-\\w]*)\\)', 'g'),
    (m, id) => `url(#\\${P}-${id.replace(new RegExp('^' + escaped), '').replace(/^-/, '')})`
  );

  return result;
}

// ════════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════════
const styleBlock = extractStyleBlock(html);
const sections = extractSections(html);

// Load external stylesheet (styles.css)
const protoDir = path.dirname(protoPath);
const externalSheet = loadExternalStylesheet(html, protoDir);

if (sections.length === 0) {
  console.error('  ✗ No sections found in <main>. Cannot scaffold.');
  process.exit(1);
}

console.log(`  Found ${sections.length} sections`);
console.log(`  Style block: ${styleBlock.length} chars`);
if (externalSheet.css) {
  console.log(`  External CSS: ${externalSheet.path} (${externalSheet.css.length} chars)`);
} else {
  console.log(`  External CSS: not found`);
}

// Derive section names and extract CSS
const sectionData = sections.map(section => {
  const name = deriveSectionName(section, pageName);
  const classNames = extractClassNames(section.outerHTML);
  const { rules, mediaQueries } = extractMatchingCSS(styleBlock, classNames);
  const extCSS = externalSheet.css ? extractExternalCSS(externalSheet.css, classNames) : null;
  const prefix = generatePrefix(name);

  return {
    ...section,
    name,
    prefix,
    classNames,
    cssRules: rules,
    cssMediaQueries: mediaQueries,
    extCSS,
    cleanHTML: cleanInnerHTML(section.innerHTML),
  };
});

// Deduplicate section names (e.g. two "reality" sections → "reality", "reality-2")
deduplicateNames(sectionData);

console.log('\n  Sections:');
sectionData.forEach((s, i) => {
  const ext = s.extCSS;
  const extCount = ext ? (ext.base.length + ext.hover.length + ext.pseudo.length + ext.hidden.length) : 0;
  const hoverCount = ext ? ext.hover.length : 0;
  const hiddenCount = ext ? ext.hidden.length : 0;
  const extInfo = extCount > 0
    ? `, +${extCount} from styles.css${hoverCount ? ` (${hoverCount} hover)` : ''}${hiddenCount ? ` (${hiddenCount} hidden)` : ''}`
    : '';
  console.log(`    ${i}: ${s.name} (${s.classNames.length} classes, ${s.cssRules.length} inline rules${extInfo}, line ${s.startLine})`);
});

// ════════════════════════════════════════════════════════════════
// GENERATE SECTION BUILDER FILES
// ════════════════════════════════════════════════════════════════
const generatedSections = [];

sectionData.forEach(section => {
  const fileName = `${pageName}-${section.name}.js`;
  const filePath = path.join(SECTIONS_DIR, fileName);

  if (fs.existsSync(filePath) && !FORCE) {
    console.log(`  ⊘ Skipping ${fileName} (exists, use --force to overwrite)`);
    generatedSections.push({ name: section.name, fileName, skipped: true });
    return;
  }

  // Build admin label
  const adminLabel = section.name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Check if section has lists (needs diviListReset)
  const hasList = /<(?:ul|ol)\b/i.test(section.cleanHTML);

  // Check if section has transitions/animations (needs reducedMotion)
  const allCSS = section.cssRules.join('') + (section.extCSS ? section.extCSS.base.join('') : '');
  const hasTransition = /transition/i.test(allCSS);

  // Build CSS string from extracted rules
  const cssBody = [...section.cssRules, ...section.cssMediaQueries]
    .join('\n')
    .trim();

  // External CSS report (hover states, pseudo-elements, hidden elements, base rules)
  // NOTE: formatExternalCSSReport returns template-literal-ready content (already escaped).
  // Do NOT run escapeForTemplate on it again.
  const extReport = section.extCSS ? formatExternalCSSReport(section.extCSS, section.classNames) : '';
  const extReportEscaped = extReport ? '\n' + extReport : '';

  // Summary counts for header comment
  const extCounts = section.extCSS
    ? { hover: section.extCSS.hover.length, pseudo: section.extCSS.pseudo.length, hidden: section.extCSS.hidden.length, base: section.extCSS.base.length }
    : null;
  const extSummary = extCounts && (extCounts.hover + extCounts.pseudo + extCounts.hidden + extCounts.base > 0)
    ? `\n * styles.css: ${extCounts.base} base, ${extCounts.hover} hover, ${extCounts.pseudo} pseudo, ${extCounts.hidden} hidden`
    : '';

  // Detect SVGs that need script injection (wp_kses strips <text> etc.)
  const hasSVG = /<svg\b/i.test(section.cleanHTML);
  const svgNote = hasSVG ? '\n// NOTE: Contains inline SVGs — may need Base64 JS injection if wp_kses strips elements.' : '';

  // Detect Super D decoration elements
  const hasSuperD = /dw-d-bg/.test(section.cleanHTML);
  let superDCSSLine = '';
  if (hasSuperD) {
    const sdParticle = /dw-d-bg--particle/.test(section.outerHTML);
    const sdGradient = /dw-d-bg--gradient/.test(section.outerHTML);
    const sdVariant = sdParticle ? 'particle' : sdGradient ? 'gradient' : 'outline';
    const sdPosition = /dw-d-bg--bottom/.test(section.outerHTML) ? 'bottom' : 'right';
    superDCSSLine = `\\\${superD.css('dw-d-bg', { variant: '${sdVariant}', position: '${sdPosition}' })}`;
  }

  // ── A3: Template suggestion heuristic ──
  const templateHint = suggestTemplate(section);

  // ── A2: Remap class names in HTML output ──
  const remappedHTML = remapHTMLClasses(section.cleanHTML, section.classNames);

  const content = `/**
 * ${fileName} — ${adminLabel} Section (S${section.index + 1})
 *
 * AUTO-GENERATED by scaffold-builder.js — review and customize before pushing.
 * Source: ${pageName}.html line ${section.startLine}
 *${svgNote}${extSummary}
 * Original classes: ${section.classNames.slice(0, 5).join(', ')}${section.classNames.length > 5 ? ` (+${section.classNames.length - 5} more)` : ''}
 */
${templateHint}
const base = require('../../lib/templates/_base');${hasSuperD ? `\nconst superD = require('../../lib/super-d');` : ''}

const P = '${section.prefix}'; // CSS prefix — customize if needed

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = \`
    ${escapeForTemplate(remappedHTML).replace(/\n/g, '\n    ')}\`;

  return base.wrapInDiviSection('${adminLabel}', html, '${adminLabel}: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return \`
/* === ${adminLabel.toUpperCase()} (S${section.index + 1}) === */
/* Divi 5 section boilerplate (font-smoothing, p padding, heading resets) */
.\${P}-section{position:relative;overflow:hidden;\${base.fontSmoothingReset(P)}font-size:16px}
.\${P}-section p{padding-bottom:0;line-height:1.6}
.\${P}-section h2,.\${P}-section h3,.\${P}-section h4{margin:0;padding:0}
${escapeForTemplate(cssBody)}
${extReportEscaped}
${hasSuperD ? superDCSSLine : ''}
${hasList ? `\${base.diviListReset(P)}` : ''}
${hasTransition ? `\${base.reducedMotion('*{animation:none !important;transition:none !important}')}` : ''}
\`.trim();
}

module.exports = { blocks, css };
`;

  if (DRY_RUN) {
    console.log(`  ⊙ Would write: ${fileName} (${content.length} chars)`);
  } else {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Generated: ${fileName} (${content.length} chars)`);
  }

  generatedSections.push({ name: section.name, fileName, skipped: false });
});

// ════════════════════════════════════════════════════════════════
// GENERATE PAGE CONFIG
// ════════════════════════════════════════════════════════════════
const configFileName = `${pageName}.js`;
const configFilePath = path.join(PAGES_DIR, configFileName);

if (fs.existsSync(configFilePath) && !FORCE) {
  console.log(`\n  ⊘ Skipping ${configFileName} (exists, use --force to overwrite)`);
} else {
  // Generate require statements
  const requires = generatedSections.map(s => {
    const varName = s.name
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      + 'Builder';
    return { varName, path: `./sections/${pageName}-${s.name}` };
  });

  const requireLines = requires.map(r =>
    `const ${r.varName} = require('${r.path}');`
  ).join('\n');

  const sectionEntries = requires.map((r, i) =>
    `    { name: '${sectionData[i].name}', builder: ${r.varName} },`
  ).join('\n');

  const verifyEntries = sectionData.map((s, i) => {
    // Use section's CSS prefix as the WP selector (matches remapped output)
    const wpSel = `.${s.prefix}-section`;
    const htmlSel = s.className
      ? `.${s.className.split(/\s+/)[0]}`
      : `main > section:nth-child(${i + 1})`;

    // Build styleMap from detected elements
    const styleMapEntries = [];
    // Always add section title if h2 exists
    if (/<h2\b/i.test(s.innerHTML)) {
      styleMapEntries.push(`          { label: 'Section Title', htmlSel: '${htmlSel} h2', wpSel: '${wpSel} h2' }`);
    }
    if (/<h3\b/i.test(s.innerHTML)) {
      styleMapEntries.push(`          { label: 'Subtitle/H3', htmlSel: '${htmlSel} h3', wpSel: '${wpSel} h3' }`);
    }
    // Detect buttons/CTAs
    if (/class="[^"]*btn|class="[^"]*cta/i.test(s.innerHTML)) {
      styleMapEntries.push(`          { label: 'Button/CTA', htmlSel: '${htmlSel} a[class*="btn"], ${htmlSel} a[class*="cta"]', wpSel: '${wpSel} a[class*="btn"], ${wpSel} a[class*="cta"]' }`);
    }
    // Detect stat numbers
    if (/data-target|class="[^"]*stat|class="[^"]*number/i.test(s.innerHTML)) {
      styleMapEntries.push(`          { label: 'Stat Number', htmlSel: '${htmlSel} [data-target]', wpSel: '${wpSel} [data-target]' }`);
    }
    // Fallback: at least one entry
    if (styleMapEntries.length === 0) {
      styleMapEntries.push(`          { label: 'Section Title', htmlSel: '${htmlSel} h2', wpSel: '${wpSel} h2' }`);
    }

    return `      {
        name: '${s.name}', wpSelector: '${wpSel}', htmlSelector: '${htmlSel}',
        pixelThreshold: 0.1,
        styleMap: [
${styleMapEntries.join(',\n')},
        ],
      },`;
  }).join('\n');

  const configContent = `/**
 * ${configFileName} — ${pageName} page config for build-page.js
 *
 * AUTO-GENERATED by scaffold-builder.js — review before pushing.
 * Sections: ${sectionData.length}
 *
 * Usage: node complete_website/divi5/build-page.js --page ${pageName} [--dry-run]
 */

const path = require('path');

// Section builders
${requireLines}

module.exports = {
  pageId: 0, // TODO: Create WP page and set page ID
  title: '${pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_${pageName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', '${protoArg || pageName + '.html'}'),
  protoFile: '${protoArg || pageName + '.html'}',

  sections: [
${sectionEntries}
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=0', // TODO: Set page ID
    sections: [
${verifyEntries}
    ],
  },
};
`;

  if (DRY_RUN) {
    console.log(`\n  ⊙ Would write: ${configFileName} (${configContent.length} chars)`);
  } else {
    fs.writeFileSync(configFilePath, configContent);
    console.log(`\n  ✓ Generated: ${configFileName} (${configContent.length} chars)`);
  }
}

// ════════════════════════════════════════════════════════════════
// SUMMARY
// ════════════════════════════════════════════════════════════════
const created = generatedSections.filter(s => !s.skipped).length;
const skipped = generatedSections.filter(s => s.skipped).length;

console.log(`\n▸ Done!`);
console.log(`  Created: ${created} section builders${DRY_RUN ? ' (dry-run)' : ''}`);
if (skipped) console.log(`  Skipped: ${skipped} (already exist)`);
console.log(`\n  Next steps:`);
console.log(`  1. Review generated files — search for TODO comments`);
console.log(`  2. Remap class selectors to use CSS prefix (P variable)`);
console.log(`  3. Extract SVGs into Base64 JS injection where needed`);
console.log(`  4. Set pageId in ${configFileName} after creating WP page`);
console.log(`  5. Build: node complete_website/divi5/build-page.js --page ${pageName} --dry-run`);
