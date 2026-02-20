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
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5"><rect x="4" y="2" width="20" height="28" rx="2"/><rect x="12" y="12" width="20" height="22" rx="2" fill="none"/><path d="M8 8h12M8 13h8M8 18h10"/><circle cx="22" cy="23" r="5"/><path d="M22 20v6M19 23h6"/></svg>`,
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
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5"><rect x="2" y="6" width="32" height="18" rx="2"/><path d="M2 14h32"/><rect x="6" y="9" width="4" height="3" rx="1"/><rect x="12" y="9" width="4" height="3" rx="1"/><circle cx="28" cy="11" r="2"/><path d="M6 28h24"/><circle cx="12" cy="28" r="2"/><circle cx="24" cy="28" r="2"/><path d="M12 24v4M24 24v4"/></svg>`,
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
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5"><path d="M4 4v28h28"/><path d="M4 16h28M4 24h28"/><path d="M14 4v28M24 4v28"/><rect x="6" y="6" width="6" height="8" rx="1" fill="#0369a1" opacity="0.2"/><rect x="16" y="18" width="6" height="4" rx="1" fill="#0369a1" opacity="0.15"/><rect x="26" y="6" width="4" height="8" rx="1" fill="#0369a1" opacity="0.1"/></svg>`,
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
      icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5"><rect x="12" y="12" width="12" height="12" rx="2"/><text x="18" y="20" text-anchor="middle" font-size="6" fill="#0369a1" stroke="none" font-family="monospace">AI</text><circle cx="6" cy="6" r="3"/><circle cx="30" cy="6" r="3"/><circle cx="6" cy="30" r="3"/><circle cx="30" cy="30" r="3"/><path d="M9 9l3 3M27 9l-3 3M9 27l3-3M27 27l-3-3"/><path d="M18 9V12M27 18h-3M18 27V24M9 18h3" stroke-dasharray="2 2"/></svg>`,
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
  blocks: () => cardGridLight.blocks(DATA),
  css: () => cardGridLight.css(DATA),
};
