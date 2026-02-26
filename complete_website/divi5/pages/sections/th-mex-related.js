/**
 * th-mex-related.js — Thai Manufacturing Expo 2026 Related Events (S9)
 *
 * Same event-related template as English. Thai labels from i18n/th/manufacturing-expo-2026.js.
 * Uses shared events-registry + Thai badge translations.
 * Related event hrefs prefixed with /th/ for Thai subpath.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const related = pickRelated('manufacturing-expo-2026', 3);

const DATA = {
  sectionPrefix: 'mex-rel',
  color: '#6d28d9',
  label: thMex.related.label,
  title: thMex.related.title,
  events: related.map(e => ({
    typeBadge: thMex.badges[e.typeBadge] || e.typeBadge,
    title: e.title,
    date: e.date,
    location: e.location,
    href: `/th${e.href}`,
    color: e.color,
  })),
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
