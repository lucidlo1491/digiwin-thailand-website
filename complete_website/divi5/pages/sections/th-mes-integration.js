/**
 * th-mes-integration.js — Thai MES Integration (S6)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-integration');
const th = require('../../i18n/th/mes');

function blocks() {
  const d = th.integration;

  const linksHTML = d.links.map(link =>
    `<a href="${link.href}" class="integration-link">${link.text}</a>`
  ).join('\n                    ');

  const html = `
    <div class="integration-section">
    <div class="integration-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${d.title}</h2>
                    <p class="section-subtitle">${d.subtitle}</p>
                </div>
    
                <div class="integration-visual">
                    <div class="integration-node">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                        </div>
                        <div class="integration-node-name">ERP</div>
                    </div>
                    <div class="integration-arrow">\u2194</div>
                    <div class="integration-node active">
                        <div class="integration-node-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/></svg>
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
                    <p>${d.message}</p>
                </div>
    
                <div class="integration-links">
                    ${linksHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Integration (Thai)', html, 'Integration: Content');
}

module.exports = { blocks, css: enBuilder.css };
