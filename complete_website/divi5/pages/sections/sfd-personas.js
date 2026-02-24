/**
 * sfd-personas.js — Shop Floor Data Workshop Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  "sectionPrefix": "sfd-per",
  "color": "#15803d",
  "label": "Who This Is For",
  "title": "Is This Workshop Right for You?",
  "personas": [
    {
      "role": "IT / System Administrator",
      "size": "Evaluating MES for the Factory",
      "desc": "You're the person management will ask to evaluate and implement MES. You need to understand the technical architecture — network requirements, sensor protocols, data storage — before you can recommend it.",
      "quote": "\"I need to understand the technical architecture before recommending MES to management.\""
    },
    {
      "role": "Production Engineer",
      "size": "Any Size Manufacturing",
      "desc": "You run the production line and you know the data your operators record on paper is incomplete and late. You want machines to report their own status — automatically, accurately, in real-time.",
      "quote": "\"I want to capture machine data automatically instead of relying on operators to fill in forms.\""
    },
    {
      "role": "Continuous Improvement Manager",
      "size": "Lean / Six Sigma Practitioner",
      "desc": "Your improvement projects depend on accurate data, but the OEE numbers you've been working with are estimates based on operator logs. You need real measurements to drive real improvements.",
      "quote": "\"I need real OEE numbers, not the estimates we've been using.\""
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
