/**
 * th-elec-hero.js — Thai Electronics Hero (S1) — COPY
 *
 * Same layout/CSS as English electronics-elec-hero.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const th = require('../../i18n/th/electronics');

function blocks() {
  const h = th.hero;

  const statsHTML = h.stats.map(s => `
                    <div class="elec-hero-stat">
                        <div class="elec-hero-stat-value">${s.value}</div>
                        <div class="elec-hero-stat-label">${s.label}</div>
                    </div>`).join('');

  const html = `
    <div class="elec-hero">
    <div class="dw-d-bg dw-d-bg--top" style="opacity: 0.12;"></div>
            <div class="elec-hero-inner" style="position: relative; z-index: 2;">
                <div class="elec-hero-badge">
                    <span>${h.badge}</span>
                </div>
                <h1>${h.title}</h1>
                <p class="elec-hero-subtitle">${h.subtitle}</p>
                <div class="elec-hero-stats">${statsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(h.adminLabel, html, 'Hero: Content');
}

// Reuse English CSS
const { css } = require('./electronics-elec-hero');

module.exports = { blocks, css };
