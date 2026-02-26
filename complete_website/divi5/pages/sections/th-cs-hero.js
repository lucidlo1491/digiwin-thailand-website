/**
 * th-cs-hero.js — Thai Case Studies Hero Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./case-studies-cs-hero');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.hero;

function blocks() {
  const html = `
    <div class="cs-hero">
    <div class="cs-hero-inner">
                <div class="cs-hero-badge" aria-hidden="true">${t.badge}</div>
                <h1>${t.h1}</h1>
                <p class="cs-hero-subtitle">${t.subtitle}</p>
                <div class="cs-hero-stats" role="list" aria-label="สถิติสำคัญ">
                    <div role="listitem">
                        <div class="cs-hero-stat-value">${t.stats[0].value}</div>
                        <div class="cs-hero-stat-label">${t.stats[0].label}</div>
                    </div>
                    <div role="listitem">
                        <div class="cs-hero-stat-value">${t.stats[1].value}</div>
                        <div class="cs-hero-stat-label">${t.stats[1].label}</div>
                    </div>
                    <div role="listitem">
                        <div class="cs-hero-stat-value">${t.stats[2].value}</div>
                        <div class="cs-hero-stat-label">${t.stats[2].label}</div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('CS Hero (Thai)', html, 'CS Hero: Content');
}

module.exports = { blocks, css: () => en.css() };
