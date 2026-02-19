/**
 * home.js — Homepage page config for build-page.js
 *
 * Declarative config: pageId, sections, prototype path, verification rules.
 * Each section references a builder module that exports blocks() and css().
 *
 * Usage: node complete_website/divi5/build-page.js --page home [--section hero] [--dry-run]
 */

const path = require('path');

// Section builders (header/footer are global — see divi5/global/)
const heroBuilder = require('./sections/home-hero');
const logoBarBuilder = require('./sections/home-logo-bar');
const factoryChecksBuilder = require('./sections/home-factory-checks');
const partnerChecksBuilder = require('./sections/home-partner-checks');
const productPillarsBuilder = require('./sections/home-product-pillars');
const industryTabsBuilder = require('./sections/home-industry-tabs');
const statsBannerBuilder = require('./sections/home-stats-banner');
const trustAnchorsBuilder = require('./sections/home-trust-anchors');
const provenResultsBuilder = require('./sections/home-proven-results');
const finalCtaBuilder = require('./sections/home-final-cta');

module.exports = {
  pageId: 100684,
  title: 'DigiWin Thailand \u2014 Smart Manufacturing ERP',
  siteUrl: 'https://digiwin-thailand.local',
  specPath: path.join(__dirname, '..', '..', '..', 'docs', 'content-specs', 'ContentSpec_Home_Divi5_2.0.md'),
  prototypePath: path.join(__dirname, '..', '..', 'index.html'),
  protoFile: 'index.html', // relative to complete_website/ — used by screenshot-reference.js

  // Sections in page order (top to bottom)
  sections: [
    { name: 'hero',            builder: heroBuilder },
    { name: 'logo-bar',        builder: logoBarBuilder },
    { name: 'factory-checks',  builder: factoryChecksBuilder },
    { name: 'partner-checks',  builder: partnerChecksBuilder },
    { name: 'product-pillars', builder: productPillarsBuilder },
    { name: 'industry-tabs',   builder: industryTabsBuilder },
    { name: 'stats-banner',    builder: statsBannerBuilder },
    { name: 'trust-anchors',   builder: trustAnchorsBuilder },
    { name: 'proven-results',  builder: provenResultsBuilder },
    { name: 'final-cta',       builder: finalCtaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  // Visual verification config — used by screenshot.js + visual-diff.js
  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100684',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-hero-split',
        maxDiffPct: 8, pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.hero-svg-illustration', label: 'Factory/Partner SVG Illustration', minOpacity: 0.01 },
          { selector: '.hero-grain', label: 'Grain Texture Overlay', minOpacity: 0.01 },
          { selector: '.hero-title', label: 'Hero Title' },
          { selector: '.hero-btn-row', label: 'CTA Buttons' },
          { selector: '.hero-stats', label: 'Stats Row' },
        ],
      },
      { name: 'logo-bar', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-clients-section', skipPixelDiff: true, maxDiffPct: 100 },
      {
        name: 'factory-checks', wpSelector: '.et_pb_section_2', htmlSelector: '.dw-checks-section--factory',
        maxDiffPct: 10, pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.checks-scene', label: 'Background Scene SVG', minOpacity: 0.01 },
          { selector: '.fchecks-deco', label: 'Super D Left Decoration', minOpacity: 0.01 },
          { selector: '.checks-card', label: 'Pain Point Cards' },
          { selector: '.checks-title', label: 'Section Title' },
        ],
      },
      {
        name: 'partner-checks', wpSelector: '.et_pb_section_3', htmlSelector: '.dw-checks-section--partner',
        maxDiffPct: 10, pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.pchecks-scene', label: 'Background Scene SVG', minOpacity: 0.01 },
          { selector: '.pchecks-card', label: 'Pain Point Cards' },
          { selector: '.pchecks-title', label: 'Section Title' },
        ],
      },
      {
        name: 'product-pillars', wpSelector: '.et_pb_section_4', htmlSelector: 'section.dw-section:nth-of-type(5)',
        maxDiffPct: 10, pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.products-deco', label: 'Super D Gradient Decoration', minOpacity: 0.01 },
          { selector: '.products-card', label: 'Product Cards' },
          { selector: '.products-header__title', label: 'Section Title' },
        ],
      },
      {
        name: 'industry-tabs', wpSelector: '.et_pb_section_5', htmlSelector: 'section.dw-section:nth-of-type(6)',
        maxDiffPct: 12, pixelThreshold: 0.1, note: 'tab state may differ',
      },
      {
        name: 'stats-banner', wpSelector: '.et_pb_section_6', htmlSelector: '.dw-stats-section',
        maxDiffPct: 10, pixelThreshold: 0.1, note: 'counters + grain texture',
        requiredElements: [
          { selector: '.stats-deco', label: 'Super D Corner Decoration', minOpacity: 0.01 },
          { selector: '.stats-grid', label: 'Stats Grid' },
          { selector: '.stats-number', label: 'Stat Numbers' },
        ],
      },
      {
        name: 'trust-anchors', wpSelector: '.et_pb_section_7', htmlSelector: '.dw-trust-section',
        maxDiffPct: 10, pixelThreshold: 0.1,
        requiredElements: [
          { selector: '.trust-scene', label: 'Trust Scene SVG', minOpacity: 0.01 },
          { selector: '.trust-card', label: 'Trust Cards' },
          { selector: '.trust-title', label: 'Section Title' },
        ],
      },
      {
        name: 'proven-results', wpSelector: '.et_pb_section_8', htmlSelector: '.dw-results-section',
        maxDiffPct: 10, pixelThreshold: 0.1,
      },
      {
        name: 'final-cta', wpSelector: '.et_pb_section_9', htmlSelector: '.dw-cta-section',
        maxDiffPct: 10, pixelThreshold: 0.1,
      },
    ],
  },

  pageJS: () => {
    if (typeof heroBuilder.js === 'function') return heroBuilder.js();
    return '';
  },
};
