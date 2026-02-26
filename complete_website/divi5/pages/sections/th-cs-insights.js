/**
 * th-cs-insights.js — Thai Case Studies Insights Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./case-studies-cs-insights');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.insights;

function blocks() {
  const html = `
    <div class="cs-insights-section">
    <div class="cs-insights-inner">
                <div class="cs-insights-stats">
                    <div class="cs-animate">
                        <div class="cs-insight-stat-value">${t.stats[0].value}</div>
                        <div class="cs-insight-stat-label">${t.stats[0].label}</div>
                    </div>
                    <div class="cs-animate">
                        <div class="cs-insight-stat-value">${t.stats[1].value}</div>
                        <div class="cs-insight-stat-label">${t.stats[1].label}</div>
                    </div>
                    <div class="cs-animate">
                        <div class="cs-insight-stat-value">${t.stats[2].value}</div>
                        <div class="cs-insight-stat-label">${t.stats[2].label}</div>
                    </div>
                </div>
                <div class="cs-insights-quote cs-animate">
                    <p>${t.quote}</p>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('CS Insights (Thai)', html, 'CS Insights: Content');
}

module.exports = { blocks, css: () => en.css() };
