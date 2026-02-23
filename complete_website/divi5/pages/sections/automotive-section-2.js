/**
 * automotive-section-2.js — Track Record Section (S7)
 *
 * Source: automotive.html line 698
 * styles.css: 21 base, 0 hover, 1 pseudo, 0 hidden
 * Note: Uses inline styles in HTML — CSS here is minimal (Divi overrides only)
 */

const base = require('../../lib/templates/_base');

const P = 'sec';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="dw-section" style="padding: 80px 5%; background: white; position: relative; overflow: hidden;">
    <div style="max-width: 1000px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <p style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #00AFF0; margin: 0 0 12px 0;">Customer References</p>
                    <h2 style="font-family: 'Noto Sans', sans-serif; font-size: 36px; font-weight: 700; color: #000864; margin: 0 0 16px 0;">DigiWin's Automotive Track Record Across Asia</h2>
                    <p style="font-family: 'Noto Sans', sans-serif; font-size: 18px; color: #666; max-width: 700px; margin: 0 auto; line-height: 1.6;">DigiWin's automotive expertise spans 1,000+ implementations across Asia. Here's what our automotive clients have achieved:</p>
                </div>
                <div class="auto-track-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                    <div class="fade-in" style="background: #F5F7FA; border-radius: 12px; padding: 32px; border-left: 4px solid #00AFF0; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #0369a1; margin-bottom: 12px;">ERP + MES</div>
                        <h3 style="font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: 700; color: #000864; margin: 0 0 12px 0;">Zhejiang Yahu Auto Parts</h3>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; color: #333; margin: 0; line-height: 1.6;">Inventory reduced from 30M to 12M RMB through integrated ERP + MES — a 60% reduction achieved by connecting planning with real-time shop floor data.</p>
                    </div>
                    <div class="fade-in" style="background: #F5F7FA; border-radius: 12px; padding: 32px; border-left: 4px solid #02D28C; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #0369a1; margin-bottom: 12px;">ERP + MES</div>
                        <h3 style="font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: 700; color: #000864; margin: 0 0 12px 0;">Ningbo GREAT Automotive</h3>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; color: #333; margin: 0; line-height: 1.6;">Full lot traceability from raw material to finished product — zero recall failures. Every component tracked through the entire production chain.</p>
                    </div>
                    <div class="fade-in" style="background: #F5F7FA; border-radius: 12px; padding: 32px; border-left: 4px solid #644CE6; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #0369a1; margin-bottom: 12px;">MES</div>
                        <h3 style="font-family: 'Noto Sans', sans-serif; font-size: 18px; font-weight: 700; color: #000864; margin: 0 0 12px 0;">Wieson Automotive Electronics</h3>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; color: #333; margin: 0; line-height: 1.6;">MES integration achieving real-time production monitoring across multiple lines — connecting machine data to management decisions instantly.</p>
                    </div>
                </div>
            </div>
            <style>
                @media (max-width: 768px) {
                    .auto-track-grid { grid-template-columns: 1fr !important; }
                }
            </style>    </div>`;

  return base.wrapInDiviSection('Section 2', html, 'Section 2: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === TRACK RECORD (S7) === */
.fade-in{opacity:1;transform:none}
.fade-in.visible{opacity:1;transform:translateY(0)}
.fade-in.no-delay{opacity:1;transform:none;transition:none}
/* Divi overrides for inline-styled elements */
.et_pb_section .dw-section h2{font-weight:700 !important;line-height:1.3 !important}
.et_pb_section .dw-section h3{font-weight:700 !important;line-height:1.3 !important}
.et_pb_section .dw-section p{padding-bottom:0 !important}
@media (max-width:768px){.auto-track-grid{grid-template-columns:1fr !important}}
${base.reducedMotion('')}
`.trim();
}

module.exports = { blocks, css };
