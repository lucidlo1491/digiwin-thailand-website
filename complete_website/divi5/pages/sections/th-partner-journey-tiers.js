/**
 * th-partner-journey-tiers.js — Thai How You Grow With Us (S7)
 *
 * DEEP-MERGE: buildSection() is not exported from partner-journey.js,
 * so we copy it and pass a merged Thai config.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-journey');
const th = require('../../i18n/th/partner-program');

const P = 'journey'; // Same CSS prefix as English

// Merge Thai text into English config (gradients + structural fields stay English)
const TIER_CONFIG = {
  ...en.TIER_CONFIG,
  header: {
    title: th.journeyTiers.title,
    subtitle: th.journeyTiers.subtitle,
  },
  steps: en.TIER_STEPS.map((s, i) => ({
    ...s,
    title: th.journeyTiers.steps[i].title,
    body: th.journeyTiers.steps[i].body,
  })),
};

// Copy of buildSection from partner-journey.js (not exported)
function buildSection(config) {
  const { id, adminLabel, bg, header, steps, showLine } = config;

  const stepsHTML = steps.map(step => {
    const ctaHTML = step.cta
      ? `<a href="${step.cta.href}" class="${P}-step-cta">${step.cta.text}</a>`
      : '';
    return `
        <div class="${P}-step">
          <div class="${P}-number" style="background:${step.gradient}"><span>${step.number}</span></div>
          <h3>${step.title}</h3>
          <p>${step.body}</p>
          ${ctaHTML}
        </div>`;
  }).join('');

  const lineClass = showLine ? ` ${P}-steps--line` : '';

  const html = `
    <div class="${P}-section ${P}-section--${id}" style="background:${bg}">
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${header.title}</h2>
          <p class="${P}-subtitle">${header.subtitle}</p>
        </div>
        <div class="${P}-steps${lineClass}">${stepsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection(adminLabel, html, `${adminLabel}: Content`);
}

function blocks() {
  return buildSection(TIER_CONFIG);
}

// CSS already emitted by th-partner-journey-research
function css() {
  return '';
}

module.exports = { blocks, css, TIER_CONFIG };
