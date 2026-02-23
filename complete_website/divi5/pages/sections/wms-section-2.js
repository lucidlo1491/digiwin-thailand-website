/**
 * wms-section-2.js — FAQ Section (S9)
 *
 * Source: wms.html line 1875
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section 2',
  sectionPrefix: 'wms-faq',
  items: [
    { question: 'What is a Warehouse Management System (WMS)?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">A Warehouse Management System (WMS) is software that controls and optimizes warehouse operations — from receiving and putaway to picking, packing, and shipping. Unlike distribution-focused WMS solutions, DigiWin WMS (sFLS) is designed specifically for manufacturing warehouses, handling raw materials, WIP inventory, and finished goods with production-linked workflows.</p>' },
    { question: 'How is DigiWin WMS different from generic WMS solutions?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin WMS (sFLS) is built for manufacturing, not distribution. It includes production material kitting, shop floor delivery integration, WIP location tracking, and quality hold management — features that generic WMS solutions designed for e-commerce fulfillment simply don\'t offer. It also shares one database with DigiWin ERP and MES, eliminating integration complexity.</p>' },
    { question: 'Can DigiWin WMS work with my existing ERP?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin WMS can operate standalone or integrate with any existing ERP system via standard APIs. It works natively with DigiWin ERP (T100/iGP) through a shared database, but also connects to SAP, Oracle, and other ERP platforms for inventory synchronization and order management.</p>' },
    { question: 'What hardware do I need for DigiWin WMS?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin WMS works with standard Android or iOS mobile devices for barcode scanning, plus optional RFID readers for high-volume environments. You will need barcode label printers for location and item labeling. The system runs on standard server infrastructure or cloud deployment — no specialized hardware beyond mobile scanners is required.</p>' },
    { question: 'How long does WMS implementation take?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">A typical DigiWin WMS implementation takes 2–4 months, depending on warehouse complexity and the number of locations. Basic implementations with core receiving, putaway, and picking can go live in as little as 6 weeks. The phased approach lets you start with high-impact areas and expand coverage over time.</p>' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
