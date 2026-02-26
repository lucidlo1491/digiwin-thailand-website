/**
 * th-metal-plastics.js — Thai Metal & Plastics page config for build-page.js
 *
 * WordPress page: Thai Metal & Plastics (ID 100784, slug: th/industries/metal-plastics)
 * 11 sections: all Thai content, English layout reused.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-metal-plastics [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-metal-plastics-metal-hero');
const thContext = require('./sections/th-metal-plastics-context');
const thChallenges = require('./sections/th-metal-plastics-challenges');
const thSolutions = require('./sections/th-metal-plastics-solutions');
const thSpecializedErp = require('./sections/th-metal-plastics-specialized-erp');
const thCaseStudy = require('./sections/th-metal-plastics-metal-case-study');
const thProcesses = require('./sections/th-metal-plastics-processes');
const thProducts = require('./sections/th-metal-plastics-products');
const thFaq = require('./sections/th-metal-plastics-metal-faq');
const thCta = require('./sections/th-metal-plastics-cta');
const thRelated = require('./sections/th-metal-plastics-related-solutions');

module.exports = {
  pageId: 100784,
  title: 'อุตสาหกรรมโลหะและพลาสติก — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries', 'metal-plastics.html'),
  protoFile: 'industries/metal-plastics.html',

  sections: [
    { name: 'metal-hero',       builder: thHero },
    { name: 'context',          builder: thContext },
    { name: 'challenges',       builder: thChallenges },
    { name: 'solutions',        builder: thSolutions },
    { name: 'specialized-erp',  builder: thSpecializedErp },
    { name: 'metal-case-study', builder: thCaseStudy },
    { name: 'processes',        builder: thProcesses },
    { name: 'products',         builder: thProducts },
    { name: 'metal-faq',        builder: thFaq },
    { name: 'cta',              builder: thCta },
    { name: 'related-solutions', builder: thRelated },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/industries/metal-plastics/',
    sections: [
      { name: 'metal-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.metal-hero', pixelThreshold: 0.1, styleMap: [{ label: 'Hero Title', htmlSel: '.metal-hero h2', wpSel: '.et_pb_section_0 h2' }] },
      { name: 'context', wpSelector: '.et_pb_section_1', htmlSelector: '.context-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.context-section h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'challenges', wpSelector: '.et_pb_section_2', htmlSelector: '.challenges-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.challenges-section h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'solutions', wpSelector: '.et_pb_section_3', htmlSelector: '.solutions-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.solutions-section h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'specialized-erp', wpSelector: '.et_pb_section_4', htmlSelector: '.specialized-erp-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.specialized-erp-section h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'metal-case-study', wpSelector: '.et_pb_section_5', htmlSelector: '.metal-case-study', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.metal-case-study h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'processes', wpSelector: '.et_pb_section_6', htmlSelector: '.processes-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.processes-section h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'products', wpSelector: '.et_pb_section_7', htmlSelector: '.products-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'metal-faq', wpSelector: '.et_pb_section_8', htmlSelector: '.metal-faq', pixelThreshold: 0.1, styleMap: [{ label: 'FAQ Title', htmlSel: '.metal-faq h2', wpSel: '.et_pb_section_8 h2' }] },
      { name: 'cta', wpSelector: '.et_pb_section_9', htmlSelector: '.cta-section', pixelThreshold: 0.1, styleMap: [{ label: 'CTA Title', htmlSel: '.cta-section h2', wpSel: '.et_pb_section_9 h2' }] },
      { name: 'related-solutions', wpSelector: '.et_pb_section_10', htmlSelector: '.related-solutions', pixelThreshold: 0.1, styleMap: [{ label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_10 h2' }] },
    ],
  },
};
