/**
 * th-auto-related-solutions.js — Thai Automotive Related Solutions (S10)
 *
 * Template-driven: uses related-solutions template with Thai content.
 */

const template = require('../../lib/templates/related-solutions');
const thAuto = require('../../i18n/th/automotive');

const data = {
  sectionPrefix: 'auto-related',
  ...thAuto.relatedSolutions,
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
