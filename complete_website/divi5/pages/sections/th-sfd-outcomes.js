/**
 * th-sfd-outcomes.js — Thai Shop Floor Data Workshop Outcomes (S3)
 *
 * Thai data wrapper using event-outcomes template.
 * SVG icons reused from English — only text is Thai.
 */

const template = require('../../lib/templates/event-outcomes');
const enOutcomes = require('./sfd-outcomes');
const th = require('../../i18n/th/shop-floor-data-workshop');

// Merge English icons with Thai text
const DATA = {
  sectionPrefix: 'sfd-out',
  color: '#15803d',
  label: th.outcomes.label,
  title: th.outcomes.title,
  outcomes: enOutcomes.blocks ? undefined : undefined, // placeholder for merge below
};

// Rebuild outcomes array: English icons + Thai text
DATA.outcomes = th.outcomes.outcomes.map((thItem, i) => ({
  icon: enOutcomes._DATA_ICONS ? enOutcomes._DATA_ICONS[i] : [
    '<path d="M12 20V10M18 20V4M6 20v-4"/>',
    '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>',
    '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  ][i],
  title: thItem.title,
  desc: thItem.desc,
}));

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
