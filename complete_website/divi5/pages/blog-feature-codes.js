/**
 * blog-feature-codes.js — Blog post page config
 *
 * WordPress page: Feature Codes (ID 100762, slug: feature-codes)
 * Prototype: blog/feature-codes.html (Format A, 772 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-fc',
  slug: 'feature-codes',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'feature-codes.html'),
}, { pageId: 100762 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'Feature Codes: SKU Reduction', url: '/feature-codes/' },
      ]),
      schema.blogPosting({
        headline: 'Feature Codes: How to Turn 27 SKUs Into 1 Product',
        description: 'Learn how product feature codes reduce SKU explosion by 90%+ \u2014 managing size, color, and variant combinations under a single item code instead of dozens.',
        datePublished: '2026-02-08',
        dateModified: '2026-02-08',
        url: '/feature-codes/',
      }),
      schema.faqPage([
        { question: 'What are feature codes in ERP?', answer: 'Feature codes are a product configuration system built into DigiWin\'s ERP that separates the concept of a product from the concept of a variant.' },
        { question: 'How do feature codes reduce SKU count?', answer: 'Feature codes eliminate SKU multiplication by managing product variations as dimensions of a single item rather than separate item codes.' },
        { question: 'What is the difference between product features and inventory features?', answer: 'Product features are attributes inherent to what you are making. Inventory features are internal tracking dimensions the customer never sees.' },
      ]),
    ];
};

module.exports = _config;
