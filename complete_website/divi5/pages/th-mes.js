/**
 * th-mes.js — Thai MES page config for build-page.js
 *
 * All 11 sections use Thai builders with content from i18n/th/mes.js.
 * CSS identical to English MES — only text is Thai.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-mes [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const heroBuilder = require('./sections/th-mes-hero');
const sectionBuilder = require('./sections/th-mes-section');
const beforeafterBuilder = require('./sections/th-mes-beforeafter');
const productsBuilder = require('./sections/th-mes-products');
const capabilitiesBuilder = require('./sections/th-mes-capabilities');
const integrationBuilder = require('./sections/th-mes-integration');
const resultsBuilder = require('./sections/th-mes-results');
const reportsBuilder = require('./sections/th-mes-reports');
const section2Builder = require('./sections/th-mes-section-2');
const productDetailCtaBuilder = require('./sections/th-mes-product-detail-cta');
const relatedBuilder = require('./sections/th-mes-related-solutions');

module.exports = {
  pageId: 100778,
  title: 'MES (\u0e23\u0e30\u0e1a\u0e1a\u0e1a\u0e23\u0e34\u0e2b\u0e32\u0e23\u0e01\u0e32\u0e23\u0e1c\u0e25\u0e34\u0e15) \u2014 DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'mes.html'),
  protoFile: 'products/mes.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'section', builder: sectionBuilder },
    { name: 'beforeafter', builder: beforeafterBuilder },
    { name: 'products', builder: productsBuilder },
    { name: 'capabilities', builder: capabilitiesBuilder },
    { name: 'integration', builder: integrationBuilder },
    { name: 'results', builder: resultsBuilder },
    { name: 'reports', builder: reportsBuilder },
    { name: 'section-2', builder: section2Builder },
    { name: 'product-detail-cta', builder: productDetailCtaBuilder },
    { name: 'related-solutions', builder: relatedBuilder },
  ],

  // Thai typography: Noto Sans Thai + line-height adjustments
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/products/mes/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.mes-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.mes-hero h1', wpSel: '.et_pb_section_0 h1' },
        ],
      },
      {
        name: 'section', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dw-section h2', wpSel: '.et_pb_section_1 h2' },
        ],
      },
      {
        name: 'beforeafter', wpSelector: '.et_pb_section_2', htmlSelector: '.beforeafter-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.beforeafter-section h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
      {
        name: 'products', wpSelector: '.et_pb_section_3', htmlSelector: '.products-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_3 h2' },
        ],
      },
      {
        name: 'capabilities', wpSelector: '.et_pb_section_4', htmlSelector: '.capabilities-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.capabilities-section h2', wpSel: '.et_pb_section_4 h2' },
        ],
      },
      {
        name: 'integration', wpSelector: '.et_pb_section_5', htmlSelector: '.integration-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.integration-section h2', wpSel: '.et_pb_section_5 h2' },
        ],
      },
      {
        name: 'results', wpSelector: '.et_pb_section_6', htmlSelector: '.results-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.results-section h2', wpSel: '.et_pb_section_6 h2' },
        ],
      },
      {
        name: 'reports', wpSelector: '.et_pb_section_7', htmlSelector: '.reports-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.reports-section h2', wpSel: '.et_pb_section_7 h2' },
        ],
      },
      {
        name: 'section-2', wpSelector: '.et_pb_section_8', htmlSelector: '.dw-section:has(details)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dw-section:has(details) h2', wpSel: '.et_pb_section_8 h2' },
        ],
      },
      {
        name: 'product-detail-cta', wpSelector: '.et_pb_section_9', htmlSelector: '.product-detail-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.product-detail-cta h2', wpSel: '.et_pb_section_9 h2' },
        ],
      },
      {
        name: 'related-solutions', wpSelector: '.et_pb_section_10', htmlSelector: '.related-solutions',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_10 h2' },
        ],
      },
    ],
  },
};
