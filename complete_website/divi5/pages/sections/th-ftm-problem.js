/**
 * th-ftm-problem.js — Thai Factory Tour MES Problem (S2)
 *
 * Thin data wrapper using event-problem template with Thai content.
 */

const template = require('../../lib/templates/event-problem');
const thFtm = require('../../i18n/th/factory-tour-mes');

const DATA = {
  sectionPrefix: 'ftm-prob',
  color: '#b45309',
  ...thFtm.problem,
};

module.exports = {
  DATA,
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
