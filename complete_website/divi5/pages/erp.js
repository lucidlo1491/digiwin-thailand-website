/**
 * erp.js — ERP product page config for build-page.js
 *
 * WordPress page: ERP (ID 100561, slug: erp)
 * Prototype: products/erp.html
 * Sections: 9
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/erp-hero');
const sectionBuilder = require('./sections/erp-section');
const painBuilder = require('./sections/erp-pain');
const productsBuilder = require('./sections/erp-products');
const capabilitiesBuilder = require('./sections/erp-capabilities');
const section6Builder = require('./sections/erp-section-6');
const integrationBuilder = require('./sections/erp-integration');
const section2Builder = require('./sections/erp-section-2');
const ctaBuilder = require('./sections/erp-cta');
const relatedBuilder = require('./sections/erp-related-solutions');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100561,
  title: 'ERP for Manufacturing — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'erp.html'),
  protoFile: 'products/erp.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'what-is-erp', builder: sectionBuilder },
    { name: 'pain', builder: painBuilder },
    { name: 'products', builder: productsBuilder },
    { name: 'capabilities', builder: capabilitiesBuilder },
    { name: 'section-6', builder: section6Builder },
    { name: 'integration', builder: integrationBuilder },
    { name: 'faq', builder: section2Builder },
    { name: 'cta', builder: ctaBuilder },
    { name: 'related-solutions', builder: relatedBuilder },
  ],


  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products/' },
        { name: 'ERP: T100 & iGP', url: '/erp/' },
      ]),
      schema.softwareApplication({
        name: 'DigiWin ERP (T100 & iGP)',
        subCategory: 'Enterprise Resource Planning',
        description: 'Manufacturing-specific ERP system for Thai factories. T100 for enterprise-scale multi-site operations, iGP for growing single-site manufacturers. Financial control, BOM management, MRP planning, and production traceability.',
        url: '/erp/',
        featureList: 'Financial management, BOM management, MRP planning, Production traceability, Multi-site operations, Thai tax & WHT compliance, BOI reporting, e-Tax integration, Inventory control, Purchase management',
      }),
      schema.faqPage([
        { question: 'What is the difference between T100 and iGP?', answer: 'T100 is DigiWin\'s enterprise-tier ERP designed for manufacturers with 200+ employees, multiple sites, and complex multi-company structures. iGP (also known as Workflow ERP) is the growth-tier ERP for single-site manufacturers with 20\u2013200 employees, offering modular purchasing and faster 3\u20136 month deployments. Both share the same manufacturing DNA and can scale.' },
        { question: 'Is DigiWin ERP certified for Thai tax and BOI compliance?', answer: 'Yes. DigiWin ERP is certified by the Thai Revenue Department for e-Tax filing and includes built-in withholding tax (WHT) workflows, VAT handling, and BOI (Board of Investment) compliance features. The system tracks actual material consumption at the production order level so your BOI reports match what auditors expect. One customer eliminated over 10 million THB per year in supplementary tax penalties.' },
        { question: 'How long does a DigiWin ERP implementation take?', answer: 'iGP implementations typically take 3\u20136 months for a single-site factory. T100 enterprise implementations take 6\u20139 months for multi-site operations, significantly faster than comparable enterprise ERPs (often 12\u201318 months). This speed comes from DigiWin\'s pre-built manufacturing templates refined across 50,000+ factory deployments and 44 years of process knowledge.' },
        { question: 'How does DigiWin ERP compare to SAP, Oracle, or Infor for manufacturing?', answer: 'DigiWin ERP delivers approximately 90% of Tier-1 ERP capability at roughly 70% of the cost. Unlike horizontal ERPs, DigiWin is built exclusively for manufacturing with native BOM management, shop floor scheduling, quality control, and production costing.' },
        { question: 'Does DigiWin ERP integrate with MES, WMS, and AIoT?', answer: 'Yes. All DigiWin products are built on the same platform with one shared database \u2014 zero integration tax. Production data flows from shop floor machines through MES into ERP financials automatically.' },
      ]),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 14,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100561',
    sections: [
      { name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.erp-hero', pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.erp-hero h1', wpSel: '.et_pb_section_0 h1' }] },
      { name: 'what-is-erp', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-section', pixelThreshold: 0.15 },
      { name: 'pain', wpSelector: '.et_pb_section_2', htmlSelector: '.pain-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Pain Title', htmlSel: '.pain-section h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'products', wpSelector: '.et_pb_section_3', htmlSelector: '.products-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Products Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'capabilities', wpSelector: '.et_pb_section_4', htmlSelector: '.capabilities-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Caps Title', htmlSel: '.capabilities-section h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'section-6', wpSelector: '.et_pb_section_5', htmlSelector: 'section:nth-of-type(6)', pixelThreshold: 0.15 },
      { name: 'integration', wpSelector: '.et_pb_section_6', htmlSelector: '.integration-section', pixelThreshold: 0.1,
        styleMap: [{ label: 'Integration Title', htmlSel: '.integration-section h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'faq', wpSelector: '.et_pb_section_7', htmlSelector: 'section:nth-of-type(8)', pixelThreshold: 0.15 },
      { name: 'cta', wpSelector: '.et_pb_section_8', htmlSelector: '.erp-cta', pixelThreshold: 0.1,
        styleMap: [{ label: 'CTA Title', htmlSel: '.erp-cta h2', wpSel: '.et_pb_section_8 h2' }] },
      { name: 'related-solutions', wpSelector: '.et_pb_section_9', htmlSelector: '.related-solutions', pixelThreshold: 0.1,
        styleMap: [{ label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_9 h2' }] },
    ],
  },
};
