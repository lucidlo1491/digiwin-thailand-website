/**
 * event-related.js — BOI Compliance Workshop Related Events (S9)
 *
 * Thin data wrapper using event-related template.
 * Pulls related events from the shared registry.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../events-registry');

const related = pickRelated('boi-compliance-workshop', 3);

const DATA = {
  sectionPrefix: 'evt-rel',
  color: '#15803d',
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
