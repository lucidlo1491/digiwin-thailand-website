/**
 * pts-proof.js — Production Transparency Seminar Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  sectionPrefix: 'pts-prf',
  color: '#0369a1',
  label: 'Why DigiWin Events',
  title: "Learn from the Team That's Done This 100+ Times",
  stats: [
    { value: '100+', label: 'Thai Implementations' },
    { value: '44', label: 'Years Manufacturing ERP' },
    { value: '95%', label: 'Contract Renewal Rate' },
    { value: '50+', label: 'Thai Team Members' },
  ],
  text: 'DigiWin has been helping Thai manufacturers digitize their shop floors for 8 years. This seminar distills that experience into a focused afternoon — the same production visibility frameworks our implementation team uses with every MES client.',
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
