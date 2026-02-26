/**
 * th-econ-revenue.js — Thai Revenue Model (S2) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level STREAMS.
 * Must copy blocks() with Thai data. CSS reused from English.
 * getGrowthSVG is decorative — no translation needed, imported from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./econ-revenue');
const th = require('../../i18n/th/partner-economics');

const P = 'rev'; // CSS prefix — same as English

// Merge Thai text into each stream (icons from English)
const STREAMS = en.STREAMS.map((stream, i) => ({
  ...stream,
  title: th.revenue.streams[i].title,
  tag: th.revenue.streams[i].tag,
  desc: th.revenue.streams[i].desc,
  margins: th.revenue.streams[i].margins,
  note: th.revenue.streams[i].note || null,
}));

function blocks() {
  const sceneId = `${P}-scene`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${en.getGrowthSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const cardsHTML = STREAMS.map(s => {
    const marginsHTML = s.margins.map(m =>
      `<div class="${P}-margin-item">
                    <span class="${P}-margin-level">${m.level}</span>
                    <span class="${P}-margin-value${m.highlight ? ' highlight' : ''}">${m.value}</span>
                  </div>`
    ).join('');

    const noteHTML = s.note
      ? `<p class="${P}-stream-note"><em>${s.note}</em></p>`
      : '';

    return `
            <div class="${P}-stream">
              <div class="${P}-stream-header">
                <div class="${P}-stream-icon">${s.icon}</div>
                <h3>${s.title}</h3>
                <span class="${P}-stream-tag">${s.tag}</span>
              </div>
              <div class="${P}-stream-body">
                <p class="${P}-stream-desc">${s.desc}</p>
                <div class="${P}-margin-grid">${marginsHTML}
                </div>
                ${noteHTML}
              </div>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${sceneId} ${P}-scene-wrap" aria-hidden="true"></div>
      <div class="${P}-wave-top" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.revenue.label}</span>
          <h2 class="${P}-title">${th.revenue.title}</h2>
          <p class="${P}-subtitle">${th.revenue.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection('Revenue: 4 Streams', html, 'Revenue: Content');
}

// Reuse English CSS
const { css } = require('./econ-revenue');

module.exports = { blocks, css, getGrowthSVG: en.getGrowthSVG, STREAMS };
