/**
 * th-metal-plastics-challenges.js — Thai Challenges Section
 *
 * Reuses English CSS + SVG icons. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-challenges');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.challenges;
const P = 'challenges';

function blocks() {
  const html = `
    <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-header">
                    <h2>${t.h2}</h2>
                    <p>${t.subtitle}</p>
                </div>
                <div class="${P}-grid">
                    <div class="challenge-card">
                        <div class="challenge-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><polyline points="3 6 5 6 6 6"/><path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"/><path d="M19 6h-1a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2H5"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        </div>
                        <h3>${t.cards[0].h3}</h3>
                        <p>${t.cards[0].p}</p>
                    </div>
                    <div class="challenge-card">
                        <div class="challenge-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <h3>${t.cards[1].h3}</h3>
                        <p>${t.cards[1].p}</p>
                    </div>
                    <div class="challenge-card">
                        <div class="challenge-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <h3>${t.cards[2].h3}</h3>
                        <p>${t.cards[2].p}</p>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Challenges (Thai)', html, 'Challenges: Content');
}

module.exports = { blocks, css: () => en.css() };
