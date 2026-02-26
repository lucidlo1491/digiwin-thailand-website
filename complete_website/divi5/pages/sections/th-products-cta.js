/**
 * th-products-cta.js — Thai Products CTA Section (S5) — MERGE
 *
 * Thin wrapper: English DATA + Thai text overrides via cta-gradient template.
 * Source: products-cta.js + i18n/th/products.js cta
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const base = require('../../lib/templates/_base');
const enBuilder = require('./products-cta');
const th = require('../../i18n/th/products');

const DATA = {
  ...enBuilder.DATA,
  adminLabel: th.cta.adminLabel,
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
};

function css() {
  return ctaGradient.css(DATA) + `
${base.grainCSS(`.${DATA.sectionPrefix}-section`)}
.${DATA.sectionPrefix}-title{letter-spacing:-0.02em;line-height:1.15}
.${DATA.sectionPrefix}-subtitle{line-height:1.6;margin-bottom:48px}
.${DATA.sectionPrefix}-container{padding:0 24px}
.${DATA.sectionPrefix}-btn--primary:focus-visible,.${DATA.sectionPrefix}-btn--ghost:focus-visible{outline:3px solid #00AFF0;outline-offset:3px}`;
}

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css,
};
