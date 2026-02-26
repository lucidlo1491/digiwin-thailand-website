/**
 * th-home-stats-banner.js — Thai Stats Banner (Merge Pattern)
 * Template: stats-banner (same as English)
 */
const statsBannerTpl = require('../../lib/templates/stats-banner');
const en = require('./home-stats-banner');
const th = require('../../i18n/th/home');

const DATA = { ...en.DATA, ...th.statsBanner };

module.exports = {
  DATA,
  blocks: () => statsBannerTpl.blocks(DATA),
  css: () => statsBannerTpl.css(DATA),
};
