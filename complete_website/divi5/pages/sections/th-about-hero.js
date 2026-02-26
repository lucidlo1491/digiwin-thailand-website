/**
 * th-about-hero.js — Thai About Us Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-hero.js + i18n/th/about.js hero
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./about-hero');
const th = require('../../i18n/th/about');

const D = th.hero;

function blocks() {
  const html = `
    <div class="about-hero">
    <div class="hero-deco" aria-hidden="true"></div>
            <div class="about-hero-inner">
                <div class="about-hero-content">
                    <h1>${D.title}</h1>
                    <p>${D.description}</p>
                    <a href="#mission" class="hero-scroll-cta">
                        ${D.scrollCta}
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </a>
                </div>
                <div class="about-hero-stats">
                    <div class="hero-stat">
                        <div class="hero-stat-value">${D.stats[0].value}</div>
                        <div class="hero-stat-label">${D.stats[0].label}</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-value">${D.stats[1].value}</div>
                        <div class="hero-stat-label">${D.stats[1].label}</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-value">${D.stats[2].value}</div>
                        <div class="hero-stat-label">${D.stats[2].label}</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-value">${D.stats[3].value}</div>
                        <div class="hero-stat-label">${D.stats[3].label}</div>
                    </div>
                </div>
            </div>
    <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>
    `;

  return base.wrapInDiviSection('ฮีโร่: เกี่ยวกับเรา', html, 'Hero: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
