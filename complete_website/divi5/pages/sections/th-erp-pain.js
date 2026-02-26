/**
 * th-erp-pain.js — Thai Pain Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-pain');
const thErp = require('../../i18n/th/erp');

const t = thErp.pain;

function blocks() {
  const cardsHTML = t.cards.map((card, i) => {
    // Reuse the same SVG icons from English (they are decorative)
    const svgs = [
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>',
    ];

    return `
                    <div class="pain-card">
                        <div class="pain-card-icon">
                            ${svgs[i]}
                        </div>
                        <div class="pain-card-problem">
                            <p class="pain-card-label problem">${card.problemLabel}</p>
                            <h3 class="pain-card-title">${card.problemTitle}</h3>
                            <p class="pain-card-desc">${card.problemDesc}</p>
                        </div>
                        <div class="pain-card-solution">
                            <p class="pain-card-label solution">${card.solutionLabel}</p>
                            <h4 class="pain-card-solution-title">${card.solutionTitle}</h4>
                            <p class="pain-card-desc">${card.solutionDesc}</p>
                        </div>
                    </div>`;
  }).join('\n');

  const html = `
    <div class="pain-section">
    <div class="pain-inner">
                <div class="pain-header">
                    <p class="pain-label">${t.label}</p>
                    <h2 class="pain-title">${t.title}</h2>
                    <p class="pain-subtitle">${t.subtitle}</p>
                </div>

                <div class="pain-grid">${cardsHTML}
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Pain (Thai)', html, 'Pain: Content');
}

module.exports = { blocks, css: () => en.css() };
