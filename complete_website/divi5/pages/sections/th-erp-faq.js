/**
 * th-erp-faq.js — Thai ERP FAQ Section
 *
 * Template-driven: merges English DATA layout with Thai content.
 */

const template = require('../../lib/templates/faq-accordion');
const enBuilder = require('./erp-section-2');
const thErp = require('../../i18n/th/erp');

const DATA = { ...enBuilder.DATA, ...thErp.faq };

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
