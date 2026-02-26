/**
 * th-partner-alternative.js — Thai "You Keep the Meat" Alternative Model (S4)
 *
 * DEEP-MERGE: blocks()/css() are zero-arg and read module-level constants.
 * Must copy blocks() with Thai data substituted. CSS reused from English.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-alternative');
const th = require('../../i18n/th/partner-program');

const P = 'alt'; // Same CSS prefix as English

// ── Icons (reuse from English via inline — not exported individually) ──
const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// ── Merged data ──
const OLD_MODEL = {
  ...en.OLD_MODEL,
  label: th.alternative.oldModel.label,
  title: th.alternative.oldModel.title,
  items: th.alternative.oldModel.items,
};

const NEW_MODEL = {
  ...en.NEW_MODEL,
  label: th.alternative.newModel.label,
  title: th.alternative.newModel.title,
  items: th.alternative.newModel.items,
};

const BENEFITS = en.BENEFITS.map((b, i) => ({
  ...b,
  title: th.alternative.benefits[i].title,
  body: th.alternative.benefits[i].body,
}));

function blocks() {
  const oldItems = OLD_MODEL.items.map(item =>
    `<li>${ICON_X} ${item}</li>`
  ).join('');

  const newItems = NEW_MODEL.items.map(item =>
    `<li>${ICON_CHECK} ${item}</li>`
  ).join('');

  const benefitsHTML = BENEFITS.map(b => `
        <div class="${P}-benefit">
          <div class="${P}-benefit-icon">${b.icon}</div>
          <h3>${b.title}</h3>
          <p>${b.body}</p>
        </div>`).join('');

  const arrowSVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  const html = `
    <div class="${P}-section" data-particles>
      <div class="${P}-wave" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${th.alternative.title}</h2>
          <p class="${P}-subtitle">${th.alternative.subtitle}</p>
        </div>

        <div class="${P}-comparison">
          <div class="${P}-model ${P}-model-old">
            <span class="${P}-model-label ${P}-model-label--old">${OLD_MODEL.label}</span>
            <h3>${OLD_MODEL.title}</h3>
            <ul class="${P}-model-list">${oldItems}</ul>
          </div>
          <div class="${P}-arrow">${arrowSVG}</div>
          <div class="${P}-model ${P}-model-new">
            <span class="${P}-model-label ${P}-model-label--new">${NEW_MODEL.label}</span>
            <h3>${NEW_MODEL.title}</h3>
            <ul class="${P}-model-list">${newItems}</ul>
          </div>
        </div>

        <div class="${P}-benefits">${benefitsHTML}
        </div>

        <div class="${P}-cta-wrap">
          <a href="/contact/" class="${P}-cta-btn">${th.alternative.ctaButton}</a>
          <p class="${P}-cta-note">${th.alternative.ctaNote}</p>
        </div>
      </div>
    </div>
    ${base.particleOceanScript()}`;

  return base.wrapInDiviSection('Alternative Model: Partner-First', html, 'Alternative Model: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css, OLD_MODEL, NEW_MODEL, BENEFITS };
