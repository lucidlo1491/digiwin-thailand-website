/**
 * th-ps-hero.js — Thai Partner Solutions Hero (S1) — COPY
 *
 * Same layout/CSS as English ps-hero.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const th = require('../../i18n/th/partner-solutions');

const P = 'ps-hero'; // CSS prefix — same as English

function blocks() {
  const bc = th.hero.breadcrumb;
  const statsHTML = th.hero.stats.map(s => `
          <div class="${P}-stat">
            <div class="${P}-stat-value${s.dynamic ? ' dw-years' : ''}">${s.value}</div>
            <div class="${P}-stat-label">${s.label}</div>
          </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-dot-overlay" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-breadcrumb">
          <a href="${bc[0].href}">${bc[0].text}</a>
          <span>/</span>
          <span>${bc[1].text}</span>
        </div>
        <h1 class="${P}-title">${th.hero.titleLine1}<br><span class="${P}-hl">${th.hero.titleHighlight}</span></h1>
        <p class="${P}-subtitle">${th.hero.subtitle}</p>
        <div class="${P}-stats">${statsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection(th.hero.adminLabel, html, 'Hero: Content');
}

// Reuse English CSS
const { css } = require('./ps-hero');

module.exports = { blocks, css };
