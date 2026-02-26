/**
 * th-sfd-proof.js — Thai Shop Floor Data Workshop Proof (S6)
 *
 * Thai data wrapper using event-proof template.
 * Stats values identical to English, labels in Thai.
 */

const template = require('../../lib/templates/event-proof');
const th = require('../../i18n/th/shop-floor-data-workshop');

const DATA = {
  sectionPrefix: 'sfd-prf',
  color: '#15803d',
  label: th.proof.label,
  title: th.proof.title,
  stats: th.proof.stats,
  text: th.proof.text,
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
