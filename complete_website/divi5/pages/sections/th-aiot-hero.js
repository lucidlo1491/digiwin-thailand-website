/**
 * th-aiot-hero.js — Thai AIoT Hero (S1) — COPY
 *
 * Same layout/CSS as English aiot-hero.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const th = require('../../i18n/th/aiot');

function blocks() {
  const h = th.hero;
  const d = h.dashboard;

  const sensorTilesHTML = d.sensors.map((s, i) => {
    const warningClass = i === 1 ? ' warning' : '';
    // Reuse same SVG icons as English
    const svgs = [
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20"/><path d="M12 6v6l4 2"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
    ];
    return `
                                <div class="aiot-sensor-tile${warningClass}">
                                    <div class="aiot-sensor-icon">${svgs[i]}</div>
                                    <div class="aiot-sensor-value">${s.value}</div>
                                    <div class="aiot-sensor-label">${s.label}</div>
                                </div>`;
  }).join('');

  const machineRowsHTML = d.machines.map(m => `
                                <div class="aiot-machine-row">
                                    <span class="aiot-machine-name">${m.name}</span>
                                    <span class="aiot-machine-status ${m.status}"><span class="aiot-status-dot"></span> ${m.statusText}</span>
                                </div>`).join('');

  const statsHTML = h.stats.map(s => `
                            <div class="aiot-hero-stat">
                                <div class="aiot-hero-stat-value">${s.value}</div>
                                <div class="aiot-hero-stat-label">${s.label}</div>
                            </div>`).join('');

  const html = `
    <div class="aiot-hero">
    <div class="dw-d-bg dw-d-bg--center dw-d-bg--particle dw-d-parallax" style="opacity: 0.12;"></div>
            <div class="aiot-hero-inner">
                <div class="aiot-hero-grid">
                    <div class="aiot-hero-content">
                        <div class="aiot-hero-badge">
                            <span>${h.badge}</span>
                        </div>
                        <h1>${h.title}</h1>
                        <p class="aiot-hero-subtitle">${h.subtitle}</p>
                        <div class="aiot-hero-stats">${statsHTML}
                        </div>
                    </div>
                    <div class="aiot-hero-visual">
                        <div class="aiot-sensor-dashboard">
                            <div class="aiot-dashboard-header">
                                <span class="aiot-dashboard-title">${d.title}</span>
                                <span class="aiot-live-badge"><span class="aiot-live-dot"></span> ${d.liveBadge}</span>
                            </div>
                            <div class="aiot-sensor-grid">${sensorTilesHTML}
                            </div>
                            <div class="aiot-machine-list">${machineRowsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(h.adminLabel, html, 'Hero: Content');
}

// Reuse English CSS
const { css } = require('./aiot-hero');

module.exports = { blocks, css };
