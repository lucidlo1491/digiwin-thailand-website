/**
 * th-home-stats-banner.js — Thai Stats Banner (Merge Pattern)
 * Template: stats-banner (same as English)
 */
const statsBannerTpl = require('../../lib/templates/stats-banner');
const en = require('./home-stats-banner');
const th = require('../../i18n/th/home');

const DATA = {
  ...en.DATA,
  ...th.statsBanner,
  // Thai typography: no letter-spacing (breaks connected script), no uppercase (no case in Thai)
  labelFont: "'Noto Sans Thai', 'Noto Sans', sans-serif",
  labelSpacing: '0.02em',
  labelTextTransform: 'none',
  labelLineHeight: '1.8',
  labelSize: '12px',
  // Source line
  sourceFont: "'Noto Sans Thai', 'Noto Sans', sans-serif",
  sourceSpacing: '0.02em',
  sourceTextTransform: 'none',
  sourceFontSize: '12px',
  sourceMarginTop: '16px',
  sourcePaddingTop: '8px',
};

module.exports = {
  DATA,
  blocks: () => statsBannerTpl.blocks(DATA),
  css: () => statsBannerTpl.css(DATA),
};
