/**
 * automotive-section-3.js — FAQ Section (S8)
 *
 * Source: automotive.html line 731
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section 3',
  sectionPrefix: 'auto-faq',
  items: [
    { question: 'What ERP system do automotive parts factories in Thailand use?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin is the ERP of choice for over 500 automotive tier 1-3 suppliers across Thailand and ASEAN. Our system is purpose-built for the automotive supply chain, with native support for JIT scheduling, OEM EDI integration, and IATF 16949 quality compliance. Unlike generic ERP platforms, DigiWin understands kanban signals, sequence delivery, and the multi-plant coordination that automotive production demands.</p>' },
    { question: 'Does DigiWin ERP support EDI for automotive supply chains?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin ERP supports EDI integration for automotive supply chains, enabling electronic exchange of forecasts, purchase orders, ASN confirmations, and quality data with your OEM customers. This reduces manual data entry and helps maintain the tight JIT delivery windows that automotive production demands.</p>' },
    { question: 'Does DigiWin support IATF 16949 quality documentation?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin includes built-in quality management modules designed for IATF 16949 compliance. The system supports PPAP documentation, control plans, inspection records, SPC charts and analysis, and 8D reporting. All quality data is captured digitally and is audit-ready at all times, eliminating the documentation anxiety that comes with quarterly customer audits and growing compliance requirements.</p>' },
    { question: 'How does DigiWin help with automotive lot traceability?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin delivers 100% traceability coverage from raw material receiving through finished goods shipping. The system supports both forward and backward lot-level traceability with barcode and QR code scanning at every step. When a quality issue surfaces and an OEM asks which lot, which raw materials, and which operator were involved, DigiWin provides the answer in seconds rather than days, along with precise recall scope analysis.</p>' },
    { question: 'What is the typical ROI timeline for automotive ERP?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin customers in the automotive sector typically see measurable results within the first year of implementation. Key outcomes include on-time delivery rates reaching 99.5%, which directly protects OEM contracts and prevents costly line-stop penalties. With JIT scheduling, complete traceability, and automated EDI integration working together, the ROI is driven by both cost avoidance and operational efficiency gains across multi-plant operations.</p>' },
  ],
};

module.exports = { blocks: () => template.blocks(data), css: () => template.css(data) };
