/**
 * th-sfd-related.js — Thai Shop Floor Data Workshop Related Events (S9)
 *
 * Thai data wrapper using event-related template.
 * Pulls related events from the shared registry (English event names stay as-is).
 * Section labels in Thai.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');
const th = require('../../i18n/th/shop-floor-data-workshop');

const related = pickRelated('shop-floor-data-workshop', 3);

const DATA = {
  sectionPrefix: 'sfd-rel',
  color: '#15803d',
  label: th.related.label,
  title: th.related.title,
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
