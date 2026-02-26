/**
 * th-mex-personas.js — Thai Manufacturing Expo 2026 Personas (S5)
 *
 * Same event-personas template as English. Thai content from i18n/th/manufacturing-expo-2026.js.
 */

const template = require('../../lib/templates/event-personas');
const thMex = require('../../i18n/th/manufacturing-expo-2026');

const DATA = {
  sectionPrefix: 'mex-per',
  color: '#6d28d9',
  label: thMex.personas.label,
  title: thMex.personas.title,
  personas: thMex.personas.personas,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
