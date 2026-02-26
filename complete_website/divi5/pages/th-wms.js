/**
 * th-wms.js — Thai WMS page config for build-page.js
 *
 * Full Thai WMS page: all 11 sections use Thai builders.
 * Each Thai builder copies English layout + Thai content from i18n/th/wms.js.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-wms [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders (all 11)
const thHeroBuilder = require('./sections/th-wms-hero');
const thSectionBuilder = require('./sections/th-wms-section');
const thProblemsBuilder = require('./sections/th-wms-problems');
const thCapabilitiesBuilder = require('./sections/th-wms-capabilities');
const thMobileFunctionsBuilder = require('./sections/th-wms-mobile-functions');
const thProcessFlowBuilder = require('./sections/th-wms-process-flow');
const thTransformationBuilder = require('./sections/th-wms-transformation');
const thIntegrationBuilder = require('./sections/th-wms-integration');
const thSection2Builder = require('./sections/th-wms-section-2');
const thProductDetailCtaBuilder = require('./sections/th-wms-product-detail-cta');
const thRelatedBuilder = require('./sections/th-wms-related-solutions');

module.exports = {
  pageId: 100779,
  title: 'WMS (\u0e23\u0e30\u0e1a\u0e1a\u0e08\u0e31\u0e14\u0e01\u0e32\u0e23\u0e04\u0e25\u0e31\u0e07\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32) \u2014 DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'wms.html'),
  protoFile: 'products/wms.html',

  // All 11 sections — fully Thai
  sections: [
    { name: 'hero', builder: thHeroBuilder },
    { name: 'section', builder: thSectionBuilder },
    { name: 'problems', builder: thProblemsBuilder },
    { name: 'capabilities', builder: thCapabilitiesBuilder },
    { name: 'mobile-functions', builder: thMobileFunctionsBuilder },
    { name: 'process-flow', builder: thProcessFlowBuilder },
    { name: 'transformation', builder: thTransformationBuilder },
    { name: 'integration', builder: thIntegrationBuilder },
    { name: 'section-2', builder: thSection2Builder },
    { name: 'product-detail-cta', builder: thProductDetailCtaBuilder },
    { name: 'related-solutions', builder: thRelatedBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  // Visual verification — uses Thai page URL
  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/products/wms/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.wms-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.wms-hero h2', wpSel: '.et_pb_section_0 h2' },
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
        name: 'problems', wpSelector: '.et_pb_section_2', htmlSelector: '.problems-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.problems-section h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
      {
        name: 'capabilities', wpSelector: '.et_pb_section_3', htmlSelector: '.wms-capabilities-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.wms-capabilities-section h2', wpSel: '.et_pb_section_3 h2' },
        ],
      },
      {
        name: 'mobile-functions', wpSelector: '.et_pb_section_4', htmlSelector: '.mobile-functions-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.mobile-functions-section h2', wpSel: '.et_pb_section_4 h2' },
        ],
      },
      {
        name: 'process-flow', wpSelector: '.et_pb_section_5', htmlSelector: '.process-flow-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.process-flow-section h2', wpSel: '.et_pb_section_5 h2' },
        ],
      },
      {
        name: 'transformation', wpSelector: '.et_pb_section_6', htmlSelector: '.transformation-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.transformation-section h2', wpSel: '.et_pb_section_6 h2' },
        ],
      },
      {
        name: 'integration', wpSelector: '.et_pb_section_7', htmlSelector: '.integration-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.integration-section h2', wpSel: '.et_pb_section_7 h2' },
        ],
      },
      {
        name: 'section-2', wpSelector: '.et_pb_section_8', htmlSelector: '.wms-faq',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'FAQ Title', htmlSel: '.wms-faq h2', wpSel: '.et_pb_section_8 h2' },
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
