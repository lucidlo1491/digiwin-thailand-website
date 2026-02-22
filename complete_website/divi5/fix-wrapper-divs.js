#!/usr/bin/env node
/**
 * fix-wrapper-divs.js — Add missing section wrapper <div> to scaffold-generated files.
 *
 * Problem: scaffold-builder.js extracts innerHTML from <section class="X"> but drops
 * the <section> element itself. CSS like .X{background:...;padding:...} has no matching
 * element in the Divi output.
 *
 * Solution: Read the "Original classes:" comment to find the section's primary class,
 * then wrap the HTML in blocks() with <div class="that-class">.
 *
 * Usage: node divi5/fix-wrapper-divs.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SECTIONS_DIR = path.join(__dirname, 'pages/sections');

// Pages that were scaffold-generated (batch build)
const SCAFFOLD_PREFIXES = [
  'erp-', 'case-studies-', 'about-', 'industries-',
  'mes-', 'automotive-', 'wms-', 'aiot-', 'electronics-'
];

const files = fs.readdirSync(SECTIONS_DIR)
  .filter(f => f.endsWith('.js') && SCAFFOLD_PREFIXES.some(p => f.startsWith(p)));

let fixed = 0, skipped = 0, alreadyOk = 0;

for (const file of files) {
  const filePath = path.join(SECTIONS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Step 1: Extract the section wrapper class from "Original classes:" comment
  const origMatch = content.match(/\* Original classes: ([a-zA-Z][\w-]*)/);
  if (!origMatch) {
    console.log(`  ⚠ ${file}: No "Original classes:" found — SKIP`);
    skipped++;
    continue;
  }

  const wrapperClass = origMatch[1];

  // Skip generic classes that aren't real section wrappers
  if (['dw-section', 'weapon-card', 'dw-nav'].includes(wrapperClass)) {
    console.log(`  ⚠ ${file}: Generic class "${wrapperClass}" — SKIP (needs manual review)`);
    skipped++;
    continue;
  }

  // Step 2: Check if HTML already has the wrapper div
  if (content.includes(`<div class="${wrapperClass}">`) || content.includes(`<div class="${wrapperClass} `)) {
    console.log(`  ✓ ${file}: Already has wrapper .${wrapperClass}`);
    alreadyOk++;
    continue;
  }

  // Step 3: Add the wrapper div around the HTML content in blocks()
  // Find: const html = `\n    CONTENT`;
  const htmlStartPattern = "const html = `\n";
  const htmlStartIdx = content.indexOf(htmlStartPattern);
  if (htmlStartIdx === -1) {
    console.log(`  ⚠ ${file}: Can't find "const html = \`" — SKIP`);
    skipped++;
    continue;
  }

  const afterStart = htmlStartIdx + htmlStartPattern.length;

  // Find the closing backtick — scan forward, handling ${} expressions
  let closingIdx = -1;
  for (let i = afterStart; i < content.length; i++) {
    if (content[i] === '`' && content[i - 1] !== '\\') {
      closingIdx = i;
      break;
    }
    if (content[i] === '$' && content[i + 1] === '{') {
      let braceDepth = 1;
      i += 2;
      while (i < content.length && braceDepth > 0) {
        if (content[i] === '{') braceDepth++;
        else if (content[i] === '}') braceDepth--;
        else if (content[i] === '`') {
          i++;
          while (i < content.length && content[i] !== '`') {
            if (content[i] === '\\') i++;
            i++;
          }
        }
        i++;
      }
      i--;
    }
  }

  if (closingIdx === -1) {
    console.log(`  ⚠ ${file}: Can't find closing backtick — SKIP`);
    skipped++;
    continue;
  }

  // Get the HTML content between the backticks
  const htmlContent = content.substring(afterStart, closingIdx);

  // Detect indentation from first non-empty line
  const firstLine = htmlContent.split('\n').find(l => l.trim().length > 0);
  const indent = firstLine ? firstLine.match(/^(\s*)/)[1] : '    ';

  // Build new content with wrapper
  const newHtml = `${indent}<div class="${wrapperClass}">\n` +
    htmlContent.trimEnd() +
    `\n${indent}</div>\n${indent}`;

  const newContent = content.substring(0, afterStart) + newHtml + content.substring(closingIdx);

  if (DRY_RUN) {
    console.log(`  → ${file}: Would add wrapper .${wrapperClass}`);
  } else {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  ✓ ${file}: Added wrapper .${wrapperClass}`);
  }
  fixed++;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Summary: ${fixed} fixed, ${alreadyOk} already ok, ${skipped} skipped (${files.length} total)`);
if (skipped > 0) {
  console.log('  Note: Skipped files need manual review (generic classes like dw-section)');
}
