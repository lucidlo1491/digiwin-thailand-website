/**
 * th-factory-tour-mes.js — Thai Factory Tour MES page config
 *
 * WordPress page: Thai Factory Tour MES (ID 100791, slug: th/news/events/factory-tour-mes)
 * Sections: 9 (same structure as English, all Thai text)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-factory-tour-mes [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHeroBuilder = require('./sections/th-ftm-hero');
const thProblemBuilder = require('./sections/th-ftm-problem');
const thOutcomesBuilder = require('./sections/th-ftm-outcomes');
const thAgendaBuilder = require('./sections/th-ftm-agenda');
const thPersonasBuilder = require('./sections/th-ftm-personas');
const thProofBuilder = require('./sections/th-ftm-proof');
const thLogisticsBuilder = require('./sections/th-ftm-logistics');
const thRegisterBuilder = require('./sections/th-ftm-register');
const thRelatedBuilder = require('./sections/th-ftm-related');

module.exports = {
  pageId: 100791,
  title: 'ทัวร์โรงงานจริง: ดู DigiWin MES ทำงานจริง',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events/factory-tour-mes.html'),
  protoFile: 'events/factory-tour-mes.html',

  sections: [
    { name: 'ftm-hero', builder: thHeroBuilder },
    { name: 'ftm-problem', builder: thProblemBuilder },
    { name: 'ftm-outcomes', builder: thOutcomesBuilder },
    { name: 'ftm-agenda', builder: thAgendaBuilder },
    { name: 'ftm-personas', builder: thPersonasBuilder },
    { name: 'ftm-proof', builder: thProofBuilder },
    { name: 'ftm-logistics', builder: thLogisticsBuilder },
    { name: 'ftm-register', builder: thRegisterBuilder },
    { name: 'ftm-related', builder: thRelatedBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/factory-tour-mes/',
    sections: [
      { name: 'ftm-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.event-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.event-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'ftm-problem', wpSelector: '.et_pb_section_1', htmlSelector: 'section.event-section:nth-of-type(2)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(2) h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'ftm-outcomes', wpSelector: '.et_pb_section_2', htmlSelector: 'section.event-section:nth-of-type(3)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(3) h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'ftm-agenda', wpSelector: '.et_pb_section_3', htmlSelector: 'section.event-section:nth-of-type(4)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(4) h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'ftm-personas', wpSelector: '.et_pb_section_4', htmlSelector: 'section.event-section:nth-of-type(5)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(5) h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'ftm-proof', wpSelector: '.et_pb_section_5', htmlSelector: 'section.event-section:nth-of-type(6)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(6) h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'ftm-logistics', wpSelector: '.et_pb_section_6', htmlSelector: 'section.event-section:nth-of-type(7)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(7) h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'ftm-register', wpSelector: '.et_pb_section_7', htmlSelector: 'section.event-register-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-register-cta h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'ftm-related', wpSelector: '.et_pb_section_8', htmlSelector: 'section.event-section:nth-of-type(9)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(9) h2', wpSel: '.et_pb_section_8 h2' }] },
    ],
  },
};
