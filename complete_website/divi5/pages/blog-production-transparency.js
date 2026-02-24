/**
 * blog-production-transparency.js — Blog post page config
 *
 * WordPress page: Production Transparency (ID 100763, slug: production-transparency)
 * Prototype: blog/production-transparency.html (Format A, 825 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-pt',
  slug: 'production-transparency',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'production-transparency.html'),
}, { pageId: 100763 });
