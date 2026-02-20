/**
 * card-grid-light.js — Light card grid template
 *
 * Used by: home-product-pillars, and similar light-background sections
 * with white cards, icons, feature lists, and hover effects.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,
 *   background: string,            // e.g. '#F5F7FA' or gradient
 *   padding?: string,              // default '100px 80px'
 *   header: { label, title, subtitle },
 *   headerStyle?: 'plain'|'pseudo', // 'plain' = no flanking lines, 'pseudo' = ::before/::after
 *   cards: [{
 *     href?: string,               // makes card a link
 *     icon?: string,               // SVG string
 *     title: string,
 *     fullName?: string,           // JetBrains Mono subtitle (e.g. "Enterprise Resource Planning")
 *     tagline?: string,            // bold subtitle
 *     features?: [string],         // bullet list
 *     benefit?: string,            // bottom highlight line
 *     description?: string,        // plain text description
 *   }],
 *   gridCols?: number,             // default: cards.length (max 4)
 *   superD?: { class, variant, position, opacity, label },
 * }
 */

const base = require('./_base');

const schema = {
  name: 'card-grid-light',
  description: 'Light card grid with white cards, icons, and hover effects',
  category: 'DigiWin Templates',
};

function blocks(data) {
  const p = data.sectionPrefix;

  // Build card HTML
  const cardsHTML = data.cards.map((card) => {
    const tag = card.href ? 'a' : 'div';
    const hrefAttr = card.href ? ` href="${card.href}"` : '';

    const iconHTML = card.icon ? `
      <div class="${p}-card__icon">${card.icon}</div>` : '';

    const fullNameHTML = card.fullName ? `
      <div class="${p}-card__full-name">${card.fullName}</div>` : '';

    const taglineHTML = card.tagline ? `
      <div class="${p}-card__tagline">${card.tagline}</div>` : '';

    const featuresHTML = card.features ? `
      <ul class="${p}-card__features">
        ${card.features.map(f => `<li>${f}</li>`).join('\n        ')}
      </ul>` : '';

    const benefitHTML = card.benefit ? `
      <div class="${p}-card__benefit">${card.benefit}</div>` : '';

    const descHTML = card.description ? `
      <p class="${p}-card__desc">${card.description}</p>` : '';

    return `
    <${tag}${hrefAttr} class="${p}-card">
      ${iconHTML}
      <h3 class="${p}-card__title">${card.title}</h3>
      ${fullNameHTML}
      ${taglineHTML}
      ${featuresHTML}
      ${benefitHTML}
      ${descHTML}
    </${tag}>`;
  }).join('');

  // Header — plain label (no flanking lines) like products section
  const headerHTML = data.headerStyle === 'pseudo'
    ? base.sectionHeaderHTML(p, data.header)
    : `
    <div class="${p}-header">
      <div class="${p}-header-label">${data.header.label}</div>
      <h2 class="${p}-title">${data.header.title}</h2>
      ${data.header.subtitle ? `<p class="${p}-subtitle">${data.header.subtitle}</p>` : ''}
    </div>`;

  // Super D decoration — must be INSIDE the section div for position:absolute to work
  const superD = require('../super-d');
  const superDHTML = data.superD
    ? `<div class="${data.superD.class}" aria-hidden="true"></div>`
    : '';

  const html = `
    <div class="${p}-section">
    ${superDHTML}
    ${headerHTML}
    <div class="${p}-grid">${cardsHTML}</div>
    </div>`;

  return base.wrapInDiviSection(
    data.adminLabel,
    html,
    `${data.adminLabel}: Content`
  );
}

function css(data) {
  const p = data.sectionPrefix;
  const cols = data.gridCols || Math.min(data.cards.length, 4);
  const hasIcons = data.cards.some(c => c.icon);
  const hasFullName = data.cards.some(c => c.fullName);
  const hasTagline = data.cards.some(c => c.tagline);
  const hasFeatures = data.cards.some(c => c.features);
  const hasBenefit = data.cards.some(c => c.benefit);
  const isLink = data.cards.some(c => c.href);

  // Super D
  const superDPart = data.superD
    ? `/* Super D decoration */\n${base.superDCSS(data.superD.class, { variant: data.superD.variant, position: data.superD.position, opacity: data.superD.opacity })}`
    : '';

  // Header CSS — plain style (no flanking lines)
  const headerCSS = data.headerStyle === 'pseudo'
    ? base.sectionHeaderCSS(p, { dark: false })
    : `
.${p}-header{text-align:center;max-width:800px;margin:0 auto 56px;position:relative;z-index:2}
.${p}-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#0369a1;margin-bottom:12px;line-height:1.6}
.${p}-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,4vw,44px);font-weight:700;color:#000864;line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px;padding:0}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0;padding:0}`;

  return `
${superDPart}
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{background:${data.background};padding:${data.padding || '100px 80px'};position:relative;${base.fontSmoothingReset(p)}font-size:16px;overflow:hidden}
.${p}-header,.${p}-grid{max-width:1200px;margin-left:auto;margin-right:auto}

/* Header */
${headerCSS}

/* Grid */
.${p}-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:${data.gridGap || '24px'};margin-top:60px}

/* Cards */
.${p}-card{position:relative;background:#ffffff;border-radius:20px;padding:${data.cardPadding || '40px 28px'};text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.04);border:1px solid #f1f5f9;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);${isLink ? 'text-decoration:none;display:block;color:#333333;' : ''}line-height:1.6;overflow:hidden}
.${p}-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#00AFF0,#003CC8);transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease}
.${p}-card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,175,240,0.12);border-color:transparent}
.${p}-card:hover::before{transform:scaleX(1)}

/* Card Title */
.${p}-card__title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:20px;line-height:1.6;color:#000864;margin:0 0 10px 0;padding:0}

${hasIcons ? `/* Card Icon */
.${p}-card__icon{width:80px;height:80px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#000864,#1e3a5f);border-radius:24px;transition:all 0.4s ease;position:relative}
.${p}-card__icon::after{content:'';position:absolute;inset:-2px;border-radius:26px;background:linear-gradient(135deg,#00AFF0,transparent);opacity:0;transition:opacity 0.4s ease;z-index:-1}
.${p}-card:hover .${p}-card__icon{transform:scale(1.05) rotate(-3deg)}
.${p}-card:hover .${p}-card__icon::after{opacity:1}
.${p}-card__icon svg{filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1))}` : ''}

${hasFullName ? `/* Full Product Name */
.${p}-card__full-name{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#0369a1;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;text-align:left}` : ''}

${hasTagline ? `/* Tagline */
.${p}-card__tagline{font-family:'Noto Sans',sans-serif;font-weight:600;font-size:15px;line-height:1.3;color:#000864;margin-bottom:12px;text-align:left}` : ''}

${hasFeatures ? `/* Features List */
.${p}-card__features{list-style:none !important;padding:0 !important;margin:0 0 12px 0;text-align:left}
.${p}-card__features li{font-family:'Noto Sans',sans-serif;font-size:13px;line-height:1.6;color:#5b6b80;margin-bottom:0;padding:4px 0 4px 12px;position:relative;list-style:none !important}
.${p}-card__features li::before{content:'';position:absolute;left:0;top:11px;width:4px;height:4px;background:#00AFF0;border-radius:50%}
.${p}-card__features strong,.${p}-card__features em{font-style:normal;font-weight:600;color:#475569}` : ''}

${hasBenefit ? `/* Benefit Line */
.${p}-card__benefit{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:500;line-height:1.6;color:#0369a1;border-top:1px solid #e2e8f0;padding-top:10px;margin-top:4px;text-align:left}` : ''}

/* Responsive */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${p}-grid{grid-template-columns:repeat(2,1fr);gap:20px}
  .${p}-card{padding:32px 24px}
}
@media(max-width:640px){
  .${p}-grid{grid-template-columns:1fr;gap:16px;margin-top:40px}
  .${p}-card{padding:28px 20px}
  ${hasIcons ? `.${p}-card__icon{width:64px;height:64px;margin-bottom:20px}\n  .${p}-card__icon svg{width:28px;height:28px}` : ''}
  .${p}-card__title{font-size:18px}
  ${hasTagline ? `.${p}-card__tagline{font-size:14px}` : ''}
  ${hasFeatures ? `.${p}-card__features li{font-size:12px}` : ''}
  ${hasBenefit ? `.${p}-card__benefit{font-size:12px}` : ''}
}

/* Reduced Motion */
${base.reducedMotion(`
  .${p}-card,.${p}-card__icon,.${p}-card__icon::after{transition:none !important}
  .${p}-card:hover .${p}-card__icon{transform:none !important}
`)}`.trim();
}

module.exports = { blocks, css, schema };
