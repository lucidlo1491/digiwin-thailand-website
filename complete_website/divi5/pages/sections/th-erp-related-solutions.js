/**
 * th-erp-related-solutions.js — Thai ERP Related Solutions Section
 *
 * Template-driven: merges English DATA layout with Thai content.
 */

const template = require('../../lib/templates/related-solutions');
const enBuilder = require('./erp-related-solutions');
const thErp = require('../../i18n/th/erp');

const DATA = { ...enBuilder.DATA, ...thErp.relatedSolutions };

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
