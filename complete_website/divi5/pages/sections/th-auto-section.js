/**
 * th-auto-section.js — Thai Automotive Results Section (S6)
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 * Uses inline styles (same as English version).
 */

const base = require('../../lib/templates/_base');
const en = require('./automotive-section');
const thAuto = require('../../i18n/th/automotive');

const t = thAuto.results;

function blocks() {
  const cardsHTML = t.cards.map(card => `
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">${card.value}</div>
                        <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">${card.title}</div>
                        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.6;">${card.desc}</p>
                    </div>`).join('');

  const html = `
    <div class="dw-section" style="padding: 80px 5%; background: #F5F7FA; position: relative; overflow: hidden;">
    <div style="max-width: 1200px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; color: #00AFF0; margin: 0 0 12px 0;">${t.label}</p>
                    <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 36px; font-weight: 700; color: #000864; margin: 0 0 16px 0;">${t.h2}</h2>
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 18px; color: #666; max-width: 680px; margin: 0 auto; line-height: 1.6;">${t.subtitle}</p>
                </div>
                <div class="auto-results-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">${cardsHTML}
                </div>
            </div>
            <style>
                @media (max-width: 1024px) {
                    .auto-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .auto-results-grid { grid-template-columns: 1fr !important; }
                }
            </style>    </div>`;

  return base.wrapInDiviSection('Section (Thai)', html, 'Section: Content');
}

module.exports = { blocks, css: () => en.css() };
