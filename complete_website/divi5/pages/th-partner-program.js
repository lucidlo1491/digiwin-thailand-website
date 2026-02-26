/**
 * th-partner-program.js — Thai Partner Program page config
 *
 * 9 sections, all Thai. Uses Thai builders that merge English layout + Thai content.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-partner-program [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-partner-hero');
const thPainRevenue = require('./sections/th-partner-pain-revenue');
const thPainOperational = require('./sections/th-partner-pain-operational');
const thAlternative = require('./sections/th-partner-alternative');
const thOfferings = require('./sections/th-partner-offerings');
const thJourneyResearch = require('./sections/th-partner-journey-research');
const thJourneyTiers = require('./sections/th-partner-journey-tiers');
const thMarketTiming = require('./sections/th-partner-market-timing');
const thFinalCta = require('./sections/th-partner-final-cta');

module.exports = {
  pageId: 100772,
  title: 'โปรแกรมพันธมิตร DigiWin — สร้างรายได้ต่อเนื่อง',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'partner-program.html'),
  protoFile: 'partner-program.html',

  sections: [
    { name: 'hero',             builder: thHero },
    { name: 'pain-revenue',     builder: thPainRevenue },
    { name: 'pain-operational', builder: thPainOperational },
    { name: 'alternative',      builder: thAlternative },
    { name: 'offerings',        builder: thOfferings },
    { name: 'journey-research', builder: thJourneyResearch },
    { name: 'journey-tiers',    builder: thJourneyTiers },
    { name: 'market-timing',    builder: thMarketTiming },
    { name: 'final-cta',        builder: thFinalCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/partner-program/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero', pixelThreshold: 0.1 },
      { name: 'pain-revenue', wpSelector: '.et_pb_section_1', htmlSelector: 'main > section:nth-child(2)', pixelThreshold: 0.1 },
      { name: 'pain-operational', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)', pixelThreshold: 0.1 },
      { name: 'alternative', wpSelector: '.et_pb_section_3', htmlSelector: '.transform-section', pixelThreshold: 0.1 },
      { name: 'offerings', wpSelector: '.et_pb_section_4', htmlSelector: '.offerings-section', pixelThreshold: 0.1 },
      { name: 'journey-research', wpSelector: '.et_pb_section_5', htmlSelector: 'main > section:nth-child(6)', pixelThreshold: 0.1 },
      { name: 'journey-tiers', wpSelector: '.et_pb_section_6', htmlSelector: 'main > section:nth-child(7)', pixelThreshold: 0.1 },
      { name: 'market-timing', wpSelector: '.et_pb_section_7', htmlSelector: '.market-timing', pixelThreshold: 0.1 },
      { name: 'final-cta', wpSelector: '.et_pb_section_8', htmlSelector: '.dw-partner-cta', pixelThreshold: 0.1 },
    ],
  },
};
