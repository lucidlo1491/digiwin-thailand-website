#!/usr/bin/env node
/**
 * generate-preview.js — Generates a standalone HTML preview of the homepage
 * No WordPress needed — open the output file in any browser.
 */

const fs = require('fs');
const path = require('path');
const home = require('./pages/home');
const cssLib = require('./lib/css-assembler');

let allHTML = '';
let allCSS = [];
let allScripts = '';

for (const section of home.sections) {
  const blocks = section.builder.blocks();
  allHTML += `\n<!-- ========== ${section.name.toUpperCase()} ========== -->\n<section class="preview-section" data-section="${section.name}">\n`;

  for (const block of blocks) {
    // Extract HTML from wp:divi/code blocks
    const codeMatch = block.match(/wp:divi\/code.*?"value":"([\s\S]*?)"\}\}/);
    if (codeMatch) {
      let html = codeMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      allHTML += html + '\n';
    }

    // Extract HTML from wp:divi/text blocks
    const textMatch = block.match(/wp:divi\/text.*?"value":"([\s\S]*?)"\}\}/);
    if (textMatch) {
      let html = textMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      allHTML += `<div class="text-module">${html}</div>\n`;
    }

    // Extract from wp:html blocks (hero SVGs, scripts)
    if (block.includes('wp:html') && !block.includes('/wp:html')) {
      const htmlMatch = block.match(/-->\n([\s\S]*)$/);
      if (htmlMatch) {
        const content = htmlMatch[1].trim();
        if (content.startsWith('<script')) {
          allScripts += content + '\n';
        } else {
          allHTML += content + '\n';
        }
      }
    }
  }

  allHTML += '</section>\n';
  allCSS.push(section.builder.css());
}

const css = cssLib.assemble(allCSS);

// Get page JS from hero
let pageJS = '';
if (typeof home.pageJS === 'function') {
  pageJS = home.pageJS();
}

const preview = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homepage Preview — DigiWin Thailand</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* Reset */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Noto Sans', sans-serif; color: #333; background: #fff; }
    img { max-width: 100%; height: auto; }
    a { color: inherit; }

    /* Preview section wrapper */
    .preview-section { position: relative; overflow: hidden; }
    .preview-section[data-section="hero"] { /* hero needs its own bg */ }
    .preview-section[data-section="factory-checks"] { background: linear-gradient(165deg, #f8fafc 0%, #f1f5f9 100%); padding: 100px 40px; }
    .preview-section[data-section="partner-checks"] { background: linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%); padding: 100px 40px; }
    .preview-section[data-section="logo-bar"] { background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); padding: 80px 40px; }
    .preview-section[data-section="product-pillars"] { background: #fff; padding: 100px 40px; }
    .preview-section[data-section="industry-tabs"] { background: #fff; padding: 80px 40px; }
    .preview-section[data-section="stats-banner"] { background: linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%); padding: 100px 40px; }
    .preview-section[data-section="trust-anchors"] { background: #fff; padding: 100px 40px; }
    .preview-section[data-section="proven-results"] { background: #f8fafc; padding: 100px 40px; }
    .preview-section[data-section="final-cta"] { background: linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #000864 100%); padding: 100px 40px; }

    /* Section CSS from builders */
    ${css}
  </style>
</head>
<body>
  ${allHTML}
  ${allScripts}
  ${pageJS ? `<script>${pageJS}</script>` : ''}
</body>
</html>`;

const outPath = path.join(__dirname, '..', '..', 'preview', 'homepage-divi5.html');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, preview);

const sectionCount = home.sections.length;
console.log(`Preview generated: ${outPath}`);
console.log(`  ${sectionCount} sections | ${css.length} chars CSS | ${allHTML.length} chars HTML`);
