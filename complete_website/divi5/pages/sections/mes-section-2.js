/**
 * mes-section-2.js — FAQ Section (S9)
 *
 * Source: mes.html line 1819
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section 2',
  sectionPrefix: 'mes-faq',
  summaryFontSize: '15px',
  items: [
    { question: 'What is a Manufacturing Execution System (MES)?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">A Manufacturing Execution System (MES) is software that tracks, monitors, and controls production on the factory floor in real time. It bridges the gap between ERP planning and actual shop floor execution — showing you what\'s happening on every machine and workstation right now, not what happened yesterday.</p>' },
    { question: 'What is the difference between MES, SFT, and AIoT Cloud?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">MES is DigiWin\'s full-featured manufacturing execution system for comprehensive production management — work order tracking, quality control, material traceability, and OEE analytics. SFT (Shop Floor Tracking) is a mid-tier option deployed in 2-4 weeks, focusing on production reporting and machine status monitoring. AIoT Cloud is the entry-level tier — cloud-based monitoring with mobile apps and subscription pricing. Many factories start with AIoT Cloud or SFT and expand to full MES as they mature.</p>' },
    { question: 'Do I need ERP before implementing MES?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">No. DigiWin MES connects to any existing ERP through standard web services. Many manufacturers start with MES first to get immediate shop floor visibility, then add or upgrade ERP later. This approach lets you see ROI faster than a full ERP replacement.</p>' },
    { question: 'What results can I expect with DigiWin MES?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Based on implementation data across 50,000+ manufacturing clients, MES customers report a 45% reduction in production cycle time, 70% reduction in quality failures, and 26% improvement in operational efficiency. SFT users typically achieve 92% production transparency and 86% on-time delivery rate. Results vary by factory, but the visibility alone typically drives immediate behavioral improvements on the shop floor.</p>' },
    { question: 'How does DigiWin MES connect to machines on the shop floor?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin MES connects to shop floor equipment through DigiWin\'s AIoT platform, which supports 50+ industrial protocols including OPC-UA, Modbus, MQTT, and direct CNC/PLC connections. For machines without digital interfaces, barcode scanning and tablet-based operator input provide the data bridge.</p>' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
