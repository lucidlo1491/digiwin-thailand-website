/**
 * manufacturing-expo-2026.js — Manufacturing Expo 2026 page config
 *
 * WordPress page: Manufacturing Expo 2026 (ID 100756, slug: manufacturing-expo-2026)
 * Prototype: events/manufacturing-expo-2026.html
 * Sections: 9
 *
 * Template design: Marketing-team-friendly. Each section has clear VB admin labels.
 * Created via event templates — thin data wrappers over shared event-* templates.
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/mex-hero');
const problemBuilder = require('./sections/mex-problem');
const outcomesBuilder = require('./sections/mex-outcomes');
const agendaBuilder = require('./sections/mex-agenda');
const personasBuilder = require('./sections/mex-personas');
const proofBuilder = require('./sections/mex-proof');
const logisticsBuilder = require('./sections/mex-logistics');
const registerBuilder = require('./sections/mex-register');
const relatedBuilder = require('./sections/mex-related');

module.exports = {
  pageId: 100756,
  title: 'Manufacturing Expo 2026',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events/manufacturing-expo-2026.html'),
  protoFile: 'events/manufacturing-expo-2026.html',

  sections: [
    { name: 'mex-hero', builder: heroBuilder },
    { name: 'mex-problem', builder: problemBuilder },
    { name: 'mex-outcomes', builder: outcomesBuilder },
    { name: 'mex-agenda', builder: agendaBuilder },
    { name: 'mex-personas', builder: personasBuilder },
    { name: 'mex-proof', builder: proofBuilder },
    { name: 'mex-logistics', builder: logisticsBuilder },
    { name: 'mex-register', builder: registerBuilder },
    { name: 'mex-related', builder: relatedBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100756',
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
