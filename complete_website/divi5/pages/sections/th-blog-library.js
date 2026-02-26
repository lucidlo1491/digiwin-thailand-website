/**
 * th-blog-library.js — Thai Blog Library Section (S4)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: blog-library.js + i18n/th/blog.js library
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./blog-library');
const th = require('../../i18n/th/blog');

const P = 'lib'; // Same CSS prefix as English
const D = th.library;

// Article hrefs per group (same as English)
const GROUP_HREFS = [
  ['/blog/boi-compliance-jin-hai/'],
  ['/blog/lrp-vs-mrp/', '/blog/feature-codes/', '/blog/amrp-capacity-planning/'],
  ['/blog/co-product-cost-accounting/', '/blog/dual-units/'],
  ['/blog/shop-floor-scheduling/', '/blog/production-transparency/'],
  ['/blog/five-pain-points/', '/blog/sap-ecc-end-of-life/'],
];

// Group indicator colors (same order as English)
const GROUP_INDICATORS = ['boi', 'production', 'cost', 'smart', 'industry'];

function blocks() {
  // Build group HTML from Thai content
  const groupsHtml = D.groups.map((group, gi) => {
    const itemsHtml = group.items.map((item, ii) => `
                        <a href="${GROUP_HREFS[gi][ii]}" class="${P}-item">
                            <span class="${P}-item-title">${item.title}</span>
                            <div class="${P}-item-meta">
                                <span class="${P}-item-time">${item.time}</span>
                                <span class="${P}-item-arrow">&rarr;</span>
                            </div>
                        </a>`).join('');

    return `
                    <div class="${P}-group">
                        <div class="${P}-group-header">
                            <div class="${P}-group-indicator ${P}-group-indicator--${GROUP_INDICATORS[gi]}"></div>
                            <h3>${group.name}</h3>
                        </div>${itemsHtml}
                    </div>`;
  }).join('\n');

  const html = `
    <div class="${P}-section" data-particles>
    <div class="dw-d-bg dw-d-bg--corner-tl" style="opacity: 0.06;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header">
                    <span class="blog-hub-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>

                <div class="${P}-groups">${groupsHtml}
                </div>
            </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Library', html, 'Library: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
