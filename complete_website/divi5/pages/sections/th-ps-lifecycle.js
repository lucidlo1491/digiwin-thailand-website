/**
 * th-ps-lifecycle.js — Thai Lifecycle Section (S3) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level PHASES.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./ps-lifecycle');
const th = require('../../i18n/th/partner-solutions');

const P = 'ps-lc'; // CSS prefix — same as English

const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

// Merge Thai text into each phase (visual props from English)
const PHASES = en.PHASES.map((phase, i) => ({
  ...phase,
  title: th.lifecycle.phases[i].title,
  products: th.lifecycle.phases[i].products,
  desc: th.lifecycle.phases[i].desc,
  revenue: th.lifecycle.phases[i].revenue,
}));

function blocks() {
  const phasesHTML = PHASES.map((ph, i) => {
    const arrow = i < PHASES.length - 1
      ? `<div class="${P}-arrow">${ARROW_SVG}</div>`
      : '';
    return `
                <div class="${P}-phase ${P}-${ph.cls}">
                  <div class="${P}-num" style="background:${ph.color}">${ph.num}</div>
                  <h3>${ph.title}</h3>
                  <div class="${P}-products">${ph.products}</div>
                  <p>${ph.desc}</p>
                  <div class="${P}-revenue">${ph.revenue}</div>
                </div>${arrow}`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-wave" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.lifecycle.label}</span>
          <h2 class="${P}-title">${th.lifecycle.title}</h2>
          <p class="${P}-subtitle">${th.lifecycle.subtitle}</p>
        </div>
        <div class="${P}-phases">${phasesHTML}
        </div>
        <div class="${P}-proof">
          <p><strong>${th.lifecycle.proofBar}</strong></p>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Lifecycle: Land & Expand', html, 'Lifecycle: Content');
}

// Reuse English CSS
const { css } = require('./ps-lifecycle');

module.exports = { blocks, css, PHASES };
