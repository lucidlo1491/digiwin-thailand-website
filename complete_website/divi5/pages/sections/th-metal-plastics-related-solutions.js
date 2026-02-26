/**
 * th-metal-plastics-related-solutions.js — Thai Related Solutions Section
 *
 * Template-driven: uses Thai content with English layout prefix.
 */

const template = require('../../lib/templates/related-solutions');
const thMetal = require('../../i18n/th/metal-plastics');

const data = {
  sectionPrefix: 'mp-related',
  heading: thMetal.relatedSolutions.heading,
  cards: thMetal.relatedSolutions.cards,
};

module.exports = {
  DATA: data,
  blocks: () => template.blocks(data),
  css: () => template.css(data),
};
