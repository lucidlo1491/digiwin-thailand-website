/**
 * th-mes-results.js — Thai MES Results (S7)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const statsBanner = require('../../lib/templates/stats-banner');
const enBuilder = require('./mes-results');
const th = require('../../i18n/th/mes');

function blocks() {
  const r = th.results;

  const mesCardsHTML = r.mesResults.map(card => `
                    <div class="result-card">
                        <div class="result-value">${card.value}</div>
                        <div class="result-label">${card.label}</div>
                    </div>`).join('');

  const sftCardsHTML = r.sftResults.map(card => `
                    <div class="result-card">
                        <div class="result-value">${card.value}</div>
                        <div class="result-label">${card.label}</div>
                    </div>`).join('');

  const html = `
    <div class="results-section" data-particles="bold">
    <div class="results-inner" style="position: relative; z-index: 2;">
                <div class="results-header">
                    <p class="results-label">${r.label}</p>
                    <h2 class="results-title">${r.title}</h2>
                </div>
    
                <p class="results-row-label">${r.mesLabel}</p>
                <div class="results-grid">${mesCardsHTML}
                </div>
    
                <p class="results-row-label">${r.sftLabel}</p>
                <div class="results-grid">${sftCardsHTML}
                </div>
    
                <div class="results-shared">
                    <div class="result-card">
                        <div class="result-value">${r.shared.value}</div>
                        <div class="result-label">${r.shared.label}</div>
                    </div>
                </div>
    
                <p class="results-attribution">${r.attribution}</p>
            </div>
    ${statsBanner.DEFAULT_PARTICLE_SCRIPT}
    </div>
    `;

  return base.wrapInDiviSection('Results (Thai)', html, 'Results: Content');
}

module.exports = { blocks, css: enBuilder.css };
