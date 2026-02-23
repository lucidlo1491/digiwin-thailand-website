/**
 * metal-plastics-cta.js — Metal & Plastics CTA Section
 *
 * Uses cta-gradient template.
 * Source: metal-plastics.html — "Improve Yield, Reduce Scrap"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Improve Yield, Reduce Scrap',
  sectionPrefix: 'mp-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Improve Yield, Reduce Scrap',
  subtitle: 'See how DigiWin helps process manufacturers',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View Other Industries', href: '/industries.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'left', opacity: 0.12 },
  waveFlow: { height: '170px', opacity: 0.08 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
