/**
 * th-auto-hero.js — Thai Automotive Hero Section (S1)
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./automotive-auto-hero');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.hero;

function blocks() {
  const statsHTML = t.stats.map(s => `
                    <div class="auto-hero-stat">
                        <div class="auto-hero-stat-value">${s.value}</div>
                        <div class="auto-hero-stat-label">${s.label}</div>
                    </div>`).join('');

  const html = `
    <div class="auto-hero">
    <div class="dw-d-bg dw-d-bg--left dw-d-bg--gradient" style="opacity: 0.14;"></div>
            <div class="auto-hero-inner" style="position: relative; z-index: 2;">
                <div class="auto-hero-badge">
                    <span>${t.badge}</span>
                </div>
                <h1>${t.h1}</h1>
                <p class="auto-hero-subtitle">${t.subtitle}</p>
                <div class="auto-hero-stats">${statsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Auto Hero (Thai)', html, 'Auto Hero: Content');
}

module.exports = { blocks, css: () => en.css() };
