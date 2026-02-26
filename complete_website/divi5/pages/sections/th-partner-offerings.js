/**
 * th-partner-offerings.js — Thai What You Get Section (S5)
 *
 * DEEP-MERGE: blocks()/css() are zero-arg and read module-level constants.
 * Must copy blocks() with Thai data substituted. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-offerings');
const th = require('../../i18n/th/partner-program');

const P = 'offer'; // Same CSS prefix as English

// Icons (not exported from English, must duplicate)
const ICON_TARGET = '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';
const ICON_DOLLAR = '<svg viewBox="0 0 24 24" stroke-width="2" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// Icons for offerings (same order as English)
const OFFERING_ICONS = [ICON_TARGET, ICON_DOLLAR];

// Merged data
const OFFERINGS = en.OFFERINGS.map((o, i) => ({
  ...o,
  icon: OFFERING_ICONS[i],
  title: th.offerings.offerings[i].title,
  body: th.offerings.offerings[i].body,
  link: { ...o.link, text: th.offerings.offerings[i].linkText },
}));

const BENEFITS = th.offerings.benefits;

function blocks() {
  const offeringCardsHTML = OFFERINGS.map(o => `
        <a href="${o.link.href}" class="${P}-card">
          <div class="${P}-card-icon">${o.icon}</div>
          <div class="${P}-card-content">
            <h3>${o.title}</h3>
            <p>${o.body}</p>
            <span class="${P}-card-link">${o.link.text} ${ICON_ARROW}</span>
          </div>
        </a>`).join('');

  const benefitsHTML = BENEFITS.map(b =>
    `<div class="${P}-check-item">${ICON_CHECK}<span>${b}</span></div>`
  ).join('');

  const yearScript = `<script>(function(){var y=new Date().getFullYear()-1982;document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y});})()</script>`;

  const html = `
    <div class="${P}-section">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.offerings.title}</h2>
          <p class="${P}-subtitle">${th.offerings.subtitle}</p>
        </div>

        <div class="${P}-cards">${offeringCardsHTML}
        </div>

        <div class="${P}-box">
          <div class="${P}-box-inner">
            <h3 class="${P}-box-title">${th.offerings.boxTitle}</h3>
            <div class="${P}-checks">${benefitsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>${yearScript}`;

  return base.wrapInDiviSection('What You Get: Partner Offerings', html, 'Partner Offerings: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css, OFFERINGS, BENEFITS };
