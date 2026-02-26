/**
 * th-cs-detail-2.js — Thai Case Studies Detail 2 (Thai Alpha Polymer)
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 */

const en = require('./case-studies-cs-detail-2');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.detail2;

function blocks() {
  let html = en.blocks().join('\n');

  html = html.replace(/Cs Detail 2/g, 'CS Detail: Thai Alpha Polymer (Thai)');

  html = html.replace('>Plastics Manufacturing<', `>${t.badge}<`);
  html = html.replace('>PET plastic roll manufacturer · Thailand<', `>${t.companyDesc}<`);
  html = html.replace('>Days to Close<', `>${t.metricDesc}<`);

  // Challenge
  html = html.replace('>The Challenge<', `>${t.challenge.h3}<`);
  html = html.replace('PET plastic roll manufacturer with inventory accuracy problems and painfully slow month-end closing. Physical counts never matched system records. Finance team spent weeks reconciling.', t.challenge.p);

  // Solution
  html = html.replace('>The Solution<', `>${t.solution.h3}<`);
  html = html.replace('Deployed DigiWin Workflow ERP for financial management and WMS (sFLS) for barcode-driven warehouse operations. Every material movement now captured at source via scanning.', t.solution.p);

  // Results
  html = html.replace('>Results<', `>${t.results.h3}<`);
  html = html.replace('aria-label="Thai Alpha Polymer results"', `aria-label="${t.results.tableLabel}"`);
  html = html.replace('>Metric<', `>${t.results.headers[0]}<`);
  html = html.replace('>Before<', `>${t.results.headers[1]}<`);
  html = html.replace('>After<', `>${t.results.headers[2]}<`);
  html = html.replace('>Change<', `>${t.results.headers[3]}<`);
  html = html.replace('>Stock accuracy<', `>${t.results.rows[0][0]}<`);
  html = html.replace('>Unknown<', `>${t.results.rows[0][1]}<`);
  html = html.replace('>95%<', `>${t.results.rows[0][2]}<`);
  html = html.replace('>Barcode-driven accuracy<', `>${t.results.rows[0][3]}<`);
  html = html.replace('>Monthly closing<', `>${t.results.rows[1][0]}<`);
  html = html.replace('>60 days<', `>${t.results.rows[1][1]}<`);
  html = html.replace('>15 days<', `>${t.results.rows[1][2]}<`);
  html = html.replace('>75% faster<', `>${t.results.rows[1][3]}<`);

  // Quotes
  html = html.replace('>From the Team<', '>จากทีมงาน<');
  html = html.replace('"The closing process used to take our entire team two months. Now we\'re done in two weeks."', t.quotes[0].text.replace(/\u201C|\u201D/g, ''));
  html = html.replace('— Khun Noo, Accounting Department', t.quotes[0].cite);
  html = html.replace('"Every scan updates the system instantly. We finally trust our inventory numbers."', t.quotes[1].text.replace(/\u201C|\u201D/g, ''));
  html = html.replace('— Khun Ae, Warehouse', t.quotes[1].cite);

  // Callout
  html = html.replace('>Recommended by a Fellow Manufacturer<', `>${t.callout.title}<`);
  html = html.replace('Thai Alpha chose DigiWin based on a recommendation from Thai Hosheng — a fellow manufacturer already running on our system. The strongest form of social proof is when a customer stakes their own reputation on your work.', t.callout.p);

  return html;
}

module.exports = { blocks, css: () => en.css() };
