/**
 * th-metal-plastics-metal-hero.js — Thai Metal Hero Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./metal-plastics-metal-hero');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.hero;
const P = 'metal-hero'; // CSS prefix — same as English

function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--bottom dw-d-bg--particle" style="opacity: 0.15; min-height: 30vh; bottom: -10%;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-badge">
                    <span>${t.badge}</span>
                </div>
                <h1>${t.h1}</h1>
                <p class="${P}-subtitle">${t.subtitle}</p>
                <div class="${P}-stats">
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[0].value}</div>
                        <div class="${P}-stat-label">${t.stats[0].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[1].value}</div>
                        <div class="${P}-stat-label">${t.stats[1].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[2].value}</div>
                        <div class="${P}-stat-label">${t.stats[2].label}</div>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Metal Hero (Thai)', html, 'Metal Hero: Content');
}

module.exports = { blocks, css: () => en.css() };
