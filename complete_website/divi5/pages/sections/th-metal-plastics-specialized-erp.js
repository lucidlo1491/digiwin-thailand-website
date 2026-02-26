/**
 * th-metal-plastics-specialized-erp.js — Thai Specialized ERP Section
 *
 * Reuses English CSS + SVG icons. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-specialized-erp');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.specializedErp;
const P = 'spec-erp';

function blocks() {
  const html = `
    <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header">
                    <h2>${t.h2}</h2>
                    <p>${t.subtitle}</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3h18v18H3z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1.5" fill="none"/><text x="6" y="9" font-size="5" fill="currentColor" font-weight="700">KG</text><text x="14" y="17" font-size="5" fill="currentColor" font-weight="700">PC</text></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[0].h3}</h3>
                        <p>${t.cards[0].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h4l2-8 4 16 2-8h4" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="20" cy="12" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[1].h3}</h3>
                        <p>${t.cards[1].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 14h8M8 17h5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[2].h3}</h3>
                        <p>${t.cards[2].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[3].h3}</h3>
                        <p>${t.cards[3].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 11v4M10 13h4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[4].h3}</h3>
                        <p>${t.cards[4].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 17l4-4 4 4 4-8 4 4" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="4" cy="17" r="1.5" fill="currentColor"/><circle cx="8" cy="13" r="1.5" fill="currentColor"/><circle cx="12" cy="17" r="1.5" fill="currentColor"/><circle cx="16" cy="9" r="1.5" fill="currentColor"/><circle cx="20" cy="13" r="1.5" fill="currentColor"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[5].h3}</h3>
                        <p>${t.cards[5].p}</p>
                    </div>
                    <div class="solution-card fade-in" style="padding: 32px;">
                        <div class="solution-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        </div>
                        <h3 style="font-size: 18px;">${t.cards[6].h3}</h3>
                        <p>${t.cards[6].p}</p>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Specialized ERP (Thai)', html, 'Specialized ERP: Content');
}

module.exports = { blocks, css: () => en.css() };
