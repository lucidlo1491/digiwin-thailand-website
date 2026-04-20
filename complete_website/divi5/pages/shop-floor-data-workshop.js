/**
 * shop-floor-data-workshop.js — Shop Floor Data Workshop page config
 *
 * WordPress page: Shop Floor Data Workshop (ID 100754, slug: shop-floor-data-workshop)
 * Prototype: events/shop-floor-data-workshop.html
 * Sections: 9
 *
 * Template design: Marketing-team-friendly. Each section has clear VB admin labels.
 * Created via event templates — thin data wrappers over shared event-* templates.
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/sfd-hero');
const problemBuilder = require('./sections/sfd-problem');
const outcomesBuilder = require('./sections/sfd-outcomes');
const agendaBuilder = require('./sections/sfd-agenda');
const personasBuilder = require('./sections/sfd-personas');
const proofBuilder = require('./sections/sfd-proof');
const logisticsBuilder = require('./sections/sfd-logistics');
const registerBuilder = require('./sections/sfd-register');
const relatedBuilder = require('./sections/sfd-related');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100754,
  title: 'Shop Floor Data Workshop',
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


  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'News & Events', url: '/news/' },
        { name: 'Shop Floor Data Workshop', url: '/shop-floor-data-workshop/' },
      ]),
      schema.event({
        name: 'Hands-On: Setting Up Shop Floor Data Collection with MES',
        description: 'Full-day hands-on workshop configuring real MES modules, connecting shop floor devices, and seeing live OEE data flow from machine to dashboard.',
        startDate: '2026-04-24T09:00:00+07:00',
        endDate: '2026-04-24T16:00:00+07:00',
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
    wpUrl: 'https://digiwin-thailand.local/?page_id=100754',
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
