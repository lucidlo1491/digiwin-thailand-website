/**
 * th-ftm-logistics.js — Thai Factory Tour MES Logistics (S7)
 *
 * Thin data wrapper using event-logistics template with Thai content.
 */

const template = require('../../lib/templates/event-logistics');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-log',
  color: '#b45309',
  ...thFtm.logistics,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
