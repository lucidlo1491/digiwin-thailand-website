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
      { name: 'cs-grid', wpSelector: '.et_pb_section_1', htmlSelector: '.cs-grid-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Grid H2', htmlSel: '.cs-grid-section h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'cs-detail', wpSelector: '.et_pb_section_2', htmlSelector: '#case-ginfong', pixelThreshold: 0.1,
        styleMap: [{ label: 'Detail H2', htmlSel: '#case-ginfong h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'cs-detail-2', wpSelector: '.et_pb_section_3', htmlSelector: '#case-thai-alpha', pixelThreshold: 0.1,
        styleMap: [{ label: 'Detail2 H2', htmlSel: '#case-thai-alpha h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'cs-detail-3', wpSelector: '.et_pb_section_4', htmlSelector: '#case-thai-hosheng', pixelThreshold: 0.1,
        styleMap: [{ label: 'Detail3 H2', htmlSel: '#case-thai-hosheng h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'cs-detail-4', wpSelector: '.et_pb_section_5', htmlSelector: '#case-mufu', pixelThreshold: 0.1,
        styleMap: [{ label: 'Detail4 H2', htmlSel: '#case-mufu h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'cs-detail-5', wpSelector: '.et_pb_section_6', htmlSelector: '#case-taiyo', pixelThreshold: 0.1,
        styleMap: [{ label: 'Detail5 H2', htmlSel: '#case-taiyo h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'cs-listed', wpSelector: '.et_pb_section_7', htmlSelector: '.cs-listed-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Listed H2', htmlSel: '.cs-listed-section h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'cs-insights', wpSelector: '.et_pb_section_8', htmlSelector: '.cs-insights-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Insights H2', htmlSel: '.cs-insights-section h2', wpSel: '.et_pb_section_8 h2' }] },
      { name: 'cs-cta', wpSelector: '.et_pb_section_9', htmlSelector: '.cs-cta-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.cs-cta-section h2', wpSel: '.et_pb_section_9 h2' }] },
    ],
  },
};
