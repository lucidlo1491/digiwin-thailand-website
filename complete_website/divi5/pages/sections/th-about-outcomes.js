/**
 * th-about-outcomes.js — Thai About Us Outcomes Section (S7)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-outcomes.js + i18n/th/about.js outcomes
 */

const base = require('../../lib/templates/_base');
const en = require('./about-outcomes');
const th = require('../../i18n/th/about');

const D = th.outcomes;

// SVG icons reused from English (identical)
const ICONS = [
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  '<svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
];

function blocks() {
  const itemsHTML = D.items.map((item, i) => `
                    <div class="outcome-item">
                        <div class="outcome-icon">
                            ${ICONS[i]}
                        </div>
                        <div class="outcome-text">
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                        </div>
                    </div>`).join('\n');

  const html = `
    <div class="outcomes-section">
    <div class="outcomes-inner">
                <div class="outcomes-visual">
                    <div class="outcomes-image">
                        <img src="/wp-content/uploads/2026/02/about-outcomes.jpg" alt="${D.imageAlt}" loading="lazy">
                    </div>
                </div>
                <div class="outcomes-content">
                    <h2>${D.title}</h2>
${itemsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('ผลลัพธ์', html, 'Outcomes: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
