/**
 * mes-related-solutions.js — "Explore Related Solutions" cross-link grid
 * 6 cards linking to related products and industries (excludes MES).
 */

const template = require('../../lib/templates/related-solutions');

const data = {
  sectionPrefix: 'mes-related',
  cards: [
    { title: 'ERP', href: '/products/erp/', desc: 'End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance.' },
    { title: 'WMS', href: '/products/wms/', desc: 'Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability.' },
    { title: 'AIoT', href: '/products/aiot/', desc: 'Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics.' },
    { title: 'Automotive', href: '/industries/automotive/', desc: 'ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers.' },
    { title: 'Electronics', href: '/industries/electronics/', desc: 'Manufacturing software for electronics assembly, SMT lines, and component traceability.' },
    { title: 'Metal &amp; Plastics', href: '/industries/metal-plastics/', desc: 'Integrated solutions for die casting, injection molding, and metal fabrication shops.' },
  ],
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
