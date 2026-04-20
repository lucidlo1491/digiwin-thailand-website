/**
 * metal-plastics.js — metal-plastics page config for build-page.js
 *
 * WordPress page: Metal & Plastics Processing (ID 100767)
 * Prototype: industries/metal-plastics.html (939 lines, 11 sections)
 *
 * Usage: node complete_website/divi5/build-page.js --page metal-plastics [--dry-run]
 */

const path = require('path');

// Section builders
const metalHeroBuilder = require('./sections/metal-plastics-metal-hero');
const contextBuilder = require('./sections/metal-plastics-context');
const challengesBuilder = require('./sections/metal-plastics-challenges');
const solutionsBuilder = require('./sections/metal-plastics-solutions');
const specializedErpBuilder = require('./sections/metal-plastics-specialized-erp');
const metalCaseStudyBuilder = require('./sections/metal-plastics-metal-case-study');
const processesBuilder = require('./sections/metal-plastics-processes');
const productsBuilder = require('./sections/metal-plastics-products');
const metalFaqBuilder = require('./sections/metal-plastics-metal-faq');
const ctaBuilder = require('./sections/metal-plastics-cta');
const relatedBuilder = require('./sections/metal-plastics-related-solutions');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100767,
  title: 'Metal & Plastics Processing Solutions — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'industries/metal-plastics.html'),
  protoFile: 'industries/metal-plastics.html',

  sections: [
    { name: 'metal-hero', builder: metalHeroBuilder },
    { name: 'context', builder: contextBuilder },
    { name: 'challenges', builder: challengesBuilder },
    { name: 'solutions', builder: solutionsBuilder },
    { name: 'specialized-erp', builder: specializedErpBuilder },
    { name: 'metal-case-study', builder: metalCaseStudyBuilder },
    { name: 'processes', builder: processesBuilder },
    { name: 'products', builder: productsBuilder },
    { name: 'metal-faq', builder: metalFaqBuilder },
    { name: 'cta', builder: ctaBuilder },
    { name: 'related-solutions', builder: relatedBuilder },
  ],


  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Industries', url: '/industries/' },
        { name: 'Metal & Plastics', url: '/industries/metal-plastics/' },
      ]),
      schema.webPage({
        name: 'Metal & Plastics Processing Solutions',
        description: 'ERP and MES for metal stamping, injection molding, die casting, and CNC machining in Thailand.',
        url: '/industries/metal-plastics/',
      }),
      schema.faqPage([
        { question: 'What ERP system is best for metal stamping factories in Thailand?', answer: 'DigiWin offers ERP and MES solutions specifically designed for metal stamping and process manufacturing environments. The system includes real-time process parameter monitoring that captures temperature, pressure, and speed data from every cycle, then correlates those parameters directly to quality outcomes. For metal stamping factories where material costs represent 50-70% of total costs, this data-driven approach delivers an average 15% yield improvement and 30% reduction in unplanned downtime.' },
        { question: 'How does DigiWin help reduce scrap in injection molding?', answer: 'DigiWin reduces injection molding scrap through real-time yield tracking combined with SPC integration. The system categorizes defects by type and correlates them to specific machines, shifts, and material lots using Pareto analysis and root cause correlation tools. Rather than discovering quality issues after the fact, operators receive out-of-spec alerts the moment process parameters drift, enabling immediate correction. This approach targets root causes rather than symptoms, turning small yield improvements into significant profit impact when material costs are your largest expense.' },
        { question: 'Can DigiWin track mold and die maintenance and shot counts?', answer: 'Yes. DigiWin includes a built-in die and mold management module that tracks shot counts, complete maintenance history, and performance trending for every tool. The system predicts maintenance needs based on usage data, scheduling preventive maintenance before catastrophic failures occur. This eliminates the guesswork around questions like which die is causing defects and when a mold needs service, replacing reactive maintenance with data-driven tool performance management.' },
        { question: 'Does DigiWin support BOI compliance for metal and plastics manufacturers?', answer: 'Yes. DigiWin provides production-order-level material reconciliation specifically designed for BOI audits in metal and plastics manufacturing. The system tracks actual material consumption per mold run, which is essential for co-product and multi-cavity tracking that BOI auditors require. Manufacturers using DigiWin for BOI compliance benefit from BOI-ready audit reports, accurate co-product cost allocation, and proven savings exceeding 10 million THB per year.' },
        { question: 'What process types does DigiWin support?', answer: 'DigiWin supports a comprehensive range of metal and plastics processing methods including stamping, injection molding, die casting, CNC machining, forging, extrusion, sheet metal fabrication, and blow molding. Each process type benefits from DigiWin\'s core capabilities in cycle time optimization, process parameter monitoring, scrap analysis, and die/mold management. The system provides 100% cycle time visibility with auto cycle detection, drift alerts, and OEE calculation regardless of the specific manufacturing process.' },
      ]),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100767',
    sections: [
      { name: 'metal-hero', wpSelector: '.et_pb_section_0', htmlSelector: '.metal-hero', pixelThreshold: 0.1, styleMap: [{ label: 'Hero Title', htmlSel: '.metal-hero h2', wpSel: '.et_pb_section_0 h2' }] },
      { name: 'context', wpSelector: '.et_pb_section_1', htmlSelector: '.context-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.context-section h2', wpSel: '.et_pb_section_1 h2' }] },
      { name: 'challenges', wpSelector: '.et_pb_section_2', htmlSelector: '.challenges-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.challenges-section h2', wpSel: '.et_pb_section_2 h2' }] },
      { name: 'solutions', wpSelector: '.et_pb_section_3', htmlSelector: '.solutions-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.solutions-section h2', wpSel: '.et_pb_section_3 h2' }] },
      { name: 'specialized-erp', wpSelector: '.et_pb_section_4', htmlSelector: '.specialized-erp-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.specialized-erp-section h2', wpSel: '.et_pb_section_4 h2' }] },
      { name: 'metal-case-study', wpSelector: '.et_pb_section_5', htmlSelector: '.metal-case-study', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.metal-case-study h2', wpSel: '.et_pb_section_5 h2' }] },
      { name: 'processes', wpSelector: '.et_pb_section_6', htmlSelector: '.processes-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.processes-section h2', wpSel: '.et_pb_section_6 h2' }] },
      { name: 'products', wpSelector: '.et_pb_section_7', htmlSelector: '.products-section', pixelThreshold: 0.1, styleMap: [{ label: 'Section Title', htmlSel: '.products-section h2', wpSel: '.et_pb_section_7 h2' }] },
      { name: 'metal-faq', wpSelector: '.et_pb_section_8', htmlSelector: '.metal-faq', pixelThreshold: 0.1, styleMap: [{ label: 'FAQ Title', htmlSel: '.metal-faq h2', wpSel: '.et_pb_section_8 h2' }] },
      { name: 'cta', wpSelector: '.et_pb_section_9', htmlSelector: '.cta-section', pixelThreshold: 0.1, styleMap: [{ label: 'CTA Title', htmlSel: '.cta-section h2', wpSel: '.et_pb_section_9 h2' }] },
      { name: 'related-solutions', wpSelector: '.et_pb_section_10', htmlSelector: '.related-solutions', pixelThreshold: 0.1, styleMap: [{ label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_10 h2' }] },
    ],
  },
};
