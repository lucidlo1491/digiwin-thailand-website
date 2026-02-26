/**
 * th-home-logo-bar.js — Thai Logo Bar (Merge Pattern)
 * Template: logo-marquee (same as English)
 */
const logoMarquee = require('../../lib/templates/logo-marquee');
const en = require('./home-logo-bar');
const th = require('../../i18n/th/home');

const DATA = { ...en.DATA, ...th.logoBar };

module.exports = {
  DATA,
  blocks: () => logoMarquee.blocks(DATA),
  css: () => logoMarquee.css(DATA),
};
