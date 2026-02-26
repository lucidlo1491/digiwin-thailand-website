/**
 * th-pts-related.js — Production Transparency Seminar Related Events (Thai)
 *
 * Same template as English (event-related), Thai labels from i18n.
 * Event cards use English titles/dates (proper nouns stay English per style guide).
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');
const th = require('../../i18n/th/production-transparency-seminar');
const thEvents = require('../../i18n/th/events-listing');

const related = pickRelated('production-transparency-seminar', 3);

const DATA = {
  sectionPrefix: 'pts-rel',
  color: '#0369a1',
  label: th.related.label,
  title: th.related.title,
  events: related.map(e => ({
    typeBadge: thEvents.badges[e.typeBadge] || e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: '/th' + e.href,
    color: e.color,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-rel) === */
.pts-rel-label, .pts-rel-title,
.pts-rel-card-badge, .pts-rel-card-date, .pts-rel-card-location {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
