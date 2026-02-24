/**
 * sfd-outcomes.js — Shop Floor Data Workshop Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  "sectionPrefix": "sfd-out",
  "color": "#15803d",
  "label": "Workshop Outcomes",
  "title": "What You'll Be Able to Do After This Workshop",
  "outcomes": [
    {
      "icon": "<path d=\"M12 20V10M18 20V4M6 20v-4\"/>",
      "title": "Configure MES data collection points for your specific machines",
      "desc": "Set up the exact data collection parameters your shop floor needs — production counts, cycle times, and machine states mapped to your equipment."
    },
    {
      "icon": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4\"/>",
      "title": "Connect IoT sensors to capture production counts, downtime, and quality data",
      "desc": "Physically wire sensors to equipment interfaces and validate that machine signals are being captured correctly in the MES system."
    },
    {
      "icon": "<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"/><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/>",
      "title": "Build a live OEE dashboard that updates in real-time",
      "desc": "Create a working dashboard showing Availability, Performance, and Quality metrics that refresh automatically as production data flows in."
    },
    {
      "icon": "<path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/>",
      "title": "Create alert rules for production anomalies",
      "desc": "Configure threshold-based alerts that notify the right people when downtime exceeds limits, quality rates drop, or cycle times deviate from standards."
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
