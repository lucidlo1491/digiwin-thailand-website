/**
 * th-bm-futures.js — Thai Three Futures (S5) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level PATHS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./bm-futures');
const th = require('../../i18n/th/partner-business-model');

const P = 'futures'; // CSS prefix — same as English

// Merge Thai text into each path (visual props from English)
const PATHS = en.PATHS.map((path, i) => ({
  ...path,
  title: th.futures.paths[i].title,
  subtitle: th.futures.paths[i].subtitle,
  body: th.futures.paths[i].body,
}));

function blocks() {
  const pathsHTML = PATHS.map(p => `
        <div class="${P}-path ${P}-path--${p.id}" style="background:${p.bgGradient};border-color:${p.border}">
          <div class="${P}-path-top">
            <div class="${P}-path-icon" style="background:${p.iconGradient}">${p.icon}</div>
            <div>
              <h3 style="color:${p.titleColor}">${p.title}</h3>
              <p class="${P}-path-subtitle" style="color:${p.subtitleColor}">${p.subtitle}</p>
            </div>
          </div>
          <p class="${P}-path-body" style="color:${p.bodyColor}">${p.body}</p>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-wave-vertical" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.futures.title}</h2>
          <p class="${P}-subtitle">${th.futures.subtitle}</p>
        </div>
        <div class="${P}-paths">${pathsHTML}
        </div>
        <div class="${P}-insight">
          <div class="${P}-insight-inner">
            <p class="${P}-insight-quote">${th.futures.insightQuote}</p>
            <p class="${P}-insight-subtext">${th.futures.insightSubtext}</p>
          </div>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Futures: Three Paths', html, 'Futures: Content');
}

// Reuse English CSS
const { css } = require('./bm-futures');

module.exports = { blocks, css, PATHS };
