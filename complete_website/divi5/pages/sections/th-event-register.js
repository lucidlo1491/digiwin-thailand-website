/**
 * th-event-register.js — BOI Compliance Workshop Registration CTA (S8) — Thai
 *
 * Same event-register template, Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-register');
const th = require('../../i18n/th/boi-compliance-workshop');

const DATA = {
  sectionPrefix: 'evt-reg',
  color: '#15803d',
  title: th.register.title,
  meta: th.register.meta,
  cta: th.register.cta,
  secondary: th.register.secondary,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-reg) === */
.evt-reg-title, .evt-reg-meta,
.evt-reg-btn, .evt-reg-secondary {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
