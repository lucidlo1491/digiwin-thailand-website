/**
 * th-erp-section-6.js — Thai Technical Advantages Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-section-6');
const thErp = require('../../i18n/th/erp');

const t = thErp.section6;

function blocks() {
  // Reuse same SVG icons from English (decorative)
  const weaponSvgs = [
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 5-9"/><circle cx="20" cy="3" r="1.5" fill="#0369a1" stroke="none"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M12 3v6"/><path d="M12 9l-7 6"/><path d="M12 9l7 6"/><circle cx="12" cy="3" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="17" r="2"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M12 3v18"/><path d="M3 12l3-3v6l-3-3z" fill="#0369a1" stroke="none"/><path d="M21 12l-3-3v6l3-3z" fill="#0369a1" stroke="none"/><rect x="6" y="6" width="4" height="12" rx="1" opacity="0.3" fill="#0369a1" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" opacity="0.3" fill="#0369a1" stroke="none"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 2v4M16 2v4"/><rect x="6" y="13" width="3" height="2" rx="0.5" fill="#0369a1" stroke="none"/><rect x="11" y="13" width="3" height="2" rx="0.5" fill="#0369a1" stroke="none" opacity="0.5"/><rect x="16" y="13" width="3" height="2" rx="0.5" fill="#0369a1" stroke="none" opacity="0.3"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="#0369a1" stroke="none"/></svg>',
    '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="1.5" style="width: 24px; height: 24px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" stroke-width="2"/></svg>',
  ];

  const weaponCardsHTML = t.weapons.map((w, i) => `
                    <div class="weapon-card" style="background: #fff; border: 1px solid #e8eef3; border-radius: 20px; padding: 32px; transition: all 0.4s ease; position: relative;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                            <div style="width: 48px; height: 48px; background: linear-gradient(135deg, rgba(3,105,161,0.15), rgba(3,105,161,0.05)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                ${weaponSvgs[i]}
                            </div>
                            <div>
                                <h3 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 18px; font-weight: 600; color: #000864; margin: 0;">${w.title}</h3>
                                <p style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #0369a1; text-transform: uppercase; letter-spacing: 0.05em; margin: 2px 0 0;">${w.abbr}</p>
                            </div>
                        </div>
                        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; color: #333; line-height: 1.7; margin-bottom: 12px;">${w.desc}</p>
                        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 14px; color: #0369a1; font-weight: 500;">${w.highlight}</p>
                    </div>`).join('\n');

  const boiItemsHTML = t.boiAlert.items.map((item, i) => `
                        <li>
                            <span class="boi-num">${i + 1}</span>
                            <div><strong>${item.strong}</strong> ${item.desc}</div>
                        </li>`).join('');

  const pr = t.provenResults;

  const html = `
    <div class="tech-advantages-section"><div style="max-width: 1200px; margin: 0 auto; padding: 0 24px;">
                <div style="text-align: center; margin-bottom: 60px;">
                    <p style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: #0369a1; margin-bottom: 12px;">${t.label}</p>
                    <h2 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 40px; font-weight: 700; color: #000864; margin-bottom: 16px;">${t.title}</h2>
                    <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 18px; color: #666; max-width: 700px; margin: 0 auto;">${t.subtitle}</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
${weaponCardsHTML}
                </div>

                <div class="boi-callout-grid" style="margin-top: 48px; background: linear-gradient(135deg, #000864, #1e3a5f); border-radius: 20px; padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;">
                    <div>
                        <p style="font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #00AFF0; margin-bottom: 12px;">${pr.label}</p>
                        <h3 style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 16px;">${pr.title}</h3>
                        <p style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 17px; color: rgba(255,255,255,0.85); line-height: 1.8;">${pr.body}</p>
                        <a href="../blog/boi-compliance-jin-hai.html" style="display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 15px; font-weight: 500; color: #00AFF0; text-decoration: none;">${pr.cta} <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                    </div>
                    <div style="text-align: center;">
                        <div style="display: inline-block; background: rgba(0,175,240,0.15); border-radius: 20px; padding: 40px;">
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 56px; font-weight: 700; color: #00AFF0;">10M+</div>
                            <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; color: rgba(255,255,255,0.75); margin-top: 8px;">${pr.statSaved}</div>
                            <div style="width: 40px; height: 2px; background: #00AFF0; margin: 16px auto;"></div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 56px; font-weight: 700; color: #15803d;">Zero</div>
                            <div style="font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif; font-size: 16px; color: rgba(255,255,255,0.75); margin-top: 8px;">${pr.statZero}</div>
                        </div>
                    </div>
                </div>

                <div class="boi-enforcement-alert">
                    <div class="boi-enforcement-header">
                        <div class="boi-enforcement-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#FFD700" stroke="#b45309" stroke-width="1.5"/>
                                <line x1="12" y1="9" x2="12" y2="13" stroke="#92400e" stroke-width="2" stroke-linecap="round"/>
                                <circle cx="12" cy="17" r="1" fill="#92400e"/>
                            </svg>
                        </div>
                        <h3 class="boi-enforcement-title">${t.boiAlert.title}</h3>
                    </div>
                    <p class="boi-enforcement-body">${t.boiAlert.body}</p>
                    <ol class="boi-enforcement-list">${boiItemsHTML}
                    </ol>
                    <a href="../blog/boi-compliance-jin-hai.html" class="boi-enforcement-cta">${t.boiAlert.cta} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                    <p class="boi-enforcement-source">${t.boiAlert.source}</p>
                </div>
            </div></div>`;

  return base.wrapInDiviSection('Section 6 (Thai)', html, 'Section 6: Content');
}

module.exports = { blocks, css: () => en.css() };
