/**
 * blog-co-product-cost-accounting.js — Blog post page config
 *
 * WordPress page: Co-Product Cost Accounting (ID 100765, slug: co-product-cost-accounting)
 * Prototype: blog/co-product-cost-accounting.html (Format B, 1173 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-cpca',
  slug: 'co-product-cost-accounting',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'co-product-cost-accounting.html'),
}, { pageId: 100765 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'Co-Product Cost Accounting', url: '/co-product-cost-accounting/' },
      ]),
      schema.blogPosting({
        headline: 'Co-Product Cost Accounting: The Problem Most ERPs Cannot Solve',
        description: 'Most ERPs force separate work orders for each output \u2014 destroying cost accuracy. Learn how native co-product handling delivers accurate per-product costing for plastics, food, and chemical manufacturing.',
        datePublished: '2026-02-05',
        dateModified: '2026-02-05',
        url: '/co-product-cost-accounting/',
      }),
      schema.faqPage([
        { question: 'What is co-product cost accounting?', answer: 'Co-product cost accounting is the process of accurately allocating production costs when a single manufacturing run produces multiple outputs.' },
        { question: 'How do ERPs handle co-products?', answer: 'Most ERP systems assume one work order produces one output. DigiWin handles co-products natively \u2014 one work order can declare multiple output items with flexible cost allocation methods.' },
        { question: 'Which industries need co-product costing?', answer: 'Plastics injection molding, food and beverage processing, chemical manufacturing, and metal fabrication.' },
      ]),
    ];
};

module.exports = _config;
