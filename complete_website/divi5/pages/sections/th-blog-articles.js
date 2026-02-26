/**
 * th-blog-articles.js — Thai Blog Articles Section (S3)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: blog-articles.js + i18n/th/blog.js articles
 */

const base = require('../../lib/templates/_base');
const en = require('./blog-articles');
const th = require('../../i18n/th/blog');

const P = 'art'; // Same CSS prefix as English
const D = th.articles;

// Article hrefs (same as English — blog posts stay at English URLs)
const HREFS = [
  '/blog/boi-compliance-jin-hai/',
  '/blog/lrp-vs-mrp/',
  '/blog/co-product-cost-accounting/',
  '/blog/feature-codes/',
  '/blog/amrp-capacity-planning/',
  '/blog/five-pain-points/',
  '/blog/sap-ecc-end-of-life/',
  '/blog/dual-units/',
  '/blog/shop-floor-scheduling/',
  '/blog/production-transparency/',
];

// Category-to-SVG mapping (same as English)
const SVGS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
];

function blocks() {
  // Build article cards from Thai content
  const cardHtml = D.cards.map((card, i) => `
                    <a href="${HREFS[i]}" class="${P}-card" data-category="${card.category}">
                        <div class="${P}-card-image ${P}-card-image--${card.category}">
                            ${SVGS[i]}
                        </div>
                        <div class="${P}-card-body">
                            <span class="${P}-category-badge badge--${card.category}">${card.badge}</span>
                            <h3>${card.title}</h3>
                            <p class="${P}-card-excerpt">${card.excerpt}</p>
                            <div class="${P}-card-footer">
                                <span class="${P}-read-time">${card.readTime}</span>
                                <span class="${P}-read-link">${card.readLink} <span>&rarr;</span></span>
                            </div>
                        </div>
                    </a>`).join('\n');

  const html = `
    <div class="articles-inner" style="position: relative; z-index: 2;">
                <div class="articles-header">
                    <span class="blog-hub-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <input type="radio" name="blogfilter" id="bf-all" checked style="position:absolute;opacity:0;pointer-events:none">
                <input type="radio" name="blogfilter" id="bf-boi" style="position:absolute;opacity:0;pointer-events:none">
                <input type="radio" name="blogfilter" id="bf-production" style="position:absolute;opacity:0;pointer-events:none">
                <input type="radio" name="blogfilter" id="bf-cost" style="position:absolute;opacity:0;pointer-events:none">
                <input type="radio" name="blogfilter" id="bf-smart" style="position:absolute;opacity:0;pointer-events:none">
                <input type="radio" name="blogfilter" id="bf-industry" style="position:absolute;opacity:0;pointer-events:none">
                <div class="blog-hub-filter-tabs">
                    <label for="bf-all" class="blog-hub-filter-tab">${D.filterTabs.all}</label>
                    <label for="bf-boi" class="blog-hub-filter-tab">${D.filterTabs.boi}</label>
                    <label for="bf-production" class="blog-hub-filter-tab">${D.filterTabs.production}</label>
                    <label for="bf-cost" class="blog-hub-filter-tab">${D.filterTabs.cost}</label>
                    <label for="bf-smart" class="blog-hub-filter-tab">${D.filterTabs.smart}</label>
                    <label for="bf-industry" class="blog-hub-filter-tab">${D.filterTabs.industry}</label>
                </div>

                <div class="articles-grid">
${cardHtml}
                </div>
            </div>`;

  return base.wrapInDiviSection('Articles', html, 'Articles: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
