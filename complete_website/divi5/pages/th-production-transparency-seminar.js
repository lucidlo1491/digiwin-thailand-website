/**
 * th-production-transparency-seminar.js — Thai Production Transparency Seminar page config
 *
 * WordPress page: Production Transparency Seminar Thai (ID 100793, slug: th/news/events/production-transparency-seminar)
 * Sections: 9 (same structure as English, Thai content)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-production-transparency-seminar [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const heroBuilder = require('./sections/th-pts-hero');
const problemBuilder = require('./sections/th-pts-problem');
const outcomesBuilder = require('./sections/th-pts-outcomes');
const agendaBuilder = require('./sections/th-pts-agenda');
const personasBuilder = require('./sections/th-pts-personas');
const proofBuilder = require('./sections/th-pts-proof');
const logisticsBuilder = require('./sections/th-pts-logistics');
const registerBuilder = require('./sections/th-pts-register');
const relatedBuilder = require('./sections/th-pts-related');

module.exports = {
  pageId: 100793,
  title: 'Production Transparency Seminar — สัมมนา',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events', 'production-transparency-seminar.html'),
  protoFile: 'events/production-transparency-seminar.html',

  sections: [
    { name: 'pts-hero', builder: heroBuilder },
    { name: 'pts-problem', builder: problemBuilder },
    { name: 'pts-outcomes', builder: outcomesBuilder },
    { name: 'pts-agenda', builder: agendaBuilder },
    { name: 'pts-personas', builder: personasBuilder },
    { name: 'pts-proof', builder: proofBuilder },
    { name: 'pts-logistics', builder: logisticsBuilder },
    { name: 'pts-register', builder: registerBuilder },
    { name: 'pts-related', builder: relatedBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/production-transparency-seminar/',
    sections: [
      { name: 'pts-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.event-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.event-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'pts-problem', wpSelector: '.et_pb_section_1', htmlSelector: 'section.event-section:nth-of-type(2)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(2) h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'pts-outcomes', wpSelector: '.et_pb_section_2', htmlSelector: 'section.event-section:nth-of-type(3)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(3) h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'pts-agenda', wpSelector: '.et_pb_section_3', htmlSelector: 'section.event-section:nth-of-type(4)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(4) h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'pts-personas', wpSelector: '.et_pb_section_4', htmlSelector: 'section.event-section:nth-of-type(5)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(5) h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'pts-proof', wpSelector: '.et_pb_section_5', htmlSelector: 'section.event-section:nth-of-type(6)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(6) h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'pts-logistics', wpSelector: '.et_pb_section_6', htmlSelector: 'section.event-section:nth-of-type(7)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(7) h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'pts-register', wpSelector: '.et_pb_section_7', htmlSelector: 'section.event-register-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.event-register-cta h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'pts-related', wpSelector: '.et_pb_section_8', htmlSelector: 'section.event-section:nth-of-type(9)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(9) h2', wpSel: '.et_pb_section_8 h2' }] },
    ],
  },
};
