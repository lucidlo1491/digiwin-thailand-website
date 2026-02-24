/**
 * mex-outcomes.js — Manufacturing Expo 2026 Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  "sectionPrefix": "mex-out",
  "color": "#6d28d9",
  "label": "What You'll See",
  "title": "Four Live Demos Running Throughout the Show",
  "outcomes": [
    {
      "icon": "<path d=\"M3 3h18v18H3V3z\"/><path d=\"M3 9h18M9 21V9\"/>",
      "title": "Live ERP Demo",
      "desc": "T100 running with full Thai localization, BOI reporting, and Thai Revenue Department compliance — the exact configuration deployed in Thai factories today."
    },
    {
      "icon": "<path d=\"M2 20h20M6 20V10l4-6h4l4 6v10\"/><path d=\"M6 14h12\"/>",
      "title": "MES Dashboard",
      "desc": "Real-time production monitoring with actual factory data flowing live. See OEE calculations, production order tracking, and quality metrics updating as you watch."
    },
    {
      "icon": "<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/><path d=\"M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12\"/>",
      "title": "WMS with Barcode Scanning",
      "desc": "Pick, pack, and ship workflow demonstration. Try the handheld scanner yourself and see how warehouse operations flow from receiving to dispatch."
    },
    {
      "icon": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4\"/>",
      "title": "AIoT Machine Connectivity",
      "desc": "See sensor data flowing from machines to analytics dashboards in real time. Understand how IoT connects your shop floor equipment to actionable intelligence."
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
