/**
 * th-event-problem.js — BOI Compliance Workshop Problem (S2) — Thai
 *
 * Same event-problem template, Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-problem');
const th = require('../../i18n/th/boi-compliance-workshop');

const DATA = {
  sectionPrefix: 'evt-prob',
  color: '#15803d',
  label: th.problem.label,
  title: th.problem.title,
  bodyHTML: th.problem.bodyHTML,
  dataCard: th.problem.dataCard,
  caseLink: th.problem.caseLink,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-prob) === */
.evt-prob-label, .evt-prob-title, .evt-prob-body,
.evt-prob-card-from, .evt-prob-card-to, .evt-prob-card-label,
.evt-prob-case-link {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
