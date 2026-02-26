/**
 * th-elec-related-solutions.js — Thai Electronics Related Solutions (S10) — COPY
 *
 * Uses related-solutions template with Thai content from i18n.
 */

const template = require('../../lib/templates/related-solutions');
const th = require('../../i18n/th/electronics');

const data = {
  sectionPrefix: th.relatedSolutions.sectionPrefix,
  cards: th.relatedSolutions.cards,
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
