/**
 * th-aiot-section-2.js — Thai AIoT FAQ Section (S9) — COPY
 *
 * Uses faq-accordion template with Thai content from i18n.
 */

const template = require('../../lib/templates/faq-accordion');
const th = require('../../i18n/th/aiot');

const data = {
  adminLabel: th.faq.adminLabel,
  sectionPrefix: th.faq.sectionPrefix,
  items: th.faq.items,
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
