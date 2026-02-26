/**
 * th-home-partner-checks.js — Thai Partner Checks (Merge Pattern)
 * Template: card-grid-dark (same as English)
 */
const darkGrid = require('../../lib/templates/card-grid-dark');
const en = require('./home-partner-checks');
const th = require('../../i18n/th/home');

const DATA = { ...en.DATA, ...th.partnerChecks };

module.exports = {
  DATA,
  blocks: () => darkGrid.blocks(DATA),
  css: () => darkGrid.css(DATA),
};
