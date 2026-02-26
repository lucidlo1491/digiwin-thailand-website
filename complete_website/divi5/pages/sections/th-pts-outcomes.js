/**
 * th-pts-outcomes.js — Production Transparency Seminar Outcomes (Thai)
 *
 * Same template as English (event-outcomes), Thai DATA from i18n.
 * Icons reused from English (SVG paths are language-independent).
 */

const template = require('../../lib/templates/event-outcomes');
const th = require('../../i18n/th/production-transparency-seminar');

// Icons from English version (identical SVG paths)
const ICONS = [
  '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>',
];

const DATA = {
  sectionPrefix: 'pts-out',
  color: '#0369a1',
  label: th.outcomes.label,
  title: th.outcomes.title,
  outcomes: th.outcomes.outcomes.map((o, i) => ({
    icon: ICONS[i],
    title: o.title,
    desc: o.desc,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-out) === */
.pts-out-label, .pts-out-title,
.pts-out-card-title, .pts-out-card-desc {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
