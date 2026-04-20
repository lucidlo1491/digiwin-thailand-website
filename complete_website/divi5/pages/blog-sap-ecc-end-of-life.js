/**
 * blog-sap-ecc-end-of-life.js — Blog post page config
 *
 * WordPress page: SAP ECC End of Life (ID 100761, slug: sap-ecc-end-of-life)
 * Prototype: blog/sap-ecc-end-of-life.html (Format A, 764 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-sap',
  slug: 'sap-ecc-end-of-life',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'sap-ecc-end-of-life.html'),
}, { pageId: 100761 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'SAP ECC End-of-Life 2027', url: '/sap-ecc-end-of-life/' },
      ]),
      schema.blogPosting({
        headline: 'SAP ECC End-of-Life 2027: What Thai Manufacturers Need to Know',
        description: 'SAP ECC reaches end of mainstream maintenance in 2027. For Thai manufacturers, this creates both urgency and opportunity. Here\'s what you need to understand.',
        datePublished: '2026-01-20',
        dateModified: '2026-01-20',
        url: '/sap-ecc-end-of-life/',
      }),
      schema.faqPage([
        { question: 'When does SAP ECC end mainstream support?', answer: 'SAP ECC reaches end of mainstream maintenance in 2027. Extended support is available through 2030 but comes with premium pricing that adds cost without delivering new capabilities.' },
        { question: 'What are the alternatives to SAP S/4HANA for Thai manufacturers?', answer: 'For Thai manufacturers, a manufacturing-focused ERP like DigiWin T100 offers a viable alternative to S/4HANA migration. Unlike SAP, which is a general-purpose enterprise system adapted for manufacturing, DigiWin is a manufacturing-native system.' },
        { question: 'How much does SAP S/4HANA migration cost?', answer: 'SAP S/4HANA migration is not a simple upgrade \u2014 it is a complete reimplementation. The cost often exceeds the original ECC implementation, and the timeline is typically measured in years, not months.' },
        { question: 'Is DigiWin a viable replacement for SAP ECC?', answer: 'Yes. DigiWin T100 offers manufacturing-native capabilities that many SAP ECC users have been working around for years. With 44 years of manufacturing focus, over 50,000 implementations globally, and more than 100 Thai factory deployments, DigiWin delivers comparable enterprise depth at a significantly lower total cost of ownership.' },
      ]),
    ];
};

module.exports = _config;
