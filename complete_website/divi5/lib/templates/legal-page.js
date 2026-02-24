/**
 * legal-page.js — Legal page template for Divi 5
 *
 * For simple single-section pages (Privacy Policy, Terms of Service).
 * Reads HTML prototype at build time, extracts content from <main>,
 * wraps in a single Divi section.
 *
 * Usage: Each legal page config calls pageConfig() with slug, protoFile, pageId.
 */

const fs = require('fs');
const path = require('path');
const base = require('./_base');

// CSS to extract from styles.css for legal pages
let _legalCSS = null;

function getLegalBaseCSS() {
  if (_legalCSS) return _legalCSS;

  const stylesPath = path.join(__dirname, '..', '..', '..', 'styles.css');
  const css = fs.readFileSync(stylesPath, 'utf8');

  // Extract .dw-section and .dw-container rules
  const prefixes = ['.dw-section', '.dw-container'];
  const excludes = ['dw-section-scene', 'dw-section-header', 'dw-section-label', 'dw-section-title', 'dw-section-subtitle'];

  const lines = css.split('\n');
  const rules = [];
  let inRule = false;
  let braceDepth = 0;
  let currentRule = [];

  for (const line of lines) {
    if (!inRule) {
      const trimmed = line.trim();
      if (trimmed.startsWith('.')) {
        const isMatch = prefixes.some(p => trimmed.startsWith(p));
        const isExcluded = excludes.some(e => trimmed.includes(e));
        if (isMatch && !isExcluded) {
          inRule = true;
          currentRule = [line];
          braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
          if (braceDepth <= 0) {
            rules.push(currentRule.join('\n'));
            inRule = false;
            currentRule = [];
          }
          continue;
        }
      }
    } else {
      currentRule.push(line);
      braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      if (braceDepth <= 0) {
        rules.push(currentRule.join('\n'));
        inRule = false;
        currentRule = [];
      }
    }
  }

  _legalCSS = rules.join('\n');
  return _legalCSS;
}

const DIVI_OVERRIDES = `
/* Divi section-level overrides for legal pages */
.et_pb_section { padding: 0 !important; min-height: auto !important; margin: 0 !important; text-align: start !important; }
.et_pb_section .et_pb_row { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 auto !important; }
.et_pb_section .et_pb_column { padding: 0 !important; }
.et_pb_section, .et_pb_section * { -webkit-font-smoothing: auto !important; -moz-osx-font-smoothing: auto !important; }
.et_pb_section p { padding-bottom: 0 !important; }
.fade-in { opacity: 1 !important; transform: none !important; }
:root { --dw-blue-text: #0369a1; --dw-gray-light: #F5F7FA; --dw-navy: #000864; }
`.trim();

function extractMain(html) {
  const mainStart = html.match(/<main[^>]*>/);
  if (!mainStart) throw new Error('legal-page: No <main> tag found');
  const startIdx = html.indexOf(mainStart[0]) + mainStart[0].length;
  const endIdx = html.indexOf('</main>');
  if (endIdx === -1) throw new Error('legal-page: No </main> tag found');
  return html.substring(startIdx, endIdx).trim();
}

function pageConfig(data, opts) {
  const html = fs.readFileSync(data.protoFile, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const pageTitle = data.title || (titleMatch ? titleMatch[1].replace(/ - DigiWin Thailand$/, '') : data.slug);
  const mainContent = extractMain(html);

  const contentBuilder = {
    blocks: () => base.wrapInDiviSection(`${pageTitle}: Content`, mainContent, 'Legal Content'),
    css: () => `
/* === LEGAL PAGE: ${pageTitle.toUpperCase()} === */
${DIVI_OVERRIDES}

${getLegalBaseCSS()}
`.trim(),
  };

  return {
    pageId: opts.pageId,
    title: pageTitle,
    siteUrl: 'https://digiwin-thailand.local',
    protoFile: `${data.slug}.html`,

    sections: [
      { name: `${data.prefix}-content`, builder: contentBuilder },
    ],

    editabilityRules: {
      bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
      maxHtmlBlocks: 3,
    },

    verify: {
      wpUrl: `https://digiwin-thailand.local/?page_id=${opts.pageId}`,
      sections: [
        {
          name: `${data.prefix}-content`,
          wpSelector: '.et_pb_section_0',
          htmlSelector: '.dw-section',
          pixelThreshold: 0.1,
          styleMap: [{ label: 'H1', htmlSel: '.dw-section h1', wpSel: '.et_pb_section_0 h1' }],
        },
      ],
    },
  };
}

const schema = {
  description: 'Legal page template — single-section content (Privacy Policy, Terms)',
  category: 'legal',
};

module.exports = { pageConfig, schema };
