/**
 * th-aiot-cta.js — Thai AIoT CTA Section (S10) — COPY
 *
 * Uses cta-gradient template with Thai content from i18n.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const th = require('../../i18n/th/aiot');

const DATA = {
  adminLabel: th.cta.adminLabel,
  sectionPrefix: 'aiot-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
  superD: { variant: 'gradient', position: 'bottom', opacity: 0.14, modifiers: ['glow'] },
  waveFlow: { height: '190px', opacity: 0.36 },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
