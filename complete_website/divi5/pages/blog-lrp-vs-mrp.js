/**
 * blog-lrp-vs-mrp.js — Blog post page config
 *
 * WordPress page: LRP vs MRP (ID 100766, slug: lrp-vs-mrp)
 * Prototype: blog/lrp-vs-mrp.html (Format B, 1243 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-lrp',
  slug: 'lrp-vs-mrp',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'lrp-vs-mrp.html'),
}, { pageId: 100766 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'LRP vs MRP: Production Planning Speed', url: '/lrp-vs-mrp/' },
      ]),
      schema.blogPosting({
        headline: 'LRP vs MRP: Why Your Production Planning Takes Hours Instead of Minutes',
        description: 'Traditional MRP takes hours to recalculate your entire factory. LRP (Lot Requirements Planning) gives you per-order material answers in under a minute. Learn why this changes everything for Thai manufacturers.',
        datePublished: '2026-02-01',
        dateModified: '2026-02-01',
        url: '/lrp-vs-mrp/',
      }),
      schema.faqPage([
        { question: 'What is the difference between LRP and MRP?', answer: 'Traditional MRP recalculates everything in a single batch run that typically takes 4 to 8 hours. LRP calculates material requirements for a specific production order, delivering results in under 1 minute. LRP does not replace MRP \u2014 they complement each other.' },
        { question: 'What is LRP (Lot Requirements Planning)?', answer: 'LRP is DigiWin\'s advanced planning engine built directly into the ERP alongside AMRP. Instead of recalculating the entire factory, LRP calculates material requirements for a specific production order.' },
        { question: 'Why does traditional MRP take so long to run?', answer: 'Traditional MRP takes hours because it performs a full BOM explosion across all items in the factory simultaneously. For a typical Thai factory with thousands of active items, this comprehensive recalculation takes 4 to 8 hours per cycle.' },
      ]),
    ];
};

module.exports = _config;
