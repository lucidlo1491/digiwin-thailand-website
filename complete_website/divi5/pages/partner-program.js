/**
 * partner-program.js — Partner Program page config for build-page.js
 *
 * Batch 1: Highest priority after homepage. Q2 distributor deadline.
 * 9 sections, 6 custom builders, 1 template reuse (cta-gradient).
 *
 * Usage: node complete_website/divi5/build-page.js --page partner-program [--dry-run]
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/partner-hero');
const painBuilder = require('./sections/partner-pain');
const alternativeBuilder = require('./sections/partner-alternative');
const offeringsBuilder = require('./sections/partner-offerings');
const journeyBuilder = require('./sections/partner-journey');
const marketTimingBuilder = require('./sections/partner-market-timing');
const finalCtaBuilder = require('./sections/partner-final-cta');

module.exports = {
  pageId: 100555,
  title: 'DigiWin Partner Program — Build Recurring Revenue',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_PartnerProgram_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', 'partner-program.html'),
  protoFile: 'partner-program.html',

  // Sections in page order (top to bottom)
  // S2+S3 share partner-pain.js (exports painRevenue + painOperational)
  // S6+S7 share partner-journey.js (exports journeyResearch + journeyTiers)
  sections: [
    { name: 'hero',             builder: heroBuilder },
    { name: 'pain-revenue',     builder: painBuilder.painRevenue },
    { name: 'pain-operational',  builder: painBuilder.painOperational },
    { name: 'alternative',      builder: alternativeBuilder },
    { name: 'offerings',        builder: offeringsBuilder },
    { name: 'journey-research', builder: journeyBuilder.journeyResearch },
    { name: 'journey-tiers',    builder: journeyBuilder.journeyTiers },
    { name: 'market-timing',    builder: marketTimingBuilder },
    { name: 'final-cta',        builder: finalCtaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100555',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.dw-partner-hero h1', wpSel: '.et_pb_section_0 .pp-hero-title' },
          { label: 'Hero Badge', htmlSel: '.partner-hero-badge', wpSel: '.et_pb_section_0 .pp-hero-badge' },
          { label: 'Stat Value', htmlSel: '.partner-stat-value', wpSel: '.et_pb_section_0 .pp-hero-stat-value' },
        ],
      },
      {
        name: 'pain-revenue', wpSelector: '.et_pb_section_1', htmlSelector: 'main > section:nth-child(2)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: 'main > section:nth-child(2) h2', wpSel: '.reality-title' },
          { label: 'Reality Card', htmlSel: 'main > section:nth-child(2) .reality-card', wpSel: '.reality-card' },
        ],
      },
      {
        name: 'pain-operational', wpSelector: '.et_pb_section_2', htmlSelector: 'main > section:nth-child(3)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: 'main > section:nth-child(3) h2', wpSel: '.reality-title' },
        ],
      },
      {
        name: 'alternative', wpSelector: '.et_pb_section_3', htmlSelector: '.transform-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.transform-section .dw-partner-section-header h2', wpSel: '.alt-title' },
          { label: 'Old Model Box', htmlSel: '.model-box.old h3', wpSel: '.alt-model-old h3' },
          { label: 'New Model Box', htmlSel: '.model-box.new h3', wpSel: '.alt-model-new h3' },
        ],
      },
      {
        name: 'offerings', wpSelector: '.et_pb_section_4', htmlSelector: '.offerings-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.offerings-section .dw-partner-section-header h2', wpSel: '.offer-title' },
          { label: 'Offering Card', htmlSel: '.offering-card', wpSel: '.offer-card' },
        ],
      },
      {
        name: 'journey-research', wpSelector: '.et_pb_section_5', htmlSelector: 'main > section:nth-child(6)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: 'main > section:nth-child(6) h2', wpSel: '.journey-title' },
        ],
      },
      {
        name: 'journey-tiers', wpSelector: '.et_pb_section_6', htmlSelector: 'main > section:nth-child(7)',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: 'main > section:nth-child(7) h2', wpSel: '.journey-title' },
        ],
      },
      {
        name: 'market-timing', wpSelector: '.et_pb_section_7', htmlSelector: '.market-timing',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.market-timing-header h2', wpSel: '.mkt-title' },
          { label: 'Stat Card', htmlSel: '.market-timing-card', wpSel: '.mkt-card' },
        ],
      },
      {
        name: 'final-cta', wpSelector: '.et_pb_section_8', htmlSelector: '.dw-partner-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.dw-partner-cta h2', wpSel: '.pp-cta-title' },
        ],
      },
    ],
  },
};
