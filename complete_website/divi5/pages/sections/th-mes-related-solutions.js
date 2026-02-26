/**
 * th-mes-related-solutions.js — Thai MES Related Solutions (S11)
 *
 * Uses related-solutions template with Thai content from i18n/th/mes.js.
 */

const template = require('../../lib/templates/related-solutions');
const th = require('../../i18n/th/mes');

const data = {
  sectionPrefix: th.relatedSolutions.sectionPrefix,
  cards: th.relatedSolutions.cards,
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
