/**
 * th-wms-section-2.js — Thai WMS FAQ Section (S9) — TEMPLATE
 *
 * Uses faq-accordion template with Thai content from i18n.
 */

const template = require('../../lib/templates/faq-accordion');
const th = require('../../i18n/th/wms');

const data = th.faq;

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
