/**
 * metal-plastics.js — metal-plastics page config for build-page.js
 *
 * WordPress page: Metal & Plastics Processing (ID 100767)
 * Prototype: industries/metal-plastics.html (939 lines, 11 sections)
 *
 * Usage: node complete_website/divi5/build-page.js --page metal-plastics [--dry-run]
 */

const path = require('path');

// Section builders
const metalHeroBuilder = require('./sections/metal-plastics-metal-hero');
const contextBuilder = require('./sections/metal-plastics-context');
const challengesBuilder = require('./sections/metal-plastics-challenges');
const solutionsBuilder = require('./sections/metal-plastics-solutions');
const specializedErpBuilder = require('./sections/metal-plastics-specialized-erp');
const metalCaseStudyBuilder = require('./sections/metal-plastics-metal-case-study');
const processesBuilder = require('./sections/metal-plastics-processes');
const productsBuilder = require('./sections/metal-plastics-products');
const metalFaqBuilder = require('./sections/metal-plastics-metal-faq');
const ctaBuilder = require('./sections/metal-plastics-cta');
const relatedBuilder = require('./sections/metal-plastics-related-solutions');

module.exports = {
  pageId: 100767,
  title: 'Metal & Plastics Processing Solutions — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries/metal-plastics.html'),
  protoFile: 'industries/metal-plastics.html',

  sections: [
    { name: 'metal-hero', builder: metalHeroBuilder },
    { name: 'context', builder: contextBuilder },
    { name: 'challenges', builder: challengesBuilder },
    { name: 'solutions', builder: solutionsBuilder },
    { name: 'specialized-erp', builder: specializedErpBuilder },
    { name: 'metal-case-study', builder: metalCaseStudyBuilder },
    { name: 'processes', builder: processesBuilder },
    { name: 'products', builder: productsBuilder },
    { name: 'metal-faq', builder: metalFaqBuilder },
    { name: 'cta', builder: ctaBuilder },
    { name: 'related-solutions', builder: relatedBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100767',
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
