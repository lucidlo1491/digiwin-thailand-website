/**
 * th-elec-equipment.js — Thai Electronics Equipment (S5) — COPY
 *
 * Same layout/CSS as English electronics-equipment.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

function blocks() {
  const e = th.equipment;

  const categoriesHTML = e.categories.map((cat, i) => {
    const brandsHTML = cat.brands.map(b =>
      `<div class="equipment-logo">${b}</div>`
    ).join('\n                        ');

    const marginStyle = i < e.categories.length - 1 ? ' style="margin-bottom: 32px;"' : '';

    return `
                <div${marginStyle}>
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: #00AFF0; display: block; margin-bottom: 12px;">${cat.label}</span>
                    <div class="equipment-logos">
                        ${brandsHTML}
                    </div>
                </div>`;
  }).join('\n    ');

  const html = `
    <div class="equipment-section">
    <div class="equipment-inner" style="position: relative; z-index: 2;">
                <h3>${e.title}</h3>
                <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; color: #666; max-width: 700px; margin: 0 auto 40px; line-height: 1.6;">${e.subtitle}</p>
    ${categoriesHTML}
            </div>
    </div>
    `;

  return base.wrapInDiviSection(e.adminLabel, html, 'Equipment: Content');
}

// Reuse English CSS
const { css } = require('./electronics-equipment');

module.exports = { blocks, css };
