/**
 * th-aiot-protocol.js — Thai AIoT Protocol Section (S7) — COPY
 *
 * Same layout/CSS as English aiot-protocol.js, Thai strings from i18n.
 * Protocol names stay English — they are technical standards.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/aiot');

function blocks() {
  const p = th.protocol;

  const tagsHTML = p.tags.map(tag =>
    `<div class="protocol-tag">${tag}</div>`
  ).join('\n                    ');

  const html = `
    <div class="protocol-section">
    <div class="dw-d-bg dw-d-bg--corner-tl dw-d-bg--subtle" style="opacity: 0.10;"></div>
            <div class="protocol-inner" style="position: relative; z-index: 2;">
                <h3>${p.title}</h3>
                <div class="protocol-grid">
                    ${tagsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(p.adminLabel, html, 'Protocol: Content');
}

// Reuse English CSS
const { css } = require('./aiot-protocol');

module.exports = { blocks, css };
