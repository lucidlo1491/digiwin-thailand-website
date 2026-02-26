/**
 * th-elec-fade-in.js — Thai Electronics Case Study Callout (S6) — COPY
 *
 * Same layout/CSS as English electronics-fade-in.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/electronics');

function blocks() {
  const f = th.fadeIn;

  const html = `
    <div class="fade-in">
    <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
                <div style="background: linear-gradient(135deg, rgba(0,175,240,0.04), rgba(0,8,100,0.04)); border: 1px solid rgba(0,175,240,0.2); border-left: 4px solid #00AFF0; border-radius: 12px; padding: 40px 40px 36px;">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: #00AFF0; display: block; margin-bottom: 8px;">${f.label}</span>
                    <h3 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 24px; font-weight: 700; color: #000864; margin: 0 0 16px;">${f.title}</h3>
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; line-height: 1.7; color: #333; margin: 0 0 20px;">${f.paragraph1}</p>
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 14px; line-height: 1.6; color: #666; margin: 0;">${f.paragraph2}</p>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection(f.adminLabel, html, 'Fade In: Content');
}

// Reuse English CSS
const { css } = require('./electronics-fade-in');

module.exports = { blocks, css };
