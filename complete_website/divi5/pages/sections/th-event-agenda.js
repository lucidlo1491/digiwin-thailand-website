/**
 * th-event-agenda.js — BOI Compliance Workshop Agenda (S4) — Thai
 *
 * Same event-agenda template, Thai DATA from i18n.
 * Times unchanged; title + desc translated.
 */

const template = require('../../lib/templates/event-agenda');
const enBuilder = require('./event-agenda');
const th = require('../../i18n/th/boi-compliance-workshop');

// Merge: keep English time + isBreak flags, overlay Thai title + desc
const enItems = [
  { time: '09:00 – 09:30', isBreak: false },
  { time: '09:30 – 10:30', isBreak: false },
  { time: '10:30 – 10:45', isBreak: true },
  { time: '10:45 – 12:00', isBreak: false },
  { time: '12:00 – 13:00', isBreak: true },
  { time: '13:00 – 14:30', isBreak: false },
  { time: '14:30 – 14:45', isBreak: true },
  { time: '14:45 – 15:30', isBreak: false },
  { time: '15:30 – 16:00', isBreak: false },
];

const DATA = {
  sectionPrefix: 'evt-agd',
  color: '#15803d',
  label: th.agenda.label,
  title: th.agenda.title,
  subtitle: th.agenda.subtitle,
  items: enItems.map((item, i) => ({
    ...item,
    title: th.agenda.items[i].title,
    desc: th.agenda.items[i].desc,
  })),
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-agd) === */
.evt-agd-label, .evt-agd-title, .evt-agd-subtitle,
.evt-agd-item-title, .evt-agd-item-desc, .evt-agd-item-time {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
