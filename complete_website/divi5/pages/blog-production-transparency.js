/**
 * blog-production-transparency.js — Blog post page config
 *
 * WordPress page: Production Transparency (ID 100763, slug: production-transparency)
 * Prototype: blog/production-transparency.html (Format A, 825 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-pt',
  slug: 'production-transparency',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'production-transparency.html'),
}, { pageId: 100763 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'From Paper Reports to Production Transparency', url: '/production-transparency/' },
      ]),
      schema.blogPosting({
        headline: 'From Paper Reports to Production Transparency: A Practical Guide',
        description: 'Most Thai factories still rely on paper forms for production reporting. By the time management sees the data, it\'s already history. Here\'s how to move from paper to real-time production transparency.',
        datePublished: '2026-01-25',
        dateModified: '2026-01-25',
        url: '/production-transparency/',
      }),
      schema.faqPage([
        { question: 'What is production transparency in manufacturing?', answer: 'Production transparency is real-time visibility into shop floor operations \u2014 knowing the status of every work center, every production order, and every piece of equipment as live data, not as end-of-shift summaries or next-day reports.' },
        { question: 'How do factories move from paper reports to digital dashboards?', answer: 'The transition requires three technology layers working together. Layer 1 is data collection. Layer 2 is data integration via MES. Layer 3 is data visualization via dashboards. The key is starting small with one bottleneck line and expanding incrementally.' },
        { question: 'What technology is needed for production transparency?', answer: 'Production transparency requires a combination of MES (Manufacturing Execution System), IoT sensors for critical equipment, and dashboard software for visualization.' },
      ]),
    ];
};

module.exports = _config;
