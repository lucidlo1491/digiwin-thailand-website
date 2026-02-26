/**
 * th-pts-logistics.js — Production Transparency Seminar Logistics (Thai)
 *
 * Same template as English (event-logistics), Thai DATA from i18n.
 * Icons reused from English (SVG paths are language-independent).
 */

const template = require('../../lib/templates/event-logistics');
const th = require('../../i18n/th/production-transparency-seminar');

// Icons from English version (identical SVG paths)
const ICONS = [
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
];

const DATA = {
  sectionPrefix: 'pts-log',
  color: '#0369a1',
  label: th.logistics.label,
  title: th.logistics.title,
  items: th.logistics.items.map((item, i) => ({
    icon: ICONS[i],
    label: item.label,
    value: item.value,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-log) === */
.pts-log-label, .pts-log-title,
.pts-log-item-label, .pts-log-item-value {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
