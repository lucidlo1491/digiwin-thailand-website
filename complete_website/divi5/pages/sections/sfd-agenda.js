/**
 * sfd-agenda.js — Shop Floor Data Workshop Agenda (S4)
 *
 * Thin data wrapper using event-agenda template.
 */

const template = require('../../lib/templates/event-agenda');

const DATA = {
  "sectionPrefix": "sfd-agen",
  "color": "#15803d",
  "label": "Full-Day Agenda",
  "title": "Build It Yourself — Not Watch Someone Else Do It",
  "subtitle": "Every session puts your hands on real MES modules and IoT hardware. You'll leave with working configurations, not just slide decks.",
  "items": [
    {
      "time": "09:00 – 09:30",
      "title": "Registration & Setup",
      "desc": "Laptops required. Environment setup, software access, and a quick survey of your current shop floor data collection methods."
    },
    {
      "time": "09:30 – 10:30",
      "title": "MES Architecture — How Data Flows from Machine to Dashboard",
      "desc": "Understanding the data pipeline: sensor signals, edge gateways, MES collection points, and how OEE is calculated from raw machine events."
    },
    {
      "time": "10:30 – 10:45",
      "title": "Coffee Break",
      "isBreak": true
    },
    {
      "time": "10:45 – 12:00",
      "title": "Hands-On: Configuring Data Collection Points",
      "desc": "Working in the MES system, you'll define machine profiles, map signal types, and configure the data collection parameters for different equipment types."
    },
    {
      "time": "12:00 – 13:00",
      "title": "Networking Lunch",
      "isBreak": true
    },
    {
      "time": "13:00 – 14:30",
      "title": "Hands-On: Connecting Sensors & Building Your First OEE Dashboard",
      "desc": "Connect IoT sensors to simulated machine interfaces, validate data flow, and build a real-time OEE dashboard showing Availability, Performance, and Quality."
    },
    {
      "time": "14:30 – 14:45",
      "title": "Coffee Break",
      "isBreak": true
    },
    {
      "time": "14:45 – 15:30",
      "title": "Alert Configuration & Anomaly Detection",
      "desc": "Set up threshold-based alerts for downtime, quality deviations, and cycle time anomalies. Learn how to route notifications to the right people at the right time."
    },
    {
      "time": "15:30 – 16:00",
      "title": "Q&A + Implementation Planning",
      "desc": "Open discussion, individual architecture questions, and planning your shop floor data collection rollout back at your factory."
    }
  ]
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
