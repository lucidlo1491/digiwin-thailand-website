/**
 * th-ps-reverse-cut.js — Thai Reverse Cut Strategy (S4) — DEEP-MERGE
 *
 * blocks()/css() are zero-arg reading module-level PHASES + TABLE_ROWS.
 * Must copy blocks() with Thai data. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/partner-solutions');

const P = 'ps-rc'; // CSS prefix — same as English

const PHASES = th.reverseCut.phases;
const TABLE_ROWS = th.reverseCut.tableRows;

function blocks() {
  const phasesHTML = PHASES.map(ph => `
            <div class="${P}-phase">
              <div class="${P}-phase-hd">
                <span class="${P}-tag">${ph.tag}</span>
                <h3>${ph.title}</h3>
              </div>
              <p>${ph.desc}</p>
              <div class="${P}-exp">
                <span class="${P}-exp-label">Client Experience:</span>
                <span class="${P}-exp-quote">${ph.expQuote}</span>
              </div>
            </div>`).join('');

  const theadHTML = `<thead><tr><th scope="col">${th.reverseCut.tableHeaders[0]}</th><th scope="col">${th.reverseCut.tableHeaders[1]}</th><th scope="col">${th.reverseCut.tableHeaders[2]}</th></tr></thead>`;
  const tbodyHTML = TABLE_ROWS.map(r => `
              <tr>
                <td>${r.metric}</td>
                <td class="${P}-old" data-label="${th.reverseCut.tableHeaders[1]}">${r.old}</td>
                <td class="${P}-new" data-label="${th.reverseCut.tableHeaders[2]}">${r.new}</td>
              </tr>`).join('');

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <span class="${P}-label">${th.reverseCut.label}</span>
          <h2 class="${P}-title">${th.reverseCut.title}</h2>
          <p class="${P}-subtitle">${th.reverseCut.subtitle}</p>
        </div>
        <div class="${P}-grid">${phasesHTML}
        </div>
        <div class="${P}-comparison">
          <h4>${th.reverseCut.comparisonTitle}</h4>
          <table class="${P}-table">
            <caption class="sr-only">${th.reverseCut.tableCaption}</caption>
            ${theadHTML}
            <tbody>${tbodyHTML}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Reverse Cut Strategy', html, 'Reverse Cut: Content');
}

// Reuse English CSS
const { css } = require('./ps-reverse-cut');

module.exports = { blocks, css, PHASES, TABLE_ROWS };
