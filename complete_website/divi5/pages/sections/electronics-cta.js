/**
 * electronics-cta.js — Electronics CTA Section (S9)
 *
 * REFACTORED: Uses cta-gradient template (80 -> ~22 lines)
 * Source: electronics.html — "Master Electronics Complexity"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Master Electronics Complexity',
  sectionPrefix: 'elec-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Master Electronics Complexity',
  subtitle: 'See how DigiWin handles high-mix manufacturing',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View Other Industries', href: '/industries.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'center', opacity: 0.10 },
  waveFlow: { height: '170px', opacity: 0.08 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
