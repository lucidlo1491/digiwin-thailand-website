/**
 * th-aiot-metrics.js — Thai AIoT Metrics Section (S6) — COPY
 *
 * Same layout/CSS as English aiot-metrics.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const statsBanner = require('../../lib/templates/stats-banner');
const th = require('../../i18n/th/aiot');

function blocks() {
  const m = th.metrics;

  const cardsHTML = m.cards.map(c => `
                <div class="metric-card">
                    <div class="metric-value">${c.value}</div>
                    <div class="metric-label">${c.label}</div>
                </div>`).join('');

  const html = `
    <div class="metrics-section" data-particles="bold">
    <div class="metrics-header" style="position:relative;z-index:2;">
                <h2>${m.title}</h2>
                <p>${m.subtitle}</p>
            </div>
            <div class="metrics-grid" style="position:relative;z-index:2;">${cardsHTML}
            </div>
    ${statsBanner.DEFAULT_PARTICLE_SCRIPT}
    </div>
    `;

  return base.wrapInDiviSection(m.adminLabel, html, 'Metrics: Content');
}

// Reuse English CSS
const { css } = require('./aiot-metrics');

module.exports = { blocks, css };
