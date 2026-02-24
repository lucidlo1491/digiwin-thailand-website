/**
 * mex-hero.js — Manufacturing Expo 2026 Hero (S1)
 *
 * Thin data wrapper using event-hero template.
 */

const template = require('../../lib/templates/event-hero');

const DATA = {
  "sectionPrefix": "mex-hero",
  "color": "#6d28d9",
  "badge": "Trade Show",
  "title": "Manufacturing Expo Thailand 2026",
  "subtitle": "Visit us at Booth A12. Live demos of ERP, MES, WMS, and AIoT solutions. Meet our Thai team and see the full manufacturing intelligence stack in action.",
  "backLink": {
    "text": "Back to News &amp; Events",
    "href": "/news/"
  },
  "facts": [
    {
      "icon": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/>",
      "value": "May 20–22, 2026",
      "label": "Wednesday–Friday"
    },
    {
      "icon": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/>",
      "value": "10:00 – 18:00",
      "label": "Daily"
    },
    {
      "icon": "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
      "value": "BITEC, Bangkok",
      "label": "Booth A12"
    },
    {
      "icon": "<path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/>",
      "value": "Open Entry",
      "label": "No Registration Required"
    }
  ],
  "cta": {
    "text": "Book a 1-on-1 Meeting",
    "href": "#register"
  },
  "superD": {
    "variant": "gradient",
    "position": "center",
    "opacity": 0.12
  }
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
