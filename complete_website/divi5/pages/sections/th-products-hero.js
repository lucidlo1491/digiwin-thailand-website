/**
 * th-products-hero.js — Thai Products Hub Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: products-hero.js + i18n/th/products.js hero
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./products-hero');
const th = require('../../i18n/th/products');

const P = 'prod-hero'; // Same CSS prefix as English
const D = th.hero;

function blocks() {
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>

      <div class="${P}-ecosystem">
        <svg aria-hidden="true" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="${P}-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,175,240,0.06)" stroke-width="0.5"/>
            </pattern>
            <filter id="${P}-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="100%" height="100%" fill="url(#${P}-grid)"/>

          <g opacity="0.15">
            <path d="M100 600 L100 400 L180 400 L180 350 L260 350 L260 300 L340 300 L340 350 L420 350 L420 400 L500 400 L500 600" fill="none" stroke="#00AFF0" stroke-width="1.5"/>
            <rect x="130" y="450" width="60" height="100" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
            <rect x="230" y="420" width="80" height="130" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
            <rect x="350" y="460" width="50" height="90" fill="none" stroke="#00AFF0" stroke-width="1" rx="4"/>
          </g>

          <g class="${P}-data-streams">
            <path d="M0 300 Q200 250 400 300 T800 280 T1200 310 T1400 290" fill="none" stroke="rgba(0,175,240,0.15)" stroke-width="1.5" stroke-dasharray="8 4">
              <animate attributeName="stroke-dashoffset" values="0;-24" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M0 450 Q300 400 600 450 T1000 420 T1400 440" fill="none" stroke="rgba(0,175,240,0.1)" stroke-width="1" stroke-dasharray="6 3">
              <animate attributeName="stroke-dashoffset" values="0;-18" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M0 550 Q400 500 800 550 T1400 530" fill="none" stroke="rgba(139,92,246,0.08)" stroke-width="1" stroke-dasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.5s" repeatCount="indefinite"/>
            </path>
          </g>

          <g filter="url(#${P}-glow)">
            <circle cx="150" cy="200" r="4" fill="#00AFF0" opacity="0.6">
              <animate attributeName="cy" values="200;180;200" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="350" cy="350" r="5" fill="#10b981" opacity="0.5">
              <animate attributeName="cy" values="350;330;350" dur="4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy="500" r="3" fill="#f59e0b" opacity="0.4">
              <animate attributeName="cy" values="500;480;500" dur="3.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1250" cy="180" r="4" fill="#00AFF0" opacity="0.5">
              <animate attributeName="cy" values="180;160;180" dur="4.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1150" cy="400" r="6" fill="#8b5cf6" opacity="0.4">
              <animate attributeName="cy" values="400;380;400" dur="5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="1300" cy="550" r="3" fill="#10b981" opacity="0.5">
              <animate attributeName="cy" values="550;530;550" dur="3s" repeatCount="indefinite"/>
            </circle>
          </g>

          <g transform="translate(1050, 120)" opacity="0.12">
            <rect x="0" y="0" width="200" height="150" fill="none" stroke="#00AFF0" stroke-width="1" rx="8"/>
            <line x1="20" y1="30" x2="180" y2="30" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="60" x2="140" y2="60" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="90" x2="180" y2="90" stroke="#00AFF0" stroke-width="1"/>
            <line x1="20" y1="120" x2="160" y2="120" stroke="#00AFF0" stroke-width="1"/>
            <circle cx="50" cy="30" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="100" cy="60" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="150" cy="90" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
            <circle cx="80" cy="120" r="5" fill="#00AFF0">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
            </circle>
          </g>

          <g transform="translate(50, 620)" opacity="0.1">
            <line x1="0" y1="0" x2="400" y2="0" stroke="#00AFF0" stroke-width="2"/>
            <rect x="50" y="-30" width="40" height="25" fill="#00AFF0" rx="3"/>
            <rect x="130" y="-35" width="45" height="30" fill="#00AFF0" rx="3"/>
            <rect x="220" y="-28" width="35" height="23" fill="#00AFF0" rx="3"/>
            <rect x="310" y="-32" width="50" height="27" fill="#00AFF0" rx="3"/>
          </g>
        </svg>
      </div>

      <div class="${P}-inner">
        <div class="${P}-content">
          <div class="${P}-badge">${D.badge}</div>
          <h1 class="${P}-title">${D.title}</h1>
          <p class="${P}-subtitle">${D.subtitle}</p>

          <div class="${P}-btn-wrap">
            <a href="/contact/" class="${P}-cta">${D.cta}</a>
          </div>

          <div class="${P}-stats">
            <div class="${P}-stat">
              <div class="${P}-stat-number dw-years">${D.stats[0].number}</div>
              <div class="${P}-stat-label">${D.stats[0].label}</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">${D.stats[1].number}</div>
              <div class="${P}-stat-label">${D.stats[1].label}</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">${D.stats[2].number}</div>
              <div class="${P}-stat-label">${D.stats[2].label}</div>
            </div>
            <div class="${P}-stat">
              <div class="${P}-stat-number">${D.stats[3].number}</div>
              <div class="${P}-stat-label">${D.stats[3].label}</div>
            </div>
          </div>
        </div>

        <div class="${P}-stack-visual">
          <div class="${P}-stack-container">
            <div class="${P}-particles">
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
              <div class="${P}-particle"></div>
            </div>

            <div class="${P}-layer ${P}-layer--aiot">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
              ${D.layers.aiot}
            </div>

            <div class="${P}-layer ${P}-layer--mes">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M6 8v8M10 8v8M14 8v8M18 8v8"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                </svg>
              </span>
              ${D.layers.mes}
            </div>

            <div class="${P}-layer ${P}-layer--wms">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </span>
              ${D.layers.wms}
            </div>

            <div class="${P}-layer ${P}-layer--erp">
              <span class="${P}-layer-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
                  <rect x="11" y="12" width="8" height="3" rx="1"/>
                  <rect x="11" y="17" width="5" height="2" rx="0.5"/>
                </svg>
              </span>
              ${D.layers.erp}
            </div>
          </div>
        </div>
      </div>

      <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>`;

  return base.wrapInDiviSection('Hero', html, 'Hero: Content');
}

// Reuse English CSS identically (same prefix, same structure)
function css() {
  return en.css();
}

module.exports = { blocks, css };
