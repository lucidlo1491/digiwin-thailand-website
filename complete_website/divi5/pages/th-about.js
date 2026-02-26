/**
 * th-about.js — Thai About Us page config for build-page.js
 *
 * 11 sections: hero, mission, timeline, stats-banner, market-leadership,
 *              beliefs, outcomes, thailand, asia-presence, awards, cta
 * Page ID: 100785 (slug: th/about-us)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-about [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-about-hero');
const thMission = require('./sections/th-about-mission');
const thTimeline = require('./sections/th-about-timeline');
const thStatsBanner = require('./sections/th-about-stats-banner');
const thMarketLeadership = require('./sections/th-about-market-leadership');
const thBeliefs = require('./sections/th-about-beliefs');
const thOutcomes = require('./sections/th-about-outcomes');
const thThailand = require('./sections/th-about-thailand');
const thAsiaPresence = require('./sections/th-about-asia-presence');
const thAwards = require('./sections/th-about-awards');
const thCta = require('./sections/th-about-cta');

module.exports = {
  pageId: 100785,
  title: 'เกี่ยวกับ DigiWin — 44 ปีแห่งความเชี่ยวชาญด้านการผลิต',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'about.html'),
  protoFile: 'about.html',

  sections: [
    { name: 'hero', builder: thHero },
    { name: 'mission', builder: thMission },
    { name: 'timeline', builder: thTimeline },
    { name: 'stats-banner', builder: thStatsBanner },
    { name: 'market-leadership', builder: thMarketLeadership },
    { name: 'beliefs', builder: thBeliefs },
    { name: 'outcomes', builder: thOutcomes },
    { name: 'thailand', builder: thThailand },
    { name: 'asia-presence', builder: thAsiaPresence },
    { name: 'awards', builder: thAwards },
    { name: 'cta', builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/about-us/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.about-hero',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.about-hero h1', wpSel: '.et_pb_section_0 h1' }],
      },
      {
        name: 'mission', wpSelector: '.et_pb_section_1', htmlSelector: '.mission-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.mission-section h2', wpSel: '.et_pb_section_1 h2' }],
      },
      {
        name: 'timeline', wpSelector: '.et_pb_section_2', htmlSelector: '.timeline-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.timeline-section h2', wpSel: '.et_pb_section_2 h2' }],
      },
      {
        name: 'stats-banner', wpSelector: '.et_pb_section_3', htmlSelector: '.stats-banner',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'Stat Value', htmlSel: '.stats-banner .stat-value', wpSel: '.et_pb_section_3 .stat-value' }],
      },
      {
        name: 'market-leadership', wpSelector: '.et_pb_section_4', htmlSelector: '.market-leadership',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.market-leadership h2', wpSel: '.et_pb_section_4 h2' }],
      },
      {
        name: 'beliefs', wpSelector: '.et_pb_section_5', htmlSelector: '.beliefs-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.beliefs-section h2', wpSel: '.et_pb_section_5 h2' }],
      },
      {
        name: 'outcomes', wpSelector: '.et_pb_section_6', htmlSelector: '.outcomes-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.outcomes-section h2', wpSel: '.et_pb_section_6 h2' }],
      },
      {
        name: 'thailand', wpSelector: '.et_pb_section_7', htmlSelector: '.thailand-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.thailand-section h2', wpSel: '.et_pb_section_7 h2' }],
      },
      {
        name: 'asia-presence', wpSelector: '.et_pb_section_8', htmlSelector: '.asia-presence',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.asia-presence h2', wpSel: '.et_pb_section_8 h2' }],
      },
      {
        name: 'awards', wpSelector: '.et_pb_section_9', htmlSelector: '.awards-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.awards-section h2', wpSel: '.et_pb_section_9 h2' }],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_10', htmlSelector: '.about-cta',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.about-cta h2', wpSel: '.et_pb_section_10 h2' }],
      },
    ],
  },
};
