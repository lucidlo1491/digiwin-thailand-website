/**
 * th-partner-economics.js — Thai Partner Economics page config
 *
 * 5 sections, all Thai.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-partner-economics [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

const thHero = require('./sections/th-econ-hero');
const thRevenue = require('./sections/th-econ-revenue');
const thJourney = require('./sections/th-econ-journey');
const thProtection = require('./sections/th-econ-protection');
const thCta = require('./sections/th-econ-cta');

module.exports = {
  pageId: 100775,
  title: 'เศรษฐศาสตร์พาร์ทเนอร์ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'partner-program', 'economics.html'),
  protoFile: 'partner-program/economics.html',

  sections: [
    { name: 'hero',       builder: thHero },
    { name: 'revenue',    builder: thRevenue },
    { name: 'journey',    builder: thJourney },
    { name: 'protection', builder: thProtection },
    { name: 'cta',        builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/partner-program/economics/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero', pixelThreshold: 0.1 },
      { name: 'revenue', wpSelector: '.et_pb_section_1', htmlSelector: 'main > section:nth-child(2)', pixelThreshold: 0.1 },
      { name: 'journey', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)', pixelThreshold: 0.1 },
      { name: 'protection', wpSelector: '.et_pb_section_3', htmlSelector: 'main > section:nth-child(4)', pixelThreshold: 0.1 },
      { name: 'cta', wpSelector: '.et_pb_section_4', htmlSelector: '.dw-partner-cta', pixelThreshold: 0.1 },
    ],
  },
};
