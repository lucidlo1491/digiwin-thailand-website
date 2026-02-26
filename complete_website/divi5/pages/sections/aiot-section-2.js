/**
 * aiot-section-2.js — FAQ Section (S9)
 *
 * Source: aiot.html line 1586
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section 2',
  sectionPrefix: 'aiot-faq',
  items: [
    { question: 'What is Industrial AIoT?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Industrial AIoT (Artificial Intelligence of Things) combines IoT sensor connectivity with AI-driven analytics for manufacturing. It connects factory machines, PLCs, and sensors to a unified data platform that monitors equipment health, calculates OEE automatically, predicts failures before they happen, and optimizes energy consumption — turning raw machine data into actionable intelligence.</p>' },
    { question: 'What machines and protocols does DigiWin AIoT support?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin AIoT supports 50+ industrial protocols including OPC-UA, Modbus TCP/RTU, MQTT, MT Connect, PROFINET, EtherNet/IP, Siemens S7, Mitsubishi MELSEC, FANUC FOCAS, Allen-Bradley, Omron FINS, and BACnet. It connects to CNC machines, injection molding machines, PLCs, robots, energy meters, and environmental sensors from any brand and any age.</p>' },
    { question: 'Do I need to replace my existing machines to use AIoT?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">No. DigiWin AIoT retrofits onto existing equipment regardless of age or brand. Edge devices connect to machine control interfaces (PLCs, CNCs) or add external sensors (vibration, temperature, power) to machines without digital outputs. Even 20-year-old equipment can be connected without any modification to the machine itself.</p>' },
    { question: 'How does AIoT connect to ERP and MES?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin AIoT is built on the same platform as DigiWin ERP and MES, sharing one database. Machine data flows automatically from sensors through AIoT into MES for OEE calculations and into ERP for maintenance work orders and production costing. No middleware, no manual data entry, no integration projects required.</p>' },
    { question: 'What ROI can I expect from factory AIoT?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin AIoT customers typically achieve a 15% OEE improvement, 40% reduction in unplanned downtime, and 12% energy cost savings. Most factories see payback within 6–12 months. The immediate wins come from eliminating manual data collection and making machine status visible in real time.</p>' },
  ],
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
