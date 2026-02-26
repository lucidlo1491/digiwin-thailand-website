/**
 * th-wms-transformation.js — Thai WMS Transformation (S7) — COPY
 *
 * Same layout/CSS as English wms-transformation.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const t = th.transformation;

  const tableRowsHTML = t.table.rows.map(row => `
                        <tr>
                            <td class="col-process">${row.process}</td>
                            <td class="col-before">${row.before}</td>
                            <td class="col-after">${row.after}</td>
                            <td class="col-improvement">${row.impact}</td>
                        </tr>`).join('');

  const stepReductionHTML = t.stepReduction.map(sr => {
    const beforeStepsHTML = sr.before.steps.map(s =>
      `                                    <li>${s}</li>`
    ).join('\n');
    const afterStepsHTML = sr.after.steps.map(s =>
      `                                    <li><span class="check">&#10003;</span> ${s}</li>`
    ).join('\n');

    return `
                    <div class="step-reduction-card">
                        <div class="step-reduction-header">
                            <div class="step-reduction-title">${sr.title}</div>
                            <div class="step-reduction-numbers">
                                <span class="step-number step-number--before">${sr.before.count}</span>
                                <span class="step-number-arrow" aria-hidden="true">&rarr;</span>
                                <span class="step-number step-number--after">${sr.after.count}</span>
                            </div>
                        </div>
                        <div class="step-reduction-columns">
                            <div>
                                <div class="step-col-label step-col-label--before">Before</div>
                                <ol class="step-list step-list--before">
${beforeStepsHTML}
                                </ol>
                            </div>
                            <div>
                                <div class="step-col-label step-col-label--after">After</div>
                                <ol class="step-list step-list--after">
${afterStepsHTML}
                                </ol>
                            </div>
                        </div>
                    </div>`;
  }).join('\n');

  const html = `
    <div class="transformation-section">
    <div class="dw-d-bg dw-d-bg--corner-br dw-d-bg--subtle"></div>
            <div class="transformation-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${t.title}</h2>
                    <p class="section-subtitle">${t.subtitle}</p>
                </div>
    
                <table class="transformation-table">
                    <caption class="sr-only">${t.table.caption}</caption>
                    <thead>
                        <tr>
                            <th scope="col">${t.table.headers[0]}</th>
                            <th scope="col">${t.table.headers[1]}</th>
                            <th scope="col">${t.table.headers[2]}</th>
                            <th scope="col">${t.table.headers[3]}</th>
                        </tr>
                    </thead>
                    <tbody>${tableRowsHTML}
                    </tbody>
                </table>
    
                <div class="step-reduction-grid">${stepReductionHTML}
                </div>
    
                <p class="transformation-source">${t.source}</p>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Transformation: WMS (Thai)', html, 'Transformation: Content');
}

// Reuse English CSS
const { css } = require('./wms-transformation');

module.exports = { blocks, css };
