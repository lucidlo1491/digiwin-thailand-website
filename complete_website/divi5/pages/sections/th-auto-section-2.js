/**
 * th-auto-section-2.js — Thai Automotive Track Record Section (S7)
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 * Uses inline styles (same as English version).
 */

const base = require('../../lib/templates/_base');
const en = require('./automotive-section-2');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.trackRecord;

const BORDER_COLORS = ['#00AFF0', '#02D28C', '#644CE6'];

function blocks() {
  const casesHTML = t.cases.map((c, i) => `
                    <div class="fade-in" style="background: #F5F7FA; border-radius: 12px; padding: 32px; border-left: 4px solid ${BORDER_COLORS[i]}; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #0369a1; margin-bottom: 12px;">${c.tag}</div>
                        <h3 style="font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: 700; color: #000864; margin: 0 0 12px 0;">${c.company}</h3>
                        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 15px; color: #333; margin: 0; line-height: 1.7;">${c.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="dw-section" style="padding: 80px 5%; background: white; position: relative; overflow: hidden;">
    <div style="max-width: 1000px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; color: #00AFF0; margin: 0 0 12px 0;">${t.label}</p>
                    <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 36px; font-weight: 700; color: #000864; margin: 0 0 16px 0;">${t.h2}</h2>
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 18px; color: #666; max-width: 700px; margin: 0 auto; line-height: 1.6;">${t.subtitle}</p>
                </div>
                <div class="auto-track-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">${casesHTML}
                </div>
            </div>
            <style>
                @media (max-width: 768px) {
                    .auto-track-grid { grid-template-columns: 1fr !important; }
                }
            </style>    </div>`;

  return base.wrapInDiviSection('Section 2 (Thai)', html, 'Section 2: Content');
}

module.exports = { blocks, css: () => en.css() };
