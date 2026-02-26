/**
 * th-ftm-personas.js — Thai Factory Tour MES Personas (S5)
 *
 * Thin data wrapper using event-personas template with Thai content.
 */

const template = require('../../lib/templates/event-personas');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-per',
  color: '#b45309',
  ...thFtm.personas,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
