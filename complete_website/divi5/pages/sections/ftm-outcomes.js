/**
 * ftm-outcomes.js — Factory Tour MES Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  "sectionPrefix": "ftm-out",
  "color": "#b45309",
  "label": "Visit Outcomes",
  "title": "What You'll Take Away from This Visit",
  "outcomes": [
    {
      "icon": "<path d=\"M2 20h20M6 20V10l4-6h4l4 6v10\"/><path d=\"M6 14h12\"/>",
      "title": "See a live MES implementation on a real production floor",
      "desc": "Not a demo environment, not a simulation — a working factory with real production orders running through DigiWin MES right now."
    },
    {
      "icon": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
      "title": "Observe how operators interact with the system during actual production",
      "desc": "Watch real operators using MES terminals on the shop floor — see the interface they use, how they report production, and how they handle exceptions."
    },
    {
      "icon": "<path d=\"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z\"/>",
      "title": "Ask direct questions to factory staff about their experience",
      "desc": "No sales filter. Talk directly to the plant manager, IT team, and line operators about what worked, what didn't, and what they'd change."
    },
    {
      "icon": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><line x1=\"8\" y1=\"6\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"10\" x2=\"16\" y2=\"10\"/><line x1=\"8\" y1=\"14\" x2=\"12\" y2=\"14\"/>",
      "title": "Understand the practical requirements for your own MES deployment",
      "desc": "Infrastructure, network, operator training, change management — learn what it actually takes from the people who've already done it."
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
