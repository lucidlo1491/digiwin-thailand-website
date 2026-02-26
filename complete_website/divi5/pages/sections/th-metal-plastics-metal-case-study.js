/**
 * th-metal-plastics-metal-case-study.js — Thai Case Study Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./metal-plastics-metal-case-study');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.caseStudy;
const P = 'metal-case-study';

function blocks() {
  const html = `
    <div class="${P}">
    <div class="dw-d-bg dw-d-bg--bottom dw-d-bg--particle" style="opacity: 0.1;"></div>
            <div style="max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;">
                <div style="text-align: center; margin-bottom: 48px;">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dw-cyan, #00E6FF); display: inline-block; margin-bottom: 12px;">${t.label}</span>
                    <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 36px; font-weight: 700; color: #fff; margin: 0;">${t.h2}</h2>
                </div>
                <div class="fade-in" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 48px; backdrop-filter: blur(8px);">
                    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center;">
                        <div style="flex: 1; min-width: 280px;">
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dw-blue, #00AFF0); display: inline-block; margin-bottom: 8px;">${t.caseLabel}</span>
                            <h3 style="font-family: 'Noto Sans', sans-serif; font-size: 26px; font-weight: 700; color: #fff; margin: 0 0 8px 0;">${t.company}</h3>
                            <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 15px; color: rgba(255,255,255,0.75); margin: 0 0 24px 0; line-height: 1.6;">${t.industry}</p>
                            <div style="display: flex; gap: 32px; flex-wrap: wrap; margin-bottom: 24px;">
                                <div>
                                    <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 800; color: var(--dw-blue, #00AFF0); line-height: 1;">${t.metrics[0].value}</div>
                                    <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 4px;">${t.metrics[0].label}</div>
                                </div>
                                <div>
                                    <div style="font-family: 'Noto Sans', sans-serif; font-size: 40px; font-weight: 800; color: var(--dw-blue, #00AFF0); line-height: 1;">${t.metrics[1].value}</div>
                                    <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 4px;">${t.metrics[1].label}</div>
                                </div>
                            </div>
                            <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.7; margin: 0 0 16px 0; font-style: italic; border-left: 3px solid var(--dw-blue, #00AFF0); padding-left: 16px;">${t.quote}</p>
                            <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 14px; color: rgba(255,255,255,0.75); margin: 0;"><strong style="color: rgba(255,255,255,0.9);">${t.solutionLabel}</strong> ${t.solution}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>`;

  return base.wrapInDiviSection('Metal Case Study (Thai)', html, 'Metal Case Study: Content');
}

module.exports = { blocks, css: () => en.css() };
