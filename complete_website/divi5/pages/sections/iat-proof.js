/**
 * iat-proof.js — Intelligent Asia Thailand 2026 Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  sectionPrefix: 'iat-prf',
  color: '#0891b2',
  label: 'Why DigiWin Thailand',
  title: 'The Team Behind Booth I132',
  stats: [
    { value: '100+', label: 'Thai Implementations' },
    { value: '44', label: 'Years Manufacturing ERP' },
    { value: '7', label: 'Years Serving Thailand' },
    { value: '95%', label: 'Contract Renewal Rate' },
  ],
  text: 'DigiWin Thailand has been serving the local manufacturing community for 7 years, with deep expertise in electronics, automotive, and metal & plastics industries. Our bilingual team (Thai and Chinese) provides on-site implementation and support.',
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
