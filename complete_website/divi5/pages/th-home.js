/**
 * th-home.js — Thai Homepage page config for build-page.js
 *
 * Full Thai homepage: all 10 sections use Thai builders.
 * Each Thai builder merges English layout + Thai content from i18n/th/home.js.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-home [--dry-run]
 */

const path = require('path');

// Thai section builders (all 10 — merge or deep-merge patterns)
const thHeroBuilder = require('./sections/th-home-hero');
const thLogoBarBuilder = require('./sections/th-home-logo-bar');
const thFactoryChecksBuilder = require('./sections/th-home-factory-checks');
const thPartnerChecksBuilder = require('./sections/th-home-partner-checks');
const thProductPillarsBuilder = require('./sections/th-home-product-pillars');
const thIndustryTabsBuilder = require('./sections/th-home-industry-tabs');
const thStatsBannerBuilder = require('./sections/th-home-stats-banner');
const thTrustAnchorsBuilder = require('./sections/th-home-trust-anchors');
const thProvenResultsBuilder = require('./sections/th-home-proven-results');
const thFinalCtaBuilder = require('./sections/th-home-final-cta');

module.exports = {
  pageId: 100771,
  title: 'DigiWin Thailand \u2014 \u0e0b\u0e2d\u0e1f\u0e15\u0e4c\u0e41\u0e27\u0e23\u0e4c\u0e2d\u0e31\u0e08\u0e09\u0e23\u0e34\u0e22\u0e30\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e42\u0e23\u0e07\u0e07\u0e32\u0e19\u0e1c\u0e25\u0e34\u0e15\u0e44\u0e17\u0e22',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'index.html'),
  protoFile: 'index.html',

  // All 10 sections — fully Thai
  sections: [
    { name: 'hero',            builder: thHeroBuilder },
    { name: 'logo-bar',        builder: thLogoBarBuilder },
    { name: 'factory-checks',  builder: thFactoryChecksBuilder },
    { name: 'partner-checks',  builder: thPartnerChecksBuilder },
    { name: 'product-pillars', builder: thProductPillarsBuilder },
    { name: 'industry-tabs',   builder: thIndustryTabsBuilder },
    { name: 'stats-banner',    builder: thStatsBannerBuilder },
    { name: 'trust-anchors',   builder: thTrustAnchorsBuilder },
    { name: 'proven-results',  builder: thProvenResultsBuilder },
    { name: 'final-cta',       builder: thFinalCtaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  // Visual verification — uses Thai page URL
  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-hero-split', pixelThreshold: 0.1, note: 'Thai hero — all text Thai' },
      { name: 'logo-bar', wpSelector: '.logobar-section', htmlSelector: '.dw-clients-section', skipPixelDiff: true },
      { name: 'factory-checks', wpSelector: '.checks-section', htmlSelector: '.dw-checks-section--factory', pixelThreshold: 0.1 },
      { name: 'partner-checks', wpSelector: '.pchecks-section', htmlSelector: '.dw-checks-section--partner', pixelThreshold: 0.1 },
      { name: 'product-pillars', wpSelector: '.products-section', htmlSelector: 'section.dw-section:nth-of-type(5)', pixelThreshold: 0.1 },
      { name: 'industry-tabs', wpSelector: '.ind-section', htmlSelector: 'section.dw-section:nth-of-type(6)', pixelThreshold: 0.1 },
      { name: 'stats-banner', wpSelector: '.stats-section', htmlSelector: '.dw-stats-section', pixelThreshold: 0.1 },
      { name: 'trust-anchors', wpSelector: '.trust-section', htmlSelector: '.dw-trust-section', pixelThreshold: 0.1 },
      { name: 'proven-results', wpSelector: '.results-section', htmlSelector: '.dw-results-section', pixelThreshold: 0.1 },
      { name: 'final-cta', wpSelector: '.cta-section', htmlSelector: '.dw-cta-section', pixelThreshold: 0.1 },
    ],
  },
};
