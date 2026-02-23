#!/usr/bin/env node
/**
 * status.js — Cross-Page Fidelity Dashboard
 *
 * Reads all page configs + .convergence/ baselines to show site-wide visual fidelity status.
 * No MySQL, no Puppeteer, no network. Runs in <1s.
 *
 * Usage: node complete_website/divi5/status.js
 */

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, 'pages');
const CONVERGENCE_DIR = path.join(__dirname, '.convergence');

// Discover all page configs
const pageFiles = fs.readdirSync(PAGES_DIR)
  .filter(f => f.endsWith('.js') && !f.startsWith('sections'));

const c = { g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', d: '\x1b[2m', b: '\x1b[1m', x: '\x1b[0m' };

console.log(`\n${c.b}━━━ Divi 5 Site Status ━━━${c.x}\n`);
console.log(`${'Page'.padEnd(22)} ${'ID'.padEnd(8)} ${'Sections'.padEnd(10)} ${'MATCH'.padEnd(7)} ${'REVIEW'.padEnd(8)} ${'FAIL'.padEnd(6)} Status`);
console.log('─'.repeat(78));

let totalPages = 0, baselined = 0, passCount = 0, reviewCount = 0, failCount = 0;

for (const file of pageFiles.sort()) {
  const pageName = file.replace('.js', '');
  totalPages++;

  let pageId = '?';
  let sectionCount = '?';
  try {
    // Read config without requiring (avoids loading section builders)
    const src = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
    const idMatch = src.match(/pageId:\s*(\d+)/);
    if (idMatch) pageId = idMatch[1];
    // Count sections: first `sections: [` block's `name:` entries
    const sectionsStart = src.indexOf('sections: [');
    if (sectionsStart !== -1) {
      // Find balanced bracket end
      let depth = 0, started = false;
      let end = sectionsStart;
      for (let i = sectionsStart; i < src.length; i++) {
        if (src[i] === '[') { depth++; started = true; }
        if (src[i] === ']') { depth--; if (started && depth === 0) { end = i; break; } }
      }
      const block = src.slice(sectionsStart, end);
      const nameCount = (block.match(/name:\s*['"]/g) || []).length;
      if (nameCount > 0) sectionCount = nameCount;
    }
  } catch (_) { /* skip */ }

  // Read baseline if exists
  const baselinePath = path.join(CONVERGENCE_DIR, `${pageName}-baseline.json`);
  if (!fs.existsSync(baselinePath)) {
    console.log(`${pageName.padEnd(22)} ${String(pageId).padEnd(8)} ${String(sectionCount).padEnd(10)} ${c.d}—${c.x}${' '.repeat(6)}${c.d}—${c.x}${' '.repeat(7)}${c.d}—${c.x}${' '.repeat(5)}${c.d}NO BASELINE${c.x}`);
    continue;
  }

  baselined++;
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const sections = baseline.sections || {};
  const entries = Object.entries(sections).filter(([name]) => name !== 'fullpage');

  const match = entries.filter(([, v]) => v.verdict === 'MATCH').length;
  const review = entries.filter(([, v]) => v.verdict === 'REVIEW').length;
  const fail = entries.filter(([, v]) => v.verdict === 'FAIL').length;

  let status, color;
  if (fail === 0 && review === 0) { status = 'PASS'; color = c.g; passCount++; }
  else if (fail === 0) { status = 'REVIEW'; color = c.y; reviewCount++; }
  else { status = 'FAIL'; color = c.r; failCount++; }

  console.log(
    `${pageName.padEnd(22)} ${String(pageId).padEnd(8)} ${String(entries.length).padEnd(10)} ` +
    `${String(match).padEnd(7)} ${String(review).padEnd(8)} ${String(fail).padEnd(6)} ` +
    `${color}${status}${c.x}`
  );
}

console.log('─'.repeat(78));
console.log(`${c.b}${totalPages} pages${c.x} | ${baselined} baselined | ${c.g}${passCount} PASS${c.x} | ${c.y}${reviewCount} REVIEW${c.x} | ${c.r}${failCount} FAIL${c.x} | ${totalPages - baselined} no baseline\n`);
