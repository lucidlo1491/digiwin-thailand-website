/**
 * th-ind-approach.js — Thai Industries Hub Approach Section (S5)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: industries-approach.js + i18n/th/industries.js approach
 */

const base = require('../../lib/templates/_base');
const statsBanner = require('../../lib/templates/stats-banner');
const en = require('./industries-approach');
const th = require('../../i18n/th/industries');

const P = 'app'; // Same CSS prefix as English
const D = th.approach;

function blocks() {
  const steps = D.steps.map(step => `
                    <div class="approach-step">
                        <div class="approach-step-number">${step.number}</div>
                        <h3>${step.title}</h3>
                        <p>${step.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="approach-section" data-particles="bold">
    <div class="approach-inner" style="position:relative;z-index:2;">
                <div class="approach-header">
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="approach-steps">
                    ${steps}
                </div>
            </div>
    ${statsBanner.DEFAULT_PARTICLE_SCRIPT}
    </div>
    `;

  return base.wrapInDiviSection('Approach', html, 'Approach: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
