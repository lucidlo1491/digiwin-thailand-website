/**
 * th-elec-cta.js — Thai Electronics CTA (S9) — COPY
 *
 * Uses cta-gradient template with Thai content from i18n.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const th = require('../../i18n/th/electronics');

const DATA = {
  adminLabel: th.cta.adminLabel,
  sectionPrefix: 'elec-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
  superD: { variant: 'gradient', position: 'center', opacity: 0.10 },
  waveFlow: { height: '170px', opacity: 0.08 },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
