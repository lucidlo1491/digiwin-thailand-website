/**
 * products-cta.js — CTA Section (S5)
 *
 * REFACTORED: Uses cta-gradient template + grain overlay + focus-visible.
 * Source: products.html line 1123
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const base = require('../../lib/templates/_base');

const P = 'prod-cta';

const DATA = {
  adminLabel: 'CTA',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '140px 0',
  maxWidth: '800px',
  title: 'Not Sure Where to Start?',
  titleFontSize: 'clamp(36px,4.5vw,52px)',
  subtitle: "Tell us about your factory and we\u2019ll recommend the right solution for your needs. No obligation, no pressure\u2014just clarity.",
  subtitleFontSize: '20px',
  buttons: [
    { text: "Let\u2019s Talk", href: '/contact/', style: 'primary' },
    { text: 'View by Industry', href: '/industries/', style: 'ghost' },
  ],
  superD: { variant: 'particle', position: 'bottom', modifiers: ['bold'] },
};

function css() {
  return ctaGradient.css(DATA) + `
${base.grainCSS(`.${P}-section`)}
.${P}-title{letter-spacing:-0.02em;line-height:1.15}
.${P}-subtitle{line-height:1.6;margin-bottom:48px}
.${P}-container{padding:0 24px}
.${P}-btn--primary:focus-visible,.${P}-btn--ghost:focus-visible{outline:3px solid #00AFF0;outline-offset:3px}`;
}

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css,
};
