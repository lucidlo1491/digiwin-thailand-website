/**
 * th-industries.js — Thai Industries Hub page config for build-page.js
 *
 * 6 sections: hero, context, section, challenges, approach, cta
 * Page ID: 100781 (slug: th/industries)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-industries [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-ind-hero');
const thContext = require('./sections/th-ind-context');
const thSection = require('./sections/th-ind-section');
const thChallenges = require('./sections/th-ind-challenges');
const thApproach = require('./sections/th-ind-approach');
const thCta = require('./sections/th-ind-cta');

module.exports = {
  pageId: 100781,
  title: 'อุตสาหกรรมที่เราให้บริการ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries.html'),
  protoFile: 'industries.html',

  sections: [
    { name: 'hero', builder: thHero },
    { name: 'context', builder: thContext },
    { name: 'section', builder: thSection },
    { name: 'challenges', builder: thChallenges },
    { name: 'approach', builder: thApproach },
    { name: 'cta', builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/industries/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.industries-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.industries-hero h1', wpSel: '.et_pb_section_0 h1' },
        ],
      },
      {
        name: 'context', wpSelector: '.et_pb_section_1', htmlSelector: '.context-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.context-section h2', wpSel: '.et_pb_section_1 h2' },
        ],
      },
      {
        name: 'section', wpSelector: '.et_pb_section_2', htmlSelector: '.industries-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.industries-section h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
      {
        name: 'challenges', wpSelector: '.et_pb_section_3', htmlSelector: '.challenges-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.challenges-section h2', wpSel: '.et_pb_section_3 h2' },
        ],
      },
      {
        name: 'approach', wpSelector: '.et_pb_section_4', htmlSelector: '.approach-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.approach-section h2', wpSel: '.et_pb_section_4 h2' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_5', htmlSelector: '.cta-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.cta-section h2', wpSel: '.et_pb_section_5 h2' },
        ],
      },
    ],
  },
};
