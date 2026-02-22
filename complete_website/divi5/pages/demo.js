/**
 * demo.js — Contact page config for build-page.js
 *
 * WordPress page: Contact (ID 100569, slug: contact)
 * Prototype: demo.html (renamed from "demo" to "contact" for clarity)
 * Sections: 3 (hero, form, expect)
 */

const path = require('path');

// Section builders
const heroBuilder = require('./sections/demo-hero');
const formBuilder = require('./sections/demo-form');
const expectBuilder = require('./sections/demo-expect');

module.exports = {
  pageId: 100569,
  title: 'Contact Us — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'demo.html'),
  protoFile: 'demo.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'form', builder: formBuilder },
    { name: 'expect', builder: expectBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 5,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100569',
    sections: [
      {
        name: 'hero', wpSelector: '.et_pb_section_0', htmlSelector: '.demo-hero',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'H1', htmlSel: '.demo-hero h1', wpSel: '.et_pb_section_0 h1' },
        ],
      },
      {
        name: 'form', wpSelector: '.et_pb_section_1', htmlSelector: '.demo-form-section',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Form Title', htmlSel: '.demo-form-header h2', wpSel: '.et_pb_section_1 h2' },
        ],
      },
      {
        name: 'expect', wpSelector: '.et_pb_section_2', htmlSelector: '.demo-expect',
        pixelThreshold: 0.1,
        styleMap: [
          { label: 'Expect Title', htmlSel: '.demo-expect-header h2', wpSel: '.et_pb_section_2 h2' },
        ],
      },
    ],
  },
};
