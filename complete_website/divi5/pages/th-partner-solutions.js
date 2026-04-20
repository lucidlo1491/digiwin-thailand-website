/**
 * th-partner-solutions.js — Thai Partner Solutions page config
 *
 * 6 sections, all Thai.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-partner-solutions [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

const thHero = require('./sections/th-ps-hero');
const thProducts = require('./sections/th-ps-products');
const thLifecycle = require('./sections/th-ps-lifecycle');
const thReverseCut = require('./sections/th-ps-reverse-cut');
const thCompetitive = require('./sections/th-ps-competitive');
const thCta = require('./sections/th-ps-cta');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100774,
  title: 'ชุดโซลูชันพาร์ทเนอร์ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'partner-program', 'solutions.html'),
  protoFile: 'partner-program/solutions.html',

  sections: [
    { name: 'hero',        builder: thHero },
    { name: 'products',    builder: thProducts },
    { name: 'lifecycle',   builder: thLifecycle },
    { name: 'reverse-cut', builder: thReverseCut },
    { name: 'competitive', builder: thCompetitive },
    { name: 'cta',         builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E1E\u0E32\u0E23\u0E4C\u0E17\u0E40\u0E19\u0E2D\u0E23\u0E4C', url: '/th/partner-program/' },
        { name: '\u0E42\u0E0B\u0E25\u0E39\u0E0A\u0E31\u0E48\u0E19', url: '/th/partner-program/solutions/' },
      ])),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/partner-program/solutions/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero', pixelThreshold: 0.1 },
      { name: 'products', wpSelector: '.et_pb_section_1', htmlSelector: 'main > section:nth-child(2)', pixelThreshold: 0.1 },
      { name: 'lifecycle', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)', pixelThreshold: 0.1 },
      { name: 'reverse-cut', wpSelector: '.et_pb_section_3', htmlSelector: 'main > section:nth-child(4)', pixelThreshold: 0.1 },
      { name: 'competitive', wpSelector: '.et_pb_section_4', htmlSelector: 'main > section:nth-child(5)', pixelThreshold: 0.1 },
      { name: 'cta', wpSelector: '.et_pb_section_5', htmlSelector: '.dw-partner-cta', pixelThreshold: 0.1 },
    ],
  },
};
