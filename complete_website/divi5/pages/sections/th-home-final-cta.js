/**
 * th-home-final-cta.js — Thai Final CTA (Merge Pattern prototype)
 *
 * Strategy A: Flat DATA merge. English layout + Thai text overrides.
 * Proves the merge pattern works for simple/flat DATA builders.
 *
 * Template: cta-gradient (same as English)
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./home-final-cta');
const thHome = require('../../i18n/th/home');

const DATA = { ...enBuilder.DATA, ...thHome.finalCta };

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
