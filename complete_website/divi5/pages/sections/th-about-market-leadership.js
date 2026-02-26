/**
 * th-about-market-leadership.js — Thai About Us Market Leadership Section (S5)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-market-leadership.js + i18n/th/about.js marketLeadership
 */

const base = require('../../lib/templates/_base');
const en = require('./about-market-leadership');
const th = require('../../i18n/th/about');

const D = th.marketLeadership;

function blocks() {
  const cardsHTML = D.stats.map(s => `
                    <div class="market-stat-card scroll-fade-in">
                        <div class="market-stat-value">${s.value}</div>
                        <div class="market-stat-label">${s.label}</div>
                    </div>`).join('');

  const html = `
    <div class="market-leadership">
    <div class="market-leadership-inner scroll-fade-in">
                <div class="market-leadership-header">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                </div>
                <div class="market-leadership-grid">
${cardsHTML}
                </div>
                <p class="market-leadership-source">${D.source}</p>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('ผู้นำตลาด', html, 'Market Leadership: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
