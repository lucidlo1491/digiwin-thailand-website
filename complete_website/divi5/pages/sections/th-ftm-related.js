/**
 * th-ftm-related.js — Thai Factory Tour MES Related Events (S9)
 *
 * Uses English event data from events-registry (proper nouns stay English).
 * Only section header (label, title) is Thai.
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');
const thFtm = require('../../i18n/th/factory-tour-mes');

const related = pickRelated('factory-tour-mes', 3);

const DATA = {
  sectionPrefix: 'ftm-rel',
  color: '#b45309',
  ...thFtm.related,
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
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
