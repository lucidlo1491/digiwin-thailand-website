/**
 * blog-feature-codes-vb.js — VB-Editable Blog POC page config
 *
 * Proves that blog content CAN be built with individual Divi 5 modules,
 * making ~70% of content click-to-edit in the Visual Builder.
 *
 * This is a WordPress PAGE (not a post) — bypasses the body layout / postContentModule
 * limitation that prevents VB editing of inner blocks.
 *
 * Usage: node complete_website/divi5/build-page.js --page blog-feature-codes-vb [--dry-run]
 */

const path = require('path');

const heroBuilder = require('./sections/blog-fc-hero');
const contentBuilder = require('./sections/blog-fc-content');
const faqBuilder = require('./sections/blog-fc-faq');
const relatedBuilder = require('./sections/blog-fc-related');
const ctaBuilder = require('./sections/blog-fc-cta');

module.exports = {
  pageId: 100811,
  title: 'Feature Codes: How to Turn 27 SKUs Into 1 Product (VB POC)',
  siteUrl: 'https://digiwin-thailand.local',
  vbNative: true,
  prototypePath: path.join(__dirname, '..', '..', 'blog', 'feature-codes.html'),
  protoFile: 'blog/feature-codes.html',

  sections: [
    { name: 'hero',    builder: heroBuilder },
    { name: 'content', builder: contentBuilder },
    { name: 'faq',     builder: faqBuilder },
    { name: 'related', builder: relatedBuilder },
    { name: 'cta',     builder: ctaBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?page_id=100811',
    sections: [
      { name: 'hero',    wpSelector: '.et_pb_section_0', htmlSelector: '.blog-hero' },
      { name: 'content', wpSelector: '.et_pb_section_1', htmlSelector: '.blog-content-section' },
      { name: 'faq',     wpSelector: '.et_pb_section_2', htmlSelector: '.dw-section' },
      { name: 'related', wpSelector: '.et_pb_section_3', htmlSelector: '.blog-related' },
      { name: 'cta',     wpSelector: '.et_pb_section_4', htmlSelector: '.blog-cta' },
    ],
  },
};
