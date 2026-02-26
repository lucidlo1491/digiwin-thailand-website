/**
 * th-electronics.js — Thai Electronics industry page config for build-page.js
 *
 * 10 sections: hero, context, challenges, solutions, equipment,
 *              fade-in, products, section (FAQ), cta, related-solutions
 * Page ID: 100783 (slug: th/industries/electronics)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-electronics [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-elec-hero');
const thContext = require('./sections/th-elec-context');
const thChallenges = require('./sections/th-elec-challenges');
const thSolutions = require('./sections/th-elec-solutions');
const thEquipment = require('./sections/th-elec-equipment');
const thFadeIn = require('./sections/th-elec-fade-in');
const thProducts = require('./sections/th-elec-products');
const thSection = require('./sections/th-elec-section');
const thCta = require('./sections/th-elec-cta');
const thRelated = require('./sections/th-elec-related-solutions');

module.exports = {
  pageId: 100783,
  title: 'อุตสาหกรรมอิเล็กทรอนิกส์ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries', 'electronics.html'),
  protoFile: 'industries/electronics.html',

  sections: [
    { name: 'elec-hero', builder: thHero },
    { name: 'context', builder: thContext },
    { name: 'challenges', builder: thChallenges },
    { name: 'solutions', builder: thSolutions },
    { name: 'equipment', builder: thEquipment },
    { name: 'fade-in', builder: thFadeIn },
    { name: 'products', builder: thProducts },
    { name: 'section', builder: thSection },
    { name: 'cta', builder: thCta },
    { name: 'related-solutions', builder: thRelated },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/industries/electronics/',
    sections: [
      {
        name: 'elec-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.elec-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.elec-hero h2', wpSel: '.et_pb_section_0 h2' },
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
        name: 'challenges', wpSelector: '.et_pb_section_2', htmlSelector: '.challenges-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.challenges-section h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
      {
        name: 'solutions', wpSelector: '.et_pb_section_3', htmlSelector: '.solutions-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.solutions-section h2', wpSel: '.et_pb_section_3 h2' },
        ],
      },
      {
        name: 'equipment', wpSelector: '.et_pb_section_4', htmlSelector: '.equipment-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.equipment-section h2', wpSel: '.et_pb_section_4 h2' },
        ],
      },
      {
        name: 'fade-in', wpSelector: '.et_pb_section_5', htmlSelector: '.case-reference',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Case Title', htmlSel: '.case-reference h3', wpSel: '.et_pb_section_5 h3' },
        ],
      },
      {
        name: 'products', wpSelector: '.et_pb_section_6', htmlSelector: '.products-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_6 h2' },
        ],
      },
      {
        name: 'section', wpSelector: '.et_pb_section_7', htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dw-section h2', wpSel: '.et_pb_section_7 h2' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_8', htmlSelector: '.cta-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.cta-section h2', wpSel: '.et_pb_section_8 h2' },
        ],
      },
      {
        name: 'related-solutions', wpSelector: '.et_pb_section_9', htmlSelector: '.related-solutions',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_9 h2' },
        ],
      },
    ],
  },
};
