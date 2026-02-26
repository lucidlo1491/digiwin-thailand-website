/**
 * th-auto-cta.js — Thai Automotive CTA Section (S9)
 *
 * Template-driven: uses cta-gradient template with Thai content.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const thAuto = require('../../i18n/th/automotive');

const DATA = {
  sectionPrefix: 'auto-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  superD: { variant: 'particle', position: 'corner-br', opacity: 0.12 },
  waveFlow: { height: '170px', opacity: 0.10 },
  ...thAuto.cta,
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
