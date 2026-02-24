/**
 * sfd-proof.js — Shop Floor Data Workshop Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  "sectionPrefix": "sfd-prf",
  "color": "#15803d",
  "label": "Why DigiWin Events",
  "title": "Learn from the Team That's Done This 100+ Times",
  "stats": [
    {
      "value": "100+",
      "label": "Thai Implementations"
    },
    {
      "value": "44",
      "label": "Years Manufacturing ERP"
    },
    {
      "value": "95%",
      "label": "Contract Renewal Rate"
    },
    {
      "value": "50+",
      "label": "Thai Team Members"
    }
  ],
  "text": "DigiWin has connected thousands of machines across Asia to MES systems over the past 44 years. This workshop distills that experience into a single day — the same configuration approach our implementation engineers use with every new factory deployment."
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
