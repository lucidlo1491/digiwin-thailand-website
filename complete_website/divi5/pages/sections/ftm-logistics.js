/**
 * ftm-logistics.js — Factory Tour MES Logistics (S7)
 *
 * Thin data wrapper using event-logistics template.
 */

const template = require('../../lib/templates/event-logistics');

const DATA = {
  "sectionPrefix": "ftm-log",
  "color": "#b45309",
  "label": "Practical Details",
  "title": "Everything You Need to Know",
  "items": [
    {
      "icon": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/>",
      "label": "Date",
      "value": "Thursday, May 8, 2026"
    },
    {
      "icon": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/>",
      "label": "Time",
      "value": "10:00 – 15:00 (arrive by 09:45)"
    },
    {
      "icon": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
      "label": "Location",
      "value": "EEC Industrial Zone, Thailand — transport from Bangkok available"
    },
    {
      "icon": "<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"/><path d=\"M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6\"/>",
      "label": "Cost",
      "value": "Free (sponsored by DigiWin Thailand)"
    },
    {
      "icon": "<path d=\"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z\"/>",
      "label": "Language",
      "value": "Thai"
    },
    {
      "icon": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
      "label": "What to Wear",
      "value": "Closed-toe shoes required. Safety equipment provided on-site."
    },
    {
      "icon": "<path d=\"M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z\"/><circle cx=\"12\" cy=\"13\" r=\"4\"/>",
      "label": "Photography",
      "value": "Restrictions may apply. Guidelines provided at safety briefing."
    },
    {
      "icon": "<rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"/><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/>",
      "label": "Transport",
      "value": "Shuttle from Bangkok available — details sent after registration"
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
