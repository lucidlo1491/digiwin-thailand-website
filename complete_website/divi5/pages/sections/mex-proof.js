/**
 * mex-proof.js — Manufacturing Expo 2026 Proof (S6)
 *
 * Thin data wrapper using event-proof template.
 */

const template = require('../../lib/templates/event-proof');

const DATA = {
  "sectionPrefix": "mex-prf",
  "color": "#6d28d9",
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
  "text": "DigiWin has been serving Thai manufacturers for 8 years with ERP, MES, WMS, and AIoT solutions purpose-built for the factory floor. At our booth, you'll meet the same consultants who implement these systems — not salespeople reading from scripts."
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
