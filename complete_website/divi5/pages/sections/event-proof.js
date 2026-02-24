/**
 * event-proof.js — BOI Compliance Workshop Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  sectionPrefix: 'evt-prf',
  color: '#15803d',
  label: 'Why DigiWin Events',
  title: "Learn from the Team That's Done This 100+ Times",
  stats: [
    { value: '100+', label: 'Thai Implementations' },
    { value: '44', label: 'Years Manufacturing ERP' },
    { value: '95%', label: 'Contract Renewal Rate' },
    { value: '50+', label: 'Thai Team Members' },
  ],
  text: 'DigiWin has been helping Thai manufacturers pass BOI audits for 8 years. This workshop distills that experience into a single day — the same frameworks our implementation team uses with every BOI-certified client.',
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
