/**
 * th-wms-hero.js — Thai WMS Hero (S1) — COPY
 *
 * Same layout/CSS as English wms-hero.js, Thai strings from i18n/th/wms.js.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const h = th.hero;

  const statsHTML = h.stats.map(s => `
                            <div class="wms-hero-stat">
                                <div class="wms-hero-stat-number${s.value === '44' ? ' dw-years' : ''}">${s.value}</div>
                                <div class="wms-hero-stat-label">${s.label}</div>
                            </div>`).join('');

  const mockupStatsHTML = h.mockupStats.map(s => `
                                <div class="wms-mockup-stat">
                                    <div class="wms-mockup-stat-value${s.value === '99.2%' ? ' green' : ''}">${s.value}</div>
                                    <div class="wms-mockup-stat-label">${s.label}</div>
                                </div>`).join('');

  const html = `
    <div class="wms-hero">
    <div class="dw-d-bg dw-d-bg--top dw-d-parallax" style="opacity: 0.12;"></div>
            <div class="wms-hero-inner">
                <div class="wms-hero-grid">
                    <div class="wms-hero-content">
                        <div class="wms-hero-badge">${h.badge}</div>
                        <h1>${h.title}</h1>
                        <p class="wms-hero-subtitle">${h.subtitle}</p>
                        <div class="wms-hero-ctas">
                            <a href="../demo.html" class="btn-white">${h.ctas.letsTalk}</a>
                            <a href="#capabilities" class="btn-outline-white">${h.ctas.exploreSfls}</a>
                        </div>
                        <div class="wms-hero-stats">${statsHTML}
                        </div>
                    </div>
                    <div class="wms-hero-visual">
                        <div class="wms-mockup">
                            <div class="wms-mockup-grid">
                                <div class="wms-mockup-cell occupied">A1</div>
                                <div class="wms-mockup-cell occupied">A2</div>
                                <div class="wms-mockup-cell">A3</div>
                                <div class="wms-mockup-cell occupied">A4</div>
                                <div class="wms-mockup-cell active">A5</div>
                                <div class="wms-mockup-cell occupied">B1</div>
                                <div class="wms-mockup-cell">B2</div>
                                <div class="wms-mockup-cell occupied">B3</div>
                                <div class="wms-mockup-cell occupied">B4</div>
                                <div class="wms-mockup-cell">B5</div>
                                <div class="wms-mockup-cell">C1</div>
                                <div class="wms-mockup-cell occupied">C2</div>
                                <div class="wms-mockup-cell occupied">C3</div>
                                <div class="wms-mockup-cell">C4</div>
                                <div class="wms-mockup-cell occupied">C5</div>
                            </div>
                            <div class="wms-mockup-stats">${mockupStatsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Hero: WMS (Thai)', html, 'Hero: Content');
}

// Reuse English CSS
const { css } = require('./wms-hero');

module.exports = { blocks, css };
