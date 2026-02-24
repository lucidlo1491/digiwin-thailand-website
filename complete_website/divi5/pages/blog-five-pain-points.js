/**
 * blog-five-pain-points.js — Blog post page config
 *
 * WordPress page: Five Pain Points (ID 100759, slug: five-pain-points)
 * Prototype: blog/five-pain-points.html (Format A, 754 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-fpp',
  slug: 'five-pain-points',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'five-pain-points.html'),
}, { pageId: 100759 });
