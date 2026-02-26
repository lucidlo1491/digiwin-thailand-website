/**
 * th-econ-cta.js — Thai Partner Economics CTA (S5) — MERGE
 *
 * Thin wrapper: English DATA + Thai text overrides via cta-gradient template.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./econ-cta');
const th = require('../../i18n/th/partner-economics');

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
  css: () => ctaGradient.css(DATA) + `\n.et_pb_section .${enBuilder.DATA.sectionPrefix}-btn--ghost{color:#fff !important}`,
};
