/**
 * th-partner-journey-research.js — Thai Continue Your Research (S6)
 *
 * DEEP-MERGE: buildSection() is not exported from partner-journey.js,
 * so we copy it and pass a merged Thai config.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-journey');
const th = require('../../i18n/th/partner-program');

const P = 'journey'; // Same CSS prefix as English

// Merge Thai text into English config (gradients + structural fields stay English)
const RESEARCH_CONFIG = {
  ...en.RESEARCH_CONFIG,
  header: {
    title: th.journeyResearch.title,
    subtitle: th.journeyResearch.subtitle,
  },
  steps: en.RESEARCH_STEPS.map((s, i) => ({
    ...s,
    title: th.journeyResearch.steps[i].title,
    body: th.journeyResearch.steps[i].body,
    cta: s.cta ? { ...s.cta, text: th.journeyResearch.steps[i].ctaText } : undefined,
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
  return buildSection(RESEARCH_CONFIG);
}

// CSS emitted once — reuse English shared CSS
function css() {
  return en.journeyResearch.css();
}

module.exports = { blocks, css, RESEARCH_CONFIG };
