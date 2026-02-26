/**
 * th-elec-section.js — Thai Electronics FAQ (S8) — COPY
 *
 * Uses faq-accordion template with Thai content from i18n.
 */

const template = require('../../lib/templates/faq-accordion');
const th = require('../../i18n/th/electronics');

const data = {
  adminLabel: th.faq.adminLabel,
  sectionPrefix: th.faq.sectionPrefix,
  items: th.faq.items,
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
