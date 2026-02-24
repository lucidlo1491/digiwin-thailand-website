#!/usr/bin/env node
/**
 * fix-commented-css.js — Uncomment CSS rules in scaffold-generated section files.
 *
 * Problem: scaffold-builder.js puts all section CSS as commented-out reference rules.
 * The css() function emits no active CSS for these classes,
 * so the HTML elements have no styling in Divi.
 *
 * Solution: Find commented CSS rules that match the section's own classes (from the
 * "Original classes:" comment), and uncomment them.
 *
 * Usage: node divi5/fix-commented-css.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SECTIONS_DIR = path.join(__dirname, 'pages/sections');

const SCAFFOLD_PREFIXES = [
  'erp-', 'case-studies-', 'about-', 'industries-',
  'mes-', 'automotive-', 'wms-', 'aiot-', 'electronics-',
  'metal-plastics-'
];

// Global/navigation classes — never uncomment these (they come from header/footer)
const SKIP_CLASSES = new Set([
  'dw-nav', 'dw-nav-item', 'dw-nav-link', 'dw-mega-menu', 'dw-mega-inner',
  'dw-mega-column', 'dw-mega-item', 'dw-mega-icon', 'dw-mega-title',
  'dw-mega-desc', 'dw-mega-viewall', 'dw-mega-featured', 'dw-mega-column-title',
  'dw-menu-toggle', 'dw-header-inner', 'dw-header-cta', 'dw-logo-img',
  'dw-main', 'dw-hero-split', 'dw-hero-panel', 'dw-section',
  'dw-grid-2', 'dw-grid-3', 'dw-grid-4', 'dw-stats-grid',
  'dw-footer-grid', 'dw-footer-brand', 'dw-footer-bottom',
  'dw-btn', 'dw-d-bg', 'dw-d-parallax', 'dw-wave-flow', 'dw-wave-fade',
  'blog-hub-filter-tab', 'event-register-success',
]);

const files = fs.readdirSync(SECTIONS_DIR)
  .filter(f => f.endsWith('.js') && SCAFFOLD_PREFIXES.some(p => f.startsWith(p)));

let totalUncommented = 0;
let filesModified = 0;

for (const file of files) {
  const filePath = path.join(SECTIONS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Get the section's own classes from "Original classes:" comment
  const origMatch = content.match(/\* Original classes: (.+?)(?:\s+\(\+\d+ more\))?\s*$/m);
  if (!origMatch) continue;

  const sectionClasses = new Set(
    origMatch[1].split(/,\s*/).map(c => c.trim()).filter(c => c && !c.startsWith('dw-'))
  );

  // Find all commented CSS rules: /* .class{...} */ or /* .class .child{...} */
  // Match multi-line comments that contain CSS rules
  const commentRegex = /\/\*\s*((?:\.[a-zA-Z][\w-]*(?:\s*[,>+~]\s*\.[a-zA-Z][\w-]*)*(?:::?[a-zA-Z-]+)?(?:\.[a-zA-Z][\w-]*)*\s*\{[^}]+\}\s*)+)\*\//g;

  let count = 0;
  let newContent = content;

  // Simpler approach: find /* ... */ blocks in the CSS section and check if they contain our classes
  const cssStart = content.indexOf('function css()');
  if (cssStart === -1) continue;

  const cssSection = content.substring(cssStart);

  // Find all /* ... */ comments in the CSS function
  const singleRuleRegex = /\/\*\s*(\.[a-zA-Z][\w-]*(?:[^*]|\*(?!\/))*?\{[^}]*\})\s*\*\//g;

  let match;
  const replacements = [];

  // Reset to work on full content
  const allCommentRegex = /\/\*\s*((?:@media[^{]*\{[^}]*(?:\{[^}]*\}[^}]*)*\}|\.[\w-][^*]*?\{[^}]*?\}))\s*\*\//g;

  // Simpler: just find lines that are /* .something{...} */ and check if .something is our class
  const lines = content.split('\n');
  const newLines = [];
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line is a commented CSS rule
    const commentMatch = line.match(/^(\s*)\/\*\s*(\.[a-zA-Z][\w-].*?\{.*\})\s*\*\/\s*$/);
    if (commentMatch) {
      const indent = commentMatch[1];
      const cssRule = commentMatch[2];

      // Extract the first class from the rule
      const classesInRule = [...cssRule.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]);

      // Check if ANY class in this rule belongs to our section's classes
      const isOurRule = classesInRule.some(c => sectionClasses.has(c));
      const isSkipRule = classesInRule.some(c => SKIP_CLASSES.has(c));

      // Also check for @media rules
      const isMediaRule = line.includes('@media');

      if (isOurRule && !isSkipRule && !isMediaRule) {
        // Uncomment this rule
        newLines.push(indent + cssRule);
        count++;
        modified = true;
        continue;
      }
    }

    // Check for multi-line commented @media blocks that reference our classes
    // Pattern: /* @media (...){...} */
    const mediaMatch = line.match(/^(\s*)\/\*\s*(@media\s*\([^)]+\)\s*\{.*)/);
    if (mediaMatch) {
      // Collect the full comment block
      let block = line;
      let j = i;
      while (!block.includes('*/') && j < lines.length - 1) {
        j++;
        block += '\n' + lines[j];
      }

      // Check if this media block references our section classes
      const classesInBlock = [...block.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(m => m[1]);
      const hasOurClass = classesInBlock.some(c => sectionClasses.has(c));
      const hasSkipClass = classesInBlock.some(c => SKIP_CLASSES.has(c));

      if (hasOurClass && !hasSkipClass) {
        // Uncomment the block
        const uncommented = block
          .replace(/^(\s*)\/\*\s*/, '$1')
          .replace(/\s*\*\/\s*$/, '');
        newLines.push(uncommented);
        count++;
        modified = true;
        i = j; // Skip lines we consumed
        continue;
      }
    }

    newLines.push(line);
  }

  if (modified) {
    const result = newLines.join('\n');
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, result, 'utf8');
    }
    console.log(`  ${DRY_RUN ? '→' : '✓'} ${file}: ${count} rules uncommented (classes: ${[...sectionClasses].slice(0, 5).join(', ')}${sectionClasses.size > 5 ? '...' : ''})`);
    totalUncommented += count;
    filesModified++;
  }
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Summary: ${totalUncommented} rules uncommented in ${filesModified} files`);
