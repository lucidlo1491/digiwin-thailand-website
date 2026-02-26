/**
 * th-mex-agenda.js — Thai Manufacturing Expo 2026 Agenda (S4)
 *
 * Same event-agenda template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 */

const template = require('../../lib/templates/event-agenda');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-agen',
  color: '#6d28d9',
  label: thMex.agenda.label,
  title: thMex.agenda.title,
  subtitle: thMex.agenda.subtitle,
  items: thMex.agenda.items,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
