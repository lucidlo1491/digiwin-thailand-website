/**
 * th-ftm-agenda.js — Thai Factory Tour MES Agenda (S4)
 *
 * Thin data wrapper using event-agenda template with Thai content.
 */

const template = require('../../lib/templates/event-agenda');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-agen',
  color: '#b45309',
  ...thFtm.agenda,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
