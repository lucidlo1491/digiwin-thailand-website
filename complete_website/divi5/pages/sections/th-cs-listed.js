/**
 * th-cs-listed.js — Thai Case Studies Listed Section
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 */

const en = require('./case-studies-cs-listed');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.listed;
const c = t.cards;
const pl = t.placeholders;

function blocks() {
  let html = en.blocks().join('\n');

  html = html.replace(/Cs Listed/g, 'CS Listed (Thai)');

  // Section header
  html = html.replace('>Growing Every Quarter<', `>${t.h2}<`);
  html = html.replace('Our Thailand case study library continues to expand. Contact us for references in your specific industry.', t.subtitle);

  // Listed cards — company names stay English, industry descriptions translated
  html = html.replace('>Manufacturing · Thailand<', `>${c[0].industry}<`);
  html = html.replace('>Ask Us About This Case →<', `>${c[0].link}<`);
  html = html.replace('>Packaging · Workflow ERP<', `>${c[1].industry}<`);
  // Second occurrence of link text
  html = html.replace('>Ask Us About This Case →<', `>${c[1].link}<`);
  html = html.replace('>Ceiling fans · Thailand<', `>${c[2].industry}<`);
  html = html.replace('>Ask Us About This Case →<', `>${c[2].link}<`);
  html = html.replace('>Electronics · Thailand · 和慶電子<', `>${c[3].industry}<`);
  html = html.replace('>Ask Us About This Case →<', `>${c[3].link}<`);
  html = html.replace('>Rubber machinery · Thailand · 上昇<', `>${c[4].industry}<`);
  html = html.replace('>Ask Us About This Case →<', `>${c[4].link}<`);
  html = html.replace('>Pneumatic tools · Taiwan · TWSE: 1570<', `>${c[5].industry}<`);
  html = html.replace('>Ask Us About This Case →<', `>${c[5].link}<`);

  // Placeholder section
  html = html.replace('>Looking for Your Industry?<', `>${pl.h3}<`);
  html = html.replace('>Looking for automotive references? We have them.<', `>${pl.items[0].text}<`);
  html = html.replace('>Contact for References →<', `>${pl.items[0].cta}<`);
  html = html.replace('>Electronics manufacturers — ask about our Thai implementations.<', `>${pl.items[1].text}<`);
  html = html.replace('>Contact for References →<', `>${pl.items[1].cta}<`);
  html = html.replace('>Food-grade compliance? We\'ve done it.<', `>${pl.items[2].text}<`);
  html = html.replace('>Contact for References →<', `>${pl.items[2].cta}<`);
  html = html.replace('>Textile manufacturers — ask about production tracking results.<', `>${pl.items[3].text}<`);
  html = html.replace('>Contact for References →<', `>${pl.items[3].cta}<`);

  return html;
}

module.exports = { blocks, css: () => en.css() };
