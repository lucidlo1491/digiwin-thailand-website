/**
 * th-cs-detail-5.js — Thai Case Studies Detail 5 (Taiyo Fastener Thailand)
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 */

const en = require('./case-studies-cs-detail-5');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.detail5;

function blocks() {
  let html = en.blocks().join('\n');

  html = html.replace(/Cs Detail 5/g, 'CS Detail: Taiyo Fastener (Thai)');

  html = html.replace('>Fasteners<', `>${t.badge}<`);
  html = html.replace('>Japanese-standard fastener manufacturer · Bangpoo Industrial Estate, Samut Prakan<', `>${t.companyDesc}<`);
  html = html.replace('>Subsidiary of Taiyoseiko Corporation, Japan<', `>${t.companySubDesc}<`);
  html = html.replace('>Systems Unified<', `>${t.metricValue}<`);

  // Challenge
  html = html.replace('>The Challenge<', `>${t.challenge.h3}<`);
  html = html.replace('Japanese fastener manufacturer operating in Thailand with multiple disconnected systems. Material tracking errors caused production delays and customer delivery issues.', t.challenge.p);

  // Solution
  html = html.replace('>The Solution<', `>${t.solution.h3}<`);
  html = html.replace('Deployed DigiWin ERP and WMS to replace fragmented systems with a single unified platform. Barcode-driven warehouse operations eliminated manual material tracking.', t.solution.p);

  // Results
  html = html.replace('>Results<', `>${t.results.h3}<`);
  html = html.replace('Unified multiple legacy systems into one platform', t.results.items[0]);
  html = html.replace('Reduced material tracking errors', t.results.items[1]);
  html = html.replace('Single source of truth for all operational data', t.results.items[2]);

  // Callout
  html = html.replace('>Japanese Quality Standards, Thai Operations<', `>${t.callout.title}<`);
  html = html.replace('When a Japanese manufacturer with the world\'s strictest quality standards chose DigiWin for their Thailand operation, it wasn\'t because we were the cheapest option. Taiyo Fastener (a subsidiary of Japan\'s Taiyoseiko Corporation) needed a system that could meet Japanese-grade traceability and accuracy requirements — in a Thai manufacturing environment.', t.callout.p);

  return html;
}

module.exports = { blocks, css: () => en.css() };
