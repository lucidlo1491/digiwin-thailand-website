/**
 * th-home-proven-results.js — Thai Proven Results (Merge Pattern)
 * Template: result-cards (same as English)
 */
const resultCards = require('../../lib/templates/result-cards');
const en = require('./home-proven-results');
const th = require('../../i18n/th/home');

const DATA = { ...en.DATA, ...th.provenResults };

module.exports = {
  DATA,
  blocks: () => resultCards.blocks(DATA),
  css: () => resultCards.css(DATA),
};
