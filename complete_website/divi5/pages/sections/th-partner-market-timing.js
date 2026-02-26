/**
 * th-partner-market-timing.js — Thai Why Now: Market Timing (S8)
 *
 * DEEP-MERGE: blocks()/css() are zero-arg and read module-level constants.
 * Must copy blocks() with Thai data substituted. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-market-timing');
const th = require('../../i18n/th/partner-program');

const P = 'mkt'; // Same CSS prefix as English

// Merged data (colors stay from English)
const HEADER = {
  ...en.HEADER,
  label: th.marketTiming.label,
  title: th.marketTiming.title,
  subtitle: th.marketTiming.subtitle,
};

const CARDS = en.CARDS.map((c, i) => ({
  ...c,
  stat: th.marketTiming.cards[i].stat,
  title: th.marketTiming.cards[i].title,
  body: th.marketTiming.cards[i].body,
}));

function blocks() {
  const cardsHTML = CARDS.map(card => `
        <div class="${P}-card">
          <div class="${P}-stat" style="color:${card.color}">${card.stat}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <div class="${P}-label">${HEADER.label}</div>
          <h2 class="${P}-title">${HEADER.title}</h2>
          <p class="${P}-subtitle">${HEADER.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Market Timing: Why Now', html, 'Market Timing: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css, HEADER, CARDS };
