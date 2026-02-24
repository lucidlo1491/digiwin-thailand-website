/**
 * blog-co-product-cost-accounting.js — Blog post page config
 *
 * WordPress page: Co-Product Cost Accounting (ID 100765, slug: co-product-cost-accounting)
 * Prototype: blog/co-product-cost-accounting.html (Format B, 1173 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-cpca',
  slug: 'co-product-cost-accounting',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'co-product-cost-accounting.html'),
}, { pageId: 100765 });
