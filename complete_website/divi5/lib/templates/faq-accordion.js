/**
 * faq-accordion.js — FAQ accordion template with <details>/<summary>
 *
 * Used by: ERP, MES, WMS, AIoT, Automotive, Electronics, Metal & Plastics pages
 *
 * Data shape:
 * {
 *   adminLabel?: string,         // VB label (default 'FAQ')
 *   sectionPrefix: string,       // CSS prefix (unique per page, e.g. 'erp-faq')
 *   heading?: string,            // default 'Frequently Asked Questions'
 *   background?: string,         // default '#f8fafc'
 *   summaryFontSize?: string,    // default '17px' (MES uses '15px')
 *   items: [{ question, answer }],  // answer is raw HTML (wrapped in <p> tags)
 * }
 */

const base = require('./_base');

const schema = {
  description: 'FAQ accordion with collapsible details/summary items',
  category: 'content',
};

function blocks(data) {
  const P = data.sectionPrefix;
  const adminLabel = data.adminLabel || 'FAQ';
  const heading = data.heading || 'Frequently Asked Questions';
  const bg = data.background || '#f8fafc';
  const summarySize = data.summaryFontSize || '17px';

  const itemsHTML = data.items.map(item => `
              <details style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <summary style="font-family: 'Noto Sans', sans-serif; font-size: ${summarySize}; font-weight: 600; color: #000864; padding: 16px 20px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; background: white; transition: background 0.2s ease;">${item.question}<span style="font-size: 20px; color: #0369a1; transition: transform 0.2s ease; flex-shrink: 0; margin-left: 12px;">+</span></summary>
                <div style="padding: 0 20px 16px 20px; background: white;">
                  ${item.answer}
                </div>
              </details>`).join('');

  const html = `
    <div class="${P}">
    <div style="max-width: 800px; margin: 0 auto; padding: 0 24px;">
            <h2 style="font-family: 'Noto Sans', sans-serif; font-size: 28px; font-weight: 700; color: #000864; margin-bottom: 32px; text-align: center;">${heading}</h2>
            <div style="display: flex; flex-direction: column; gap: 12px;">${itemsHTML}
            </div>
          </div>
    </div>`;

  return base.wrapInDiviSection(adminLabel, html, `${adminLabel}: Content`);
}

function css(data) {
  const P = data.sectionPrefix;
  const bg = data.background || '#f8fafc';
  return `
/* === ${(data.adminLabel || 'FAQ').toUpperCase()} === */
.et_pb_section:has(.${P}){padding:60px 0 !important;background:${bg} !important}
.${P}{${base.fontSmoothingReset(P)}font-size:16px}
.${P} p{padding-bottom:0;line-height:1.6}
.et_pb_section .${P} h2{margin:0;padding:0;line-height:1.6}
.${P} summary{-webkit-font-smoothing:auto}
${base.reducedMotion('')}`.trim();
}

module.exports = { blocks, css, schema };
