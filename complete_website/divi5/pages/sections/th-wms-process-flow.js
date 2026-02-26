/**
 * th-wms-process-flow.js — Thai WMS Process Flow (S6) — COPY
 *
 * Same layout/CSS as English wms-process-flow.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/wms');

function blocks() {
  const pf = th.processFlow;

  const colors = ['blue', 'green', 'amber'];

  const streamsHTML = pf.streams.map((stream, i) => {
    const stepsHTML = stream.steps.map((step, j) => {
      const arrow = j < stream.steps.length - 1
        ? '\n                            <span class="process-stream-arrow" aria-hidden="true">&rarr;</span>'
        : '';
      return `                            <div class="process-stream-step">${step}</div>${arrow}`;
    }).join('\n');

    return `
                    <div class="process-stream process-stream--${colors[i]}">
                        <div class="process-stream-badge process-stream-badge--${colors[i]}">${stream.badge}</div>
                        <div class="process-stream-steps">
${stepsHTML}
                        </div>
                    </div>`;
  }).join('\n');

  const html = `
    <div class="process-flow-section">
    <div class="process-flow-inner" style="position: relative; z-index: 2;">
                <div class="section-header">
                    <h2 class="section-title">${pf.title}</h2>
                    <p class="section-subtitle">${pf.subtitle}</p>
                </div>
    
                <div class="process-streams">${streamsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Process Flow: WMS (Thai)', html, 'Process Flow: Content');
}

// Reuse English CSS
const { css } = require('./wms-process-flow');

module.exports = { blocks, css };
