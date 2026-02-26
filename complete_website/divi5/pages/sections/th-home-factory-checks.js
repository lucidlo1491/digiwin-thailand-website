/**
 * th-home-factory-checks.js — Thai Factory Checks (Merge Pattern)
 * Template: card-grid-dark (same as English)
 */
const cardGrid = require('../../lib/templates/card-grid-dark');
const en = require('./home-factory-checks');
const th = require('../../i18n/th/home');

// Per-card merge: Thai text + English svgBg/number/fullWidth/quoteTag
const DATA = {
  ...en.DATA,
  ...th.factoryChecks,
  cards: en.DATA.cards.map((card, i) => ({
    ...card,                          // English: svgBg, number, fullWidth, quoteTag
    ...th.factoryChecks.cards[i],     // Thai: title, quote, description
  })),
};

module.exports = {
  DATA,
  blocks: () => cardGrid.blocks(DATA),
  css: () => cardGrid.css(DATA),
};
