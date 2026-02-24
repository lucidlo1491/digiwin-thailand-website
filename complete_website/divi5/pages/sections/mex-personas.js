/**
 * mex-personas.js — Manufacturing Expo 2026 Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  "sectionPrefix": "mex-per",
  "color": "#6d28d9",
  "label": "Who This Is For",
  "title": "Is This Booth Right for You?",
  "personas": [
    {
      "role": "Factory Owner / Operations Director",
      "size": "Evaluating ERP or MES",
      "desc": "You're comparing manufacturing software solutions and want to see real systems running — not just slides. You need to understand what's actually built for factories like yours before making a decision.",
      "quote": "\"I want to compare solutions and see what's actually built for manufacturing.\""
    },
    {
      "role": "ERP Implementer / Consultant",
      "size": "Looking for a Product Line",
      "desc": "You run an ERP consultancy or systems integration practice and want a manufacturing-focused product line to add to your portfolio. You need to evaluate the technology, the partner economics, and the team.",
      "quote": "\"I'm looking for a manufacturing-focused product line to add to my portfolio.\""
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
