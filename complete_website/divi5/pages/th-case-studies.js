/**
 * th-case-studies.js — Thai Case Studies page config for build-page.js
 *
 * WordPress page: Thai Case Studies (ID 100786, slug: th/case-studies)
 * 10 sections: all Thai content, English layout reused.
 *
 * Usage: node complete_website/divi5/build-page.js --page th-case-studies [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-cs-hero');
const thGrid = require('./sections/th-cs-grid');
const thDetail = require('./sections/th-cs-detail');
const thDetail2 = require('./sections/th-cs-detail-2');
const thDetail3 = require('./sections/th-cs-detail-3');
const thDetail4 = require('./sections/th-cs-detail-4');
const thDetail5 = require('./sections/th-cs-detail-5');
const thListed = require('./sections/th-cs-listed');
const thInsights = require('./sections/th-cs-insights');
const thCta = require('./sections/th-cs-cta');

module.exports = {
  pageId: 100786,
  title: 'กรณีศึกษา — ผลลัพธ์จริงจากโรงงานผลิตไทย',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'case-studies.html'),
  protoFile: 'case-studies.html',

  sections: [
    { name: 'cs-hero',     builder: thHero },
    { name: 'cs-grid',     builder: thGrid },
    { name: 'cs-detail',   builder: thDetail },
    { name: 'cs-detail-2', builder: thDetail2 },
    { name: 'cs-detail-3', builder: thDetail3 },
    { name: 'cs-detail-4', builder: thDetail4 },
    { name: 'cs-detail-5', builder: thDetail5 },
    { name: 'cs-listed',   builder: thListed },
    { name: 'cs-insights', builder: thInsights },
    { name: 'cs-cta',      builder: thCta },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/case-studies/',
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
