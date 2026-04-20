/**
 * th-automotive.js — Thai Automotive industry page config for build-page.js
 *
 * WordPress page: Thai Automotive (ID 100782, slug: th/industries/automotive)
 * 10 sections: all Thai content, English layout reused.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-automotive [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-auto-hero');
const thContext = require('./sections/th-auto-context');
const thStakes = require('./sections/th-auto-stakes');
const thSolutions = require('./sections/th-auto-solutions');
const thProducts = require('./sections/th-auto-products');
const thSection = require('./sections/th-auto-section');
const thSection2 = require('./sections/th-auto-section-2');
const thSection3 = require('./sections/th-auto-section-3');
const thCta = require('./sections/th-auto-cta');
const thRelated = require('./sections/th-auto-related-solutions');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100782,
  title: 'อุตสาหกรรมยานยนต์ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries', 'automotive.html'),
  protoFile: 'industries/automotive.html',

  sections: [
    { name: 'auto-hero',          builder: thHero },
    { name: 'context',            builder: thContext },
    { name: 'stakes',             builder: thStakes },
    { name: 'solutions',          builder: thSolutions },
    { name: 'products',           builder: thProducts },
    { name: 'section',            builder: thSection },
    { name: 'section-2',          builder: thSection2 },
    { name: 'section-3',          builder: thSection3 },
    { name: 'cta',                builder: thCta },
    { name: 'related-solutions',  builder: thRelated },
  ],

  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21', url: '/th/industries/' },
        { name: '\u0E0A\u0E34\u0E49\u0E19\u0E2A\u0E48\u0E27\u0E19\u0E22\u0E32\u0E19\u0E22\u0E19\u0E15\u0E4C', url: '/th/industries/automotive/' },
      ])),
      schema.thaiVariant(schema.webPage({
        name: 'Automotive Parts Manufacturing Solutions',
        description: 'ERP and MES solutions for automotive parts manufacturers in Thailand. JIT scheduling, EDI integration, IATF 16949 compliance.',
        url: '/th/industries/automotive/',
      })),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/industries/automotive/',
    sections: [
      { name: 'auto-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.auto-hero', pixelThreshold: 0.1 },
      { name: 'context', wpSelector: '.et_pb_section_1', htmlSelector: '.context-section', pixelThreshold: 0.1 },
      { name: 'stakes', wpSelector: '.et_pb_section_2', htmlSelector: '.stakes-section', pixelThreshold: 0.1 },
      { name: 'solutions', wpSelector: '.et_pb_section_3', htmlSelector: '.solutions-section', pixelThreshold: 0.1 },
      { name: 'products', wpSelector: '.et_pb_section_4', htmlSelector: '.products-section', pixelThreshold: 0.1 },
      { name: 'section', wpSelector: '.et_pb_section_5', htmlSelector: '.dw-section', pixelThreshold: 0.1 },
      { name: 'section-2', wpSelector: '.et_pb_section_6', htmlSelector: '.dw-section', pixelThreshold: 0.1 },
      { name: 'section-3', wpSelector: '.et_pb_section_7', htmlSelector: 'section:nth-of-type(8)', pixelThreshold: 0.15 },
      { name: 'cta', wpSelector: '.et_pb_section_8', htmlSelector: '.cta-section', pixelThreshold: 0.1 },
      { name: 'related-solutions', wpSelector: '.et_pb_section_9', htmlSelector: '.related-solutions', pixelThreshold: 0.1 },
    ],
  },
};
