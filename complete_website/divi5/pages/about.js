/**
 * about.js — About Us page config for build-page.js
 *
 * WordPress page: About Us (ID 100568, slug: about-us)
 * Prototype: about.html
 * Sections: 11
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/about-hero');
const missionBuilder = require('./sections/about-mission');
const timelineBuilder = require('./sections/about-timeline');
const statsBannerBuilder = require('./sections/about-stats-banner');
const marketLeadershipBuilder = require('./sections/about-market-leadership');
const beliefsBuilder = require('./sections/about-beliefs');
const outcomesBuilder = require('./sections/about-outcomes');
const thailandBuilder = require('./sections/about-thailand');
const asiaPresenceBuilder = require('./sections/about-asia-presence');
const awardsBuilder = require('./sections/about-awards');
const ctaBuilder = require('./sections/about-cta');

module.exports = {
  pageId: 100568,
  title: 'About DigiWin — 44 Years of Manufacturing Intelligence',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'about.html'),
  protoFile: 'about.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'mission', builder: missionBuilder },
    { name: 'timeline', builder: timelineBuilder },
    { name: 'stats-banner', builder: statsBannerBuilder },
    { name: 'market-leadership', builder: marketLeadershipBuilder },
    { name: 'beliefs', builder: beliefsBuilder },
    { name: 'outcomes', builder: outcomesBuilder },
    { name: 'thailand', builder: thailandBuilder },
    { name: 'asia-presence', builder: asiaPresenceBuilder },
    { name: 'awards', builder: awardsBuilder },
    { name: 'cta', builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100568',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.about-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.about-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'cta', wpSelector: '.et_pb_section_10', htmlSelector: '.about-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.about-cta h2', wpSel: '.et_pb_section_10 h2' }] },
    ],
  },
};
