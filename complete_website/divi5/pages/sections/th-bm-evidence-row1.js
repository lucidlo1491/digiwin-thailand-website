/**
 * th-bm-evidence-row1.js — Thai Evidence Row 1 (S3) — DEEP-MERGE
 *
 * bm-evidence.js exports evidenceRow1/Row2 sub-builders with zero-arg blocks().
 * Must copy blocks() with Thai card data. CSS from English sharedCSS.
 */

const base = require('../../lib/templates/_base');
const en = require('./bm-evidence');
const th = require('../../i18n/th/partner-business-model');

const P = 'math'; // CSS prefix — same as English

// Merge Thai text into each card (icons from English)
const ROW1_CARDS = en.ROW1_CARDS.map((card, i) => ({
  ...card,
  title: th.evidenceRow1.cards[i].title,
  body: th.evidenceRow1.cards[i].body,
  formula: th.evidenceRow1.cards[i].formula,
}));

function buildCardHTML(card) {
  return `
          <div class="${P}-card">
            <div class="${P}-icon">${card.icon}</div>
            <h3>${card.title}</h3>
            <p>${card.body}</p>
            <div class="${P}-formula">
              <code>${card.formula}</code>
            </div>
          </div>`;
}

function blocks() {
  const SCATTER_SVG = require('./bm-evidence').evidenceRow1.__scatterSvg
    ? require('./bm-evidence').evidenceRow1.__scatterSvg
    : null;

  // Re-create SVG injection (same as English)
  const scatterSvgStr = `<svg viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <path d="M100 750 Q300 740 500 700 Q700 640 900 500 Q1050 380 1150 250 Q1250 140 1350 50" stroke="#000864" stroke-width="2.5" fill="none" opacity="0.2"/>
  <rect x="200" y="600" width="120" height="150" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="200" y="500" width="120" height="100" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <rect x="400" y="450" width="120" height="300" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="400" y="320" width="120" height="130" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <rect x="600" y="300" width="120" height="450" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.15"/>
  <rect x="600" y="180" width="120" height="120" rx="4" stroke="#000864" stroke-width="1.5" fill="none" opacity="0.1"/>
  <text x="230" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y1</text>
  <text x="460" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y2</text>
  <text x="660" y="790" font-family="'Noto Sans',sans-serif" font-size="12" fill="#000864" opacity="0.1" text-anchor="middle">Y3</text>
  <path d="M900 600 L900 350" stroke="#00AFF0" stroke-width="2" opacity="0.2"/>
  <path d="M890 360 L900 340 L910 360" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.2"/>
  <path d="M1000 550 L1000 250" stroke="#00AFF0" stroke-width="2" opacity="0.15"/>
  <path d="M990 260 L1000 240 L1010 260" stroke="#00AFF0" stroke-width="2" fill="none" opacity="0.15"/>
  <circle cx="1200" cy="500" r="40" stroke="#000864" stroke-width="1" fill="none" opacity="0.1" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="80" stroke="#000864" stroke-width="1" fill="none" opacity="0.07" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="120" stroke="#000864" stroke-width="1" fill="none" opacity="0.05" stroke-dasharray="4 3"/>
  <circle cx="1200" cy="500" r="4" fill="#00AFF0" opacity="0.25"/>
  <circle cx="350" cy="400" r="3" fill="#000864" opacity="0.12"/>
  <circle cx="800" cy="250" r="4" fill="#000864" opacity="0.1"/>
</svg>`;

  const svgBase64 = Buffer.from(scatterSvgStr).toString('base64');
  const svgInject = `<div id="dw-bm-scene"></div><script>(function(){var s=atob('${svgBase64}');document.getElementById('dw-bm-scene').innerHTML=decodeURIComponent(Array.from(s,function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''));})()</script>`;

  const cardsHTML = ROW1_CARDS.map(buildCardHTML).join('');

  const html = `
    <div class="${P}-section ${P}-section--row1">
      <div class="${P}-scene">${svgInject}</div>
      <div class="${P}-wave-fade" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.evidenceRow1.title}</h2>
          <p class="${P}-subtitle">${th.evidenceRow1.subtitle}</p>
        </div>
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Evidence: Row 1 (The Math)', html, 'Evidence Row 1: Content');
}

// Reuse English CSS (sharedCSS emitted by row1)
const css = en.evidenceRow1.css.bind(en.evidenceRow1);

module.exports = { blocks, css, ROW1_CARDS };
