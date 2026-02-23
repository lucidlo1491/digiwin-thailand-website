/**
 * related-solutions.js — "Explore Related Solutions" cross-link grid template
 *
 * Used by: ERP, MES, WMS, AIoT, Automotive, Electronics, Metal & Plastics pages
 *
 * Data shape:
 * {
 *   adminLabel?: string,         // VB label (default 'Related Solutions')
 *   sectionPrefix: string,       // CSS prefix (unique per page, e.g. 'erp-related')
 *   heading?: string,            // default 'Explore Related Solutions'
 *   cards: [{ title, href, desc }],
 * }
 */

const { htmlBlock, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../modules');

const schema = {
  description: 'Cross-link grid of related product/industry pages',
  category: 'navigation',
};

function blocks(data) {
  const P = data.sectionPrefix;
  const heading = data.heading || 'Explore Related Solutions';

  const cardsHTML = data.cards.map(c => `
      <a href="${c.href}" class="${P}-card">
        <h3 class="${P}-card-title">${c.title}</h3>
        <p class="${P}-card-desc">${c.desc}</p>
      </a>`).join('');

  const html = `<div class="${P}-section">
    <h2 class="${P}-heading">${heading}</h2>
    <div class="${P}-grid">${cardsHTML}
    </div>
  </div>`;

  return [
    sectionOpen(),
    rowOpen(),
    columnOpen(),
    htmlBlock(html),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css(data) {
  const P = data.sectionPrefix;
  return `
.et_pb_section:has(.${P}-section){background:#F5F7FA;padding:0}
.${P}-section{padding:60px 5%;background:#F5F7FA;max-width:100%;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}
.${P}-heading{font-family:'Noto Sans',sans-serif;font-size:28px;font-weight:600;color:#000864;margin:0 0 32px 0;padding:0;text-align:center;line-height:1.6;-webkit-font-smoothing:auto}
.${P}-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:1200px;margin:0 auto}
.${P}-card{display:block;padding:24px;background:#fff;border-radius:12px;text-decoration:none;border:1px solid #e5e7eb;transition:box-shadow 0.3s ease;color:#333;line-height:1.6}
.${P}-card:hover{box-shadow:0 8px 24px rgba(0,8,100,0.1)}
.${P}-card-title{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:600;color:#000864;margin:0 0 8px 0;padding:0;line-height:1.6;-webkit-font-smoothing:auto}
.${P}-card-desc{font-family:'Noto Sans',sans-serif;font-size:14px;color:#666;margin:0;padding:0;line-height:1.5;-webkit-font-smoothing:auto}
@media(prefers-reduced-motion:reduce){.${P}-card{transition:none}}`;
}

module.exports = { blocks, css, schema };
