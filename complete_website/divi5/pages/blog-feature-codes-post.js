/**
 * blog-feature-codes-post.js — VB-Native blog POST config
 *
 * Pushes content + FAQ sections to post 100802 (post_type='post').
 * The body layout (100440 / blog-single.js) handles:
 *   - Hero (navy gradient + dynamic postTitleModule)
 *   - Related articles (blogModule, 3 posts)
 *   - CTA (gradient + "Let's Talk")
 *
 * We only push the article body (content + FAQ) as post_content.
 * The body layout's CSS handles base typography (.dw-blog-content-wrap).
 * Our CSS only covers custom elements: data card, highlight, bullets, accordion.
 *
 * Usage: node complete_website/divi5/build-page.js --page blog-feature-codes-post [--dry-run]
 */

const path = require('path');

const contentBuilder = require('./sections/blog-fc-post-content');
const faqBuilder = require('./sections/blog-fc-post-faq');
const schema = require('../lib/schema');

module.exports = {
  pageId: 100802,
  postType: 'post',
  title: 'Feature Codes: How to Turn 27 SKUs Into 1 Product',
  siteUrl: 'https://digiwin-thailand.local',
  vbNative: true,
  prototypePath: path.join(__dirname, '..', '..', 'blog', 'feature-codes.html'),
  protoFile: 'blog/feature-codes.html',

  sections: [
    { name: 'content', builder: contentBuilder },
    { name: 'faq',     builder: faqBuilder },
  ],


  schema() {
    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'Feature Codes: SKU Reduction', url: '/feature-codes/' },
      ]),
      schema.blogPosting({
        headline: 'Feature Codes: How to Turn 27 SKUs Into 1 Product',
        description: 'Learn how product feature codes reduce SKU explosion by 90%+ \u2014 managing size, color, and variant combinations under a single item code instead of dozens.',
        datePublished: '2026-02-08',
        dateModified: '2026-02-08',
        url: '/feature-codes/',
      }),
    ];
  },

  editabilityRules: {
    bannedBlocks: ['wp:divi/group'],
    maxHtmlBlocks: 1,
  },

  verify: {
    wpUrl: 'https://digiwin-thailand.local/?p=100802',
    sections: [
      { name: 'content', wpSelector: '.et_pb_section_1', htmlSelector: '.blog-body' },
      { name: 'faq',     wpSelector: '.et_pb_section_2', htmlSelector: '.dw-section' },
    ],
  },
};
