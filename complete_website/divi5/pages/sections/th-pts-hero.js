/**
 * th-pts-hero.js — Production Transparency Seminar Hero (Thai)
 *
 * Same template as English (event-hero), Thai DATA from i18n.
 */

const template = require('../../lib/templates/event-hero');
const enData = require('./pts-hero');
const th = require('../../i18n/th/production-transparency-seminar');

// Merge: English layout (icons, color, superD) + Thai text
const DATA = {
  ...enData.__DATA || {
    sectionPrefix: 'pts-hero',
    color: '#0369a1',
    superD: { variant: 'particle', position: 'corner-br', opacity: 0.15 },
    facts: [
      { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', value: th.hero.facts[0].value, label: th.hero.facts[0].label },
      { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', value: th.hero.facts[1].value, label: th.hero.facts[1].label },
      { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', value: th.hero.facts[2].value, label: th.hero.facts[2].label },
      { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>', value: th.hero.facts[3].value, label: th.hero.facts[3].label },
    ],
  },
  sectionPrefix: 'pts-hero',
  color: '#0369a1',
  badge: th.hero.badge,
  title: th.hero.title,
  subtitle: th.hero.subtitle,
  backLink: th.hero.backLink,
  facts: [
    { icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', value: th.hero.facts[0].value, label: th.hero.facts[0].label },
    { icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', value: th.hero.facts[1].value, label: th.hero.facts[1].label },
    { icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', value: th.hero.facts[2].value, label: th.hero.facts[2].label },
    { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>', value: th.hero.facts[3].value, label: th.hero.facts[3].label },
  ],
  cta: th.hero.cta,
  superD: { variant: 'particle', position: 'corner-br', opacity: 0.15 },
};

const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE (pts-hero) === */
.pts-hero-title, .pts-hero-subtitle, .pts-hero-badge,
.pts-hero-fact-value, .pts-hero-fact-label,
.pts-hero-back-link, .pts-hero-btn--primary {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA) + THAI_FONT_CSS,
};
