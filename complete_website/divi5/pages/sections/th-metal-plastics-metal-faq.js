/**
 * th-metal-plastics-metal-faq.js — Thai Metal FAQ Section
 *
 * Template-driven: uses Thai content with English layout prefix.
 */

const template = require('../../lib/templates/faq-accordion');
const thMetal = require('../../i18n/th/metal-plastics');

const data = {
  sectionPrefix: 'metal-faq',
  heading: thMetal.faq.heading,
  items: thMetal.faq.items,
};

module.exports = {
  DATA: data,
  blocks: () => template.blocks(data),
  css: () => template.css(data),
};
