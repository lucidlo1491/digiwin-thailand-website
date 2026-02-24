/**
 * production-transparency-seminar.js — Production Transparency Seminar page config
 *
 * WordPress page: Production Transparency Seminar (ID 100753, slug: production-transparency-seminar)
 * Prototype: events/production-transparency-seminar.html
 * Sections: 9
 *
 * Template design: Marketing-team-friendly. Each section has clear VB admin labels.
 * Created via event templates — thin data wrappers over shared event-* templates.
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/pts-hero');
const problemBuilder = require('./sections/pts-problem');
const outcomesBuilder = require('./sections/pts-outcomes');
const agendaBuilder = require('./sections/pts-agenda');
const personasBuilder = require('./sections/pts-personas');
const proofBuilder = require('./sections/pts-proof');
const logisticsBuilder = require('./sections/pts-logistics');
const registerBuilder = require('./sections/pts-register');
const relatedBuilder = require('./sections/pts-related');

module.exports = {
  pageId: 100753,
  title: 'Production Transparency Seminar',
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

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100753',
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
