/**
 * card-grid-dark.js — Card grid template with theme variants
 *
 * Themes:
 * - 'dark' (default): dark bg, glassmorphic cards (partner-checks)
 * - 'light': light bg, white cards with shadow (factory-checks)
 * - 'dark-cards': white bg, dark gradient cards with grain (trust-anchors)
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,         // CSS class prefix (e.g. 'pchecks')
 *   theme?: 'dark'|'light'|'dark-cards', // default 'dark'
 *   background: string,            // CSS gradient
 *   header: { label, title, subtitle },
 *   headerStyle?: 'span'|'pseudo'|'plain', // 'span' = span lines, 'pseudo' = ::before/::after lines, 'plain' = no lines
 *   cards: [{
 *     number?, title, quote?, description?,
 *     svgBg?: { viewBox, content },
 *     fullWidth?, icon?, quoteTag?,
 *     badge?,        // JetBrains Mono badge text (trust-anchors)
 *     bgIcon?,       // Large background SVG (trust-anchors)
 *     headline?,     // Lead paragraph — styled bold (trust-anchors)
 *     detail?,       // Longer description text (trust-anchors)
 *   }],
 *   cta?: { text, href },
 *   svgScene?: string,
 *   superD?: { class, variant, position, opacity, label },
 *   gridCols?: number,
 *   gridGap?: string,
 *   cardGrain?: boolean,           // Add grain texture to cards (trust-anchors)
 *   cardMinHeight?: string,        // Min card height (trust-anchors)
 * }
 */

const base = require('./_base');

const schema = {
  name: 'card-grid-dark',
  description: 'Dark glassmorphic card grid (2-3 columns) with numbered cards, quotes, and CTAs',
  category: 'DigiWin Templates',
};

/**
 * Generate Divi 5 block markup from data config.
 * @param {object} data — section data config
 * @returns {string[]} Array of block markup strings
 */
function blocks(data) {
  const p = data.sectionPrefix;
  const headerStyle = data.headerStyle || 'span';

  // Build card HTML
  const cardsHTML = data.cards.map((card, i) => {
    const fullClass = card.fullWidth ? ` ${p}-card--full` : '';
    return `
    <div class="${p}-card${fullClass}">
      ${card.bgIcon ? `<div class="${p}-bg-icon">${card.bgIcon}</div>` : ''}
      ${card.svgBg ? `<svg aria-hidden="true" class="${p}-card-bg" viewBox="${card.svgBg.viewBox || '0 0 220 320'}" fill="none" preserveAspectRatio="xMaxYMid slice">${card.svgBg.content}</svg>` : ''}
      ${card.icon ? `<div class="${p}-card-icon">${card.icon}</div>` : ''}
      ${card.badge ? `<div class="${p}-badge">${card.badge}</div>` : ''}
      ${card.number ? `<div class="${p}-card-number">${card.number}</div>` : ''}
      <h3 class="${p}-card-title">${card.title}</h3>
      ${card.quote ? `<${card.quoteTag || 'blockquote'} class="${p}-card-quote">${card.quote}</${card.quoteTag || 'blockquote'}>` : ''}
      ${card.headline ? `<p class="${p}-headline">${card.headline}</p>` : ''}
      ${card.description ? `<p class="${p}-card-desc">${card.description}</p>` : ''}
      ${card.detail ? `<p class="${p}-detail">${card.detail}</p>` : ''}
    </div>`;
  }).join('');

  // Build section header
  let headerHTML;
  if (headerStyle === 'plain') {
    headerHTML = `
    <div class="${p}-header">
      <div class="${p}-header-label">${data.header.label}</div>
      <h2 class="${p}-title">${data.header.title}</h2>
      ${data.header.subtitle ? `<p class="${p}-subtitle">${data.header.subtitle}</p>` : ''}
    </div>`;
  } else if (headerStyle === 'span') {
    headerHTML = base.sectionHeaderSpanHTML(p, data.header);
  } else {
    headerHTML = base.sectionHeaderHTML(p, data.header);
  }

  // Build CTA
  const ctaHTML = data.cta
    ? `<div class="${p}-cta-wrapper"><a href="${data.cta.href}" class="${p}-cta">${data.cta.text}</a></div>`
    : '';

  // Build scene SVG
  const sceneHTML = data.svgScene
    ? `<div class="${p}-scene">${data.svgScene}</div>`
    : '';

  // Assemble full section HTML
  const html = `
    <div class="${p}-section">
    ${sceneHTML}
    ${headerHTML}
    <div class="${p}-grid">${cardsHTML}</div>
    ${ctaHTML}
    </div>`;

  return base.wrapInDiviSection(
    data.adminLabel,
    html,
    `${data.adminLabel}: Content`,
    data.superD ? {
      superDClass: data.superD.class,
      superDLabel: data.superD.label,
    } : {}
  );
}

/**
 * Generate section CSS from data config.
 * @param {object} data — section data config
 * @returns {string} CSS string
 */
function css(data) {
  const p = data.sectionPrefix;
  const theme = data.theme || 'dark';
  const cols = data.gridCols || (data.cards.length <= 2 ? 2 : 3);
  const hasFullWidthCards = data.cards.some(c => c.fullWidth);
  const hasCardBgSvg = data.cards.some(c => c.svgBg);
  const hasBgIcon = data.cards.some(c => c.bgIcon);
  const hasBadge = data.cards.some(c => c.badge);
  const hasHeadline = data.cards.some(c => c.headline);
  const hasDetail = data.cards.some(c => c.detail);
  const headerStyle = data.headerStyle || 'span';

  // Theme colors
  const isDark = theme === 'dark';
  const isDarkCards = theme === 'dark-cards';
  const isLight = theme === 'light';
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : isDarkCards ? (data.cardBg || 'linear-gradient(135deg,#000864 0%,#1e3a5f 50%,#0f172a 100%)') : '#fff';
  const cardBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : isDarkCards ? 'none' : '1px solid #e2e8f0';
  const cardHoverShadow = isDark ? '' : isDarkCards ? '0 24px 48px rgba(0,0,0,0.25)' : '0 20px 60px rgba(0,175,240,0.12)';
  const numColor = isDark ? '#ffffff' : '#0369a1';
  const titleColor = (isDark || isDarkCards) ? '#ffffff' : '#000864';
  const quoteColor = isDark ? 'rgba(255,255,255,0.8)' : '#475569';
  const quoteBorder = isDark ? 'rgba(255,255,255,0.3)' : '#00AFF0';
  const descColor = isDark ? 'rgba(255,255,255,0.75)' : '#5b6b80';

  // Super D CSS
  const superDCSS = data.superD
    ? base.superDCSS(data.superD.class, { variant: data.superD.variant, position: data.superD.position, opacity: data.superD.opacity })
    : '';

  // Header CSS
  const headerDark = isDark;
  let headerCSS;
  if (headerStyle === 'plain') {
    const lColor = headerDark ? 'rgba(255,255,255,0.75)' : '#0369a1';
    const tColor = headerDark ? '#fff' : '#000864';
    const sColor = headerDark ? 'rgba(255,255,255,0.75)' : '#5b6b80';
    headerCSS = `
.${p}-header{text-align:center;max-width:${data.headerMaxWidth || '700px'};margin:0 auto ${data.headerMarginBottom || '60px'};position:relative;z-index:2}
.${p}-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:${lColor};margin-bottom:12px;line-height:1.6}
.${p}-title{font-family:'Noto Sans',sans-serif;font-weight:700;font-size:clamp(32px,3.5vw,44px);color:${tColor};line-height:1.15;margin:0 0 16px;padding:0}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:18px;color:${sColor};line-height:1.6;margin:0;padding:0}`;
  } else if (headerStyle === 'span') {
    headerCSS = base.sectionHeaderSpanCSS(p, { dark: headerDark, headerMaxWidth: data.headerMaxWidth, headerMarginBottom: data.headerMarginBottom });
  } else {
    headerCSS = base.sectionHeaderCSS(p, { dark: headerDark, headerMaxWidth: data.headerMaxWidth, headerMarginBottom: data.headerMarginBottom });
  }

  // Card hover style
  const hoverCSS = isDark
    ? `.${p}-card:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);transform:translateY(-4px)}`
    : isDarkCards
    ? `.${p}-card:hover{box-shadow:${cardHoverShadow}}`
    : `.${p}-card:hover{box-shadow:${cardHoverShadow};border-color:#00AFF0}`;

  return `
${superDCSS ? `/* Super D decoration */\n${superDCSS}` : ''}
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{position:relative;overflow:hidden;${base.fontSmoothingReset(p)}font-size:16px;background:${data.background};padding:${data.padding || '100px 40px'}}

/* Scene SVG */
${data.svgScene ? `.${p}-scene{position:absolute;inset:0;pointer-events:none;z-index:1;opacity:${data.sceneOpacity || 0.20}}\n.${p}-scene svg{width:100%;height:100%}` : ''}

/* Section Header */
${headerCSS}

/* Cards Grid */
.${p}-grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:${data.gridGap || '32px'};${data.gridMarginBottom !== undefined ? `margin-bottom:${data.gridMarginBottom}` : 'margin-bottom:32px'};max-width:1200px;margin-left:auto;margin-right:auto;position:relative;z-index:2}

/* Cards */
.${p}-card{background:${cardBg};border:${cardBorder};border-radius:20px;padding:${data.cardPadding || '40px 32px'};transition:all 0.2s ease;position:relative;overflow:hidden;line-height:1.6${isLight ? ';box-shadow:0 4px 24px rgba(0,0,0,0.04)' : ''}${data.cardMinHeight ? `;min-height:${data.cardMinHeight}` : ''}}
${hoverCSS}
${hasFullWidthCards ? `.${p}-card--full{grid-column:1 / -1}` : ''}
${hasCardBgSvg || isDarkCards ? `.${p}-card>*:not(.${p}-card-bg):not(.${p}-bg-icon){position:relative;z-index:1}` : ''}

/* Card Elements */
.${p}-card-number{font-family:'Noto Sans',sans-serif;font-size:64px;font-weight:800;line-height:1;color:${numColor};opacity:0.15;margin-bottom:24px}
.${p}-card-title{font-family:'Noto Sans',sans-serif;font-size:${isDarkCards ? '22px' : '20px'};font-weight:700;line-height:1.6;color:${titleColor};margin:0 0 ${isDarkCards ? '12px' : '16px'};position:relative;z-index:1}
.${p}-card-quote{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:400;font-style:italic;line-height:1.7;color:${quoteColor};margin:0 0 20px;padding-left:16px;border-left:3px solid ${quoteBorder}}
.${p}-card-desc{font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;line-height:1.6;color:${descColor};margin:0}

${hasCardBgSvg ? `/* Card Background SVGs */
.${p}-card-bg{position:absolute;top:0;right:0;width:220px;height:100%;opacity:0.10;pointer-events:none;z-index:0;transition:opacity 0.4s ease}
.${p}-card:hover .${p}-card-bg{opacity:0.14}
.${p}-card--full .${p}-card-bg{width:400px}` : ''}

${hasBgIcon ? `/* Background Icons */
.${p}-bg-icon{position:absolute;top:-20px;right:-20px;width:180px;height:180px;opacity:0.08;z-index:1;transition:all 0.4s ease;pointer-events:none}
.${p}-card:hover .${p}-bg-icon{opacity:0.12;transform:scale(1.05) rotate(5deg)}` : ''}

${hasBadge ? `/* Badges */
.${p}-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;color:#0369a1;background:rgba(0,175,240,0.15);border:1px solid rgba(0,175,240,0.25);padding:5px 12px;border-radius:6px;letter-spacing:0.05em;line-height:1.6;margin-bottom:14px;position:relative;z-index:2}` : ''}

${data.cards.some(c => c.icon) ? `/* Card Icons */
.${p}-card-icon{width:48px;height:48px;background:rgba(0,175,240,0.15);border:1px solid rgba(0,175,240,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;position:relative;z-index:2}` : ''}

${hasHeadline ? `/* Headlines */
.${p}-headline{font-family:'Noto Sans',sans-serif;font-weight:500;font-size:15px;color:rgba(255,255,255,0.9);line-height:1.6;margin:0 0 14px;padding:0}` : ''}

${hasDetail ? `/* Details */
.${p}-detail{font-family:'Noto Sans',sans-serif;font-weight:400;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.65;margin:0;padding:0}
.${p}-detail a{color:#0369a1;text-decoration:none;transition:color 0.3s ease}
.${p}-detail a:hover{color:#00AFF0;text-decoration:underline}` : ''}

${data.cardGrain ? `/* Card Grain Texture */
.${p}-card::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1}` : ''}

/* CTA */
${data.cta ? (isLight ? `
.${p}-cta-wrapper{text-align:center;margin-top:56px;position:relative;z-index:2}
.${p}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;color:#ffffff;background:#006dac;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.${p}-cta::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}
.${p}-cta:hover::before{left:100%}
.${p}-cta:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}` : base.buttonCSS(p)) : ''}

/* Responsive */
@media(max-width:${base.BREAKPOINTS.tablet}px){
  .${p}-grid{grid-template-columns:repeat(${cols > 2 ? 2 : 1},1fr)}
  .${p}-title{font-size:40px}
  .${p}-subtitle{font-size:18px}
  ${isLight ? `.${p}-grid .${p}-card:nth-child(${cols}){grid-column:span ${cols > 2 ? 2 : 1};max-width:500px;margin:0 auto;width:100%}` : ''}
}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${p}-section{padding:80px 24px !important}
  .${p}-header{margin-bottom:60px}
  .${p}-grid{grid-template-columns:1fr;gap:24px}
  ${isLight ? `.${p}-grid .${p}-card:nth-child(${cols}){grid-column:auto;max-width:none}` : ''}
  .${p}-title{font-size:32px}
  .${p}-subtitle{font-size:16px}
  .${p}-card{padding:32px 24px${data.cardMinHeight ? ';min-height:auto' : ''}}
  .${p}-card-number{font-size:${isLight ? '52px' : '56px'}}
  .${p}-card-title{font-size:20px}
  .${p}-card-quote{font-size:15px}
  .${p}-card-desc{font-size:14px}
  ${hasHeadline ? `.${p}-headline{font-size:14px}` : ''}
  ${hasDetail ? `.${p}-detail{font-size:13px}` : ''}
  .${p}-label-line{width:30px}
  .${p}-label-text{font-size:12px}
  ${isLight ? `.${p}-header-label{font-size:10px}` : ''}
}
@media(max-width:${base.BREAKPOINTS.small}px){
  .${p}-section{padding:60px 20px !important}
  .${p}-header{margin-bottom:48px}
  .${p}-title{font-size:28px}
  ${data.cta ? (isLight ? `.${p}-btn{width:100%;text-align:center}` : `.${p}-cta{width:100%;padding:14px 32px}`) : ''}
  ${isLight ? `.${p}-header-label::before,.${p}-header-label::after{width:24px}` : ''}
}

/* Reduced Motion */
${base.reducedMotion(`
  .${p}-card,.${p}-cta,.${p}-btn{transition:none !important}
  .${p}-card:hover,.${p}-cta:hover,.${p}-btn:hover{transform:none !important}
  ${hasBgIcon ? `.${p}-bg-icon{transition:none !important}` : ''}
  ${isLight ? `.${p}-btn::before{transition:none}` : ''}
`)}`.trim();
}

module.exports = { blocks, css, schema };
