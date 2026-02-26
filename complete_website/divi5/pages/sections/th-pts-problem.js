/**
 * th-pts-problem.js — Production Transparency Seminar Problem (Thai)
 *
 * Same template as English (event-problem), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-problem');
const th = require('../../i18n/th/production-transparency-seminar');

const DATA = {
  sectionPrefix: 'pts-prob',
  color: '#0369a1',
  label: th.problem.label,
  title: th.problem.title,
  bodyHTML: th.problem.bodyHTML,
  dataCard: th.problem.dataCard,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-prob) === */
.pts-prob-label, .pts-prob-title, .pts-prob-body,
.pts-prob-card-from, .pts-prob-card-to, .pts-prob-card-label {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
