/**
 * th-metal-plastics-cta.js — Thai Metal & Plastics CTA Section
 *
 * Template-driven: merges English DATA layout with Thai content.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const thMetal = require('../../i18n/th/metal-plastics');

const DATA = {
  adminLabel: thMetal.cta.adminLabel,
  sectionPrefix: 'mp-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: thMetal.cta.title,
  subtitle: thMetal.cta.subtitle,
  buttons: thMetal.cta.buttons,
  superD: { variant: 'gradient', position: 'left', opacity: 0.12 },
  waveFlow: { height: '170px', opacity: 0.08 },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
