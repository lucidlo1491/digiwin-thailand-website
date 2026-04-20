/**
 * terms.js — Terms of Service page config
 *
 * WordPress page: Terms of Service (ID 100769, slug: terms)
 * Prototype: terms.html (496 lines, 1 section)
 */

const path = require('path');
const legalPage = require('../lib/templates/legal-page');

const schema = require('../lib/schema');

const _config = legalPage.pageConfig({
  prefix: 'lp-tos',
  slug: 'terms',
  protoFile: path.join(__dirname, '..', '..', 'terms.html'),
}, { pageId: 100769 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Terms of Service', url: '/terms/' },
      ]),
      schema.webPage({
        name: 'Terms of Service',
        description: 'Terms of Service for DigiWin Thailand website.',
        url: '/terms/',
      }),
    ];
};

module.exports = _config;
