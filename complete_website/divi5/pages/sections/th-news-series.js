/**
 * th-news-series.js — Thai News Series Section (S4)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-series.js + i18n/th/news.js series
 */

const base = require('../../lib/templates/_base');
const en = require('./news-series');
const th = require('../../i18n/th/news');

const P = 'series'; // Same CSS prefix as English
const D = th.series;

function blocks() {
  const stepsHtml = D.steps.map((step, i) => `
                    <div class="${P}-step">
                        <div class="${P}-step-number">${i + 1}</div>
                        <span class="${P}-step-label">${step.label}</span>
                        <h3>${step.title}</h3>
                        <p>${step.desc}</p>
                    </div>`).join('\n');

  const html = `
    <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header fade-in-section">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="${P}-timeline fade-in-section">
                    ${stepsHtml}
                </div>
            </div>`;

  return base.wrapInDiviSection('Series', html, 'Series: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
