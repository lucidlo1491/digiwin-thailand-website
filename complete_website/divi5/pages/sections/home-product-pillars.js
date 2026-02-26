/**
 * home-product-pillars.js — Product Pillars (§3.5)
 * 4 product cards: ERP, MES, WMS, AIoT.
 *
 * Template: card-grid-light
 */

const cardGridLight = require('../../lib/templates/card-grid-light');

const DATA = {
  adminLabel: 'Home: Product Pillars',
  sectionPrefix: 'products',
  background: '#F5F7FA',
  padding: '100px 80px',
  headerStyle: 'plain',
  header: {
    label: 'Complete Manufacturing Stack',
    title: 'One Ecosystem. Total Visibility.',
    subtitle: 'From financials to the factory floor, every DigiWin product works together\u2014no integration nightmares, no data silos.',
  },
  superD: { class: 'products-deco', variant: 'gradient', position: 'corner-br', opacity: 0.08, label: 'Decoration: Super D Gradient' },
  gridCols: 4,
  gridGap: '24px',
  cards: [
    {
      href: '/products/erp.html',
      title: 'ERP Core',
      fullName: 'Enterprise Resource Planning',
      tagline: 'The central brain of your business',
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="3" width="16" height="22" rx="2" fill="#00AFF0" fill-opacity="0.15" stroke="#00AFF0" stroke-width="2"/><path d="M8 9h8M8 13h6M8 17h7" stroke="#00AFF0" stroke-width="2" stroke-linecap="round"/><rect x="16" y="14" width="14" height="18" rx="2" fill="#000864" stroke="#00AFF0" stroke-width="2"/><rect x="19" y="17" width="8" height="4" rx="1" fill="#00AFF0" fill-opacity="0.3"/><circle cx="21" cy="26" r="1.5" fill="#00AFF0"/><circle cx="26" cy="26" r="1.5" fill="#00AFF0"/><circle cx="21" cy="29" r="1.5" fill="#00AFF0"/><circle cx="26" cy="29" r="1.5" fill="#00AFF0"/><circle cx="28" cy="7" r="5" fill="#000864" stroke="#00AFF0" stroke-width="2"/><text x="28" y="10" text-anchor="middle" fill="#00AFF0" font-size="8" font-weight="bold">$</text></svg>`,
      features: [
        '<strong>Financials</strong> \u2014 accounting, invoicing, budgets in one place',
        '<strong>Inventory</strong> \u2014 real-time stock levels across locations',
        '<strong>Operations</strong> \u2014 purchase orders, sales, and costs connected',
      ],
      benefit: 'Replace scattered spreadsheets with one source of truth.',
    },
    {
      href: '/products/mes.html',
      title: 'MES',
      fullName: 'Manufacturing Execution System',
      tagline: 'Your digital eyes on the production floor',
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 28V12l8-6v8l8-6v8l8-6v12" fill="#00AFF0" fill-opacity="0.15" stroke="#00AFF0" stroke-width="2" stroke-linejoin="round"/><rect x="6" y="16" width="4" height="4" rx="0.5" fill="#00AFF0"/><rect x="14" y="16" width="4" height="4" rx="0.5" fill="#00AFF0"/><rect x="22" y="16" width="4" height="4" rx="0.5" fill="#00AFF0"/><rect x="3" y="28" width="30" height="4" rx="1" fill="#000864" stroke="#00AFF0" stroke-width="2"/><rect x="8" y="25" width="5" height="4" rx="1" fill="#00AFF0"/><rect x="18" y="25" width="5" height="4" rx="1" fill="#00AFF0" fill-opacity="0.6"/><circle cx="8" cy="30" r="1.5" fill="#00AFF0"/><circle cx="18" cy="30" r="1.5" fill="#00AFF0"/><circle cx="28" cy="30" r="1.5" fill="#00AFF0"/></svg>`,
      features: [
        '<strong>Track</strong> \u2014 follow every product through each workstation',
        '<strong>Record</strong> \u2014 who made what, when, and how',
        '<strong>Alert</strong> \u2014 spot delays and quality issues instantly',
      ],
      benefit: 'Answer \u201Cwhich batch was my order?\u201D in seconds.',
    },
    {
      href: '/products/wms.html',
      title: 'WMS',
      fullName: 'Warehouse Management System',
      tagline: 'Never lose track of inventory again',
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 32V4M14 32V4M24 32V4M34 32V4" stroke="#00AFF0" stroke-width="2"/><path d="M4 12h30M4 22h30M4 32h30" stroke="#00AFF0" stroke-width="2"/><rect x="6" y="6" width="6" height="5" rx="1" fill="#00AFF0"/><rect x="16" y="7" width="6" height="4" rx="1" fill="#00AFF0" fill-opacity="0.7"/><rect x="26" y="6" width="6" height="5" rx="1" fill="#00AFF0" fill-opacity="0.5"/><rect x="6" y="15" width="6" height="6" rx="1" fill="#00AFF0" fill-opacity="0.6"/><rect x="16" y="14" width="6" height="7" rx="1" fill="#00AFF0"/><rect x="26" y="16" width="6" height="5" rx="1" fill="#00AFF0" fill-opacity="0.8"/><rect x="6" y="25" width="6" height="6" rx="1" fill="#00AFF0" fill-opacity="0.5"/><rect x="17" y="24" width="5" height="7" rx="1" fill="#00AFF0" fill-opacity="0.7"/><rect x="26" y="25" width="6" height="6" rx="1" fill="#00AFF0"/></svg>`,
      features: [
        '<strong>Locate</strong> \u2014 know which shelf, bin, and zone for every item',
        '<strong>Guide</strong> \u2014 barcode scanning for pick, pack, and ship',
        '<strong>Count</strong> \u2014 cycle counts that match reality',
      ],
      benefit: 'Faster fulfillment, fewer mistakes, accurate stock.',
    },
    {
      href: '/products/aiot.html',
      title: 'AIoT',
      fullName: 'AI + Internet of Things',
      tagline: 'Connect your machines to the digital world',
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="12" width="12" height="12" rx="2" fill="#000864" stroke="#00AFF0" stroke-width="2"/><text x="18" y="20" text-anchor="middle" fill="#00AFF0" font-size="6" font-weight="bold">AI</text><path d="M12 18H6M24 18h6M18 12V6M18 24v6" stroke="#00AFF0" stroke-width="2"/><path d="M13 13L8 8M23 13l5-5M13 23l-5 5M23 23l5 5" stroke="#00AFF0" stroke-width="1.5" stroke-dasharray="3 2"/><circle cx="5" cy="18" r="3" fill="#00AFF0"/><circle cx="31" cy="18" r="3" fill="#00AFF0"/><circle cx="18" cy="5" r="3" fill="#00AFF0"/><circle cx="18" cy="31" r="3" fill="#00AFF0"/><circle cx="6" cy="6" r="2.5" fill="#00AFF0" fill-opacity="0.6"/><circle cx="30" cy="6" r="2.5" fill="#00AFF0" fill-opacity="0.6"/><circle cx="6" cy="30" r="2.5" fill="#00AFF0" fill-opacity="0.6"/><circle cx="30" cy="30" r="2.5" fill="#00AFF0" fill-opacity="0.6"/></svg>`,
      features: [
        '<strong>Collect</strong> \u2014 temperature, speed, vibration automatically',
        '<strong>Predict</strong> \u2014 machine breakdowns before they happen',
        '<strong>Optimize</strong> \u2014 energy usage and efficiency gains',
      ],
      benefit: 'No manual logging. AI finds what humans miss.',
    },
  ],
};

module.exports = {
  DATA,
  blocks: () => cardGridLight.blocks(DATA),
  css: () => cardGridLight.css(DATA),
};
