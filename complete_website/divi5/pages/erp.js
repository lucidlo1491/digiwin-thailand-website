/**
 * erp.js — ERP product page config for build-page.js
 *
 * WordPress page: ERP (ID 100561, slug: erp)
 * Prototype: products/erp.html
 * Sections: 9
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/erp-hero');
const sectionBuilder = require('./sections/erp-section');
const painBuilder = require('./sections/erp-pain');
const productsBuilder = require('./sections/erp-products');
const capabilitiesBuilder = require('./sections/erp-capabilities');
const section6Builder = require('./sections/erp-section-6');
const integrationBuilder = require('./sections/erp-integration');
const section2Builder = require('./sections/erp-section-2');
const ctaBuilder = require('./sections/erp-cta');
const relatedBuilder = require('./sections/erp-related-solutions');

module.exports = {
  pageId: 100561,
  title: 'ERP for Manufacturing — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'erp.html'),
  protoFile: 'products/erp.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'what-is-erp', builder: sectionBuilder },
    { name: 'pain', builder: painBuilder },
    { name: 'products', builder: productsBuilder },
    { name: 'capabilities', builder: capabilitiesBuilder },
    { name: 'section-6', builder: section6Builder },
    { name: 'integration', builder: integrationBuilder },
    { name: 'faq', builder: section2Builder },
    { name: 'cta', builder: ctaBuilder },
    { name: 'related-solutions', builder: relatedBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 14,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100561',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.erp-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.erp-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'what-is-erp', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-section', pixelThreshold: 0.15 },
      { name: 'pain', wpSelector: '.et_pb_section_2', htmlSelector: '.pain-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Pain Title', htmlSel: '.pain-section h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'products', wpSelector: '.et_pb_section_3', htmlSelector: '.products-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Products Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'capabilities', wpSelector: '.et_pb_section_4', htmlSelector: '.capabilities-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Caps Title', htmlSel: '.capabilities-section h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'section-6', wpSelector: '.et_pb_section_5', htmlSelector: 'section:nth-of-type(6)', pixelThreshold: 0.15 },
      { name: 'integration', wpSelector: '.et_pb_section_6', htmlSelector: '.integration-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Integration Title', htmlSel: '.integration-section h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'faq', wpSelector: '.et_pb_section_7', htmlSelector: 'section:nth-of-type(8)', pixelThreshold: 0.15 },
      { name: 'cta', wpSelector: '.et_pb_section_8', htmlSelector: '.erp-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.erp-cta h2', wpSel: '.et_pb_section_8 h2' }] },
      { name: 'related-solutions', wpSelector: '.et_pb_section_9', htmlSelector: '.related-solutions', pixelThreshold: 0.1,
        styleMap: [{ label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_9 h2' }] },
    ],
  },
};
