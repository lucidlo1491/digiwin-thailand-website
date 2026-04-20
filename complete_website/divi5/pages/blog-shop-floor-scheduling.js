/**
 * blog-shop-floor-scheduling.js — Blog post page config
 *
 * WordPress page: Shop Floor Mini-Scheduling (ID 100757, slug: shop-floor-scheduling)
 * Prototype: blog/shop-floor-scheduling.html (Format A, 714 lines)
 */

const path = require('path');
const blogPost = require('../lib/templates/blog-post');

const schema = require('../lib/schema');

const _config = blogPost.pageConfig({
  prefix: 'bp-sfs',
  slug: 'shop-floor-scheduling',
  protoFile: path.join(__dirname, '..', '..', 'blog', 'shop-floor-scheduling.html'),
}, { pageId: 100757 });

_config.schema = function() {

    return [
      schema.breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog/' },
        { name: 'Shop Floor Mini-Scheduling', url: '/shop-floor-scheduling/' },
      ]),
      schema.blogPosting({
        headline: 'Shop Floor Mini-Scheduling: When Plans Meet Reality',
        description: 'Production plans rarely survive first contact with the shop floor. Mini-scheduling lets floor supervisors adjust in real-time while keeping planning informed.',
        datePublished: '2026-01-28',
        dateModified: '2026-01-28',
        url: '/shop-floor-scheduling/',
      }),
      schema.faqPage([
        { question: 'What is shop floor mini-scheduling?', answer: 'Shop floor mini-scheduling is real-time rescheduling at the workstation level that bridges the gap between production planning and shop floor execution.' },
        { question: 'Why do production plans fail on the shop floor?', answer: 'Production plans fail because they are built on assumptions about machine uptime, material availability, and stable demand \u2014 and every one of those assumptions gets challenged daily.' },
        { question: 'How does DigiWin handle real-time schedule changes?', answer: 'DigiWin\'s mini-scheduling lets floor supervisors drag-and-drop to resequence orders on a machine, move orders between production lines, split production orders across shifts, and flag delays that affect downstream orders.' },
      ]),
    ];
};

module.exports = _config;
