/**
 * th-pts-proof.js — Production Transparency Seminar Proof (Thai)
 *
 * Same template as English (event-proof), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-proof');
const th = require('../../i18n/th/production-transparency-seminar');

const DATA = {
  sectionPrefix: 'pts-prf',
  color: '#0369a1',
  label: th.proof.label,
  title: th.proof.title,
  stats: th.proof.stats,
  text: th.proof.text,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-prf) === */
.pts-prf-label, .pts-prf-title, .pts-prf-text,
.pts-prf-stat-value, .pts-prf-stat-label {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
