/**
 * automotive-section-3.js — FAQ Section (S8)
 *
 * Source: automotive.html line 731
 * Note: Uses inline styles in HTML — CSS here is minimal (Divi overrides only)
 */

const base = require('../../lib/templates/_base');

const P = 'sec';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="dw-section" style="padding: 60px 0; background: #f8fafc;">
    <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
            <h2 style="font-family: 'Noto Sans', sans-serif; font-size: 28px; font-weight: 700; color: #000864; margin-bottom: 32px; text-align: center;">Frequently Asked Questions</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: 17px; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">What ERP system do automotive parts factories in Thailand use?<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin is the ERP of choice for over 500 automotive tier 1-3 suppliers across Thailand and ASEAN. Our system is purpose-built for the automotive supply chain, with native support for JIT scheduling, OEM EDI integration, and IATF 16949 quality compliance. Unlike generic ERP platforms, DigiWin understands kanban signals, sequence delivery, and the multi-plant coordination that automotive production demands.</p>
                </div>
              </details>
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: 17px; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">Does DigiWin ERP support EDI for automotive supply chains?<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin ERP supports EDI integration for automotive supply chains, enabling electronic exchange of forecasts, purchase orders, ASN confirmations, and quality data with your OEM customers. This reduces manual data entry and helps maintain the tight JIT delivery windows that automotive production demands.</p>
                </div>
              </details>
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: 17px; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">Does DigiWin support IATF 16949 quality documentation?<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">Yes. DigiWin includes built-in quality management modules designed for IATF 16949 compliance. The system supports PPAP documentation, control plans, inspection records, SPC charts and analysis, and 8D reporting. All quality data is captured digitally and is audit-ready at all times, eliminating the documentation anxiety that comes with quarterly customer audits and growing compliance requirements.</p>
                </div>
              </details>
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: 17px; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">How does DigiWin help with automotive lot traceability?<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin delivers 100% traceability coverage from raw material receiving through finished goods shipping. The system supports both forward and backward lot-level traceability with barcode and QR code scanning at every step. When a quality issue surfaces and an OEM asks which lot, which raw materials, and which operator were involved, DigiWin provides the answer in seconds rather than days, along with precise recall scope analysis.</p>
                </div>
              </details>
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: 17px; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">What is the typical ROI timeline for automotive ERP?<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  <p style="font-family: 'Noto Sans', sans-serif; font-size: 15px; line-height: 1.7; color: #333; margin: 0;">DigiWin customers in the automotive sector typically see measurable results within the first year of implementation. Key outcomes include on-time delivery rates reaching 99.5%, which directly protects OEM contracts and prevents costly line-stop penalties. With JIT scheduling, complete traceability, and automated EDI integration working together, the ROI is driven by both cost avoidance and operational efficiency gains across multi-plant operations.</p>
                </div>
              </details>
            </div>
          </div>    </div>`;

  return base.wrapInDiviSection('Section 3', html, 'Section 3: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === FAQ (S8) === */
/* Divi overrides for inline-styled elements */
.et_pb_section .dw-section h2{font-weight:700 !important;line-height:1.3 !important}
.et_pb_section .dw-section p{padding-bottom:0 !important}
.et_pb_section .dw-section summary{font-weight:600 !important}
${base.reducedMotion('')}
`.trim();
}

module.exports = { blocks, css };
