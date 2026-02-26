/**
 * th-erp-hero.js — Thai ERP Hero Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./erp-hero');
const thErp = require('../../i18n/th/erp');

const t = thErp.hero;

function blocks() {
  const html = `
    <div class="erp-hero">
    ${superD.html('erp-super-d')}

            <div class="erp-hero-bg">
                <svg aria-hidden="true" viewBox="0 0 600 500" fill="none">

                    <rect x="50" y="50" width="500" height="350" rx="12" stroke="#0369a1" stroke-width="1.5" opacity="0.4"/>
                    <line x1="50" y1="100" x2="550" y2="100" stroke="#0369a1" stroke-width="1" opacity="0.3"/>
                    <line x1="150" y1="100" x2="150" y2="400" stroke="#0369a1" stroke-width="1" opacity="0.2"/>
                    <line x1="300" y1="100" x2="300" y2="400" stroke="#0369a1" stroke-width="1" opacity="0.2"/>
                    <line x1="450" y1="100" x2="450" y2="400" stroke="#0369a1" stroke-width="1" opacity="0.2"/>

                    <line x1="50" y1="160" x2="550" y2="160" stroke="#0369a1" stroke-width="1" opacity="0.15"/>
                    <line x1="50" y1="220" x2="550" y2="220" stroke="#0369a1" stroke-width="1" opacity="0.15"/>
                    <line x1="50" y1="280" x2="550" y2="280" stroke="#0369a1" stroke-width="1" opacity="0.15"/>
                    <line x1="50" y1="340" x2="550" y2="340" stroke="#0369a1" stroke-width="1" opacity="0.15"/>

                    <rect x="60" y="60" width="80" height="30" rx="4" fill="#0369a1" opacity="0.15"/>
                    <rect x="160" y="60" width="130" height="30" rx="4" fill="#0369a1" opacity="0.1"/>
                    <rect x="310" y="60" width="130" height="30" rx="4" fill="#0369a1" opacity="0.1"/>
                    <rect x="460" y="60" width="80" height="30" rx="4" fill="#0369a1" opacity="0.1"/>

                    <rect x="310" y="165" width="80" height="20" rx="4" fill="#10b981" opacity="0.3"/>
                    <rect x="460" y="225" width="60" height="20" rx="4" fill="#0369a1" opacity="0.3"/>
                </svg>
            </div>

            <div class="erp-hero-inner">
                <div class="erp-hero-content">
                    <div class="erp-hero-badge">${t.badge}</div>
                    <h1>${t.h1}</h1>
                    <p class="erp-hero-subtitle">${t.subtitle}</p>
                    <div class="erp-hero-ctas">
                        <a href="../demo.html" class="btn-white">${t.ctaPrimary}</a>
                        <a href="#products" class="btn-outline-white">${t.ctaSecondary}</a>
                    </div>
                    <div class="erp-hero-stats">
                        <div class="erp-hero-stat">
                            <div class="erp-hero-stat-number dw-years">${t.stats[0].number}</div>
                            <div class="erp-hero-stat-label">${t.stats[0].label}</div>
                        </div>
                        <div class="erp-hero-stat">
                            <div class="erp-hero-stat-number">${t.stats[1].number}</div>
                            <div class="erp-hero-stat-label">${t.stats[1].label}</div>
                        </div>
                        <div class="erp-hero-stat">
                            <div class="erp-hero-stat-number">${t.stats[2].number}</div>
                            <div class="erp-hero-stat-label">${t.stats[2].label}</div>
                        </div>
                    </div>
                </div>

                <div class="erp-hero-visual">
                    <div class="erp-dashboard-mockup">
                        <div class="mockup-header">
                            <div class="mockup-dot"></div>
                            <div class="mockup-dot"></div>
                            <div class="mockup-dot"></div>
                        </div>
                        <div class="mockup-content">
                            <div class="mockup-nav">
                                <span class="mockup-nav-item active">${t.mockup.dashboard}</span>
                                <span class="mockup-nav-item">${t.mockup.production}</span>
                                <span class="mockup-nav-item">${t.mockup.inventory}</span>
                                <span class="mockup-nav-item">${t.mockup.finance}</span>
                            </div>
                            <div class="mockup-grid">
                                <div class="mockup-card">
                                    <div class="mockup-card-label">${t.mockup.todaysOutput}</div>
                                    <div class="mockup-card-value green">1,247</div>
                                </div>
                                <div class="mockup-card">
                                    <div class="mockup-card-label">${t.mockup.pendingOrders}</div>
                                    <div class="mockup-card-value">38</div>
                                </div>
                                <div class="mockup-card">
                                    <div class="mockup-card-label">${t.mockup.margin}</div>
                                    <div class="mockup-card-value blue">24.3%</div>
                                </div>
                            </div>
                            <div class="mockup-chart">
                                <div class="mockup-bar" style="height: 45%;"></div>
                                <div class="mockup-bar" style="height: 62%;"></div>
                                <div class="mockup-bar" style="height: 78%;"></div>
                                <div class="mockup-bar" style="height: 55%;"></div>
                                <div class="mockup-bar" style="height: 90%;"></div>
                                <div class="mockup-bar" style="height: 72%;"></div>
                                <div class="mockup-bar" style="height: 85%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Hero (Thai)', html, 'Hero: Content');
}

module.exports = { blocks, css: () => en.css() };
