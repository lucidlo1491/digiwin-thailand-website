/**
 * th-manufacturing-expo-2026.js — Thai Manufacturing Expo 2026 page config
 *
 * WordPress page: Thai Manufacturing Expo 2026 (ID 100792, slug: th/news/events/manufacturing-expo-2026)
 * Sections: 9 (same structure as English, all Thai content)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-manufacturing-expo-2026 [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders (all 9 — thin data wrappers with Thai content)
const thHeroBuilder = require('./sections/th-mex-hero');
const thProblemBuilder = require('./sections/th-mex-problem');
const thOutcomesBuilder = require('./sections/th-mex-outcomes');
const thAgendaBuilder = require('./sections/th-mex-agenda');
const thPersonasBuilder = require('./sections/th-mex-personas');
const thProofBuilder = require('./sections/th-mex-proof');
const thLogisticsBuilder = require('./sections/th-mex-logistics');
const thRegisterBuilder = require('./sections/th-mex-register');
const thRelatedBuilder = require('./sections/th-mex-related');

module.exports = {
  pageId: 100792,
  title: 'Manufacturing Expo Thailand 2026 — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: null,
  protoFile: null,

  sections: [
    { name: 'mex-hero', builder: thHeroBuilder },
    { name: 'mex-problem', builder: thProblemBuilder },
    { name: 'mex-outcomes', builder: thOutcomesBuilder },
    { name: 'mex-agenda', builder: thAgendaBuilder },
    { name: 'mex-personas', builder: thPersonasBuilder },
    { name: 'mex-proof', builder: thProofBuilder },
    { name: 'mex-logistics', builder: thLogisticsBuilder },
    { name: 'mex-register', builder: thRegisterBuilder },
    { name: 'mex-related', builder: thRelatedBuilder },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/manufacturing-expo-2026/',
    sections: [
      { name: 'mex-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.event-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.event-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'mex-problem', wpSelector: '.et_pb_section_1', htmlSelector: 'section.event-section:nth-of-type(2)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(2) h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'mex-outcomes', wpSelector: '.et_pb_section_2', htmlSelector: 'section.event-section:nth-of-type(3)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(3) h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'mex-agenda', wpSelector: '.et_pb_section_3', htmlSelector: 'section.event-section:nth-of-type(4)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(4) h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'mex-personas', wpSelector: '.et_pb_section_4', htmlSelector: 'section.event-section:nth-of-type(5)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(5) h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'mex-proof', wpSelector: '.et_pb_section_5', htmlSelector: 'section.event-section:nth-of-type(6)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(6) h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'mex-logistics', wpSelector: '.et_pb_section_6', htmlSelector: 'section.event-section:nth-of-type(7)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(7) h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'mex-register', wpSelector: '.et_pb_section_7', htmlSelector: 'section.event-register-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-register-cta h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'mex-related', wpSelector: '.et_pb_section_8', htmlSelector: 'section.event-section:nth-of-type(9)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(9) h2', wpSel: '.et_pb_section_8 h2' }] },
    ],
  },
};
