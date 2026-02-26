/**
 * th-mex-proof.js — Thai Manufacturing Expo 2026 Proof (S6)
 *
 * Same event-proof template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 */

const template = require('../../lib/templates/event-proof');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-prf',
  color: '#6d28d9',
  label: thMex.proof.label,
  title: thMex.proof.title,
  stats: thMex.proof.stats,
  text: thMex.proof.text,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
