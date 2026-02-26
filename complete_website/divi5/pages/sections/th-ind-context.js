/**
 * th-ind-context.js — Thai Industries Hub Context Section (S2)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: industries-context.js + i18n/th/industries.js context
 */

const base = require('../../lib/templates/_base');
const en = require('./industries-context');
const th = require('../../i18n/th/industries');

const P = 'con'; // Same CSS prefix as English
const D = th.context;

function blocks() {
  const html = `
    <div class="context-section">
    <div class="context-inner">
                <p class="context-label">${D.label}</p>
                <div class="context-header">
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="context-stats">
                    <div class="context-stat">
                        <div class="context-stat-value">${D.stats[0].value}</div>
                        <div class="context-stat-label">${D.stats[0].label}</div>
                    </div>
                    <div class="context-stat">
                        <div class="context-stat-value">${D.stats[1].value}</div>
                        <div class="context-stat-label">${D.stats[1].label}</div>
                    </div>
                    <div class="context-stat">
                        <div class="context-stat-value">${D.stats[2].value}</div>
                        <div class="context-stat-label">${D.stats[2].label}</div>
                    </div>
                    <div class="context-stat">
                        <div class="context-stat-value">${D.stats[3].value}</div>
                        <div class="context-stat-label">${D.stats[3].label}</div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Context', html, 'Context: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
