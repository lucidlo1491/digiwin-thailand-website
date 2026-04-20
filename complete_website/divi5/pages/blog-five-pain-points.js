/**
 * blog-five-pain-points.js — Blog post page config
 *
 * WordPress page: Five Pain Points (ID 100759, slug: five-pain-points)
 * Prototype: blog/five-pain-points.html (Format A, 754 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-fpp',
  slug: 'five-pain-points',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'five-pain-points.html'),
}, { pageId: 100759 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: '5 Pain Points Every Thai Factory Owner Faces', url: '/five-pain-points/' },
      ]),
      schema.blogPosting({
        headline: 'The 5 Universal Pain Points Every Thai Factory Owner Faces',
        description: 'From cost opacity to delivery accuracy, these five challenges affect every Thai manufacturer \u2014 regardless of industry, size, or product. Here\'s how to recognize and address them.',
        datePublished: '2026-01-15',
        dateModified: '2026-01-15',
        url: '/five-pain-points/',
      }),
      schema.faqPage([
        { question: 'What are the biggest challenges facing Thai manufacturers?', answer: 'Thai manufacturers consistently face five universal pain points: cost opacity (not knowing real production cost per batch), lack of production transparency (no real-time shop floor visibility), paper-based reporting gaps (manual data entry causing inaccuracies and delays), planning-versus-reality disconnect (production plans becoming obsolete within hours), and poor delivery accuracy (inability to give customers reliable delivery commitments). These five challenges appear in virtually every factory regardless of industry, size, or product.' },
        { question: 'Why do Thai factories struggle with true cost visibility?', answer: 'True cost visibility is difficult because material prices fluctuate, yield rates vary, and rework happens at the batch level. Most factories only track average costs, which hide significant batch-to-batch volatility. Materials, labor, overhead, and scrap are often buried in spreadsheets or estimated from standard BOMs rather than captured at the actual work order level.' },
        { question: 'How can manufacturing ERP solve these pain points?', answer: 'A manufacturing ERP solves these pain points by connecting disconnected systems into a single integrated platform. When production data flows from machines to the ERP to dashboards in real time, cost opacity disappears through actual material and labor tracking at the work order level.' },
      ]),
    ];
};

module.exports = _config;
