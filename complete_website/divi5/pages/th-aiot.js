/**
 * th-aiot.js — Thai AIoT page config for build-page.js
 *
 * 11 sections: hero, section, problem, dataflow, capabilities,
 *              metrics, protocol, integration, section-2 (FAQ), cta, related-solutions
 * Page ID: 100780 (slug: th/aiot)
 *
 * Usage: node complete_website/divi5/build-page.js --page th-aiot [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');

// Thai section builders
const thHero = require('./sections/th-aiot-hero');
const thSection = require('./sections/th-aiot-section');
const thProblem = require('./sections/th-aiot-problem');
const thDataflow = require('./sections/th-aiot-dataflow');
const thCapabilities = require('./sections/th-aiot-capabilities');
const thMetrics = require('./sections/th-aiot-metrics');
const thProtocol = require('./sections/th-aiot-protocol');
const thIntegration = require('./sections/th-aiot-integration');
const thSection2 = require('./sections/th-aiot-section-2');
const thCta = require('./sections/th-aiot-cta');
const thRelated = require('./sections/th-aiot-related-solutions');

module.exports = {
  pageId: 100780,
  title: 'AIoT & Smart Factory — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'products', 'aiot.html'),
  protoFile: 'products/aiot.html',

  sections: [
    { name: 'hero', builder: thHero },
    { name: 'section', builder: thSection },
    { name: 'problem', builder: thProblem },
    { name: 'dataflow', builder: thDataflow },
    { name: 'capabilities', builder: thCapabilities },
    { name: 'metrics', builder: thMetrics },
    { name: 'protocol', builder: thProtocol },
    { name: 'integration', builder: thIntegration },
    { name: 'section-2', builder: thSection2 },
    { name: 'cta', builder: thCta },
    { name: 'related-solutions', builder: thRelated },
  ],

  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 15,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/th/products/aiot/',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.aiot-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.aiot-hero h2', wpSel: '.et_pb_section_0 h2' },
        ],
      },
      {
        name: 'section', wpSelector: '.et_pb_section_1', htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dw-section h2', wpSel: '.et_pb_section_1 h2' },
        ],
      },
      {
        name: 'problem', wpSelector: '.et_pb_section_2', htmlSelector: '.problem-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.problem-section h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
      {
        name: 'dataflow', wpSelector: '.et_pb_section_3', htmlSelector: '.dataflow-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dataflow-section h2', wpSel: '.et_pb_section_3 h2' },
        ],
      },
      {
        name: 'capabilities', wpSelector: '.et_pb_section_4', htmlSelector: '.capabilities-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.capabilities-section h2', wpSel: '.et_pb_section_4 h2' },
        ],
      },
      {
        name: 'metrics', wpSelector: '.et_pb_section_5', htmlSelector: '.metrics-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.metrics-section h2', wpSel: '.et_pb_section_5 h2' },
        ],
      },
      {
        name: 'protocol', wpSelector: '.et_pb_section_6', htmlSelector: '.protocol-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.protocol-section h2', wpSel: '.et_pb_section_6 h2' },
        ],
      },
      {
        name: 'integration', wpSelector: '.et_pb_section_7', htmlSelector: '.integration-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.integration-section h2', wpSel: '.et_pb_section_7 h2' },
        ],
      },
      {
        name: 'section-2', wpSelector: '.et_pb_section_8', htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.dw-section h2', wpSel: '.et_pb_section_8 h2' },
        ],
      },
      {
        name: 'cta', wpSelector: '.et_pb_section_9', htmlSelector: '.cta-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Section Title', htmlSel: '.cta-section h2', wpSel: '.et_pb_section_9 h2' },
        ],
      },
      {
        name: 'related-solutions', wpSelector: '.et_pb_section_10', htmlSelector: '.related-solutions',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Related Title', htmlSel: '.related-solutions h2', wpSel: '.et_pb_section_10 h2' },
        ],
      },
    ],
  },
};
