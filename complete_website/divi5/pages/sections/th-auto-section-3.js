/**
 * th-auto-section-3.js — Thai Automotive FAQ Section (S8)
 *
 * Template-driven: merges English layout with Thai content.
 */

const template = require('../../lib/templates/faq-accordion');
const thAuto = require('../../i18n/th/automotive');

const data = {
  adminLabel: 'Section 3 (Thai)',
  sectionPrefix: 'auto-faq',
  ...thAuto.faq,
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
