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
