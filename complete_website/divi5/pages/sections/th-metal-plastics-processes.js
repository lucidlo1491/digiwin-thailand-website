/**
 * th-metal-plastics-processes.js — Thai Processes Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-processes');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.processes;
const P = 'processes';

function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--corner-tl" style="opacity: 0.08;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <h3>${t.h3}</h3>
                <div class="${P}-logos">
                    ${t.items.map(item => `<div class="process-logo">${item}</div>`).join('\n                    ')}
                </div>
            </div>`;

  return base.wrapInDiviSection('Processes (Thai)', html, 'Processes: Content');
}

module.exports = { blocks, css: () => en.css() };
