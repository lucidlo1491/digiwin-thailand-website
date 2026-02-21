/**
 * partner-business-model.js — Business Model Crisis page config for build-page.js
 *
 * Batch 1: Highest priority. First sub-page in Partner Program journey.
 * 8 content sections, 6 builders (S3+S4 share bm-evidence.js).
 *
 * Usage: node complete_website/divi5/build-page.js --page partner-business-model [--dry-run]
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/bm-hero');
const patternBuilder = require('./sections/bm-pattern');
const evidenceBuilder = require('./sections/bm-evidence');
const futuresBuilder = require('./sections/bm-futures');
const solutionBuilder = require('./sections/bm-solution');
const compareBuilder = require('./sections/bm-compare');
const ctaBuilder = require('./sections/bm-cta');

module.exports = {
  pageId: 100558,
  title: 'The Business Model Crisis — DigiWin Partner Program',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_PartnerBusinessModel_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', 'partner-program', 'business-model.html'),
  protoFile: 'partner-program/business-model.html',

  // Sections in page order (top to bottom)
  // S3+S4 share bm-evidence.js (exports evidenceRow1 + evidenceRow2)
  sections: [
    { name: 'hero',           builder: heroBuilder },
    { name: 'pattern',        builder: patternBuilder },
    { name: 'evidence-row1',  builder: evidenceBuilder.evidenceRow1 },
    { name: 'evidence-row2',  builder: evidenceBuilder.evidenceRow2 },
    { name: 'futures',        builder: futuresBuilder },
    { name: 'solution',       builder: solutionBuilder },
    { name: 'compare',        builder: compareBuilder },
    { name: 'cta',            builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100558',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.dw-partner-hero h1', wpSel: '.et_pb_section_0 .bm-hero-title' },
        ],
      },
      {
        name: 'pattern', wpSelector: '.et_pb_section_1', htmlSelector: '.pattern-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.pattern-section h2', wpSel: '.pat-title' },
          { label: 'Pattern Step', htmlSel: '.pattern-step', wpSel: '.pat-step' },
        ],
      },
      {
        name: 'evidence-row1', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.math-section h2', wpSel: '.math-title' },
          { label: 'Math Card', htmlSel: '.math-card', wpSel: '.math-card' },
        ],
      },
      {
        name: 'evidence-row2', wpSelector: '.et_pb_section_3', htmlSelector: 'main > section:nth-child(4)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Math Card', htmlSel: 'main > section:nth-child(4) .math-card', wpSel: '.et_pb_section_3 .math-card' },
        ],
      },
      {
        name: 'futures', wpSelector: '.et_pb_section_4', htmlSelector: '.insight-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.insight-section h2', wpSel: '.futures-title' },
          { label: 'Insight Box', htmlSel: '.insight-box', wpSel: '.futures-insight' },
        ],
      },
      {
        name: 'solution', wpSelector: '.et_pb_section_5', htmlSelector: '.solution-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.solution-section h2', wpSel: '.sol-title' },
          { label: 'Solution Card', htmlSel: '.solution-card', wpSel: '.sol-card' },
        ],
      },
      {
        name: 'compare', wpSelector: '.et_pb_section_6', htmlSelector: '.compare-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.compare-section h2', wpSel: '.cmp-title' },
          { label: 'Compare Table', htmlSel: '.compare-table', wpSel: '.cmp-table' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_7', htmlSelector: '.dw-partner-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.dw-partner-cta h2', wpSel: '.bm-cta-title' },
        ],
      },
    ],
  },
};
