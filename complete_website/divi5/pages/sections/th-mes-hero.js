/**
 * th-mes-hero.js — Thai MES Hero (S1)
 *
 * Reuses English CSS. Thai text from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-hero');
const th = require('../../i18n/th/mes');

function blocks() {
  const h = th.hero;

  const html = `
    <div class="mes-hero">

            <div class="mes-hero-inner">
                <div class="mes-hero-grid">
                    <div class="mes-hero-content">
                        <div class="mes-hero-badge">${h.badge}</div>
                        <h1>${h.title}</h1>
                        <p class="mes-hero-subtitle">${h.subtitle}</p>
                        <div class="mes-hero-ctas">
                            <a href="../demo.html" class="btn-white">${h.ctaPrimary}</a>
                            <a href="#compare" class="btn-outline-white">${h.ctaSecondary}</a>
                        </div>
                        <div class="mes-hero-stats">
                            <div class="mes-hero-stat">
                                <div class="mes-hero-stat-number dw-years">44</div>
                                <div class="mes-hero-stat-label">${h.stats.years.label}</div>
                            </div>
                            <div class="mes-hero-stat">
                                <div class="mes-hero-stat-number">50K+</div>
                                <div class="mes-hero-stat-label">${h.stats.factories.label}</div>
                            </div>
                            <div class="mes-hero-stat">
                                <div class="mes-hero-stat-number">100+</div>
                                <div class="mes-hero-stat-label">${h.stats.thai.label}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mes-hero-visual">
                        <div class="mes-dashboard-mockup">
                            <div class="mockup-header">
                                <div class="mockup-dot"></div>
                                <div class="mockup-dot"></div>
                                <div class="mockup-dot"></div>
                            </div>
                            <div class="mockup-content">
                                <div class="mockup-status-bar">
                                    <div class="mockup-status-item">
                                        <div class="mockup-status-value green">87%</div>
                                        <div class="mockup-status-label">${h.mockup.oee}</div>
                                    </div>
                                    <div class="mockup-status-item">
                                        <div class="mockup-status-value">1,247</div>
                                        <div class="mockup-status-label">${h.mockup.unitsToday}</div>
                                    </div>
                                    <div class="mockup-status-item">
                                        <div class="mockup-status-value yellow">3</div>
                                        <div class="mockup-status-label">${h.mockup.alerts}</div>
                                    </div>
                                </div>
                                <div class="mockup-timeline">
                                    <div class="mockup-bar" style="height: 40%;"></div>
                                    <div class="mockup-bar" style="height: 65%;"></div>
                                    <div class="mockup-bar" style="height: 55%;"></div>
                                    <div class="mockup-bar" style="height: 80%;"></div>
                                    <div class="mockup-bar" style="height: 70%;"></div>
                                    <div class="mockup-bar active" style="height: 90%;"></div>
                                    <div class="mockup-bar" style="height: 45%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Hero (Thai)', html, 'Hero: Content');
}

module.exports = { blocks, css: enBuilder.css };
