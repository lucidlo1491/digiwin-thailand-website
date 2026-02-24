/**
 * blog-feature-codes.js — Blog post page config
 *
 * WordPress page: Feature Codes (ID 100762, slug: feature-codes)
 * Prototype: blog/feature-codes.html (Format A, 772 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-fc',
  slug: 'feature-codes',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'feature-codes.html'),
}, { pageId: 100762 });
