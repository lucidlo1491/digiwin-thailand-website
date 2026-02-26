/**
 * th-sfd-logistics.js — Thai Shop Floor Data Workshop Logistics (S7)
 *
 * Thai data wrapper using event-logistics template.
 * SVG icons reused from English, text in Thai.
 */

const template = require('../../lib/templates/event-logistics');
const enLogistics = require('./sfd-logistics');
const th = require('../../i18n/th/shop-floor-data-workshop');

// English icons (same order as English DATA.items)
const EN_ICONS = [
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
];

const DATA = {
  sectionPrefix: 'sfd-log',
  color: '#15803d',
  label: th.logistics.label,
  title: th.logistics.title,
  items: th.logistics.items.map((thItem, i) => ({
    icon: EN_ICONS[i],
    label: thItem.label,
    value: thItem.value,
  })),
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
