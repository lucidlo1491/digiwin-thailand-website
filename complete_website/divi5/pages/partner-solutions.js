/**
 * partner-solutions.js — Partner Solutions page config for build-page.js
 *
 * Batch 1: Final sub-page in Partner Program journey.
 * 6 content sections: hero, products, lifecycle, reverse-cut, competitive, CTA.
 * Page ID: 100560 (child of partner-program 100555, slug: solutions)
 *
 * Usage: node complete_website/divi5/build-page.js --page partner-solutions [--dry-run]
 */

const path = require('path');

// Section builders
const heroBuilder       = require('./sections/ps-hero');
const productsBuilder   = require('./sections/ps-products');
const lifecycleBuilder  = require('./sections/ps-lifecycle');
const reverseCutBuilder = require('./sections/ps-reverse-cut');
const competitiveBuilder = require('./sections/ps-competitive');
const ctaBuilder        = require('./sections/ps-cta');

module.exports = {
  pageId: 100560,
  title: 'Partner Solution Stack: ERP, MES, WMS, AIoT — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', 'docs', 'content-specs', 'ContentSpec_PartnerSolutions_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', 'partner-program', 'solutions.html'),
  protoFile: 'partner-program/solutions.html',

  // Sections in page order (top to bottom)
  sections: [
    { name: 'hero',         builder: heroBuilder },
    { name: 'products',     builder: productsBuilder },
    { name: 'lifecycle',    builder: lifecycleBuilder },
    { name: 'reverse-cut',  builder: reverseCutBuilder },
    { name: 'competitive',  builder: competitiveBuilder },
    { name: 'cta',          builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12, // wp:html blocks used for all content (Divi 5 code modules don't render server-side)
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/partner-program/solutions/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-partner-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.dw-partner-hero h1', wpSel: '.et_pb_section_0 .ps-hero-title' },
          { label: 'Hero Stat', htmlSel: '.stack-stat-value', wpSel: '.ps-hero-stat-value' },
        ],
      },
      {
        name: 'products', wpSelector: '.et_pb_section_1', htmlSelector: '.products-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.products-section h2', wpSel: '.ps-prod-title' },
          { label: 'Product Card', htmlSel: '.product-card', wpSel: '.ps-prod-card' },
          { label: 'Product Badge', htmlSel: '.product-badge', wpSel: '.ps-prod-badge' },
        ],
      },
      {
        name: 'lifecycle', wpSelector: '.et_pb_section_2', htmlSelector: '.lifecycle-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.lifecycle-section h2', wpSel: '.ps-lc-title' },
          { label: 'Phase Card', htmlSel: '.lifecycle-phase', wpSel: '.ps-lc-phase' },
        ],
      },
      {
        name: 'reverse-cut', wpSelector: '.et_pb_section_3', htmlSelector: '.reverse-cut-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.reverse-cut-section h2', wpSel: '.ps-rc-title' },
          { label: 'Phase Card', htmlSel: '.reverse-cut-phase', wpSel: '.ps-rc-phase' },
          { label: 'Comparison Table', htmlSel: '.comparison-table', wpSel: '.ps-rc-table' },
        ],
      },
      {
        name: 'competitive', wpSelector: '.et_pb_section_4', htmlSelector: '.competitive-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.competitive-section h2', wpSel: '.ps-comp-title' },
          { label: 'Competitive Card', htmlSel: '.competitive-card', wpSel: '.ps-comp-card' },
          { label: 'Ace Card', htmlSel: '.ace-card', wpSel: '.ps-comp-ace' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_5', htmlSelector: '.dw-partner-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.dw-partner-cta h2', wpSel: '.ps-cta-title' },
        ],
      },
    ],
  },
};
