/**
 * th-partner-hero.js — Thai Partner Program Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: partner-hero.js + i18n/th/partner-program.js hero
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./partner-hero');
const th = require('../../i18n/th/partner-program');

const P = 'pp-hero'; // Same CSS prefix as English

// Reuse English SVG generator
const { getHeroSVG } = (() => {
  // Reconstruct — getHeroSVG is not exported, inline it
  function getHeroSVG() {
    return `<svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`
      + '<defs><linearGradient id="pp-bar-fade" x1="0%" y1="0%" x2="100%" y2="0%">'
      + '<stop offset="0%" stop-color="#00AFF0" stop-opacity="0.15"/>'
      + '<stop offset="100%" stop-color="#00AFF0" stop-opacity="0"/>'
      + '</linearGradient></defs>'
      + '<g transform="translate(850,200)" opacity="0.12">'
      + '<rect x="0" y="280" width="280" height="40" rx="6" fill="#00AFF0"/>'
      + '<rect x="0" y="230" width="280" height="40" rx="6" fill="#00AFF0"/>'
      + '<rect x="0" y="180" width="280" height="40" rx="6" fill="#00AFF0"/>'
      + '<rect x="0" y="130" width="280" height="40" rx="6" fill="#00AFF0"/>'
      + '<rect x="0" y="80" width="280" height="40" rx="6" fill="#00AFF0"/>'
      + '<path d="M320 300 L320 60" stroke="#00AFF0" stroke-width="3" opacity="0.6"/>'
      + '<path d="M310 80 L320 55 L330 80" fill="none" stroke="#00AFF0" stroke-width="3" opacity="0.6"/>'
      + '</g>'
      + '<g opacity="0.04">'
      + '<line x1="0" y1="150" x2="1200" y2="150" stroke="#fff" stroke-width="1"/>'
      + '<line x1="0" y1="300" x2="1200" y2="300" stroke="#fff" stroke-width="1"/>'
      + '<line x1="0" y1="450" x2="1200" y2="450" stroke="#fff" stroke-width="1"/>'
      + '<line x1="0" y1="600" x2="1200" y2="600" stroke="#fff" stroke-width="1"/>'
      + '<line x1="300" y1="0" x2="300" y2="700" stroke="#fff" stroke-width="1"/>'
      + '<line x1="600" y1="0" x2="600" y2="700" stroke="#fff" stroke-width="1"/>'
      + '<line x1="900" y1="0" x2="900" y2="700" stroke="#fff" stroke-width="1"/>'
      + '</g>'
      + '<g opacity="0.08">'
      + '<circle cx="950" cy="150" r="8" fill="#00AFF0"/>'
      + '<circle cx="1050" cy="200" r="6" fill="#00AFF0"/>'
      + '<circle cx="1000" cy="350" r="10" fill="#00AFF0"/>'
      + '<circle cx="1100" cy="450" r="5" fill="#00AFF0"/>'
      + '<line x1="950" y1="150" x2="1050" y2="200" stroke="#00AFF0" stroke-width="1"/>'
      + '<line x1="1050" y1="200" x2="1000" y2="350" stroke="#00AFF0" stroke-width="1"/>'
      + '<line x1="1000" y1="350" x2="1100" y2="450" stroke="#00AFF0" stroke-width="1"/>'
      + '</g></svg>';
  }
  return { getHeroSVG };
})();

const D = th.hero;

function blocks() {
  const svgInjectScript = `<script>(function(){var c=document.querySelector('.${P}-bg');if(c){c.innerHTML='${getHeroSVG().replace(/'/g, "\\'")}';}})()</script>`;

  const statsHTML = D.stats.map(s => `
          <div class="${P}-stat">
            <div class="${P}-stat-value">${s.value}</div>
            <div class="${P}-stat-label">${s.label}</div>
          </div>`).join('');

  const html = `
    <div class="${P}-section">
      ${superD.html(`${P}-deco-left`)}
      ${superD.html(`${P}-deco-right`)}
      <div class="${P}-bg" aria-hidden="true"></div>
      <div class="${P}-grain" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>
          ${D.badge}
        </div>
        <h1 class="${P}-title">${D.title}</h1>
        <p class="${P}-subtitle">${D.subtitle}</p>
        <div class="${P}-ctas">
          <a href="${D.ctaPrimary.href}" class="${P}-btn ${P}-btn--primary">${D.ctaPrimary.text}</a>
          <a href="${D.ctaSecondary.href}" class="${P}-btn ${P}-btn--ghost">${D.ctaSecondary.text}</a>
        </div>
        <div class="${P}-stats">${statsHTML}
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection(D.adminLabel, html + svgInjectScript, `${D.adminLabel}: Content`);
}

// Reuse English CSS identically (same prefix, same structure)
function css() {
  return en.css();
}

module.exports = { blocks, css };
