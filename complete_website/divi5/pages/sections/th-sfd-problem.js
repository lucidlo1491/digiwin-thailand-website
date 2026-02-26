/**
 * th-sfd-problem.js — Thai Shop Floor Data Workshop Problem Section (S2)
 *
 * Thai data wrapper using event-problem template.
 */

const template = require('../../lib/templates/event-problem');
const th = require('../../i18n/th/shop-floor-data-workshop');

const DATA = {
  sectionPrefix: 'sfd-prob',
  color: '#15803d',
  label: th.problem.label,
  title: th.problem.title,
  bodyHTML: th.problem.bodyHTML,
  dataCard: th.problem.dataCard,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
