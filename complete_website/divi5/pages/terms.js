/**
 * terms.js — Terms of Service page config
 *
 * WordPress page: Terms of Service (ID 100769, slug: terms)
 * Prototype: terms.html (496 lines, 1 section)
 */

const path = require('path');
const legalPage = require('../lib/templates/legal-page');

module.exports = legalPage.pageConfig({
  prefix: 'lp-tos',
  slug: 'terms',
  protoFile: path.join(__dirname, '..', '..', 'terms.html'),
}, { pageId: 100769 });
