/**
 * th-bm-compare.js — Thai Comparison Table (S7) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level ROWS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/partner-business-model');

const P = 'cmp'; // CSS prefix — same as English

// Thai rows
const ROWS = th.compare.rows;

function blocks() {
  const rowsHTML = ROWS.map(r => `
              <tr>
                <td>${r.metric}</td>
                <td class="bad" data-label="${th.compare.headers[1]}">${r.bad}</td>
                <td class="good" data-label="${th.compare.headers[2]}">${r.good}</td>
              </tr>`).join('');

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-d-bg" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.compare.title}</h2>
        </div>
        <table class="${P}-table">
          <caption class="sr-only">${th.compare.caption}</caption>
          <thead>
            <tr>
              <th scope="col">${th.compare.headers[0]}</th>
              <th scope="col">${th.compare.headers[1]}</th>
              <th scope="col">${th.compare.headers[2]}</th>
            </tr>
          </thead>
          <tbody>${rowsHTML}
          </tbody>
        </table>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Comparison: Side-by-Side', html, 'Comparison: Content');
}

// Reuse English CSS
const { css } = require('./bm-compare');

module.exports = { blocks, css, ROWS };
