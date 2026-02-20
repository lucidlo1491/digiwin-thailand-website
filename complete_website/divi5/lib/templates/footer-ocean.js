/**
 * footer-ocean.js — Dark navy footer with ocean gradient overlay
 *
 * Used by: global footer (post 100438) and any page-level footer section.
 * Design: #000864 background, CSS radial-gradient ocean overlay (no PNG),
 * 4-column grid (brand + 3 nav columns), social icons, legal bar.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,          // e.g. 'footer'
 *   logo: {
 *     src: string,                  // URL or data URI for logo image
 *     alt: string,
 *     width: number,
 *     height: number,
 *   },
 *   tagline: string,                // e.g. "44 years of manufacturing..."
 *   stockInfo: {
 *     label: string,                // e.g. "Shenzhen Stock Exchange"
 *     code: string,                 // e.g. "300378"
 *   },
 *   columns: [{
 *     heading: string,
 *     links: [{ text: string, href: string }],
 *     marginTop?: string,           // optional extra top margin (e.g. '24px') for stacked headings
 *   }],
 *   contact: {
 *     heading: string,
 *     company: string,
 *     address: string[],            // array of address lines (joined with <br>)
 *     email: string,
 *   },
 *   social: [{
 *     label: string,                // e.g. 'LinkedIn'
 *     icon: string,                 // display character, e.g. 'in', 'f', 'L'
 *     href: string,
 *   }],
 *   legal: {
 *     copyright: string,            // e.g. "© 2026 DigiWin Thailand. All rights reserved."
 *     links: [{ text: string, href: string }],
 *   },
 * }
 *
 * CSS decisions (source: styles.css lines 1558-1737 + D-Q1/D-Q2 Divi override fixes):
 * - list-style: none !important  (D-Q1: Divi injects list-style on ul/li)
 * - p { margin: 0 !important }   (D-Q2: Divi injects <p> margins)
 * - Ocean gradient: CSS radial-gradients replacing footer-ocean.png asset
 * - All transitions use 0.2s ease (snappier than Divi defaults)
 */

'use strict';

const base = require('./_base');

const schema = {
  name: 'footer-ocean',
  description: 'Dark navy footer with ocean gradient overlay, 4-column grid, social icons, and legal bar',
  category: 'DigiWin Templates',
};

// ─────────────────────────────────────────────────────────────────────────────
// HTML BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function blocks(data) {
  const p = data.sectionPrefix;

  // Brand column
  const logoImg = `<img src="${data.logo.src}" alt="${data.logo.alt}" width="${data.logo.width}" height="${data.logo.height}" loading="lazy">`;

  const brandCol = `
      <div class="${p}-brand">
        <div class="${p}-logo">${logoImg}</div>
        <p class="${p}-tagline">${data.tagline}</p>
        <p class="${p}-stock">${data.stockInfo.label}: <strong>${data.stockInfo.code}</strong></p>
      </div>`;

  // Nav columns (all columns except the last contact column go here)
  // columns array: each entry can have multiple heading+links groups via marginTop
  const navCols = data.columns.map((col) => {
    // Support single-heading or multi-heading columns
    // Each column item in data.columns is a group: { heading, links, marginTop? }
    // If a column needs multiple groups, pass an array of groups as col.groups
    if (col.groups) {
      const groupsHTML = col.groups.map((g, i) => {
        const mt = i > 0 ? ` style="margin-top:${g.marginTop || '24px'}"` : '';
        return `
        <p class="${p}-heading"${mt}>${g.heading}</p>
        <ul class="${p}-links">
          ${g.links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('\n          ')}
        </ul>`;
      }).join('');
      return `
      <div class="${p}-column">${groupsHTML}
      </div>`;
    }

    return `
      <div class="${p}-column">
        <p class="${p}-heading">${col.heading}</p>
        <ul class="${p}-links">
          ${col.links.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('\n          ')}
        </ul>
      </div>`;
  }).join('');

  // Contact column
  const addressLines = data.contact.address.join('<br>');
  const socialLinks = data.social.map(s =>
    `<a href="${s.href}" title="${s.label}" aria-label="${s.label}">${s.icon}</a>`
  ).join('\n          ');

  const contactCol = `
      <div class="${p}-column">
        <p class="${p}-heading">${data.contact.heading}</p>
        <div class="${p}-contact">
          <p>
            <strong>${data.contact.company}</strong><br>
            ${addressLines}
          </p>
          <p>
            <a href="mailto:${data.contact.email}">${data.contact.email}</a>
          </p>
        </div>
        <div class="${p}-social" role="list" aria-label="Social media links">
          ${socialLinks}
        </div>
      </div>`;

  // Legal bar
  const legalLinks = data.legal.links.map(l =>
    `<a href="${l.href}">${l.text}</a>`
  ).join('\n          ');

  const html = `
  <footer class="${p}-footer" role="contentinfo">
    <div class="${p}-ocean" aria-hidden="true"></div>
    <div class="${p}-inner">
      <div class="${p}-grid">
        ${brandCol}
        ${navCols}
        ${contactCol}
      </div>
      <div class="${p}-bottom">
        <p class="${p}-copyright">${data.legal.copyright}</p>
        <nav class="${p}-legal" aria-label="Legal links">
          ${legalLinks}
        </nav>
      </div>
    </div>
  </footer>`;

  return base.wrapInDiviSection(
    data.adminLabel,
    html,
    `${data.adminLabel}: Content`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function css(data) {
  const p = data.sectionPrefix;
  const { BREAKPOINTS, fontSmoothingReset, reducedMotion } = base;

  return `
/* === ${data.adminLabel.toUpperCase()} === */

/* ── Outer shell ── */
.${p}-footer{background:#000864;color:#ffffff;padding:80px 0 0 0;position:relative;overflow:hidden;${fontSmoothingReset(p)}font-size:16px}

/* ── Ocean gradient overlay (replaces footer-ocean.png asset) ──
   Two radial blobs create a subtle depth-of-ocean feel matching the brand kit.
   No external image dependency — fully CSS. */
.${p}-ocean{position:absolute;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 120% 60% at 20% 110%, rgba(0,60,200,0.45) 0%, transparent 65%),
    radial-gradient(ellipse 80% 50% at 80% 120%, rgba(0,175,240,0.2) 0%, transparent 55%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,30,128,0.6) 0%, transparent 70%);
  opacity:0.9}

/* ── Inner container ── */
.${p}-inner{max-width:1200px;margin:0 auto;padding:0 40px;position:relative;z-index:1}

/* ── 4-column grid ── */
.${p}-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,0.1)}

/* ── Brand column ── */
.${p}-brand{padding-right:40px}
.${p}-logo{margin-bottom:16px}
.${p}-logo img{display:block;max-width:140px;height:auto}

/* ── Tagline ── */
.${p}-tagline{font-family:'Noto Sans',sans-serif;font-size:16px;color:rgba(255,255,255,0.85);line-height:1.6;margin:0 0 24px 0 !important;padding:0 !important}

/* ── Stock ticker ── */
.${p}-stock{font-family:'Noto Sans',sans-serif;font-size:13px;color:rgba(255,255,255,0.85);text-transform:uppercase;letter-spacing:0.05em;margin:0 !important;padding:0 !important}
.${p}-stock strong{color:#00AFF0;font-weight:600}

/* ── Column headings ── */
.${p}-heading{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px 0 !important;padding:0 !important;line-height:1.6}

/* ── Nav link lists — D-Q1 fix: Divi injects list-style on ul/li ── */
.${p}-links{list-style:none !important;padding:0 !important;margin:0 !important}
.${p}-links li{list-style:none !important;margin-bottom:12px}
.${p}-links li::before{display:none !important}
.${p}-links a{font-family:'Noto Sans',sans-serif;font-size:15px;color:rgba(255,255,255,0.85);text-decoration:none;transition:color 0.2s ease;display:inline-flex;align-items:center;min-height:44px;line-height:1.6}
.${p}-links a:hover{color:#00AFF0}

/* ── Contact block — D-Q2 fix: Divi injects <p> margins ── */
.${p}-contact p{font-family:'Noto Sans',sans-serif;font-size:15px;color:rgba(255,255,255,0.85);line-height:1.6;margin:0 0 16px 0 !important;padding:0 !important}
.${p}-contact strong{color:#ffffff;font-weight:600}
.${p}-contact a{color:#00AFF0;text-decoration:none;display:inline-flex;align-items:center;min-height:44px;transition:color 0.2s ease}
.${p}-contact a:hover{color:#ffffff}

/* ── Social icons ── */
.${p}-social{display:flex;gap:12px;margin-top:24px}
.${p}-social a{width:48px;height:48px;background:rgba(255,255,255,0.1);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#ffffff;text-decoration:none;transition:background 0.2s ease,transform 0.2s ease;font-family:'Noto Sans',sans-serif;font-weight:600;font-size:16px;line-height:1;flex-shrink:0}
.${p}-social a:hover{background:#00AFF0;transform:translateY(-2px)}

/* ── Bottom legal bar ── */
.${p}-bottom{padding:24px 0;display:flex;justify-content:space-between;align-items:center}
.${p}-copyright{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 !important;padding:0 !important;line-height:1.6}
.${p}-legal{display:flex;gap:24px}
.${p}-legal a{font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.85);text-decoration:none;transition:color 0.2s ease;padding:15px 0;line-height:1.6}
.${p}-legal a:hover{color:#00AFF0}

/* ── Responsive: tablet (≤1024px) — 2-column grid, brand spans full width ── */
@media(max-width:${BREAKPOINTS.tablet}px){
  .${p}-grid{grid-template-columns:1fr 1fr}
  .${p}-brand{grid-column:1 / -1;padding-right:0}
}

/* ── Responsive: mobile (≤768px) — 1-column stack ── */
@media(max-width:${BREAKPOINTS.mobile}px){
  .${p}-footer{padding-top:60px}
  .${p}-inner{padding:0 24px}
  .${p}-grid{grid-template-columns:1fr;gap:32px;padding-bottom:40px}
  .${p}-brand{padding-right:0}
  .${p}-bottom{flex-direction:column;text-align:center;gap:16px}
  .${p}-legal{flex-wrap:wrap;justify-content:center;gap:16px}
}

/* ── Reduced motion ── */
${reducedMotion(`
  .${p}-links a,
  .${p}-contact a,
  .${p}-legal a,
  .${p}-social a{transition:none !important}
  .${p}-social a:hover{transform:none !important}
`)}`.trim();
}

module.exports = { blocks, css, schema };
