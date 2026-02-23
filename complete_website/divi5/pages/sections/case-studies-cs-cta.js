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
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #001080 100%)',
  padding: '100px 24px',
  maxWidth: '640px',
  titleFontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
  subtitleFontSize: '17px',
  title: 'Want Results Like These?',
  subtitle: "Every factory is different. Tell us about yours and we\u2019ll share relevant case studies from your industry.",
  buttons: [
    { text: "Let\u2019s Talk", href: '/demo.html', style: 'primary' },
    { text: 'Explore Products', href: '/products.html', style: 'ghost' },
  ],
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA) + `
/* Case-studies-specific overrides to match HTML prototype */
.et_pb_section .cs-cta-title{font-weight:800 !important}
.cs-cta-section::before{background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important}
.cs-cta-section::after{display:none !important}
.cs-cta-subtitle{color:rgba(255,255,255,0.85) !important}`,
};
