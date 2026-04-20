/**
 * th-boi-compliance-workshop.js — Thai BOI Compliance Workshop event page config
 *
 * WordPress page: BOI Compliance Workshop Thai (ID 100790, slug: th/news/events/boi-compliance-workshop)
 * Prototype: events/boi-compliance-workshop.html (English — Thai is layout-identical)
 * Sections: 9 (same structure as English, Thai content)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-boi-compliance-workshop [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders (all 9 — each imports English template + Thai i18n)
const thHeroBuilder = require('./sections/th-event-hero');
const thProblemBuilder = require('./sections/th-event-problem');
const thOutcomesBuilder = require('./sections/th-event-outcomes');
const thAgendaBuilder = require('./sections/th-event-agenda');
const thPersonasBuilder = require('./sections/th-event-personas');
const thProofBuilder = require('./sections/th-event-proof');
const thLogisticsBuilder = require('./sections/th-event-logistics');
const thRegisterBuilder = require('./sections/th-event-register');
const thRelatedBuilder = require('./sections/th-event-related');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100790,
  title: 'เวิร์กช็อป BOI Compliance — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'events', 'boi-compliance-workshop.html'),
  protoFile: 'events/boi-compliance-workshop.html',

  sections: [
    { name: 'event-hero', builder: thHeroBuilder },
    { name: 'event-problem', builder: thProblemBuilder },
    { name: 'event-outcomes', builder: thOutcomesBuilder },
    { name: 'event-agenda', builder: thAgendaBuilder },
    { name: 'event-personas', builder: thPersonasBuilder },
    { name: 'event-proof', builder: thProofBuilder },
    { name: 'event-logistics', builder: thLogisticsBuilder },
    { name: 'event-register', builder: thRegisterBuilder },
    { name: 'event-related', builder: thRelatedBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E02\u0E48\u0E32\u0E27\u0E2A\u0E32\u0E23\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21', url: '/th/news/' },
        { name: 'BOI Compliance Workshop', url: '/th/boi-compliance-workshop/' },
      ])),
      schema.thaiVariant(schema.event({
        name: 'BOI Compliance Workshop: Production-Level Reconciliation',
        description: 'Full-day hands-on workshop on BOI compliance. Learn production-order-level material tracking that eliminates supplementary taxes.',
        startDate: '2026-03-15T09:00:00+07:00',
        endDate: '2026-03-15T16:00:00+07:00',
        locationName: 'Bangkok, Thailand',
        city: 'Bangkok',
        country: 'TH',
        isAccessibleForFree: true,
      })),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 12,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/news/events/boi-compliance-workshop/',
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
