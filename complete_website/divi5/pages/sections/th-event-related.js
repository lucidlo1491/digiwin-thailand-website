/**
 * th-event-related.js — BOI Compliance Workshop Related Events (S9) — Thai
 *
 * Same event-related template, Thai labels from i18n.
 * Event metadata from shared events-registry (titles stay English — proper nouns).
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');
const th = require('../../i18n/th/boi-compliance-workshop');
const thEventsListing = require('../../i18n/th/events-listing');

const related = pickRelated('boi-compliance-workshop', 3);

const DATA = {
  sectionPrefix: 'evt-rel',
  color: '#15803d',
  label: th.related.label,
  title: th.related.title,
  events: related.map(e => ({
    typeBadge: thEventsListing.badges[e.typeBadge] || e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: e.href,
    color: e.color,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-rel) === */
.evt-rel-label, .evt-rel-title,
.evt-rel-card-badge, .evt-rel-card-title,
.evt-rel-card-date, .evt-rel-card-location {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
