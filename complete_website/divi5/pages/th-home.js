/**
 * th-home.js — Thai Homepage page config for build-page.js
 *
 * Thai hero + 9 English sections (reused from home.js).
 * POC: proves bilingual architecture works through the build pipeline.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-home [--dry-run]
 */

const path = require('path');

// Thai hero section
const thHeroBuilder = require('./sections/th-home-hero');

// Reuse all other English section builders
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
  pageId: 100771,
  title: 'DigiWin Thailand \u2014 \u0e0b\u0e2d\u0e1f\u0e15\u0e4c\u0e41\u0e27\u0e23\u0e4c\u0e2d\u0e31\u0e08\u0e09\u0e23\u0e34\u0e22\u0e30\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e42\u0e23\u0e07\u0e07\u0e32\u0e19\u0e1c\u0e25\u0e34\u0e15\u0e44\u0e17\u0e22',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'index.html'),
  protoFile: 'index.html',

  // Sections in page order (Thai hero + 9 English sections)
  sections: [
    { name: 'hero',            builder: thHeroBuilder },
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

  // Visual verification — uses Thai page URL
  // Reuses English homepage selectors for sections 2-10 (identical builders)
  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.dw-hero-split', pixelThreshold: 0.1, note: 'Thai hero — text differs from English' },
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
