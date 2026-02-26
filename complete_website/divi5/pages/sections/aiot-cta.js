/**
 * aiot-cta.js — AIoT CTA Section (S10)
 *
 * REFACTORED: Uses cta-gradient template (92 -> ~25 lines)
 * Source: aiot.html — "Start Listening to Your Machines"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Start Listening to Your Machines',
  sectionPrefix: 'aiot-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Start Listening to Your Machines',
  subtitle: 'See what your factory floor is really doing',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'Explore All Products', href: '/products.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'bottom', opacity: 0.14, modifiers: ['glow'] },
  waveFlow: { height: '190px', opacity: 0.36 },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
