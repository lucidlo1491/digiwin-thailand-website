/**
 * th-econ-protection.js — Thai Protection Section (S4) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level CARDS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./econ-protection');
const th = require('../../i18n/th/partner-economics');

const P = 'prot'; // CSS prefix — same as English

// Merge Thai text into each card (icons from English)
const CARDS = en.CARDS.map((card, i) => ({
  ...card,
  title: th.protection.cards[i].title,
  points: th.protection.cards[i].points,
  proof: th.protection.cards[i].proof,
}));

function blocks() {
  const cardsHTML = CARDS.map(card => {
    const pointsHTML = card.points.map(pt =>
      `<div class="${P}-point"><strong>${pt.strong}</strong> ${pt.text}</div>`
    ).join('');

    return `
            <div class="${P}-card">
              <div class="${P}-icon">${card.icon}</div>
              <h3>${card.title}</h3>
              <div class="${P}-points">${pointsHTML}
              </div>
              <div class="${P}-proof">${card.proof}</div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-wave-right" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.protection.label}</span>
          <h2 class="${P}-title">${th.protection.title}</h2>
          <p class="${P}-subtitle">${th.protection.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Protection: Risk Mitigation', html, 'Protection: Content');
}

// Reuse English CSS
const { css } = require('./econ-protection');

module.exports = { blocks, css, CARDS };
