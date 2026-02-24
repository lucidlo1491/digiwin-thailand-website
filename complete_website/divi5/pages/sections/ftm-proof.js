/**
 * ftm-proof.js — Factory Tour MES Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  "sectionPrefix": "ftm-prf",
  "color": "#b45309",
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
  "text": "DigiWin has been helping Thai manufacturers digitize their shop floors for 8 years. This factory visit gives you direct access to one of those implementations — the same systems, the same team, and the same approach we bring to every MES project."
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
