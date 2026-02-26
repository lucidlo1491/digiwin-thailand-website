/**
 * th-bm-cta.js — Thai Business Model CTA (S8) — MERGE
 *
 * Thin wrapper: English DATA + Thai text overrides via cta-gradient template.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./bm-cta');
const th = require('../../i18n/th/partner-business-model');

const DATA = {
  ...enBuilder.DATA,
  adminLabel: th.cta.adminLabel,
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
