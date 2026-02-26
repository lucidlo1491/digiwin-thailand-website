/**
 * th-home-product-pillars.js — Thai Product Pillars (Merge Pattern)
 * Template: card-grid-light (same as English)
 *
 * Note: SVG icons preserved from English DATA via spread.
 * Only text content (header, card titles/features/benefits) is Thai.
 */
const cardGridLight = require('../../lib/templates/card-grid-light');
const en = require('./home-product-pillars');
const th = require('../../i18n/th/home');

// Cards need per-card merge (Thai overrides text, English keeps icons/hrefs)
const DATA = {
  ...en.DATA,
  ...th.productPillars,
  cards: en.DATA.cards.map((card, i) => ({
    ...card,                          // English: icon, href
    ...th.productPillars.cards[i],    // Thai: title, fullName, tagline, features, benefit
  })),
};

module.exports = {
  DATA,
  blocks: () => cardGridLight.blocks(DATA),
  css: () => cardGridLight.css(DATA),
};
