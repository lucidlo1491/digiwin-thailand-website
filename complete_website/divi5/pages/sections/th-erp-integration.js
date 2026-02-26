/**
 * th-erp-integration.js — Thai Integration Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-integration');
const thErp = require('../../i18n/th/erp');

const t = thErp.integration;

function blocks() {
  const html = `
    <div class="integration-section">
    <div class="dw-d-bg dw-d-bg--left dw-d-bg--medium dw-d-parallax"></div>
            <div class="integration-inner" style="position: relative; z-index: 2;">
                <div class="integration-header">
                    <p class="integration-label">${t.label}</p>
                    <h2 class="integration-title">${t.title}</h2>
                    <p class="integration-subtitle">${t.subtitle}</p>
                </div>

                <div class="integration-visual">
                    <div class="integration-node active">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                        </div>
                        <div class="integration-node-name">ERP</div>
                    </div>
                    <div class="integration-arrow">\u2194</div>
                    <div class="integration-node">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8v8M10 8v8M14 8v8M18 8v8"/></svg>
                        </div>
                        <div class="integration-node-name">MES</div>
                    </div>
                    <div class="integration-arrow">\u2194</div>
                    <div class="integration-node">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>
                        <div class="integration-node-name">WMS</div>
                    </div>
                    <div class="integration-arrow">\u2194</div>
                    <div class="integration-node">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg>
                        </div>
                        <div class="integration-node-name">AIoT</div>
                    </div>
                </div>

                <div class="integration-message">
                    <p>${t.message}</p>
                </div>

                <div class="integration-links">
                    <a href="mes.html" class="integration-link">${t.exploreMES} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                    <a href="wms.html" class="integration-link">${t.exploreWMS} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                    <a href="aiot.html" class="integration-link">${t.exploreAIoT} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Integration (Thai)', html, 'Integration: Content');
}

module.exports = { blocks, css: () => en.css() };
