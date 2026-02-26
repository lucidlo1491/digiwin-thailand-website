/**
 * th-home-trust-anchors.js — Thai Trust Anchors (Merge Pattern)
 * Template: card-grid-dark (same as English)
 *
 * Cards need per-card merge: Thai text + English icons/badges/bgIcons
 */
const cardGrid = require('../../lib/templates/card-grid-dark');
const en = require('./home-trust-anchors');
const th = require('../../i18n/th/home');

const DATA = {
  ...en.DATA,
  ...th.trustAnchors,
  cards: en.DATA.cards.map((card, i) => ({
    ...card,                          // English: badge, icon, bgIcon, fullWidth
    ...th.trustAnchors.cards[i],      // Thai: title, headline, detail
  })),
};

module.exports = {
  DATA,
  blocks: () => cardGrid.blocks(DATA),
  css: () => cardGrid.css(DATA),
};
