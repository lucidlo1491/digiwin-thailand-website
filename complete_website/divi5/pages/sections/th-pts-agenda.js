/**
 * th-pts-agenda.js — Production Transparency Seminar Agenda (Thai)
 *
 * Same template as English (event-agenda), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-agenda');
const th = require('../../i18n/th/production-transparency-seminar');

const DATA = {
  sectionPrefix: 'pts-agd',
  color: '#0369a1',
  label: th.agenda.label,
  title: th.agenda.title,
  subtitle: th.agenda.subtitle,
  items: th.agenda.items,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-agd) === */
.pts-agd-label, .pts-agd-title, .pts-agd-subtitle,
.pts-agd-item-time, .pts-agd-item-title, .pts-agd-item-desc {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
