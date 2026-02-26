/**
 * th-event-logistics.js — BOI Compliance Workshop Logistics (S7) — Thai
 *
 * Same event-logistics template, Thai DATA from i18n.
 * Icons preserved from English; label + value translated.
 */

const template = require('../../lib/templates/event-logistics');
const th = require('../../i18n/th/boi-compliance-workshop');

// Icons from English builder (stable — template contract)
const ICONS = [
  '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  '<path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>',
];

const DATA = {
  sectionPrefix: 'evt-log',
  color: '#15803d',
  label: th.logistics.label,
  title: th.logistics.title,
  items: th.logistics.items.map((item, i) => ({
    icon: ICONS[i],
    label: item.label,
    value: item.value,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-log) === */
.evt-log-label, .evt-log-title,
.evt-log-item-label, .evt-log-item-value {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
