/**
 * mex-agenda.js — Manufacturing Expo 2026 Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  "sectionPrefix": "mex-agen",
  "color": "#6d28d9",
  "label": "Booth Schedule",
  "title": "Daily Schedule — All Three Days",
  "subtitle": "All demos run daily, May 20–22. Book a 1-on-1 slot for a personalized discussion.",
  "items": [
    {
      "time": "10:00 – 11:00",
      "title": "Open Booth — Browse at Your Pace",
      "desc": "Walk through our demo stations, pick up product literature, and chat with the team. No appointment needed."
    },
    {
      "time": "11:00 – 11:30",
      "title": "Live Demo: ERP for Thai Manufacturing",
      "desc": "T100 with Thai localization, BOI compliance reporting, and Thai Revenue Department integration."
    },
    {
      "time": "11:30 – 12:00",
      "title": "Live Demo: MES Real-Time Production Tracking",
      "desc": "MES dashboard with live data — OEE monitoring, production orders, and quality alerts."
    },
    {
      "time": "12:00 – 13:00",
      "title": "Lunch Break",
      "desc": "Booth remains open for browsing.",
      "isBreak": true
    },
    {
      "time": "13:00 – 13:30",
      "title": "Live Demo: WMS Warehouse Operations",
      "desc": "sFLS warehouse management — receiving, put-away, picking, packing, and shipping with barcode scanning."
    },
    {
      "time": "13:30 – 14:00",
      "title": "Live Demo: AIoT Machine Connectivity",
      "desc": "Sensor data collection, real-time machine monitoring, and analytics dashboards."
    },
    {
      "time": "14:00 – 17:30",
      "title": "Open Booth — 1-on-1 Consultations Available",
      "desc": "Book a slot or walk up for a personalized discussion about your factory's specific needs."
    },
    {
      "time": "17:30 – 18:00",
      "title": "Daily Wrap-Up",
      "isBreak": true
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
