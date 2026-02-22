/**
 * case-studies.js — Case Studies page config for build-page.js
 *
 * WordPress page: Case Studies (ID 100749, slug: case-studies)
 * Prototype: case-studies.html
 * Sections: 10
 */

const path = require('path');

// Section builders
const csHeroBuilder = require('./sections/case-studies-cs-hero');
const csGridBuilder = require('./sections/case-studies-cs-grid');
const csDetailBuilder = require('./sections/case-studies-cs-detail');
const csDetail2Builder = require('./sections/case-studies-cs-detail-2');
const csDetail3Builder = require('./sections/case-studies-cs-detail-3');
const csDetail4Builder = require('./sections/case-studies-cs-detail-4');
const csDetail5Builder = require('./sections/case-studies-cs-detail-5');
const csListedBuilder = require('./sections/case-studies-cs-listed');
const csInsightsBuilder = require('./sections/case-studies-cs-insights');
const csCtaBuilder = require('./sections/case-studies-cs-cta');

module.exports = {
  pageId: 100749,
  title: 'Case Studies — Real Results from Thai Manufacturers',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'case-studies.html'),
  protoFile: 'case-studies.html',

  sections: [
    { name: 'cs-hero', builder: csHeroBuilder },
    { name: 'cs-grid', builder: csGridBuilder },
    { name: 'cs-detail', builder: csDetailBuilder },
    { name: 'cs-detail-2', builder: csDetail2Builder },
    { name: 'cs-detail-3', builder: csDetail3Builder },
    { name: 'cs-detail-4', builder: csDetail4Builder },
    { name: 'cs-detail-5', builder: csDetail5Builder },
    { name: 'cs-listed', builder: csListedBuilder },
    { name: 'cs-insights', builder: csInsightsBuilder },
    { name: 'cs-cta', builder: csCtaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100749',
    sections: [
      { name: 'cs-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.cs-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.cs-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'cs-cta', wpSelector: '.et_pb_section_9', htmlSelector: '.cs-cta-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.cs-cta-section h2', wpSel: '.et_pb_section_9 h2' }] },
    ],
  },
};
