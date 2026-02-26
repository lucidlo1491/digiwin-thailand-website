/**
 * th-event-personas.js — BOI Compliance Workshop Personas (S5) — Thai
 *
 * Same event-personas template, Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-personas');
const th = require('../../i18n/th/boi-compliance-workshop');

const DATA = {
  sectionPrefix: 'evt-per',
  color: '#15803d',
  label: th.personas.label,
  title: th.personas.title,
  personas: th.personas.personas,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-per) === */
.evt-per-label, .evt-per-title,
.evt-per-role, .evt-per-size, .evt-per-desc, .evt-per-quote {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
