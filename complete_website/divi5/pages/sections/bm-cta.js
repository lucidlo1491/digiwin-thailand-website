/**
 * bm-cta.js — Final CTA Section (S8)
 *
 * REFACTORED: Uses cta-gradient template.
 * NOTE: Wave-flow is display:none in HTML ref — omitted here.
 * Source: business-model.html lines 1068-1081
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const P = 'bm-cta';

const DATA = {
  adminLabel: 'CTA: See the Economics',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  maxWidth: '800px',
  title: 'See How the Economics Actually Work',
  subtitle: "You\u2019ve seen the problem. Now see the math of the solution\u2014what you keep, what compounds, and why 100% of service fees stay with you.",
  subtitleFontSize: '18px',
  subtitleMaxWidth: '600px',
  buttons: [
    { text: 'See Partner Economics', href: '/partner-program/economics/', style: 'primary' },
    { text: 'Evaluate the Weapon First', href: '/partner-program/solutions/', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'left', opacity: 0.10 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
  DATA,
};
