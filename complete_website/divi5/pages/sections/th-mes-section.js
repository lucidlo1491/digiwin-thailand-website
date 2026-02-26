/**
 * th-mes-section.js — Thai MES Section (S2) — What is MES?
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-section');
const th = require('../../i18n/th/mes');

function blocks() {
  const s = th.section;

  const html = `
    <div class="dw-section" style="padding: 40px 0 0; text-align: center;">
    <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
        <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 22px; font-weight: 700; color: #000864; margin: 0 0 12px 0;">${s.title}</h2>
        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 17px; line-height: 1.7; color: #333; margin: 0 0 24px 0;">
          ${s.paragraph1}
        </p>
        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 17px; line-height: 1.7; color: #333;">
          ${s.paragraph2}
        </p>
      </div>    </div>`;

  return base.wrapInDiviSection('Section: MES คืออะไร? (Thai)', html, 'Section: Content');
}

module.exports = { blocks, css: enBuilder.css };
