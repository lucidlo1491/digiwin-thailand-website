/**
 * th-bm-pattern.js — Thai Pattern Cycle (S2) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level STEPS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./bm-pattern');
const th = require('../../i18n/th/partner-business-model');

const P = 'pat'; // CSS prefix — same as English

// Merge Thai text into each step (icons from English)
const STEPS = en.STEPS.map((step, i) => ({
  ...step,
  title: th.pattern.steps[i].title,
  body: th.pattern.steps[i].body,
}));

// Icons from English builder
const ICONS = { repeat: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>' };

function blocks() {
  const stepsHTML = STEPS.map(s => `
        <div class="${P}-step">
          <div class="${P}-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </div>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.pattern.title}</h2>
          <p class="${P}-subtitle">${th.pattern.subtitle}</p>
        </div>
        <div class="${P}-cycle">${stepsHTML}
        </div>
        <div class="${P}-repeat">
          <p>${th.pattern.repeatCallout} ${ICONS.repeat}</p>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Pattern: The Cycle Trap', html, 'Pattern: Content');
}

// Reuse English CSS
const { css } = require('./bm-pattern');

module.exports = { blocks, css, STEPS };
