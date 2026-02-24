/**
 * blog-lrp-vs-mrp.js — Blog post page config
 *
 * WordPress page: LRP vs MRP (ID 100766, slug: lrp-vs-mrp)
 * Prototype: blog/lrp-vs-mrp.html (Format B, 1243 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-lrp',
  slug: 'lrp-vs-mrp',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'lrp-vs-mrp.html'),
}, { pageId: 100766 });
