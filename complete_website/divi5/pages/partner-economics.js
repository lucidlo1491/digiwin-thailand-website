/**
 * partner-economics.js — Partner Economics page config for build-page.js
 *
 * Batch 1: Second sub-page in Partner Program journey.
 * 5 content sections: hero, revenue, journey, protection, CTA.
 * Page ID: 100559
 *
 * Usage: node complete_website/divi5/build-page.js --page partner-economics [--dry-run]
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/econ-hero');
const revenueBuilder = require('./sections/econ-revenue');
const journeyBuilder = require('./sections/econ-journey');
const protectionBuilder = require('./sections/econ-protection');
const ctaBuilder = require('./sections/econ-cta');

module.exports = {
  pageId: 100559,
  title: 'Partner Economics: Revenue & Margins — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_PartnerEconomics_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', 'partner-program', 'economics.html'),
  protoFile: 'partner-program/economics.html',

  // Sections in page order (top to bottom)
  sections: [
    { name: 'hero',       builder: heroBuilder },
    { name: 'revenue',    builder: revenueBuilder },
    { name: 'journey',    builder: journeyBuilder },
    { name: 'protection', builder: protectionBuilder },
    { name: 'cta',        builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100559',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.dw-partner-hero h1', wpSel: '.et_pb_section_0 .econ-hero-title' },
          { label: 'Proof Value', htmlSel: '.proof-value', wpSel: '.econ-hero-proof-value' },
        ],
      },
      {
        name: 'revenue', wpSelector: '.et_pb_section_1', htmlSelector: '.revenue-model-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.revenue-model-section h2', wpSel: '.rev-title' },
          { label: 'Revenue Stream', htmlSel: '.revenue-stream', wpSel: '.rev-stream' },
        ],
      },
      {
        name: 'journey', wpSelector: '.et_pb_section_2', htmlSelector: '.journey-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.journey-section h2', wpSel: '.jny-title' },
          { label: 'Year Phase', htmlSel: '.year-phase', wpSel: '.jny-phase' },
          { label: 'Summary Bar', htmlSel: '.summary-bar', wpSel: '.jny-bar' },
        ],
      },
      {
        name: 'protection', wpSelector: '.et_pb_section_3', htmlSelector: '.protection-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.protection-section h2', wpSel: '.prot-title' },
          { label: 'Protection Card', htmlSel: '.protection-card', wpSel: '.prot-card' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_4', htmlSelector: '.dw-partner-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.dw-partner-cta h2', wpSel: '.ec-cta-title' },
        ],
      },
    ],
  },
};
