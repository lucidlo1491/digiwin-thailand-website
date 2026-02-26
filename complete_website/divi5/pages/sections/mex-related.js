/**
 * mex-related.js — Manufacturing Expo 2026 Related Events (S9)
 *
 * Thin data wrapper using event-related template.
 * Pulls related events from the shared registry, excluding this event.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');

const related = pickRelated('manufacturing-expo-2026', 3);

const DATA = {
  sectionPrefix: 'mex-rel',
  color: '#6d28d9',
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
