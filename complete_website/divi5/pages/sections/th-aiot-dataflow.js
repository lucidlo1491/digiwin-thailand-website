/**
 * th-aiot-dataflow.js — Thai AIoT Dataflow Section (S4) — COPY
 *
 * Same layout/CSS as English aiot-dataflow.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/aiot');

function blocks() {
  const d = th.dataflow;

  const stagesHTML = d.stages.map(stage => {
    const itemsHTML = stage.items.map(item =>
      `<span class="dataflow-item">${item}</span>`
    ).join('\n                            ');

    return `
                    <div class="dataflow-stage">
                        <div class="dataflow-stage-number">${stage.number}</div>
                        <h3>${stage.title}</h3>
                        <p>${stage.desc}</p>
                        <div class="dataflow-items">
                            ${itemsHTML}
                        </div>
                    </div>`;
  }).join('');

  const html = `
    <div class="dataflow-section">
    <div class="dataflow-header" style="position: relative; z-index: 2;">
                <h2>${d.title}</h2>
                <p>${d.subtitle}</p>
            </div>
            <div class="dataflow-visual" style="position: relative; z-index: 2;">
                <div class="dataflow-stages">${stagesHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(d.adminLabel, html, 'Dataflow: Content');
}

// Reuse English CSS
const { css } = require('./aiot-dataflow');

module.exports = { blocks, css };
