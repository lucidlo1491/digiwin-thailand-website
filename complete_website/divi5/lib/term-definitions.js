/**
 * term-definitions.js — Manufacturing glossary for first-use abbreviation expansion
 *
 * Wraps first occurrence of each term with <abbr title="..."> for:
 * - Accessibility (screen readers announce the expansion)
 * - SEO (search engines understand term context)
 * - GEO (AI engines can cite proper definitions)
 * - Thai audience (may encounter terms for first time)
 *
 * Usage:
 *   const { expandTerms } = require('./lib/term-definitions');
 *   const html = expandTerms('Our ERP connects MES and WMS data...');
 *   // → 'Our <abbr title="Enterprise Resource Planning">ERP</abbr> connects...'
 *
 * ANTI-HALLUCINATION: All definitions sourced from industry standards.
 * DigiWin-specific product names are NOT expanded (they're proper nouns).
 */

const TERMS_EN = {
  ERP: 'Enterprise Resource Planning',
  MES: 'Manufacturing Execution System',
  WMS: 'Warehouse Management System',
  AIoT: 'AI-powered Internet of Things',
  IoT: 'Internet of Things',
  BOM: 'Bill of Materials',
  OEE: 'Overall Equipment Effectiveness',
  MRP: 'Material Requirements Planning',
  CRM: 'Customer Relationship Management',
  EDI: 'Electronic Data Interchange',
  JIT: 'Just-in-Time',
  SPC: 'Statistical Process Control',
  FIFO: 'First In, First Out',
  FEFO: 'First Expired, First Out',
  BOI: 'Board of Investment',
  PDPA: 'Personal Data Protection Act',
  CLS: 'Cumulative Layout Shift',
  ROI: 'Return on Investment',
  KPI: 'Key Performance Indicator',
  PLC: 'Programmable Logic Controller',
  CNC: 'Computer Numerical Control',
  SCADA: 'Supervisory Control and Data Acquisition',
  IATF: 'International Automotive Task Force',
  QMS: 'Quality Management System',
  WIP: 'Work in Progress',
  PPAP: 'Production Part Approval Process',
  ASN: 'Advanced Shipping Notice',
  SLA: 'Service Level Agreement',
};

const TERMS_TH = {
  ERP: 'ระบบวางแผนทรัพยากรองค์กร (Enterprise Resource Planning)',
  MES: 'ระบบบริหารการผลิต (Manufacturing Execution System)',
  WMS: 'ระบบบริหารคลังสินค้า (Warehouse Management System)',
  AIoT: 'ปัญญาประดิษฐ์ร่วมกับอินเทอร์เน็ตสรรพสิ่ง (AI + IoT)',
  IoT: 'อินเทอร์เน็ตสรรพสิ่ง (Internet of Things)',
  BOM: 'รายการวัตถุดิบ (Bill of Materials)',
  OEE: 'ประสิทธิผลโดยรวมของเครื่องจักร (Overall Equipment Effectiveness)',
  BOI: 'สำนักงานคณะกรรมการส่งเสริมการลงทุน (Board of Investment)',
  PDPA: 'พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล',
  ROI: 'ผลตอบแทนจากการลงทุน (Return on Investment)',
};

/**
 * Expand first occurrence of each abbreviation with <abbr> tag
 * @param {string} html — HTML content
 * @param {string} lang — 'en' or 'th' (default 'en')
 * @returns {string} — HTML with first occurrences wrapped in <abbr>
 */
function expandTerms(html, lang = 'en') {
  const terms = lang === 'th' ? TERMS_TH : TERMS_EN;
  const seen = new Set();

  // Sort by length (longest first) to avoid partial matches
  const sorted = Object.keys(terms).sort((a, b) => b.length - a.length);

  let result = html;
  for (const term of sorted) {
    if (seen.has(term)) continue;

    // Match whole word, not inside HTML tags or already wrapped
    // Negative lookbehind: not preceded by > or " (inside tag attributes)
    // Negative lookahead: not followed by < (closing tag) or already in <abbr>
    const regex = new RegExp(
      `(?<!<[^>]*)\\b(${escapeRegex(term)})\\b(?![^<]*>)(?![^<]*</abbr>)`,
      ''
    );

    const match = result.match(regex);
    if (match) {
      const abbr = `<abbr title="${terms[term]}">${term}</abbr>`;
      result = result.replace(regex, abbr);
      seen.add(term);
    }
  }

  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = {
  TERMS_EN,
  TERMS_TH,
  expandTerms,
};
