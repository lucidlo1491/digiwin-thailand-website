/**
 * products.js — Products Hub page config for build-page.js
 *
 * Batch 2: Products Hub — routes visitors to ERP, MES, WMS, AIoT sub-pages.
 * 5 sections: hero, product grid, integration, why, CTA.
 * Page ID: 100556 (top-level, slug: products)
 *
 * Usage: node complete_website/divi5/build-page.js --page products [--dry-run]
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/products-hero');
const gridBuilder = require('./sections/products-grid');
const integrationBuilder = require('./sections/products-integration');
const whyBuilder = require('./sections/products-why');
const ctaBuilder = require('./sections/products-cta');

module.exports = {
  pageId: 100556,
  title: 'Manufacturing Software: ERP, MES, WMS, AIoT — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', 'docs', 'content-specs', 'ContentSpec_Products_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', 'products.html'),
  protoFile: 'products.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'grid', builder: gridBuilder },
    { name: 'integration', builder: integrationBuilder },
    { name: 'why', builder: whyBuilder },
    { name: 'cta', builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 10,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/products/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.products-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Hero Title', htmlSel: '.products-hero h1', wpSel: '.prod-hero-title' },
          { label: 'Hero Stat', htmlSel: '.hero-stat-value', wpSel: '.prod-hero-stat-value' },
        ],
      },
      {
        name: 'grid', wpSelector: '.et_pb_section_1', htmlSelector: '.products-grid-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.products-grid-section h2', wpSel: '.prod-grid-title' },
          { label: 'Product Card', htmlSel: '.pp-card', wpSel: '.prod-card' },
        ],
      },
      {
        name: 'integration', wpSelector: '.et_pb_section_2', htmlSelector: '.integration-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.integration-section h2', wpSel: '.prod-int-title' },
        ],
      },
      {
        name: 'why', wpSelector: '.et_pb_section_3', htmlSelector: '.why-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.why-section h2', wpSel: '.prod-why-title' },
          { label: 'Why Card', htmlSel: '.why-card', wpSel: '.prod-why-card' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_4', htmlSelector: '.products-cta',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'CTA Title', htmlSel: '.products-cta h2', wpSel: '.prod-cta-title' },
        ],
      },
    ],
  },
};
