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
 *   - Touch styles.css (only extracts from inline <style> blocks)
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

const protoPath = path.join(COMPLETE_DIR, `${pageName}.html`);
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
// MAIN
// ════════════════════════════════════════════════════════════════
const styleBlock = extractStyleBlock(html);
const sections = extractSections(html);

if (sections.length === 0) {
  console.error('  ✗ No sections found in <main>. Cannot scaffold.');
  process.exit(1);
}

console.log(`  Found ${sections.length} sections`);
console.log(`  Style block: ${styleBlock.length} chars`);

// Derive section names and extract CSS
const sectionData = sections.map(section => {
  const name = deriveSectionName(section, pageName);
  const classNames = extractClassNames(section.outerHTML);
  const { rules, mediaQueries } = extractMatchingCSS(styleBlock, classNames);
  const prefix = generatePrefix(name);

  return {
    ...section,
    name,
    prefix,
    classNames,
    cssRules: rules,
    cssMediaQueries: mediaQueries,
    cleanHTML: cleanInnerHTML(section.innerHTML),
  };
});

// Deduplicate section names (e.g. two "reality" sections → "reality", "reality-2")
deduplicateNames(sectionData);

console.log('\n  Sections:');
sectionData.forEach((s, i) => {
  console.log(`    ${i}: ${s.name} (${s.classNames.length} classes, ${s.cssRules.length} rules, line ${s.startLine})`);
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
  const hasTransition = /transition/i.test(section.cssRules.join(''));

  // Build CSS string from extracted rules
  const cssBody = [...section.cssRules, ...section.cssMediaQueries]
    .join('\n')
    .trim();

  // Detect SVGs that need script injection (wp_kses strips <text> etc.)
  const hasSVG = /<svg\b/i.test(section.cleanHTML);
  const svgNote = hasSVG ? '\n// NOTE: Contains inline SVGs — may need Base64 JS injection if wp_kses strips elements.' : '';

  const content = `/**
 * ${fileName} — ${adminLabel} Section (S${section.index + 1})
 *
 * AUTO-GENERATED by scaffold-builder.js — review and customize before pushing.
 * Source: ${pageName}.html line ${section.startLine}
 *${svgNote}
 * Original classes: ${section.classNames.slice(0, 5).join(', ')}${section.classNames.length > 5 ? ` (+${section.classNames.length - 5} more)` : ''}
 */

const base = require('../../lib/templates/_base');

const P = '${section.prefix}'; // CSS prefix — customize if needed

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = \`
    ${escapeForTemplate(section.cleanHTML).replace(/\n/g, '\n    ')}\`;

  return base.wrapInDiviSection('${adminLabel}', html, '${adminLabel}: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return \`
/* === ${adminLabel.toUpperCase()} (S${section.index + 1}) === */
/* TODO: Review and remap class selectors to use \\\${P} prefix */
/* TODO: Add section container: .\\\${P}-section{...;\\\${base.fontSmoothingReset(P)}font-size:16px} */
${escapeForTemplate(cssBody)}
${hasList ? `\\\${base.diviListReset(P)}` : ''}
${hasTransition ? `\\\${base.reducedMotion(\\\`\\\`)}` : ''}
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
    const wpSel = `.et_pb_section_${i}`;
    const htmlSel = s.className
      ? `.${s.className.split(/\s+/)[0]}`
      : `main > section:nth-child(${i + 1})`;
    return `      {
        name: '${s.name}', wpSelector: '${wpSel}', htmlSelector: '${htmlSel}',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '${htmlSel} h2', wpSel: '${wpSel} h2' },
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
  prototypePath: path.join(__dirname, '..', '..', '${pageName}.html'),
  protoFile: '${pageName}.html',

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
