/**
 * pts-related.js — Production Transparency Seminar Related Events (S9)
 *
 * Thin data wrapper using event-related template.
 * Pulls related events from the shared registry, excluding this event.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');

const related = pickRelated('production-transparency-seminar', 3);

const DATA = {
  sectionPrefix: 'pts-rel',
  color: '#0369a1',
  label: 'More Upcoming Events',
  title: 'Continue Your Learning Journey',
  events: related.map(e => ({
    typeBadge: e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: e.href,
    color: e.color,
  })),
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
