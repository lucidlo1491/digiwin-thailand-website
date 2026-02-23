/**
 * wms-related-solutions.js — "Explore Related Solutions" cross-link grid
 * 6 cards linking to related products and industries (excludes WMS).
 */

const template = require('../../lib/templates/related-solutions');

const data = {
  sectionPrefix: 'wms-related',
  cards: [
    { title: 'ERP', href: '/products/erp/', desc: 'End-to-end manufacturing ERP built for Thai factories — from BOM to financials to BOI compliance.' },
    { title: 'MES', href: '/products/mes/', desc: 'Real-time shop floor execution system — OEE tracking, SPC, and paperless work orders.' },
    { title: 'AIoT', href: '/products/aiot/', desc: 'Connect machines directly to your ERP with IoT sensors, edge computing, and AI-powered analytics.' },
    { title: 'Automotive', href: '/industries/automotive/', desc: 'ERP and MES solutions purpose-built for automotive parts manufacturers and OEM suppliers.' },
    { title: 'Electronics', href: '/industries/electronics/', desc: 'Manufacturing software for electronics assembly, SMT lines, and component traceability.' },
    { title: 'Metal &amp; Plastics', href: '/industries/metal-plastics/', desc: 'Integrated solutions for die casting, injection molding, and metal fabrication shops.' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
