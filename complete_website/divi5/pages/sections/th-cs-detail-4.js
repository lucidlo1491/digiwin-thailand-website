/**
 * th-cs-detail-4.js — Thai Case Studies Detail 4 (MUFU Technologies)
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 */

const en = require('./case-studies-cs-detail-4');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.detail4;

function blocks() {
  let html = en.blocks().join('\n');

  html = html.replace(/Cs Detail 4/g, 'CS Detail: MUFU Technologies (Thai)');

  html = html.replace('>Manufacturing<', `>${t.badge}<`);
  html = html.replace('>Manufacturing technology · Taiwan<', `>${t.companyDesc}<`);
  html = html.replace('>Full Automation<', `>${t.metricValue}<`);

  // Challenge
  html = html.replace('>The Challenge<', `>${t.challenge.h3}<`);
  html = html.replace('Manufacturing company with manual, disconnected processes across departments. Information silos meant no single view of operations. Each department had its own spreadsheets, its own version of the truth.', t.challenge.p);

  // Solution
  html = html.replace('>The Solution<', `>${t.solution.h3}<`);
  html = html.replace('Deployed DigiWin Workflow ERP to unify all departments — purchasing, production, inventory, and finance — into a single system. One source of truth, one workflow, one set of numbers.', t.solution.p);

  // Results
  html = html.replace('>Results<', `>${t.results.h3}<`);
  html = html.replace('Full automation of cross-department workflows', t.results.items[0]);
  html = html.replace('Eliminated manual data re-entry between departments', t.results.items[1]);
  html = html.replace('Single source of truth for all operational data', t.results.items[2]);

  return html;
}

module.exports = { blocks, css: () => en.css() };
