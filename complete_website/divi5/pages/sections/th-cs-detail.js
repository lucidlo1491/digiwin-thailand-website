/**
 * th-cs-detail.js — Thai Case Studies Detail 1 (Ginfong)
 *
 * Reuses English CSS and logo images. Replaces all English text with Thai content.
 * NOTE: This section uses the full English blocks() output and replaces text inline
 * because the base64 logos are too large to duplicate. We import English CSS only.
 */

const base = require('../../lib/templates/_base');
const en = require('./case-studies-cs-detail');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.detail1;

function blocks() {
  // Get English blocks array, join to string for text replacement
  let html = en.blocks().join('\n');

  // Replace admin labels in Divi wrappers
  html = html.replace(/Cs Detail/g, 'CS Detail: Ginfong (Thai)');

  // Replace text content
  html = html.replace('>Metal Stamping<', `>${t.badge}<`);
  html = html.replace('>Metal stamping manufacturer · Thailand<', `>${t.companyDesc}<`);
  html = html.replace('>Revenue Growth<', `>${t.metricDesc}<`);

  // Challenge section
  html = html.replace('>The Challenge<', `>${t.challenge.h3}<`);
  html = html.replace('Metal stamping manufacturer struggling with cost visibility and production tracking. Manual processes couldn\'t keep pace with growing order volumes. No real-time view of actual production costs vs. quoted costs.', t.challenge.p);

  // Solution section
  html = html.replace('>The Solution<', `>${t.solution.h3}<`);
  html = html.replace('Deployed DigiWin ERP for financial control and cost tracking, plus SFT (Shop Floor Tracking) for real-time production data collection. The combination gave management live visibility into actual costs at each production stage.', t.solution.p);

  // Results section
  html = html.replace('>Results<', `>${t.results.h3}<`);
  html = html.replace('aria-label="Ginfong results"', `aria-label="${t.results.tableLabel}"`);
  html = html.replace('>Metric<', `>${t.results.headers[0]}<`);
  html = html.replace('>Before<', `>${t.results.headers[1]}<`);
  html = html.replace('>After<', `>${t.results.headers[2]}<`);
  html = html.replace('>Change<', `>${t.results.headers[3]}<`);
  html = html.replace('>Gross profit margin<', `>${t.results.rows[0][0]}<`);
  html = html.replace('>+11 percentage points<', `>${t.results.rows[0][3]}<`);
  html = html.replace('>Revenue<', `>${t.results.rows[1][0]}<`);
  html = html.replace('>Baseline<', `>${t.results.rows[1][1]}<`);
  html = html.replace('>Grew through COVID<', `>${t.results.rows[1][3]}<`);

  // Why It Matters
  html = html.replace('>Why It Matters<', `>${t.whyItMatters.h3}<`);
  html = html.replace('Ginfong didn\'t just survive COVID — they grew revenue by 200% while competitors contracted. The gross profit improvement from 23% to 34% proves DigiWin\'s cost visibility directly translates to better pricing decisions and waste reduction.', t.whyItMatters.p);

  // Video link
  html = html.replace('>Watch Ginfong\'s Story on YouTube<', `>${t.video.text}<`);
  html = html.replace('>Opens in new tab<', `>${t.video.subtext}<`);

  // Callout
  html = html.replace('>What Ginfong Looked For in an ERP Partner<', `>${t.callout.title}<`);
  html = html.replace('Ginfong evaluated vendors on 7 criteria — does your checklist look similar?', t.callout.p);
  html = html.replace('>After-sales service quality<', `>${t.callout.criteria[0]}<`);
  html = html.replace('>Thai tax compliance<', `>${t.callout.criteria[1]}<`);
  html = html.replace('>Market share and reputation<', `>${t.callout.criteria[2]}<`);
  html = html.replace('>Industry-specific experience<', `>${t.callout.criteria[3]}<`);
  html = html.replace('>Brand longevity<', `>${t.callout.criteria[4]}<`);
  html = html.replace('>Price-to-value ratio<', `>${t.callout.criteria[5]}<`);
  html = html.replace('>Multilingual support<', `>${t.callout.criteria[6]}<`);

  return html;
}

module.exports = { blocks, css: () => en.css() };
