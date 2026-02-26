/**
 * th-ind-hero.js — Thai Industries Hub Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: industries-hero.js + i18n/th/industries.js hero
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./industries-hero');
const th = require('../../i18n/th/industries');

const P = 'hero'; // Same CSS prefix as English
const D = th.hero;

function blocks() {
  const html = `
    <div class="industries-hero">
    <div class="dw-d-bg dw-d-bg--center dw-d-bg--particle dw-d-parallax" style="opacity: 0.10;"></div>
            <div class="industries-hero-inner">
                <div class="industries-hero-badge">
                    <span>${D.badge}</span>
                </div>
                <h1>${D.title}</h1>
                <p class="industries-hero-subtitle">${D.subtitle}</p>
                <div class="industries-hero-stats">
                    <div class="industries-hero-stat">
                        <div class="industries-hero-stat-number">${D.stats[0].value}</div>
                        <div class="industries-hero-stat-label">${D.stats[0].label}</div>
                    </div>
                    <div class="industries-hero-stat">
                        <div class="industries-hero-stat-number">${D.stats[1].value}</div>
                        <div class="industries-hero-stat-label">${D.stats[1].label}</div>
                    </div>
                    <div class="industries-hero-stat">
                        <div class="industries-hero-stat-number dw-years">${D.stats[2].value}</div>
                        <div class="industries-hero-stat-label">${D.stats[2].label}</div>
                    </div>
                </div>
            </div>
    <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>
    `;

  return base.wrapInDiviSection('Hero', html, 'Hero: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
