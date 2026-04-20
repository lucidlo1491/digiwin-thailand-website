/**
 * th-iat-related.js — Thai Intelligent Asia Thailand 2026 Related Events (S9)
 *
 * Thin data wrapper using event-related template.
 * All content in Thai. sectionPrefix matches English (shares CSS).
 */

const template = require('../../lib/templates/event-related');
const { pickRelated } = require('../../lib/events-registry');

const related = pickRelated('intelligent-asia-2026', 3);

const DATA = {
  sectionPrefix: 'iat-rel',
  color: '#0891b2',
  label: 'กิจกรรมที่กำลังจะมาถึง',
  title: 'เรียนรู้เพิ่มเติม',
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
