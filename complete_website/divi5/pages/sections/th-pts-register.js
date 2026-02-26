/**
 * th-pts-register.js — Production Transparency Seminar Registration CTA (Thai)
 *
 * Same template as English (event-register), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-register');
const th = require('../../i18n/th/production-transparency-seminar');

const DATA = {
  sectionPrefix: 'pts-reg',
  color: '#0369a1',
  title: th.register.title,
  meta: th.register.meta,
  cta: th.register.cta,
  secondary: th.register.secondary,
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-reg) === */
.pts-reg-title, .pts-reg-meta,
.pts-reg-btn--primary, .pts-reg-secondary, .pts-reg-secondary-link {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
