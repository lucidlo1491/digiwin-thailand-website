/**
 * event-outcomes.js — BOI Compliance Workshop Outcomes (S3)
 *
 * Thin data wrapper using event-outcomes template.
 */

const template = require('../../lib/templates/event-outcomes');

const DATA = {
  sectionPrefix: 'evt-out',
  color: '#15803d',
  label: 'Workshop Outcomes',
  title: "What You'll Be Able to Do After This Workshop",
  outcomes: [
    { icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>', title: 'Run a BOI reconciliation report', desc: 'Map imported bonded materials to production orders — the exact format BOI auditors expect to see.' },
    { icon: '<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', title: 'Identify compliance gaps in your current ERP', desc: 'Know specifically which data your system can and cannot produce for BOI filings.' },
    { icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>', title: 'Calculate your supplementary tax exposure', desc: 'Estimate the gap between theoretical BOM consumption and actual production usage in your factory.' },
    { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', title: 'Build a BOI audit preparation checklist', desc: 'A step-by-step process your team can follow before every audit cycle — take it home and use it.' },
    { icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', title: 'Evaluate ERP systems for BOI readiness', desc: 'Know what questions to ask any ERP vendor about production-order-level tracking capabilities.' },
    { icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', title: 'Present a compliance upgrade business case', desc: 'Build the ROI argument for production-level tracking using real factory data from the workshop.' },
  ],
};

module.exports = {
  blocks: () => template.blocks(DATA),
  css: () => template.css(DATA),
};
