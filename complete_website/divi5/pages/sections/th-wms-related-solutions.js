/**
 * th-wms-related-solutions.js — Thai WMS Related Solutions (S11) — TEMPLATE
 *
 * Uses related-solutions template with Thai content from i18n.
 */

const template = require('../../lib/templates/related-solutions');
const th = require('../../i18n/th/wms');

const data = th.relatedSolutions;

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
