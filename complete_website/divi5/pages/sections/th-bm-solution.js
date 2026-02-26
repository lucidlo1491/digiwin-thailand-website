/**
 * th-bm-solution.js — Thai Solution Cards (S6) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level CARDS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./bm-solution');
const th = require('../../i18n/th/partner-business-model');

const P = 'sol'; // CSS prefix — same as English

// Merge Thai text into each card (icons from English)
const CARDS = en.CARDS.map((card, i) => ({
  ...card,
  title: th.solution.cards[i].title,
  body: th.solution.cards[i].body,
  formula: th.solution.cards[i].formula,
}));

function blocks() {
  const cardsHTML = CARDS.map(c => `
        <div class="${P}-card">
          <div class="${P}-icon">${c.icon}</div>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <div class="${P}-formula">
            <code>${c.formula}</code>
          </div>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.solution.title}</h2>
          <p class="${P}-subtitle">${th.solution.subtitle}</p>
        </div>
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Solution: Another Way', html, 'Solution: Content');
}

// Reuse English CSS
const { css } = require('./bm-solution');

module.exports = { blocks, css, CARDS };
