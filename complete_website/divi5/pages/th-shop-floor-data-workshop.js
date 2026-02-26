/**
 * th-shop-floor-data-workshop.js — Thai Shop Floor Data Workshop page config
 *
 * WordPress page: Thai Shop Floor Data Workshop (ID 100794,
 *   slug: th/news/events/shop-floor-data-workshop)
 * Prototype: events/shop-floor-data-workshop.html (English — layout reference)
 * Sections: 9 (same structure as English, all text Thai)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-shop-floor-data-workshop [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const heroBuilder = require('./sections/th-sfd-hero');
const problemBuilder = require('./sections/th-sfd-problem');
const outcomesBuilder = require('./sections/th-sfd-outcomes');
const agendaBuilder = require('./sections/th-sfd-agenda');
const personasBuilder = require('./sections/th-sfd-personas');
const proofBuilder = require('./sections/th-sfd-proof');
const logisticsBuilder = require('./sections/th-sfd-logistics');
const registerBuilder = require('./sections/th-sfd-register');
const relatedBuilder = require('./sections/th-sfd-related');

module.exports = {
  pageId: 100794,
  title: 'เวิร์กช็อป: ตั้งค่าระบบเก็บข้อมูลพื้นที่การผลิตด้วย MES',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events/shop-floor-data-workshop.html'),
  protoFile: 'events/shop-floor-data-workshop.html',

  sections: [
    { name: 'sfd-hero', builder: heroBuilder },
    { name: 'sfd-problem', builder: problemBuilder },
    { name: 'sfd-outcomes', builder: outcomesBuilder },
    { name: 'sfd-agenda', builder: agendaBuilder },
    { name: 'sfd-personas', builder: personasBuilder },
    { name: 'sfd-proof', builder: proofBuilder },
    { name: 'sfd-logistics', builder: logisticsBuilder },
    { name: 'sfd-register', builder: registerBuilder },
    { name: 'sfd-related', builder: relatedBuilder },
  ],

  // Thai typography: Noto Sans Thai font + line-height + label overrides
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/shop-floor-data-workshop/',
    sections: [
      { name: 'sfd-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.event-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.event-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'sfd-problem', wpSelector: '.et_pb_section_1', htmlSelector: 'section.event-section:nth-of-type(2)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(2) h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'sfd-outcomes', wpSelector: '.et_pb_section_2', htmlSelector: 'section.event-section:nth-of-type(3)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(3) h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'sfd-agenda', wpSelector: '.et_pb_section_3', htmlSelector: 'section.event-section:nth-of-type(4)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(4) h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'sfd-personas', wpSelector: '.et_pb_section_4', htmlSelector: 'section.event-section:nth-of-type(5)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(5) h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'sfd-proof', wpSelector: '.et_pb_section_5', htmlSelector: 'section.event-section:nth-of-type(6)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(6) h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'sfd-logistics', wpSelector: '.et_pb_section_6', htmlSelector: 'section.event-section:nth-of-type(7)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(7) h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'sfd-register', wpSelector: '.et_pb_section_7', htmlSelector: 'section.event-register-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-register-cta h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'sfd-related', wpSelector: '.et_pb_section_8', htmlSelector: 'section.event-section:nth-of-type(9)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(9) h2', wpSel: '.et_pb_section_8 h2' }] },
    ],
  },
};
