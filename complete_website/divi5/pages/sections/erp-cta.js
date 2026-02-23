/**
 * erp-cta.js — ERP CTA Section (S9)
 *
 * REFACTORED: Uses cta-gradient template (157 -> ~25 lines)
 * Source: erp.html — "Ready to See What's Possible?"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: "CTA: Ready to See What\u2019s Possible?",
  sectionPrefix: 'erp-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '120px 24px',
  title: "Ready to See What\u2019s Possible?",
  subtitle: 'Fill out the form and our team will reach out to discuss your specific manufacturing challenges.',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View by Industry', href: '/industries.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'corner-tl', opacity: 0.14 },
  waveFlow: { height: '180px', opacity: 0.35 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
