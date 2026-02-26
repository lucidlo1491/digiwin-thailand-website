/**
 * th-mex-logistics.js — Thai Manufacturing Expo 2026 Logistics (S7)
 *
 * Same event-logistics template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 * Icons reused verbatim from English source (SVG path strings).
 */

const template = require('../../lib/templates/event-logistics');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

// English icon SVGs (layout-only, no translation needed)
const ICONS = [
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
];

const DATA = {
  sectionPrefix: 'mex-log',
  color: '#6d28d9',
  label: thMex.logistics.label,
  title: thMex.logistics.title,
  items: thMex.logistics.items.map((item, i) => ({
    icon: ICONS[i],
    label: item.label,
    value: item.value,
  })),
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
