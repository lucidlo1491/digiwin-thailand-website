/**
 * th-cs-detail-3.js — Thai Case Studies Detail 3 (Thai Hosheng Packing)
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 */

const en = require('./case-studies-cs-detail-3');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.detail3;

function blocks() {
  let html = en.blocks().join('\n');

  html = html.replace(/Cs Detail 3/g, 'CS Detail: Thai Hosheng (Thai)');

  html = html.replace('>Packaging<', `>${t.badge}<`);
  html = html.replace('>Packaging manufacturer · Thailand<', `>${t.companyDesc}<`);
  html = html.replace('>Days to Close<', `>${t.metricDesc}<`);

  // Challenge
  html = html.replace('>The Challenge<', `>${t.challenge.h3}<`);
  html = html.replace('Packaging manufacturer with the worst closing time in our case study portfolio — 90 days. Combined with low stock accuracy and unreliable on-time delivery. The business was growing but operations couldn\'t keep up.', t.challenge.p);

  // Solution
  html = html.replace('>The Solution<', `>${t.solution.h3}<`);
  html = html.replace('Full DigiWin stack deployment: Workflow ERP for financials, WMS for warehouse accuracy, and SFT for shop floor tracking. Three systems working as one integrated operation.', t.solution.p);

  // Results
  html = html.replace('>Results<', `>${t.results.h3}<`);
  html = html.replace('aria-label="Thai Hosheng results"', `aria-label="${t.results.tableLabel}"`);
  html = html.replace('>Metric<', `>${t.results.headers[0]}<`);
  html = html.replace('>Before<', `>${t.results.headers[1]}<`);
  html = html.replace('>After<', `>${t.results.headers[2]}<`);
  html = html.replace('>Change<', `>${t.results.headers[3]}<`);
  html = html.replace('>Monthly closing<', `>${t.results.rows[0][0]}<`);
  // First Unknown
  html = html.replace('>90 days<', `>${t.results.rows[0][1]}<`);
  html = html.replace('>15 days<', `>${t.results.rows[0][2]}<`);
  html = html.replace('>83% faster<', `>${t.results.rows[0][3]}<`);
  html = html.replace('>Stock accuracy<', `>${t.results.rows[1][0]}<`);
  html = html.replace('>Unknown<', `>${t.results.rows[1][1]}<`);
  html = html.replace('>90%<', `>${t.results.rows[1][2]}<`);
  html = html.replace('>System-matched inventory<', `>${t.results.rows[1][3]}<`);
  html = html.replace('>On-time delivery<', `>${t.results.rows[2][0]}<`);
  html = html.replace('>Unknown<', `>${t.results.rows[2][1]}<`);
  html = html.replace('>80%<', `>${t.results.rows[2][2]}<`);
  html = html.replace('>Measurable OTD tracking<', `>${t.results.rows[2][3]}<`);

  // Why It Matters
  html = html.replace('>Why It Matters<', `>${t.whyItMatters.h3}<`);
  html = html.replace('Thai Hosheng is the most comprehensive deployment in our case study portfolio — ERP + WMS + SFT together. The 90-to-15-day closing improvement is the most dramatic transformation. They also referred Thai Alpha to DigiWin, proving satisfaction strong enough to stake their own reputation on.', t.whyItMatters.p);

  return html;
}

module.exports = { blocks, css: () => en.css() };
