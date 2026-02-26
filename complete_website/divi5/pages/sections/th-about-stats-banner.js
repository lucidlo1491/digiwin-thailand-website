/**
 * th-about-stats-banner.js — Thai About Us Stats Banner Section (S4)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-stats-banner.js + i18n/th/about.js statsBanner
 */

const base = require('../../lib/templates/_base');
const statsBanner = require('../../lib/templates/stats-banner');
const en = require('./about-stats-banner');
const th = require('../../i18n/th/about');

const D = th.statsBanner;

function blocks() {
  const statsHTML = D.stats.map(s => {
    const whiteClass = s.isWhite ? ' white' : '';
    const dynamicClass = s.isDynamic ? ' dw-years' : '';
    const valueHTML = s.isDynamic
      ? `<span class="dw-years">${s.value}</span>${s.suffix || ''}`
      : s.value;
    return `
                <div class="stat-item">
                    <div class="stat-number${whiteClass}">${valueHTML}</div>
                    <div class="stat-description">${s.label}</div>
                </div>`;
  }).join('');

  const html = `
    <div class="stats-banner" data-particles="bold">
    <div class="stats-banner-inner" style="position: relative; z-index: 2;">
${statsHTML}
            </div>
    ${statsBanner.DEFAULT_PARTICLE_SCRIPT}
    <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>
    `;

  return base.wrapInDiviSection('สถิติ', html, 'Stats Banner: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
