/**
 * th-event-outcomes.js — BOI Compliance Workshop Outcomes (S3) — Thai
 *
 * Same event-outcomes template, Thai DATA from i18n.
 * Icons preserved from English; only title + desc translated.
 */

const template = require('../../lib/templates/event-outcomes');
const enBuilder = require('./event-outcomes');
const th = require('../../i18n/th/boi-compliance-workshop');

// Merge: keep English icons, overlay Thai title + desc
const DATA = {
  sectionPrefix: 'evt-out',
  color: '#15803d',
  label: th.outcomes.label,
  title: th.outcomes.title,
  outcomes: enBuilder.__DATA
    ? enBuilder.__DATA.outcomes.map((o, i) => ({ ...o, ...th.outcomes.outcomes[i] }))
    : [
        { icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>', ...th.outcomes.outcomes[0] },
        { icon: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', ...th.outcomes.outcomes[1] },
        { icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>', ...th.outcomes.outcomes[2] },
        { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', ...th.outcomes.outcomes[3] },
        { icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', ...th.outcomes.outcomes[4] },
        { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', ...th.outcomes.outcomes[5] },
      ],
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (evt-out) === */
.evt-out-label, .evt-out-title,
.evt-out-card-title, .evt-out-card-desc {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
