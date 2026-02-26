/**
 * th-partner-pain-operational.js — Thai Operational Pain (S3)
 *
 * DEEP-MERGE: buildSection() is not exported from partner-pain.js,
 * so we copy it and pass a merged Thai config.
 */

const base = require('../../lib/templates/_base');
const en = require('./partner-pain');
const th = require('../../i18n/th/partner-program');

const P = 'reality'; // Same CSS prefix as English

// Merge Thai text into English config (icons + structural fields stay English)
const OPERATIONAL_CONFIG = {
  ...en.OPERATIONAL_CONFIG,
  header: {
    title: th.painOperational.title,
    subtitle: th.painOperational.subtitle,
  },
  cards: en.OPERATIONAL_CONFIG.cards.map((c, i) => ({
    ...c,
    title: th.painOperational.cards[i].title,
    body: th.painOperational.cards[i].body,
  })),
  cta: {
    ...en.OPERATIONAL_CONFIG.cta,
    text: th.painOperational.cta.text,
  },
};

// Copy of buildSection from partner-pain.js (not exported)
function buildSection(config) {
  const { id, bg, sceneSVG, header, cards, cta } = config;

  const sceneId = `${P}-scene-${id}`;
  const svgInject = `<script>(function(){var c=document.querySelector('.${sceneId}');if(c){c.innerHTML='${sceneSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const cardsHTML = cards.map(card => `
        <div class="${P}-card">
          <div class="${P}-icon">${card.icon}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </div>`).join('');

  const ctaHTML = cta
    ? `<div class="${P}-cta-wrap"><a href="${cta.href}" class="${P}-cta-btn">${cta.text}</a></div>`
    : '';

  const waveFadeHTML = id === 'revenue'
    ? `<div class="${P}-wave-fade" aria-hidden="true"></div>`
    : '';

  const html = `
    <div class="${P}-section ${P}-section--${id}" style="background:${bg}">
      ${waveFadeHTML}
      <div class="${sceneId} ${P}-scene" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">${header.title}</h2>
          <p class="${P}-subtitle">${header.subtitle}</p>
        </div>
        <div class="${P}-grid">${cardsHTML}
        </div>
        ${ctaHTML}
      </div>
    </div>${svgInject}`;

  return base.wrapInDiviSection(config.adminLabel, html, `${config.adminLabel}: Content`);
}

function blocks() {
  return buildSection(OPERATIONAL_CONFIG);
}

// CSS already emitted by th-partner-pain-revenue
function css() {
  return '';
}

module.exports = { blocks, css, OPERATIONAL_CONFIG };
