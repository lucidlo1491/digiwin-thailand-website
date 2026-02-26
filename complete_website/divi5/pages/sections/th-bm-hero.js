/**
 * th-bm-hero.js — Thai Business Model Hero (S1) — COPY
 *
 * Same layout/CSS as English bm-hero.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const th = require('../../i18n/th/partner-business-model');

const P = 'bm-hero'; // CSS prefix — same as English

function blocks() {
  const bc = th.hero.breadcrumb;
  const html = `
    <div class="${P}-section">
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-dot-overlay" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-breadcrumb">
          <a href="${bc[0].href}">${bc[0].text}</a>
          <span>/</span>
          <span>${bc[1].text}</span>
        </div>
        <h1 class="${P}-title">${th.hero.title}</h1>
        <p class="${P}-subtitle">${th.hero.subtitle}</p>
      </div>
    </div>`;

  return base.wrapInDiviSection(th.hero.adminLabel, html, 'Hero: Content');
}

// Reuse English CSS — identical layout
const { css } = require('./bm-hero');

module.exports = { blocks, css };
