/**
 * blog-shop-floor-scheduling.js — Blog post page config
 *
 * WordPress page: Shop Floor Mini-Scheduling (ID 100757, slug: shop-floor-scheduling)
 * Prototype: blog/shop-floor-scheduling.html (Format A, 714 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-sfs',
  slug: 'shop-floor-scheduling',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'shop-floor-scheduling.html'),
}, { pageId: 100757 });
