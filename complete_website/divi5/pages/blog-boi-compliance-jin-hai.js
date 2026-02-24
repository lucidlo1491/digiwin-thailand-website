/**
 * blog-boi-compliance-jin-hai.js — Blog post page config
 *
 * WordPress page: BOI Compliance Jin Hai (ID 100764, slug: boi-compliance-jin-hai)
 * Prototype: blog/boi-compliance-jin-hai.html (Format A, 899 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-boi',
  slug: 'boi-compliance-jin-hai',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'boi-compliance-jin-hai.html'),
}, { pageId: 100764 });
