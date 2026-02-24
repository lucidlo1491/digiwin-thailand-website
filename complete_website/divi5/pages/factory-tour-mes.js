/**
 * factory-tour-mes.js — Factory Tour MES page config
 *
 * WordPress page: Factory Tour MES (ID 100755, slug: factory-tour-mes)
 * Prototype: events/factory-tour-mes.html
 * Sections: 9
 *
 * Template design: Marketing-team-friendly. Each section has clear VB admin labels.
 * Created via event templates — thin data wrappers over shared event-* templates.
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/ftm-hero');
const problemBuilder = require('./sections/ftm-problem');
const outcomesBuilder = require('./sections/ftm-outcomes');
const agendaBuilder = require('./sections/ftm-agenda');
const personasBuilder = require('./sections/ftm-personas');
const proofBuilder = require('./sections/ftm-proof');
const logisticsBuilder = require('./sections/ftm-logistics');
const registerBuilder = require('./sections/ftm-register');
const relatedBuilder = require('./sections/ftm-related');

module.exports = {
  pageId: 100755,
  title: 'Factory Tour MES',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events/factory-tour-mes.html'),
  protoFile: 'events/factory-tour-mes.html',

  sections: [
    { name: 'ftm-hero', builder: heroBuilder },
    { name: 'ftm-problem', builder: problemBuilder },
    { name: 'ftm-outcomes', builder: outcomesBuilder },
    { name: 'ftm-agenda', builder: agendaBuilder },
    { name: 'ftm-personas', builder: personasBuilder },
    { name: 'ftm-proof', builder: proofBuilder },
    { name: 'ftm-logistics', builder: logisticsBuilder },
    { name: 'ftm-register', builder: registerBuilder },
    { name: 'ftm-related', builder: relatedBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100755',
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
