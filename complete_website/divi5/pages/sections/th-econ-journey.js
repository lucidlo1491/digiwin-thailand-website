/**
 * th-econ-journey.js — Thai 3-Year Journey (S3) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level PHASES.
 * Complex nested structure. Must copy blocks() with Thai data.
 * CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./econ-journey');
const { getGrowthSVG } = require('./econ-revenue');
const th = require('../../i18n/th/partner-economics');

const P = 'jny'; // CSS prefix — same as English

// Merge Thai text into each phase (visual props from English)
const PHASES = en.PHASES.map((phase, i) => ({
  ...phase,
  badge: th.journey.phases[i].badge,
  title: th.journey.phases[i].title,
  status: th.journey.phases[i].status,
  featured: th.journey.phases[i].featured || false,
  reality: th.journey.phases[i].reality,
  activity: th.journey.phases[i].activity,
  math: th.journey.phases[i].math,
  total: th.journey.phases[i].total,
  outcome: th.journey.phases[i].outcome,
}));

function blocks() {
  const sceneId = `${P}-scene`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${getGrowthSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const phasesHTML = PHASES.map(p => {
    const mathRowsHTML = p.math.map(m =>
      `<div class="${P}-math-row">
                      <span>${m.label}</span>
                      <span class="${P}-math-value${m.cls ? ' ' + m.cls : ''}${m.highlight ? ' highlight' : ''}">${m.value}</span>
                    </div>`
    ).join('');

    return `
            <div class="${P}-phase${p.featured ? ' featured' : ''}">
              <div class="${P}-phase-header ${p.headerClass}">
                <div class="${P}-badge">${p.badge}</div>
                <h3>${p.title}</h3>
                <span class="${P}-status">${p.status}</span>
              </div>
              <div class="${P}-phase-body">
                <p class="${P}-reality">${p.reality}</p>
                <div class="${P}-activity">
                  <span class="${P}-activity-label">${p.activity.label}</span>
                  <span class="${P}-activity-value">${p.activity.value}</span>
                </div>
                <div class="${P}-math">${mathRowsHTML}
                  <div class="${P}-math-total">
                    <span>${p.total.label}</span>
                    <span class="${P}-math-total-value">${p.total.value}</span>
                  </div>
                </div>
                <p class="${P}-outcome">${p.outcome}</p>
              </div>
            </div>`;
  }).join('');

  const barsHTML = th.journey.bars.map((bar, i) => {
    const barClass = `${P}-bar--y${i + 1}`;
    return `
            <div class="${P}-bar ${barClass}${bar.featured ? ' featured' : ''}">
              <span class="${P}-bar-value">${bar.label}</span>
              <span class="${P}-bar-label">${bar.sublabel}</span>
            </div>`;
  }).join('');

  const html = `
    <div class="${P}-section">
      <div class="${sceneId} ${P}-scene-wrap" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.journey.label}</span>
          <h2 class="${P}-title">${th.journey.title}</h2>
          <p class="${P}-subtitle">${th.journey.subtitle}</p>
        </div>
        <div class="${P}-grid">${phasesHTML}
        </div>
        <div class="${P}-summary">
          <h4 class="${P}-summary-title">${th.journey.summaryTitle}</h4>
          <div class="${P}-bars">${barsHTML}
          </div>
        </div>
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection('Journey: 3-Year Projection', html, 'Journey: Content');
}

// Reuse English CSS
const { css } = require('./econ-journey');

module.exports = { blocks, css, PHASES };
