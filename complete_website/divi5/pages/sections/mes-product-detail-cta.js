/**
 * mes-product-detail-cta.js — MES CTA Section (S10)
 *
 * REFACTORED: Uses cta-gradient template (89 -> ~22 lines)
 * Source: mes.html — "Ready to See Your Shop Floor Clearly?"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Ready to See Your Shop Floor Clearly?',
  sectionPrefix: 'mes-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Ready to See Your Shop Floor Clearly?',
  subtitle: 'Fill out the form and our team will reach out to discuss your specific production visibility challenges.',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View by Industry', href: '/industries.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'corner-br', modifiers: ['bold', 'glow'] },
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
