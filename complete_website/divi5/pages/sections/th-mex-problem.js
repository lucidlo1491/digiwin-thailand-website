/**
 * th-mex-problem.js — Thai Manufacturing Expo 2026 Problem Section (S2)
 *
 * Same event-problem template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 */

const template = require('../../lib/templates/event-problem');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-prob',
  color: '#6d28d9',
  label: thMex.problem.label,
  title: thMex.problem.title,
  bodyHTML: thMex.problem.bodyHTML,
  dataCard: thMex.problem.dataCard,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
