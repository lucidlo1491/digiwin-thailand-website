/**
 * case-studies-cs-cta.js — Case Studies CTA Section (S10)
 *
 * REFACTORED: Uses cta-gradient template (95 -> ~22 lines)
 * Source: case-studies.html — "Want Results Like These?"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Want Results Like These?',
  sectionPrefix: 'cs-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  maxWidth: '640px',
  title: 'Want Results Like These?',
  subtitle: "Every factory is different. Tell us about yours and we\u2019ll share relevant case studies from your industry.",
  buttons: [
    { text: "Let\u2019s Talk", href: '/demo.html', style: 'primary' },
    { text: 'Explore Products', href: '/products.html', style: 'ghost' },
  ],
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
