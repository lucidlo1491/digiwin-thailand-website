/**
 * th-elec-context.js — Thai Electronics Context (S2) — COPY
 *
 * Same layout/CSS as English electronics-context.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

function blocks() {
  const c = th.context;

  const html = `
    <div class="context-section">
    <div class="context-inner">
                <h2>${c.title}</h2>
                <p>${c.paragraph}</p>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(c.adminLabel, html, 'Context: Content');
}

// Reuse English CSS
const { css } = require('./electronics-context');

module.exports = { blocks, css };
