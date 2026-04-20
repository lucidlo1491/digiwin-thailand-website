/**
 * th-terms.js — Thai Terms of Service page config
 *
 * WordPress page: Thai Terms of Service (ID 100796, slug: th/terms)
 * Uses standalone Thai section builder (not the legal-page template's pageConfig helper).
 *
 * Usage: node complete_website/divi5/build-page.js --page th-terms [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');
const thTermsBuilder = require('./sections/th-legal-terms');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100796,
  title: 'ข้อกำหนดการใช้บริการ — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  protoFile: 'terms.html',

  sections: [
    { name: 'th-tos-content', builder: thTermsBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),


  schema() {
    return [
      schema.thaiVariant(schema.breadcrumbList([
        { name: '\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E23\u0E01', url: '/th/' },
        { name: '\u0E02\u0E49\u0E2D\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23', url: '/th/terms/' },
      ])),
      schema.thaiVariant(schema.webPage({
        name: 'Terms of Service',
        description: 'Terms of Service for DigiWin Thailand website.',
        url: '/th/terms/',
      })),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 3,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100796',
    sections: [
      {
        name: 'th-tos-content',
        wpSelector: '.et_pb_section_0',
        htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.dw-section h1', wpSel: '.et_pb_section_0 h1' }],
      },
    ],
  },
};
