/**
 * blog-amrp-capacity-planning.js — Blog post page config
 *
 * WordPress page: AMRP Capacity Planning (ID 100760, slug: amrp-capacity-planning)
 * Prototype: blog/amrp-capacity-planning.html (Format A, 756 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-amrp',
  slug: 'amrp-capacity-planning',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'amrp-capacity-planning.html'),
}, { pageId: 100760 });
