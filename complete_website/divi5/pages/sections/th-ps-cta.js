/**
 * th-ps-cta.js — Thai Partner Solutions CTA (S6) — MERGE
 *
 * Thin wrapper: English DATA + Thai text overrides via cta-gradient template.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./ps-cta');
const th = require('../../i18n/th/partner-solutions');

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
