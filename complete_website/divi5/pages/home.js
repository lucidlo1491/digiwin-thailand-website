/**
 * home.js — Homepage page config for build-page.js
 *
 * Declarative config: pageId, sections, prototype path, verification rules.
 * Each section references a builder module that exports blocks() and css().
 *
 * Usage: node complete_website/divi5/build-page.js --page home [--section hero] [--dry-run]
 */

const path = require('path');

// Section builders
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
  // goldenRef: 'hero', // Hero golden ref is section-specific; needs update for full-page module numbering

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

  pageJS: () => {
    if (typeof heroBuilder.js === 'function') return heroBuilder.js();
    return '';
  },
};
