/**
 * blog-dual-units.js — Blog post page config
 *
 * WordPress page: Dual Units (ID 100758, slug: dual-units)
 * Prototype: blog/dual-units.html (Format A, 713 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-du',
  slug: 'dual-units',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'dual-units.html'),
}, { pageId: 100758 });
