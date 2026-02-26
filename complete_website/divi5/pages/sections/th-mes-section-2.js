/**
 * th-mes-section-2.js — Thai MES FAQ Section (S9)
 *
 * Uses faq-accordion template with Thai content from i18n/th/mes.js.
 */

const template = require('../../lib/templates/faq-accordion');
const th = require('../../i18n/th/mes');

const data = {
  adminLabel: th.faq.adminLabel,
  sectionPrefix: th.faq.sectionPrefix,
  summaryFontSize: '15px',
  items: th.faq.items,
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
