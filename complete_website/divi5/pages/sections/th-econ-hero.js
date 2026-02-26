/**
 * th-econ-hero.js — Thai Partner Economics Hero (S1) — COPY
 *
 * Same layout/CSS as English econ-hero.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const th = require('../../i18n/th/partner-economics');

const P = 'econ-hero'; // CSS prefix — same as English

function blocks() {
  const bc = th.hero.breadcrumb;
  const statsHTML = th.hero.stats.map(s => `
          <div class="${P}-proof-item">
            <span class="${P}-proof-value">${s.value}</span>
            <span class="${P}-proof-label">${s.label}</span>
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
        <h1 class="${P}-title">${th.hero.titleMain}<span class="${P}-hl">${th.hero.titleHighlight}</span></h1>
        <p class="${P}-subtitle">${th.hero.subtitle}</p>
        <div class="${P}-proof">${statsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection(th.hero.adminLabel, html, 'Hero: Content');
}

// Reuse English CSS
const { css } = require('./econ-hero');

module.exports = { blocks, css };
