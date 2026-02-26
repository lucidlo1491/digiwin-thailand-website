/**
 * erp-section-2.js — FAQ Section (S8)
 *
 * Source: erp.html line 2280
 */

const template = require('../../lib/templates/faq-accordion');

const data = {
  adminLabel: 'Section 2',
  sectionPrefix: 'erp-faq',
  items: [
    { question: 'What is the difference between T100 and iGP?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">T100 is DigiWin\'s enterprise-tier ERP designed for manufacturers with 200+ employees, multiple sites, and complex multi-company structures. iGP (also known as Workflow ERP) is the growth-tier ERP for single-site manufacturers with 20–200 employees, offering modular purchasing and faster 3–6 month deployments. Both share the same manufacturing DNA and can scale — many customers start with iGP and upgrade to T100 as they grow.</p>' },
    { question: 'Is DigiWin ERP certified for Thai tax and BOI compliance?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin ERP is certified by the Thai Revenue Department for e-Tax filing and includes built-in withholding tax (WHT) workflows, VAT handling, and BOI (Board of Investment) compliance features. The system tracks actual material consumption at the production order level — not theoretical BOM calculations — so your BOI reports match what auditors expect. One customer eliminated over 10 million THB per year in supplementary tax penalties after switching to DigiWin.</p>' },
    { question: 'How long does a DigiWin ERP implementation take?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">iGP implementations typically take 3–6 months for a single-site factory. T100 enterprise implementations take 6–9 months for multi-site operations, which is significantly faster than comparable enterprise ERPs (often 12–18 months). This speed comes from DigiWin\'s pre-built manufacturing templates refined across 50,000+ factory deployments and 44 years of process knowledge — you\'re not starting from scratch.</p>' },
    { question: 'How does DigiWin ERP compare to SAP, Oracle, or Infor for manufacturing?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin ERP delivers approximately 90% of Tier-1 ERP capability at roughly 70% of the cost, with significantly faster implementation timelines. Unlike horizontal ERPs that serve banks, retailers, and hospitals, DigiWin is built exclusively for manufacturing — with native support for Bill of Materials (BOM) management, shop floor scheduling, quality control, and production costing. These are capabilities that other ERPs typically require expensive customization to achieve, often adding months to the project.</p>' },
    { question: 'Does DigiWin ERP integrate with MES, WMS, and AIoT?', answer: '<p style="font-family: \'Noto Sans\', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. All DigiWin products — ERP, MES (Manufacturing Execution System), WMS (Warehouse Management System), and AIoT — are built on the same platform with one shared database. This means no integration middleware or manual reconciliation: production data flows from shop floor machines through MES into ERP financials automatically. When you add a module, it connects instantly because it already shares the same data source.</p>' },
  ],
};

module.exports = { DATA: data, blocks: () => template.blocks(data), css: () => template.css(data) };
