/**
 * th-auto-context.js — Thai Automotive Context Section (S2)
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./automotive-context');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.context;

function blocks() {
  const html = `
    <div class="context-section">
    <div class="context-inner">
                <h2>${t.h2}</h2>
                <p>${t.body}</p>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Context (Thai)', html, 'Context: Content');
}

module.exports = { blocks, css: () => en.css() };
