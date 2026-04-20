/**
 * boi-compliance-workshop.js — BOI Compliance Workshop event page config
 *
 * WordPress page: BOI Compliance Workshop (ID 100751, slug: boi-compliance-workshop)
 * Prototype: events/boi-compliance-workshop.html
 * Sections: 9
 *
 * Template design: Marketing-team-friendly. Each section has clear VB admin labels.
 * To create a new event: duplicate this page in WP, update content in VB code modules.
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/event-hero');
const problemBuilder = require('./sections/event-problem');
const outcomesBuilder = require('./sections/event-outcomes');
const agendaBuilder = require('./sections/event-agenda');
const personasBuilder = require('./sections/event-personas');
const proofBuilder = require('./sections/event-proof');
const logisticsBuilder = require('./sections/event-logistics');
const registerBuilder = require('./sections/event-register');
const relatedBuilder = require('./sections/event-related');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100751,
  title: 'BOI Compliance Workshop',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events', 'boi-compliance-workshop.html'),
  protoFile: 'events/boi-compliance-workshop.html',

  sections: [
    { name: 'event-hero', builder: heroBuilder },
    { name: 'event-problem', builder: problemBuilder },
    { name: 'event-outcomes', builder: outcomesBuilder },
    { name: 'event-agenda', builder: agendaBuilder },
    { name: 'event-personas', builder: personasBuilder },
    { name: 'event-proof', builder: proofBuilder },
    { name: 'event-logistics', builder: logisticsBuilder },
    { name: 'event-register', builder: registerBuilder },
    { name: 'event-related', builder: relatedBuilder },
  ],


  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'News & Events', url: '/news/' },
        { name: 'BOI Compliance Workshop', url: '/boi-compliance-workshop/' },
      ]),
      schema.event({
        name: 'BOI Compliance Workshop: Production-Level Reconciliation',
        description: 'Full-day hands-on workshop on BOI compliance. Learn production-order-level material tracking that eliminates supplementary taxes.',
        startDate: '2026-03-15T09:00:00+07:00',
        endDate: '2026-03-15T16:00:00+07:00',
        locationName: 'Bangkok, Thailand',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      }),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100751',
    sections: [
      { name: 'event-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.event-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.event-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'event-problem', wpSelector: '.et_pb_section_1', htmlSelector: 'section.event-section:nth-of-type(2)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(2) h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'event-outcomes', wpSelector: '.et_pb_section_2', htmlSelector: 'section.event-section:nth-of-type(3)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(3) h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'event-agenda', wpSelector: '.et_pb_section_3', htmlSelector: 'section.event-section:nth-of-type(4)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(4) h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'event-personas', wpSelector: '.et_pb_section_4', htmlSelector: 'section.event-section:nth-of-type(5)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(5) h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'event-proof', wpSelector: '.et_pb_section_5', htmlSelector: 'section.event-section:nth-of-type(6)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(6) h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'event-logistics', wpSelector: '.et_pb_section_6', htmlSelector: 'section.event-section:nth-of-type(7)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(7) h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'event-register', wpSelector: '.et_pb_section_7', htmlSelector: 'section.event-register-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: '.event-register-cta h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'event-related', wpSelector: '.et_pb_section_8', htmlSelector: 'section.event-section:nth-of-type(9)', pixelThreshold: 0.1,
        styleMap: [{ label: 'H2', htmlSel: 'section.event-section:nth-of-type(9) h2', wpSel: '.et_pb_section_8 h2' }] },
    ],
  },
};
