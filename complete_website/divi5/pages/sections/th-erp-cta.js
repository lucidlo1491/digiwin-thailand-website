/**
 * th-erp-cta.js — Thai ERP CTA Section
 *
 * Template-driven: merges English DATA layout with Thai content.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const enBuilder = require('./erp-cta');
const thErp = require('../../i18n/th/erp');

const DATA = { ...enBuilder.DATA, ...thErp.cta };

module.exports = {
  DATA,
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
