/**
 * th-erp.js — Thai ERP product page config for build-page.js
 *
 * WordPress page: Thai ERP (ID 100777, slug: th/products/erp)
 * 10 sections: all Thai content, English layout reused.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-erp [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-erp-hero');
const thWhatIsErp = require('./sections/th-erp-section');
const thPain = require('./sections/th-erp-pain');
const thProducts = require('./sections/th-erp-products');
const thCapabilities = require('./sections/th-erp-capabilities');
const thSection6 = require('./sections/th-erp-section-6');
const thIntegration = require('./sections/th-erp-integration');
const thFaq = require('./sections/th-erp-faq');
const thCta = require('./sections/th-erp-cta');
const thRelated = require('./sections/th-erp-related-solutions');

module.exports = {
  pageId: 100777,
  title: 'ERP สำหรับการผลิต — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'erp.html'),
  protoFile: 'products/erp.html',

  sections: [
    { name: 'hero',             builder: thHero },
    { name: 'what-is-erp',      builder: thWhatIsErp },
    { name: 'pain',             builder: thPain },
    { name: 'products',         builder: thProducts },
    { name: 'capabilities',     builder: thCapabilities },
    { name: 'section-6',        builder: thSection6 },
    { name: 'integration',      builder: thIntegration },
    { name: 'faq',              builder: thFaq },
    { name: 'cta',              builder: thCta },
    { name: 'related-solutions', builder: thRelated },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 14,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/products/erp/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.erp-hero', pixelThreshold: 0.1 },
      { name: 'what-is-erp', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-section', pixelThreshold: 0.15 },
      { name: 'pain', wpSelector: '.et_pb_section_2', htmlSelector: '.pain-section', pixelThreshold: 0.1 },
      { name: 'products', wpSelector: '.et_pb_section_3', htmlSelector: '.products-section', pixelThreshold: 0.1 },
      { name: 'capabilities', wpSelector: '.et_pb_section_4', htmlSelector: '.capabilities-section', pixelThreshold: 0.1 },
      { name: 'section-6', wpSelector: '.et_pb_section_5', htmlSelector: 'section:nth-of-type(6)', pixelThreshold: 0.15 },
      { name: 'integration', wpSelector: '.et_pb_section_6', htmlSelector: '.integration-section', pixelThreshold: 0.1 },
      { name: 'faq', wpSelector: '.et_pb_section_7', htmlSelector: 'section:nth-of-type(8)', pixelThreshold: 0.15 },
      { name: 'cta', wpSelector: '.et_pb_section_8', htmlSelector: '.erp-cta', pixelThreshold: 0.1 },
      { name: 'related-solutions', wpSelector: '.et_pb_section_9', htmlSelector: '.related-solutions', pixelThreshold: 0.1 },
    ],
  },
};
