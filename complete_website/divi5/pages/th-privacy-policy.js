/**
 * th-privacy-policy.js — Thai Privacy Policy page config
 *
 * WordPress page: Thai Privacy Policy (ID 100795, slug: th/privacy-policy)
 * Uses standalone Thai section builder (not the legal-page template's pageConfig helper).
 *
 * Usage: node complete_website/divi5/build-page.js --page th-privacy-policy [--dry-run]
 */

const path = require('path');
const { thaiTypographyCSS } = require('../lib/css-assembler');
const thPrivacyBuilder = require('./sections/th-legal-privacy');

module.exports = {
  pageId: 100795,
  title: 'นโยบายความเป็นส่วนตัว — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  protoFile: 'privacy-policy.html',

  sections: [
    { name: 'th-pp-content', builder: thPrivacyBuilder },
  ],

  // Thai typography: Noto Sans Thai font + label letter-spacing fix
  extraCSS: () => thaiTypographyCSS(),

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 3,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100795',
    sections: [
      {
        name: 'th-pp-content',
        wpSelector: '.et_pb_section_0',
        htmlSelector: '.dw-section',
        pixelThreshold: 0.1,
        styleMap: [{ label: 'H1', htmlSel: '.dw-section h1', wpSel: '.et_pb_section_0 h1' }],
      },
    ],
  },
};
