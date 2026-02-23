/**
 * industries-cta.js — Industries Hub CTA Section (S6)
 *
 * REFACTORED: Uses cta-gradient template (97 -> ~22 lines)
 * Source: industries.html — "Let's Talk About Your Factory"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: "CTA: Let\u2019s Talk About Your Factory",
  sectionPrefix: 'ind-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: "Let\u2019s Talk About Your Factory",
  subtitle: 'Every factory is different. Let us understand yours.',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View Products', href: '/products.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'bottom', opacity: 0.10 },
  waveFlow: { height: '160px', opacity: 0.30 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
