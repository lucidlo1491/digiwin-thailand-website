/**
 * privacy-policy.js — Privacy Policy page config
 *
 * WordPress page: Privacy Policy (ID 100768, slug: privacy-policy)
 * Prototype: privacy-policy.html (505 lines, 1 section)
 */

const path = require('path');
const legalPage = require('../lib/templates/legal-page');

const schema = require('../lib/schema');

const _config = legalPage.pageConfig({
  prefix: 'lp-pp',
  slug: 'privacy-policy',
  protoFile: path.join(__dirname, '..', '..', 'privacy-policy.html'),
}, { pageId: 100768 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy-policy/' },
      ]),
      schema.webPage({
        name: 'Privacy Policy',
        description: 'Privacy Policy for DigiWin Thailand. How we collect, use, and protect your personal data under Thailand\'s PDPA.',
        url: '/privacy-policy/',
      }),
    ];
};

module.exports = _config;
