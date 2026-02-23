/**
 * automotive-cta.js — Automotive CTA Section (S9)
 *
 * REFACTORED: Uses cta-gradient template (76 -> ~22 lines)
 * Source: automotive.html — "Meet OEM Demands with Confidence"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Meet OEM Demands with Confidence',
  sectionPrefix: 'auto-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Meet OEM Demands with Confidence',
  subtitle: "See how DigiWin helps Thailand\u2019s top automotive suppliers",
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View Other Industries', href: '/industries.html', style: 'ghost' },
  ],
  superD: { variant: 'particle', position: 'corner-br', opacity: 0.12 },
  waveFlow: { height: '170px', opacity: 0.10 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
