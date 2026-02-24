/**
 * ftm-personas.js — Factory Tour MES Personas (S5)
 *
 * Thin data wrapper using event-personas template.
 */

const template = require('../../lib/templates/event-personas');

const DATA = {
  "sectionPrefix": "ftm-per",
  "color": "#b45309",
  "label": "Who This Is For",
  "title": "Is This Visit Right for You?",
  "personas": [
    {
      "role": "Factory Owner / Managing Director",
      "size": "Considering MES Investment",
      "desc": "You've seen the presentations and read the brochures, but you need to see MES working in a real factory before you commit budget. You want to understand what this investment actually looks like on the shop floor — not just on slides.",
      "quote": "\"I need to see this working in a real factory before I commit budget.\""
    },
    {
      "role": "Operations / IT Manager",
      "size": "Evaluating MES Solutions",
      "desc": "You'll be the one implementing and maintaining the system. You need to understand the practical reality — network requirements, operator training, integration complexity, and the day-to-day experience of running MES in production.",
      "quote": "\"I want to understand the practical reality of MES — not just the sales pitch.\""
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
