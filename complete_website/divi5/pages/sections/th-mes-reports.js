/**
 * th-mes-reports.js — Thai MES Reports (S8)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-reports');
const th = require('../../i18n/th/mes');

function blocks() {
  const r = th.reports;

  const mesItemsHTML = r.mesColumn.items.map(item =>
    `<li><span class="report-icon">&#9632;</span> ${item}</li>`
  ).join('\n                            ');

  const sftItemsHTML = r.sftColumn.items.map(item =>
    `<li><span class="report-icon">&#9632;</span> ${item}</li>`
  ).join('\n                            ');

  const html = `
    <div class="reports-section">
    <div class="reports-inner">
                <div class="section-header">
                    <h2 class="section-title">${r.title}</h2>
                    <p class="section-subtitle">${r.subtitle}</p>
                </div>
    
                <div class="reports-grid">
                    <div class="reports-column">
                        <div class="reports-column-header">
                            <span class="reports-column-badge">${r.mesColumn.badge}</span>
                            <span class="reports-column-count">${r.mesColumn.count}</span>
                        </div>
                        <ol class="reports-list">
                            ${mesItemsHTML}
                        </ol>
                    </div>
    
                    <div class="reports-column">
                        <div class="reports-column-header">
                            <span class="reports-column-badge sft">${r.sftColumn.badge}</span>
                            <span class="reports-column-count">${r.sftColumn.count}</span>
                        </div>
                        <ol class="reports-list">
                            ${sftItemsHTML}
                        </ol>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Reports (Thai)', html, 'Reports: Content');
}

module.exports = { blocks, css: enBuilder.css };
