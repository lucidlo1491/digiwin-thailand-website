/**
 * blog-boi-compliance-jin-hai.js — Blog post page config
 *
 * WordPress page: BOI Compliance Jin Hai (ID 100764, slug: boi-compliance-jin-hai)
 * Prototype: blog/boi-compliance-jin-hai.html (Format A, 899 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-boi',
  slug: 'boi-compliance-jin-hai',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'boi-compliance-jin-hai.html'),
}, { pageId: 100764 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'BOI Compliance: 10M THB Savings', url: '/boi-compliance-jin-hai/' },
      ]),
      schema.blogPosting({
        headline: 'How One Factory Saved 10M THB/Year in BOI Supplementary Taxes',
        description: 'A Thai BOI-certified manufacturer was paying over 10 million baht per year in supplementary taxes. Through production-order-level material reconciliation, they eliminated that cost entirely.',
        datePublished: '2026-02-10',
        dateModified: '2026-02-13',
        url: '/boi-compliance-jin-hai/',
      }),
      schema.faqPage([
        { question: 'What are BOI supplementary taxes?', answer: 'BOI supplementary taxes are penalties imposed by Thailand\'s Board of Investment when a manufacturer\'s actual material usage does not match BOI-approved ratios.' },
        { question: 'How can manufacturers reduce BOI tax penalties?', answer: 'Manufacturers can reduce or eliminate BOI tax penalties through production-order-level material reconciliation.' },
        { question: 'What is production-order-level reconciliation?', answer: 'Production-order-level reconciliation means tracking material usage per production order against BOI-approved ratios, rather than relying on aggregate or theoretical calculations.' },
        { question: 'How much can BOI compliance optimization save?', answer: 'In the case of Jin Hai, their annual BOI supplementary tax liability dropped from over 10 million THB per year to zero in 2025.' },
        { question: 'What are the BOI enforcement focus areas for 2026?', answer: 'Double bookkeeping detection, inventory mismatch audits, BOI/non-BOI transaction filing, and tariff recovery actions.' },
      ]),
    ];
};

module.exports = _config;
