/**
 * blog-sap-ecc-end-of-life.js — Blog post page config
 *
 * WordPress page: SAP ECC End of Life (ID 100761, slug: sap-ecc-end-of-life)
 * Prototype: blog/sap-ecc-end-of-life.html (Format A, 764 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

module.exports = blogPost.pageConfig({
  prefix: 'bp-sap',
  slug: 'sap-ecc-end-of-life',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'sap-ecc-end-of-life.html'),
}, { pageId: 100761 });
