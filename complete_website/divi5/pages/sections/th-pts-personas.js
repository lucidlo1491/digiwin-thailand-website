/**
 * th-pts-personas.js — Production Transparency Seminar Personas (Thai)
 *
 * Same template as English (event-personas), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-personas');
const th = require('../../i18n/th/production-transparency-seminar');

const DATA = {
  sectionPrefix: 'pts-per',
  color: '#0369a1',
  label: th.personas.label,
  title: th.personas.title,
  personas: th.personas.personas,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-per) === */
.pts-per-label, .pts-per-title,
.pts-per-card-role, .pts-per-card-size, .pts-per-card-desc, .pts-per-card-quote {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
