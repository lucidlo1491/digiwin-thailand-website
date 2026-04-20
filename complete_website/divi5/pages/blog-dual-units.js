/**
 * blog-dual-units.js — Blog post page config
 *
 * WordPress page: Dual Units (ID 100758, slug: dual-units)
 * Prototype: blog/dual-units.html (Format A, 713 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-du',
  slug: 'dual-units',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'dual-units.html'),
}, { pageId: 100758 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'Dual Units of Measure', url: '/dual-units/' },
      ]),
      schema.blogPosting({
        headline: 'Dual Units: Why Your ERP Should Show Both Kilograms AND Pieces',
        description: 'When your sales team thinks in pieces but production measures in kilograms, your ERP should handle both simultaneously \u2014 not force you to choose one.',
        datePublished: '2026-02-07',
        dateModified: '2026-02-07',
        url: '/dual-units/',
      }),
      schema.faqPage([
        { question: 'What are dual units of measure in ERP?', answer: 'Dual units of measure is an ERP capability that tracks inventory and transactions in two units of measure simultaneously.' },
        { question: 'Why does my ERP need dual-unit support?', answer: 'Different departments naturally think in different units: sales teams sell in pieces, production floors measure in kilograms, warehouses count in boxes, and purchasing orders in rolls or sheets.' },
        { question: 'Which industries need dual-unit tracking?', answer: 'Plastics manufacturing, metal fabrication, food manufacturing, and chemical processing. BOI-certified manufacturers also benefit.' },
      ]),
    ];
};

module.exports = _config;
