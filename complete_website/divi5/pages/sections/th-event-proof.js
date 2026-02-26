/**
 * th-event-proof.js — BOI Compliance Workshop Proof (S6) — Thai
 *
 * Same event-proof template, Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-proof');
const th = require('../../i18n/th/boi-compliance-workshop');

const DATA = {
  sectionPrefix: 'evt-prf',
  color: '#15803d',
  label: th.proof.label,
  title: th.proof.title,
  stats: th.proof.stats,
  text: th.proof.text,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-prf) === */
.evt-prf-label, .evt-prf-title, .evt-prf-text,
.evt-prf-stat-value, .evt-prf-stat-label {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
