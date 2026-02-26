/**
 * th-ind-cta.js — Thai Industries Hub CTA Section (S6) — MERGE
 *
 * Thin wrapper: English DATA + Thai text overrides via cta-gradient template.
 * Source: industries-cta.js + i18n/th/industries.js cta
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const th = require('../../i18n/th/industries');

const DATA = {
  adminLabel: th.cta.adminLabel,
  sectionPrefix: 'ind-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
  superD: { variant: 'gradient', position: 'bottom', opacity: 0.10 },
  waveFlow: { height: '160px', opacity: 0.30 },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
