/**
 * ps-cta.js — Partner Solutions CTA Section (S6)
 *
 * REFACTORED: Uses cta-gradient template.
 * Per spec: "multi-year projections" (not "5-year").
 * Source: solutions.html lines 1484-1496
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const P = 'ps-cta';

const DATA = {
  adminLabel: 'CTA: See the Economics',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  maxWidth: '800px',
  title: 'Now See the Actual Economics',
  subtitle: "You\u2019ve seen the arsenal. Now see the math\u2014margins, recurring revenue, and multi-year projections for your business.",
  subtitleFontSize: '18px',
  subtitleMaxWidth: '600px',
  buttons: [
    { text: 'See Partner Economics \u2192', href: '/partner-program/economics/', style: 'primary' },
    { text: "Let\u2019s Talk", href: '/contact/', style: 'ghost' },
  ],
  superD: { variant: 'particle', position: 'left', opacity: 0.14 },
  waveFlow: { height: '160px', opacity: 0.30 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
