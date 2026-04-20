/**
 * th-products.js — Thai Products Hub page config for build-page.js
 *
 * 5 sections: hero, grid, integration, why, cta
 * Page ID: 100776 (slug: th/products)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-products [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-products-hero');
const thGrid = require('./sections/th-products-grid');
const thIntegration = require('./sections/th-products-integration');
const thWhy = require('./sections/th-products-why');
const thCta = require('./sections/th-products-cta');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100776,
  title: 'ซอฟต์แวร์การผลิต: ERP, MES, WMS, AIoT — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products.html'),
  protoFile: 'products.html',

  sections: [
    { name: 'hero', builder: thHero },
    { name: 'grid', builder: thGrid },
    { name: 'integration', builder: thIntegration },
    { name: 'why', builder: thWhy },
    { name: 'cta', builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E1C\u0E25\u0E34\u0E15\u0E20\u0E31\u0E13\u0E11\u0E4C', url: '/th/products/' },
      ])),
      schema.thaiVariant(schema.webPage({
        type: 'CollectionPage',
        name: 'DigiWin Manufacturing Software Products',
        description: 'Complete manufacturing software suite: ERP, MES, WMS, and AIoT. 44 years of manufacturing focus.',
        url: '/th/products/',
      })),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 10,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/products/',
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
