/**
 * th-mes-product-detail-cta.js — Thai MES CTA Section (S10)
 *
 * Uses cta-gradient template with Thai content from i18n/th/mes.js.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./mes-product-detail-cta');
const th = require('../../i18n/th/mes');

const DATA = {
  ...enBuilder.DATA,
  adminLabel: th.cta.adminLabel,
  sectionPrefix: th.cta.sectionPrefix,
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
};

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
