/**
 * home-industry-tabs.js — Industry Selector Tabs Section Builder
 *
 * ContentSpec §3.6 — Industry Expertise
 * Uses: tab-content template
 *
 * Three JS-powered tabs (Automotive, Electronics, Metal & Plastics).
 * SVGs extracted from HTML prototype at build time.
 */

const fs = require('fs');
const path = require('path');
const tabContent = require('../../lib/templates/tab-content');

// Extract SVGs from HTML prototype at build time
const PROTO_PATH = path.join(__dirname, '..', '..', '..', 'src', 'pages', 'index.html');

function extractIndustrySVG(industryId) {
  try {
    const html = fs.readFileSync(PROTO_PATH, 'utf8');
    const marker = 'id="industry-' + industryId + '"';
    const start = html.indexOf(marker);
    if (start === -1) return null;
    const svgStart = html.indexOf('<svg', start);
    const svgEnd = html.indexOf('</svg>', svgStart) + 6;
    return html.substring(svgStart, svgEnd);
  } catch (e) { return null; }
}

const DATA = {
  adminLabel: 'Industry Tabs',
  sectionPrefix: 'ind',
  background: '#ffffff',
  header: {
    label: 'Industry Expertise',
    title: 'Built for Your Industry',
    subtitle: 'We don\u2019t just understand manufacturing\u2014we understand YOUR manufacturing.',
  },
  tabs: [
    {
      id: 'automotive',
      label: 'Automotive Parts',
      title: 'Automotive Parts Manufacturing',
      description: 'Thailand is ASEAN\u2019s automotive hub. We understand what tier-1 OEMs (Original Equipment Manufacturers) demand: perfect traceability, just-in-time delivery, and EDI (Electronic Data Interchange) integration that works \u2014 every time.',
      features: [
        'OEM EDI integration ready',
        'IATF 16949 compliance support',
        'Lot-level traceability for recalls',
        'Kanban and just-in-time scheduling',
      ],
      cta: { text: 'Explore Automotive Solutions', href: '/industries/automotive.html' },
    },
    {
      id: 'electronics',
      label: 'Electronics Assembly',
      title: 'Electronics Assembly',
      description: 'High-mix, low-volume. Fast product cycles. Thousands of components per board. We built our MES for exactly this complexity.',
      features: [
        'SMT (Surface Mount Technology) machine integration',
        'Component-level traceability',
        'MSD (Moisture Sensitivity Device) management',
        'AOI (Automated Optical Inspection) integration and defect tracking',
      ],
      cta: { text: 'Explore Electronics Solutions', href: '/industries/electronics.html' },
    },
    {
      id: 'metal-plastics',
      label: 'Metal & Plastics',
      title: 'Metal & Plastics Processing',
      description: 'Stamping, injection molding, CNC machining. Process manufacturing where yield optimization and scrap reduction drive your margins.',
      features: [
        'Process parameter monitoring',
        'Mold/die lifecycle management',
        'Scrap analysis and reduction',
        'Cycle time optimization',
      ],
      cta: { text: 'Explore Metal & Plastics Solutions', href: '/industries/metal-plastics.html' },
    },
  ],
  // Map tab IDs to HTML prototype IDs (metal-plastics → metal)
  extractSvg: (tabId) => extractIndustrySVG(tabId === 'metal-plastics' ? 'metal' : tabId),
};

module.exports = {
  blocks: () => tabContent.blocks(DATA),
  css: () => tabContent.css(DATA),
};
