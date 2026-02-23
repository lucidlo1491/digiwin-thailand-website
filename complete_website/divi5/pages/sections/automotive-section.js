/**
 * automotive-section.js — Results Section (S6)
 *
 * Source: automotive.html line 637
 * Note: Uses inline styles in HTML — CSS here is minimal (Divi overrides + fade-in)
 */

const base = require('../../lib/templates/_base');

const P = 'sec';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="dw-section" style="padding: 80px 5%; background: #F5F7FA; position: relative; overflow: hidden;">
    <div style="max-width: 1200px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <p style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #00AFF0; margin: 0 0 12px 0;">Verified Results</p>
                    <h2 style="font-family: 'Noto Sans', sans-serif; font-size: 36px; font-weight: 700; color: #000864; margin: 0 0 16px 0;">Proven Automotive Results</h2>
                    <p style="font-family: 'Noto Sans', sans-serif; font-size: 18px; color: #666; max-width: 680px; margin: 0 auto; line-height: 1.6;">Measurable outcomes from DigiWin's 1,000+ automotive implementations across Asia.</p>
                </div>
                <div class="auto-results-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">-30%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">R&D Cycle Time</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Faster product development from design through production validation</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">+35%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">On-Time Delivery</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Improved JIT compliance protecting OEM contracts and preventing line-stop penalties</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">30-60%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">Inventory Reduction</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Lower carrying costs through precise demand planning and WMS integration</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">100%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">Quality Traceability</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Full lot tracking from raw material to finished product — zero traceability gaps</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">60→80%+</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">OEE Improvement</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Equipment effectiveness gains through real-time MES monitoring and downtime analysis</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">+40%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">Planning Accuracy</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">More precise production scheduling reducing overtime and rush orders</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">-25%</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">Scrap Rate</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Lower material waste through quality control at every production stage</p>
                    </div>
                    <div class="fade-in" style="background: white; border-radius: 12px; padding: 32px 24px; text-align: center; border: 1px solid #e5e7eb; transition: box-shadow 0.3s ease;">
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #0369a1; line-height: 1; margin-bottom: 8px;">Weeks→Days</div>
                        <div style="font-family: 'Noto Sans', sans-serif; font-size: 15px; font-weight: 600; color: #000864; margin-bottom: 6px;">Month-End Closing</div>
                        <p style="font-family: 'Noto Sans', sans-serif; font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Automated cost accounting and financial consolidation across plants</p>
                    </div>
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

  return base.wrapInDiviSection('Section', html, 'Section: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === RESULTS (S6) === */
.fade-in{opacity:1;transform:none}
.fade-in.visible{opacity:1;transform:translateY(0)}
.fade-in.no-delay{opacity:1;transform:none;transition:none}
/* Divi overrides for inline-styled elements */
.et_pb_section .dw-section h2{font-weight:700 !important;line-height:1.3 !important}
.et_pb_section .dw-section p{padding-bottom:0 !important}
@media (max-width:1024px){.auto-results-grid{grid-template-columns:repeat(2, 1fr) !important}}
@media (max-width:600px){.auto-results-grid{grid-template-columns:1fr !important}}
${base.reducedMotion('')}
`.trim();
}

module.exports = { blocks, css };
