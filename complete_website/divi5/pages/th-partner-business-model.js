/**
 * th-partner-business-model.js — Thai Business Model Crisis page config
 *
 * 8 sections, all Thai.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-partner-business-model [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

const thHero = require('./sections/th-bm-hero');
const thPattern = require('./sections/th-bm-pattern');
const thEvidenceRow1 = require('./sections/th-bm-evidence-row1');
const thEvidenceRow2 = require('./sections/th-bm-evidence-row2');
const thFutures = require('./sections/th-bm-futures');
const thSolution = require('./sections/th-bm-solution');
const thCompare = require('./sections/th-bm-compare');
const thCta = require('./sections/th-bm-cta');

module.exports = {
  pageId: 100773,
  title: 'วิกฤตโมเดลธุรกิจ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'partner-program', 'business-model.html'),
  protoFile: 'partner-program/business-model.html',

  sections: [
    { name: 'hero',           builder: thHero },
    { name: 'pattern',        builder: thPattern },
    { name: 'evidence-row1',  builder: thEvidenceRow1 },
    { name: 'evidence-row2',  builder: thEvidenceRow2 },
    { name: 'futures',        builder: thFutures },
    { name: 'solution',       builder: thSolution },
    { name: 'compare',        builder: thCompare },
    { name: 'cta',            builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/partner-program/business-model/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero', pixelThreshold: 0.1 },
      { name: 'pattern', wpSelector: '.et_pb_section_1', htmlSelector: 'main > section:nth-child(2)', pixelThreshold: 0.1 },
      { name: 'evidence-row1', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)', pixelThreshold: 0.1 },
      { name: 'evidence-row2', wpSelector: '.et_pb_section_3', htmlSelector: 'main > section:nth-child(4)', pixelThreshold: 0.1 },
      { name: 'futures', wpSelector: '.et_pb_section_4', htmlSelector: 'main > section:nth-child(5)', pixelThreshold: 0.1 },
      { name: 'solution', wpSelector: '.et_pb_section_5', htmlSelector: 'main > section:nth-child(6)', pixelThreshold: 0.1 },
      { name: 'compare', wpSelector: '.et_pb_section_6', htmlSelector: 'main > section:nth-child(7)', pixelThreshold: 0.1 },
      { name: 'cta', wpSelector: '.et_pb_section_7', htmlSelector: '.dw-partner-cta', pixelThreshold: 0.1 },
    ],
  },
};
