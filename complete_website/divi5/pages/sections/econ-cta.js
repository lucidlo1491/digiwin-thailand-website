/**
 * econ-cta.js — Partner Economics CTA Section (S5)
 *
 * REFACTORED: Uses cta-gradient template.
 * Source: economics.html lines 1276-1288
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const P = 'ec-cta';

const DATA = {
  adminLabel: 'CTA: Run the Numbers',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  maxWidth: '800px',
  title: 'Ready to Run the Numbers for Your Firm?',
  subtitle: "Let\u2019s discuss your territory, your targets, and build a 3-year projection specific to your business. No obligation\u2014just spreadsheet reality.",
  subtitleFontSize: '18px',
  subtitleMaxWidth: '600px',
  buttons: [
    { text: "Let\u2019s Talk", href: '/contact/', style: 'primary' },
    { text: 'Back to Partner Overview', href: '/partner-program/', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'right', opacity: 0.18, modifiers: ['bold', 'glow'] },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA) + `\n.et_pb_section .${P}-btn--ghost{color:#fff !important}`,
  DATA,
};
