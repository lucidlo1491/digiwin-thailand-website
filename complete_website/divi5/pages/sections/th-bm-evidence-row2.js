/**
 * th-bm-evidence-row2.js — Thai Evidence Row 2 (S4) — DEEP-MERGE
 *
 * Same structure as row1 but no header, no SVG scene.
 */

const base = require('../../lib/templates/_base');
const en = require('./bm-evidence');
const th = require('../../i18n/th/partner-business-model');

const P = 'math'; // CSS prefix — same as English

// Merge Thai text into each card (icons from English)
const ROW2_CARDS = en.ROW2_CARDS.map((card, i) => ({
  ...card,
  title: th.evidenceRow2.cards[i].title,
  body: th.evidenceRow2.cards[i].body,
  formula: th.evidenceRow2.cards[i].formula,
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
  const cardsHTML = ROW2_CARDS.map(buildCardHTML).join('');

  const html = `
    <div class="${P}-section ${P}-section--row2">
      <div class="${P}-inner">
        <div class="${P}-cards">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Evidence: Row 2 (More Math)', html, 'Evidence Row 2: Content');
}

// Row 2 emits no CSS (shared CSS comes from row1)
function css() { return ''; }

module.exports = { blocks, css, ROW2_CARDS };
