/**
 * privacy-policy.js — Privacy Policy page config
 *
 * WordPress page: Privacy Policy (ID 100768, slug: privacy-policy)
 * Prototype: privacy-policy.html (505 lines, 1 section)
 */

const path = require('path');
const legalPage = require('../lib/templates/legal-page');

module.exports = legalPage.pageConfig({
  prefix: 'lp-pp',
  slug: 'privacy-policy',
  protoFile: path.join(__dirname, '..', '..', 'privacy-policy.html'),
}, { pageId: 100768 });
