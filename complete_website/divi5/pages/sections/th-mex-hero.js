/**
 * th-mex-hero.js — Thai Manufacturing Expo 2026 Hero (S1)
 *
 * Same event-hero template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 * Icons reused verbatim from English source (SVG path strings).
 */

const template = require('../../lib/templates/event-hero');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-hero',
  color: '#6d28d9',
  badge: thMex.hero.badge,
  title: thMex.hero.title,
  subtitle: thMex.hero.subtitle,
  backLink: thMex.hero.backLink,
  facts: [
    {
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      value: thMex.hero.facts[0].value,
      label: thMex.hero.facts[0].label,
    },
    {
      icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
      value: thMex.hero.facts[1].value,
      label: thMex.hero.facts[1].label,
    },
    {
      icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
      value: thMex.hero.facts[2].value,
      label: thMex.hero.facts[2].label,
    },
    {
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
      value: thMex.hero.facts[3].value,
      label: thMex.hero.facts[3].label,
    },
  ],
  cta: thMex.hero.cta,
  superD: { variant: 'gradient', position: 'center', opacity: 0.12 },
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
