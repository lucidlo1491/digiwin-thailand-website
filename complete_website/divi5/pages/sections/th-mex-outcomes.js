/**
 * th-mex-outcomes.js — Thai Manufacturing Expo 2026 Outcomes (S3)
 *
 * Same event-outcomes template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 * Icons reused verbatim from English source (SVG path strings).
 */

const template = require('../../lib/templates/event-outcomes');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

// English icon SVGs (layout-only, no translation needed)
const ICONS = [
  '<path d="M3 3h18v18H3V3z"/><path d="M3 9h18M9 21V9"/>',
  '<path d="M2 20h20M6 20V10l4-6h4l4 6v10"/><path d="M6 14h12"/>',
  '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
  '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>',
];

const DATA = {
  sectionPrefix: 'mex-out',
  color: '#6d28d9',
  label: thMex.outcomes.label,
  title: thMex.outcomes.title,
  outcomes: thMex.outcomes.outcomes.map((o, i) => ({
    icon: ICONS[i],
    title: o.title,
    desc: o.desc,
  })),
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
