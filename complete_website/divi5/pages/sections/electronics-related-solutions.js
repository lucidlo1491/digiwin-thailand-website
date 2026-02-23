/**
 * electronics-related-solutions.js — "Explore Related Solutions" cross-link grid
 * 6 cards linking to related products and industries (excludes Electronics).
 * Industry pages lead with sibling industries, then products.
 */

const template = require('../../lib/templates/related-solutions');

const data = {
  sectionPrefix: 'elec-related',
  cards: [
    { title: 'Automotive', href: '/industries/automotive/', desc: 'ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers.' },
    { title: 'Metal &amp; Plastics', href: '/industries/metal-plastics/', desc: 'Integrated solutions for die casting, injection molding, and metal fabrication shops.' },
    { title: 'ERP', href: '/products/erp/', desc: 'End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance.' },
    { title: 'MES', href: '/products/mes/', desc: 'Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders.' },
    { title: 'WMS', href: '/products/wms/', desc: 'Smart warehouse management with barcode/RFID — from receiving to dispatch with full traceability.' },
    { title: 'AIoT', href: '/products/aiot/', desc: 'Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics.' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
