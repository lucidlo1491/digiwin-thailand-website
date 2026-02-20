/**
 * result-cards.js — Case study / proven results card grid
 *
 * Light background section with centered header, 2-column result cards,
 * and a CTA link. Each card shows company name, key metric, and detail.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,
 *   background?: string,            // default: '#F5F7FA'
 *   header: { label, title, subtitle },
 *   cards: [{ company, metric, detail }],
 *   cta?: { text, href },
 *   gridMaxWidth?: string,          // default: '900px'
 * }
 */

const base = require('./_base');

const schema = {
  name: 'result-cards',
  description: 'Light case study / result cards with company label, metric, and detail',
  category: 'DigiWin Templates',
};

function blocks(data) {
  const p = data.sectionPrefix;

  const cardsHTML = data.cards.map(r => `
    <div class="${p}-card">
      <div class="${p}-company">${r.company}</div>
      <div class="${p}-metric">${r.metric}</div>
      <p class="${p}-detail">${r.detail}</p>
    </div>
  `).join('');

  const ctaHTML = data.cta
    ? `<div class="${p}-cta"><a href="${data.cta.href}" class="${p}-link">${data.cta.text}</a></div>`
    : '';

  const html = `
    <div class="${p}-section">
    <div class="${p}-container">
      ${base.sectionHeaderHTML(p, data.header)}
      <div class="${p}-grid">
        ${cardsHTML}
      </div>
      ${ctaHTML}
    </div>
    </div>`;

  return base.wrapInDiviSection(data.adminLabel, html, `${data.adminLabel}: Content`);
}

function css(data) {
  const p = data.sectionPrefix;
  const bg = data.background || base.COLORS.grayLight;
  const maxW = data.gridMaxWidth || '900px';
  const cols = data.cards.length <= 2 ? 2 : 3;

  return `
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{background:${bg};padding:80px 40px;${base.fontSmoothingReset(p)}font-size:16px}
.${p}-container{max-width:1200px;margin:0 auto}
${base.sectionHeaderCSS(p, { dark: false, headerMaxWidth: '700px', headerMarginBottom: '48px' })}
/* Label lines removed — uses plain label (no ::before/::after flanking lines) */
.${p}-header-label::before,.${p}-header-label::after{display:none}
.${p}-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;color:#0369a1;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;line-height:1.6}
.${p}-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:32px;max-width:${maxW};margin:0 auto}
.${p}-card{background:#fff;border-radius:16px;padding:36px 32px;border:1px solid #e2e8f0;transition:all 0.2s ease;line-height:1.6}
.${p}-card:hover{box-shadow:0 8px 32px rgba(0,8,100,0.08);transform:translateY(-2px)}
.${p}-company{font-family:'JetBrains Mono',monospace;font-size:11px;color:${base.COLORS.blue};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px}
.${p}-metric{font-family:'Noto Sans',sans-serif;font-weight:600;font-size:20px;color:${base.COLORS.navy};line-height:1.4;margin-bottom:8px}
.${p}-detail{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:14px;color:#5b6b80;line-height:1.5;margin:0}
.${p}-cta{text-align:center;margin-top:40px}
.${p}-link{font-family:'Noto Sans',sans-serif;font-weight:600;font-size:14px;color:${base.COLORS.blue};text-decoration:none;transition:color 0.3s ease;line-height:1.6}
.${p}-link:hover{color:${base.COLORS.royal}}
@media(max-width:767px){.${p}-grid{grid-template-columns:1fr;gap:24px}.${p}-card{padding:28px 24px}.${p}-metric{font-size:18px}}
${base.reducedMotion(`.${p}-card{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css, schema };
