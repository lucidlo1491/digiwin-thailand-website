/**
 * blog-amrp-capacity-planning.js — Blog post page config
 *
 * WordPress page: AMRP Capacity Planning (ID 100760, slug: amrp-capacity-planning)
 * Prototype: blog/amrp-capacity-planning.html (Format A, 756 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-amrp',
  slug: 'amrp-capacity-planning',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'amrp-capacity-planning.html'),
}, { pageId: 100760 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'AMRP Capacity Planning', url: '/amrp-capacity-planning/' },
      ]),
      schema.blogPosting({
        headline: 'AMRP: Why You Don\'t Need a Separate APS System',
        description: 'Most ERPs require an expensive separate APS system for capacity planning. DigiWin\'s AMRP builds capacity planning directly into the ERP \u2014 at no extra cost.',
        datePublished: '2026-02-03',
        dateModified: '2026-02-03',
        url: '/amrp-capacity-planning/',
      }),
      schema.faqPage([
        { question: 'What is AMRP?', answer: 'AMRP stands for Advanced Material Requirements Planning. It is DigiWin\'s built-in capacity-aware scheduling engine that integrates material planning and production capacity planning in one system.' },
        { question: 'What is the difference between MRP and AMRP?', answer: 'Standard MRP calculates material requirements but assumes unlimited production capacity. AMRP adds capacity constraints, split-order handling, and both backward and forward scheduling.' },
        { question: 'Do I need a separate APS system with DigiWin ERP?', answer: 'No. DigiWin\'s AMRP builds capacity planning directly into the ERP at no extra cost, with no separate system and no integration complexity.' },
        { question: 'What are the 6 key AMRP capabilities?', answer: 'Backward scheduling, forward scheduling, already-committed capacity tracking, assembly coordination for JIT, resource priority settings, and rush order recalculation.' },
      ]),
    ];
};

module.exports = _config;
