/**
 * th-erp-section.js — Thai "What is ERP" Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-section');
const thErp = require('../../i18n/th/erp');

const t = thErp.whatIsErp;

function blocks() {
  const html = `
    <div class="dw-section erp-whatis-section" style="padding: 40px 0 0; text-align: center;">
    <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 22px; font-weight: 700; color: #000864; margin-bottom: 12px; line-height: 1.6; -webkit-font-smoothing: auto;">${t.h2}</h2>
        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 17px; line-height: 1.8; color: #333;">
          ${t.body}
        </p>
      </div>    </div>`;

  return base.wrapInDiviSection('Section (Thai)', html, 'Section: Content');
}

module.exports = { blocks, css: () => en.css() };
