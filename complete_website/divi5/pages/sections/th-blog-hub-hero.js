/**
 * th-blog-hub-hero.js — Thai Blog Hub Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: blog-hub-hero.js + i18n/th/blog.js hubHero
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./blog-hub-hero');
const th = require('../../i18n/th/blog');

const P = 'hubh'; // Same CSS prefix as English
const D = th.hubHero;

function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--top dw-d-bg--gradient" style="opacity: 0.10;"></div>
            <div class="${P}-hero-illustration">
                <svg aria-hidden="true" viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect x="280" y="80" width="180" height="220" rx="10" stroke="#00AFF0" stroke-width="1.5"/>
                    <rect x="295" y="65" width="180" height="220" rx="10" stroke="#00AFF0" stroke-width="1.2" opacity="0.6"/>
                    <rect x="310" y="50" width="180" height="220" rx="10" stroke="#00AFF0" stroke-width="0.8" opacity="0.3"/>

                    <line x1="310" y1="120" x2="430" y2="120" stroke="#00AFF0" stroke-width="1.2"/>
                    <line x1="310" y1="145" x2="420" y2="145" stroke="#00AFF0" stroke-width="1"/>
                    <line x1="310" y1="170" x2="400" y2="170" stroke="#00AFF0" stroke-width="0.8"/>
                    <line x1="310" y1="195" x2="410" y2="195" stroke="#00AFF0" stroke-width="0.8"/>

                    <polyline points="310,250 330,235 350,242 370,220 390,228 410,210 430,215" stroke="#00AFF0" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

                    <circle cx="140" cy="160" r="20" stroke="#00AFF0" stroke-width="1.5"/>
                    <circle cx="80" cy="260" r="16" stroke="#00AFF0" stroke-width="1.2"/>
                    <circle cx="200" cy="280" r="14" stroke="#00AFF0" stroke-width="1"/>
                    <circle cx="60" cy="370" r="18" stroke="#00AFF0" stroke-width="1.2"/>
                    <circle cx="170" cy="380" r="12" stroke="#00AFF0" stroke-width="1"/>

                    <line x1="140" y1="180" x2="80" y2="244" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="4 4"/>
                    <line x1="140" y1="180" x2="200" y2="266" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="4 4"/>
                    <line x1="80" y1="276" x2="60" y2="352" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="4 4"/>
                    <line x1="80" y1="276" x2="170" y2="368" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="4 4"/>
                    <line x1="200" y1="294" x2="170" y2="368" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="4 4"/>

                    <circle cx="140" cy="160" r="5" fill="#00AFF0" opacity="0.4"/>
                    <circle cx="80" cy="260" r="4" fill="#00AFF0" opacity="0.3"/>
                    <circle cx="200" cy="280" r="3" fill="#00AFF0" opacity="0.3"/>

                    <circle cx="420" cy="380" r="40" stroke="#00AFF0" stroke-width="1.5"/>
                    <line x1="448" y1="408" x2="480" y2="440" stroke="#00AFF0" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="420" cy="380" r="20" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="3 3"/>

                    <circle cx="250" cy="400" r="3" fill="#00AFF0" opacity="0.3"/>
                    <circle cx="230" cy="120" r="2" fill="#00AFF0" opacity="0.2"/>
                    <circle cx="500" cy="320" r="2.5" fill="#00AFF0" opacity="0.25"/>
                    <circle cx="520" cy="140" r="2" fill="#00AFF0" opacity="0.2"/>
                    <circle cx="160" cy="100" r="2.5" fill="#00AFF0" opacity="0.2"/>
                    <circle cx="350" cy="350" r="2" fill="#00AFF0" opacity="0.15"/>
                    <circle cx="100" cy="140" r="1.5" fill="#00AFF0" opacity="0.2"/>
                </svg>
            </div>
            <div class="${P}-hero-inner">
                <div class="${P}-hero-badge">
                    <span>${D.badge}</span>
                </div>
                <h1>${D.title}</h1>
                <p class="${P}-hero-subtitle">${D.subtitle}</p>
                <div class="${P}-hero-stats">
                    <div class="${P}-hero-stat">
                        <div class="${P}-hero-stat-number">${D.stats[0].value}</div>
                        <div class="${P}-hero-stat-label">${D.stats[0].label}</div>
                    </div>
                    <div class="${P}-hero-stat">
                        <div class="${P}-hero-stat-number">${D.stats[1].value}</div>
                        <div class="${P}-hero-stat-label">${D.stats[1].label}</div>
                    </div>
                    <div class="${P}-hero-stat">
                        <div class="${P}-hero-stat-number">${D.stats[2].value}</div>
                        <div class="${P}-hero-stat-label">${D.stats[2].label}</div>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Hub Hero', html, 'Hub Hero: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
