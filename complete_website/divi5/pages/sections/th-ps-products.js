/**
 * th-ps-products.js — Thai Products Section (S2) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level CARDS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./ps-products');
const th = require('../../i18n/th/partner-solutions');

const P = 'ps-prod'; // CSS prefix — same as English

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

// Merge Thai text into each card (layout/links from English)
const CARDS = en.CARDS.map((card, i) => ({
  ...card,
  badge: th.products.cards[i].badge,
  title: th.products.cards[i].title,
  desc: th.products.cards[i].desc,
  features: th.products.cards[i].features,
  metricsTitle: th.products.cards[i].metricsTitle,
  metrics: th.products.cards[i].metrics,
}));

function blocks() {
  const cardsHTML = CARDS.map((card) => {
    const featuresHTML = card.features.map(f =>
      `<li>${CHECK_SVG}<span>${f}</span></li>`
    ).join('');

    const metricsHTML = card.metrics.map(m =>
      `<div class="${P}-metric">
        <span class="${P}-metric-label">${m.label}</span>
        <span class="${P}-metric-value${m.highlight ? ` ${P}-metric-hl` : ''}">${m.value}</span>
      </div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-info">
                <span class="${P}-badge">${card.badge}</span>
                <h3>${card.title}</h3>
                <p class="${P}-desc">${card.desc}</p>
                <ul class="${P}-features">${featuresHTML}</ul>
                <a href="${card.link.href}" class="${P}-link">${card.link.text} ${ARROW_SVG}</a>
              </div>
              <div class="${P}-metrics">
                <div class="${P}-metrics-title">${card.metricsTitle}</div>
                ${metricsHTML}
              </div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-scene">${en.CARDS.length ? '' : ''}</div>
      <div class="${P}-wave-left" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.products.title}</h2>
          <p class="${P}-subtitle">${th.products.subtitle}</p>
        </div>
        ${cardsHTML}
      </div>
    </div>`;

  return base.wrapInDiviSection('Products: Solution Stack', html, 'Products: Content');
}

// Reuse English CSS
const { css } = require('./ps-products');

module.exports = { blocks, css, CARDS };
