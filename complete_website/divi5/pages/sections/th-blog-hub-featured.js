/**
 * th-blog-hub-featured.js — Thai Blog Hub Featured Section (S2)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: blog-hub-featured.js + i18n/th/blog.js hubFeatured
 */

const base = require('../../lib/templates/_base');
const en = require('./blog-hub-featured');
const th = require('../../i18n/th/blog');

const P = 'hubf'; // Same CSS prefix as English
const D = th.hubFeatured;

function blocks() {
  const html = `
    <div class="${P}-featured-inner" style="position: relative; z-index: 2;">
                <span class="${P}-label">${D.label}</span>
                <div class="${P}-featured-card">
                    <div class="${P}-featured-card-image">

                        <svg aria-hidden="true" viewBox="0 0 120 120">
                            <rect x="25" y="10" width="70" height="90" rx="6" stroke-width="2"/>
                            <line x1="40" y1="35" x2="80" y2="35" stroke-width="2"/>
                            <line x1="40" y1="50" x2="75" y2="50" stroke-width="2"/>
                            <line x1="40" y1="65" x2="70" y2="65" stroke-width="2"/>
                            <path d="M60 75 L60 105 L75 95 L90 105 L90 75 Z" stroke-width="2" fill="none"/>
                            <path d="M75 82 L72 85 L78 91" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                    <div class="${P}-featured-card-content">
                        <span class="${P}-category-badge">${D.categoryBadge}</span>
                        <h2>${D.title}</h2>
                        <p>${D.desc}</p>
                        <div class="${P}-featured-meta">${D.meta}</div>
                        <a href="/blog/boi-compliance-jin-hai/" class="${P}-featured-link">${D.linkText} <span>&rarr;</span></a>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Hub Featured', html, 'Hub Featured: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
