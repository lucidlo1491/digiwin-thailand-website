/**
 * th-ps-competitive.js — Thai Competitive Positioning (S5) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level CARDS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/partner-solutions');

const P = 'ps-comp'; // CSS prefix — same as English

const CARDS = th.competitive.cards;

function blocks() {
  const cardsHTML = CARDS.map(card => {
    const pointsHTML = card.points.map(pt =>
      `<div class="${P}-point"><strong>${pt.strong}</strong> ${pt.text}</div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-tag">${card.tag}</div>
              <h3>${card.title}</h3>
              <div class="${P}-points">${pointsHTML}
              </div>
              <div class="${P}-use-when"><strong>Use when:</strong> ${card.useWhen}</div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.competitive.label}</span>
          <h2 class="${P}-title">${th.competitive.title}</h2>
          <p class="${P}-subtitle">${th.competitive.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
        <div class="${P}-ace">
          <div class="${P}-ace-label">${th.competitive.aceLabel}</div>
          <p class="${P}-ace-quote">${th.competitive.aceQuote}</p>
        </div>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Competitive Positioning', html, 'Competitive: Content');
}

// Reuse English CSS
const { css } = require('./ps-competitive');

module.exports = { blocks, css, CARDS };
