/**
 * th-cs-cta.js — Thai Case Studies CTA Section
 *
 * Template-driven: merges English DATA layout with Thai content.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const thCS = require('../../i18n/th/case-studies');

const DATA = {
  adminLabel: thCS.cta.adminLabel,
  sectionPrefix: 'cs-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #001080 100%)',
  padding: '100px 24px',
  maxWidth: '640px',
  titleFontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
  subtitleFontSize: '17px',
  title: thCS.cta.title,
  subtitle: thCS.cta.subtitle,
  buttons: thCS.cta.buttons,
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA) + `
/* Case-studies-specific overrides to match HTML prototype */
.et_pb_section .cs-cta-title{font-weight:800 !important}
.cs-cta-section::before{background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important}
.cs-cta-section::after{display:none !important}
.cs-cta-subtitle{color:rgba(255,255,255,0.85) !important}`,
};
