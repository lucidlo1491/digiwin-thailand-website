/**
 * header.js — Divi 5 Global Header Builder
 *
 * Fixed-position navigation bar with mega-menu dropdowns,
 * mobile hamburger menu, scroll effect, and Base64-encoded SVG logos.
 *
 * ContentSpec: Global Header (fixed across all pages)
 */

const fs = require('fs');
const path = require('path');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../lib/modules');

const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');

// ────────────────────────────────────────────────────────────────
// SPEC — Design tokens for Header
// ────────────────────────────────────────────────────────────────
const SPEC = {
  header: {
    background: 'rgba(255,255,255,0.95)',
    backdropBlur: '20px',
    height: '80px',
    heightMobile: '70px',
    maxWidth: '1400px',
    zIndex: '999999',
    scrollShadow: '0 4px 30px rgba(37,59,80,0.12)',
  },
  logo: {
    desktopWidth: '160px',
    desktopHeight: '40px',
    mobileWidth: '32px',
    mobileHeight: '32px',
    sinceColor: '#0284c7',
    sinceFontSize: '10px',
    sinceLetterSpacing: '0.12em',
  },
  nav: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '16px',
    fontWeight: '500',
    color: '#000864',          // --dw-navy
    hoverColor: '#0284c7',
    underlineGradient: 'linear-gradient(90deg, #00AFF0, #0ea5e9)',
  },
  megaMenu: {
    background: '#ffffff',
    shadow: '0 20px 60px rgba(37,59,80,0.15), 0 0 0 1px rgba(37,59,80,0.05)',
    accentBar: 'linear-gradient(90deg, #00AFF0, #0ea5e9, #06b6d4)',
    columnTitleColor: '#5b6b80',
    itemTitleColor: '#000864',   // --dw-navy
    itemDescColor: '#5b6b80',
    iconBg: '#f1f5f9',
    iconStroke: '#5b6b80',
    hoverBg: '#f8fafc',
  },
  featured: {
    labelFont: "'JetBrains Mono', monospace",
    labelSize: '10px',
    labelColor: '#0284c7',
    titleSize: '18px',
    titleColor: '#000864',     // --dw-navy
    descColor: '#5b6b80',
    ctaBg: 'linear-gradient(135deg, #00AFF0 0%, #0284c7 100%)',
    ctaColor: '#ffffff',
    ctaShadow: '0 6px 20px rgba(0,175,240,0.35)',
    imageBg: 'linear-gradient(135deg, #000864 0%, #1e3a5f 50%, #0f172a 100%)',
  },
  cta: {
    background: 'linear-gradient(135deg, #00AFF0 0%, #0284c7 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    padding: '15px 28px',
    borderRadius: '10px',
    shadow: '0 4px 15px rgba(0,175,240,0.3)',
    hoverShadow: '0 8px 25px rgba(0,175,240,0.4)',
  },
  animation: {
    transition: '0.3s ease',
    cubicBezier: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// ────────────────────────────────────────────────────────────────
// SVG Base64 Encoding
// ────────────────────────────────────────────────────────────────

function getSvgDataUri(filename) {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  const svg = fs.readFileSync(filePath, 'utf8');
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

// ────────────────────────────────────────────────────────────────
// Header HTML
// ────────────────────────────────────────────────────────────────

function getHeaderHTML() {
  const desktopLogoUri = getSvgDataUri('digiwin-logo-en.svg');
  const mobileLogoUri = getSvgDataUri('digiwin-d-mark.svg');
  // ALL CSS must be inline — Divi 5 does NOT inject _et_pb_custom_css for Theme Builder layouts
  const mainCSS = headerCss();

  return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M83NQFRQ');</script>
<!-- End Google Tag Manager -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M83NQFRQ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
${mainCSS}
/* Header responsive — must be inline (Divi strips @media from _et_pb_custom_css in Theme Builder templates) */
/* DIVI BUG DEFENSE: Divi's et-critical-inline-css extracts CSS from Code Module <style>
   blocks and strips ALL @media wrappers. Mobile-only rules leak to desktop. We combat this
   by ensuring EVERY property set in mobile @media has an explicit desktop default in the
   non-@media CSS above. Our body <style> comes after et-critical-inline-css in <head>,
   so source order lets our desktop defaults win over stripped mobile values. */
@media(max-width:1024px){
  .dw-header-inner{padding:0 24px;height:${SPEC.header.heightMobile}}
  .dw-logo-img--desktop{display:none}
  .dw-logo-img--mobile{display:block}
  .dw-nav{display:none;position:fixed;top:${SPEC.header.heightMobile};left:0;width:100%;height:calc(100dvh - ${SPEC.header.heightMobile});background:#fff;flex-direction:column;overflow-y:auto;padding:8px 0 100px;z-index:999998;box-shadow:0 8px 32px rgba(37,59,80,0.15)}
  .dw-nav.dw-nav--open{display:flex}
  .dw-nav-item{width:100%;border-bottom:1px solid rgba(37,59,80,0.06)}
  .dw-nav-link{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;font-size:16px;font-weight:500;color:${SPEC.nav.color};width:100%}
  .dw-nav-link::after{display:none}
  .dw-nav-link svg{width:20px;height:20px;transition:transform ${SPEC.animation.transition}}
  .dw-nav-item.active .dw-nav-link svg{transform:rotate(180deg)}
  .dw-mega-menu{position:static;opacity:1;visibility:visible;transform:none;display:none;box-shadow:none;border-radius:0;background:#f8fafc;padding:0;width:100%}
  .dw-mega-menu.active{display:block}
  .dw-mega-menu::before{display:none}
  .dw-mega-inner{display:flex;flex-direction:column;padding:8px 0;gap:0}
  .dw-mega-column{padding:0;border:none}
  .dw-mega-column-title{padding:12px 32px 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${SPEC.megaMenu.columnTitleColor}}
  .dw-mega-item{padding:12px 32px;border-radius:0;gap:12px}
  .dw-mega-item:hover{background:rgba(0,175,240,0.06)}
  .dw-mega-icon{width:32px;height:32px;min-width:32px}
  .dw-mega-title{font-size:14px}
  .dw-mega-desc{font-size:12px}
  .dw-mega-viewall{padding:12px 32px;border-radius:0;font-size:13px}
  .dw-mega-featured{display:none}
  .dw-nav::after{content:'';display:block;padding:16px 24px}
  .dw-menu-toggle{display:flex;position:relative;z-index:999999}
  .dw-menu-toggle.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
  .dw-menu-toggle.active span:nth-child(2){opacity:0}
  .dw-menu-toggle.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
  .dw-header-cta{display:none}
  .dw-lang-toggle{margin-left:auto;margin-right:8px}
}
@media(prefers-reduced-motion:reduce){
  .dw-header,.dw-header-cta,.dw-mega-menu,.dw-nav-link,.dw-nav-link::after,.dw-mega-item,.dw-mega-icon,.dw-mega-featured-cta,.dw-mega-viewall svg,.dw-logo,.dw-logo-since,.dw-menu-toggle span,.dw-nav-link svg,.dw-lang-option{transition:none !important}
  .dw-header-cta::before{transition:none !important}
  .dw-header-cta:hover,.dw-mega-featured-cta:hover,.dw-logo:hover{transform:none !important}
}
</style>
<header class="dw-header">
  <div class="dw-header-inner">
    <a href="/" class="dw-logo">
      <img src="${desktopLogoUri}" alt="DigiWin" class="dw-logo-img dw-logo-img--desktop" width="160" height="40">
      <img src="${mobileLogoUri}" alt="DigiWin" class="dw-logo-img dw-logo-img--mobile" width="32" height="32">
      <span class="dw-logo-since">Since 1982</span>
    </a>
    <nav class="dw-nav">
      <!-- Home -->
      <div class="dw-nav-item"><a href="/" class="dw-nav-link">Home</a></div>

      <!-- Products dropdown -->
      <div class="dw-nav-item" data-dropdown>
        <span class="dw-nav-link">Products<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>
        <div class="dw-mega-menu">
          <div class="dw-mega-inner">
            <div class="dw-mega-column">
              <div class="dw-mega-column-title">Core Systems</div>
              <a href="/products/erp/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3z"/><path d="M3 9h18M9 21V9"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">ERP: T100 &amp; iGP</p><p class="dw-mega-desc">Finance, supply chain, and operations</p></div>
              </a>
              <a href="/products/mes/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M2 20h20M6 20V10l4-6h4l4 6v10"/><path d="M6 14h12"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">MES &amp; SFT</p><p class="dw-mega-desc">Production tracking and quality</p></div>
              </a>
              <a href="/products/wms/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">WMS: sFLS</p><p class="dw-mega-desc">Warehouse and inventory</p></div>
              </a>
              <a href="/products/aiot/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">AIoT &amp; Smart Factory</p><p class="dw-mega-desc">Machine connectivity and analytics</p></div>
              </a>
              <a href="/products/" class="dw-mega-viewall">View All Products<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            </div>
            <div class="dw-mega-featured">
              <div class="dw-mega-featured-image"><svg aria-hidden="true" viewBox="0 0 120 120"><path d="M20 90V50l20-20h40l20 20v40" stroke-linecap="round"/><path d="M35 90V65h20v25M65 90V55h20v35"/><circle cx="60" cy="25" r="8"/><path d="M60 33v12"/></svg></div>
              <div class="dw-mega-featured-content">
                <span class="dw-mega-featured-label">Complete Stack</span>
                <p class="dw-mega-featured-title">Manufacturing &amp; Distribution</p>
                <p class="dw-mega-featured-desc">Tailor-made ERP for manufacturing and distribution companies in Thailand and ASEAN.</p>
                <a href="/products/" class="dw-mega-featured-cta">Explore Solutions<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Industries dropdown -->
      <div class="dw-nav-item" data-dropdown>
        <span class="dw-nav-link">Industries<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>
        <div class="dw-mega-menu">
          <div class="dw-mega-inner">
            <div class="dw-mega-column">
              <div class="dw-mega-column-title">Manufacturing Sectors</div>
              <a href="/industries/automotive/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17H3v-6l2-4h12l2 4v6h-2M5 17h10"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Automotive Parts</p><p class="dw-mega-desc">JIT delivery and OEM traceability</p></div>
              </a>
              <a href="/industries/electronics/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Electronics Assembly</p><p class="dw-mega-desc">SMT integration and MSD tracking</p></div>
              </a>
              <a href="/industries/metal-plastics/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Metal &amp; Plastics</p><p class="dw-mega-desc">Yield optimization and scrap reduction</p></div>
              </a>
              <a href="/industries/" class="dw-mega-viewall">View All Industries<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            </div>
            <div class="dw-mega-featured">
              <div class="dw-mega-featured-image"><svg aria-hidden="true" viewBox="0 0 120 120"><path d="M20 100V60l15-25h50l15 25v40" stroke-linecap="round"/><rect x="35" y="70" width="20" height="30" rx="2"/><rect x="65" y="60" width="20" height="40" rx="2"/><path d="M45 40h30M60 25v15"/><circle cx="60" cy="20" r="5"/></svg></div>
              <div class="dw-mega-featured-content">
                <span class="dw-mega-featured-label">50,000+ Factories</span>
                <p class="dw-mega-featured-title">Industry-Specific Solutions</p>
                <p class="dw-mega-featured-desc">Pre-configured templates and best practices for your specific manufacturing sector.</p>
                <a href="/industries/" class="dw-mega-featured-cta">Find Your Industry<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Partners dropdown -->
      <div class="dw-nav-item" data-dropdown>
        <span class="dw-nav-link">Partners<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>
        <div class="dw-mega-menu">
          <div class="dw-mega-inner">
            <div class="dw-mega-column">
              <div class="dw-mega-column-title">Why Partner</div>
              <a href="/partner-program/business-model/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">The Evolving Business Model</p></div>
              </a>
              <a href="/partner-program/economics/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Partner Economics</p></div>
              </a>
              <a href="/partner-program/solutions/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Solution Stack</p></div>
              </a>
              <a href="/partner-program/" class="dw-mega-viewall">Partner Overview<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            </div>
            <div class="dw-mega-column">
              <div class="dw-mega-column-title">Getting Started</div>
              <a href="/partner-program/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Become a Partner</p></div>
              </a>
              <a href="/contact/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Let's Talk</p></div>
              </a>
              <a href="/about-us/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">About DigiWin</p></div>
              </a>
            </div>
            <div class="dw-mega-featured">
              <div class="dw-mega-featured-image"><svg aria-hidden="true" viewBox="0 0 120 120"><circle cx="40" cy="50" r="15" stroke-width="2"/><circle cx="80" cy="50" r="15" stroke-width="2"/><path d="M55 50h10" stroke-width="3"/><path d="M40 70v20M80 70v20" stroke-width="2"/><path d="M30 90h20M70 90h20" stroke-width="2"/><path d="M60 25l-8 15h16l-8-15z" fill="rgba(0,175,240,0.3)"/></svg></div>
              <div class="dw-mega-featured-content">
                <span class="dw-mega-featured-label">For ERP Implementers</span>
                <p class="dw-mega-featured-title">Grow Beyond the Man-Day Model</p>
                <p class="dw-mega-featured-desc">30-40% license margins. 100% service fees. Recurring revenue that compounds.</p>
                <a href="/partner-program/" class="dw-mega-featured-cta">Become a Partner<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resources dropdown -->
      <div class="dw-nav-item" data-dropdown>
        <span class="dw-nav-link">Resources<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></span>
        <div class="dw-mega-menu">
          <div class="dw-mega-inner">
            <div class="dw-mega-column">
              <div class="dw-mega-column-title">Learn &amp; Connect</div>
              <a href="/case-studies/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Case Studies</p><p class="dw-mega-desc">Real factory results from Thai manufacturers</p></div>
              </a>
              <a href="/news/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">News &amp; Events</p><p class="dw-mega-desc">Seminars, workshops, and factory visits</p></div>
              </a>
              <a href="/blog/" class="dw-mega-item">
                <div class="dw-mega-icon"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
                <div class="dw-mega-info"><p class="dw-mega-title">Insights &amp; Knowledge</p><p class="dw-mega-desc">Technical guides and implementation stories</p></div>
              </a>
            </div>
            <div class="dw-mega-featured">
              <div class="dw-mega-featured-image"><svg aria-hidden="true" viewBox="0 0 120 120"><path d="M30 90V40l30-20 30 20v50" stroke-linecap="round"/><rect x="45" y="55" width="30" height="35" rx="2"/><path d="M60 55v35"/><path d="M45 70h30"/><circle cx="60" cy="30" r="10" fill="rgba(0,175,240,0.3)"/><path d="M57 30l3 3 5-5" stroke-width="2"/></svg></div>
              <div class="dw-mega-featured-content">
                <span class="dw-mega-featured-label">Latest Insight</span>
                <p class="dw-mega-featured-title">BOI Compliance: 10M THB Saved</p>
                <p class="dw-mega-featured-desc">How one factory eliminated supplementary taxes through production-order-level reconciliation.</p>
                <a href="/blog/" class="dw-mega-featured-cta">Read the Story<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- About -->
      <div class="dw-nav-item"><a href="/about-us/" class="dw-nav-link">About</a></div>
    </nav>
    <a href="/contact/" class="dw-header-cta">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span style="vertical-align:middle;">Let's Talk</span>
    </a>
    <div class="dw-lang-toggle" aria-label="Language">
      <a href="/" class="dw-lang-option" data-lang="en" hreflang="en">EN</a>
      <span class="dw-lang-sep">|</span>
      <a href="/th/" class="dw-lang-option" data-lang="th" hreflang="th">\u0e44\u0e17\u0e22</a>
    </div>
    <button class="dw-menu-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
<script>
(function(){
  var h=document.querySelector('.dw-header');
  if(h){window.addEventListener('scroll',function(){h.classList[window.scrollY>50?'add':'remove']('scrolled')})}
  var dd=document.querySelectorAll('.dw-nav-item[data-dropdown]');
  var mob=function(){return window.innerWidth<=1024};
  function closeOthers(ex){dd.forEach(function(o){if(o!==ex){o.classList.remove('active');var m=o.querySelector('.dw-mega-menu');if(m)m.classList.remove('active')}})}
  dd.forEach(function(item){
    var menu=item.querySelector('.dw-mega-menu'),link=item.querySelector('.dw-nav-link');
    item.addEventListener('mouseenter',function(){if(mob())return;closeOthers(item);item.classList.add('active');if(menu)menu.classList.add('active')});
    item.addEventListener('mouseleave',function(){if(mob())return;item.classList.remove('active');if(menu)menu.classList.remove('active')});
    if(link)link.addEventListener('click',function(e){if(menu){e.preventDefault();e.stopPropagation();closeOthers(item);item.classList.toggle('active');menu.classList.toggle('active')}});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.dw-nav-item[data-dropdown]'))closeOthers(null)});
  var tog=document.querySelector('.dw-menu-toggle'),nav=document.querySelector('.dw-nav');
  if(tog&&nav){
    tog.addEventListener('click',function(){var o=nav.classList.toggle('dw-nav--open');tog.classList.toggle('active',o);document.body.style.overflow=o?'hidden':''});
    nav.querySelectorAll('a.dw-nav-link,.dw-mega-item,.dw-mega-viewall').forEach(function(l){l.addEventListener('click',function(){nav.classList.remove('dw-nav--open');tog.classList.remove('active');document.body.style.overflow=''})});
  }
  // Language toggle — safe fallback logic
  var langMap={'/':'/th/','/partner-program/':'/th/partner-program/','/partner-program/business-model/':'/th/partner-program/business-model/','/partner-program/solutions/':'/th/partner-program/solutions/','/partner-program/economics/':'/th/partner-program/economics/','/products/':'/th/products/','/products/erp/':'/th/products/erp/','/products/mes/':'/th/products/mes/','/products/wms/':'/th/products/wms/','/products/aiot/':'/th/products/aiot/','/industries/':'/th/industries/','/industries/automotive/':'/th/industries/automotive/','/industries/electronics/':'/th/industries/electronics/','/industries/metal-plastics/':'/th/industries/metal-plastics/'};
  var revMap={};for(var k in langMap)revMap[langMap[k]]=k;
  var curPath=window.location.pathname;
  var isThai=curPath.indexOf('/th/')===0||curPath==='/th';
  var langOpts=document.querySelectorAll('.dw-lang-option');
  langOpts.forEach(function(el){
    var lang=el.getAttribute('data-lang');
    if(lang==='en'&&!isThai)el.classList.add('active');
    if(lang==='th'&&isThai)el.classList.add('active');
    // Set correct href based on current page
    if(lang==='th'&&!isThai){
      el.href=langMap[curPath]||'/th/';  // fallback to Thai homepage
    }
    if(lang==='en'&&isThai){
      var enPath=revMap[curPath]||(curPath.indexOf('/th/')===0?curPath.slice(3):'/');el.href=enPath||'/';
    }
  });
})();
</script>`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTS: blocks() and css()
// ════════════════════════════════════════════════════════════════

function blocks() {
  const headerHTML = getHeaderHTML();

  return [
    sectionOpen({
      adminLabel: 'Header',
      css: 'selector{position:fixed !important;top:0 !important;left:0 !important;right:0 !important;z-index:999999 !important;padding:0 !important;margin:0 !important;background:transparent !important;width:100% !important;max-width:100% !important;}',
    }),
    rowOpen({
      adminLabel: 'Header Row',
      css: 'selector{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important;}',
    }),
    columnOpen({
      adminLabel: 'Header Column',
      css: 'selector{padding:0 !important;}',
    }),
    codeModule(headerHTML, 'Site Header: Nav + Mega Menu'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function headerCss() {
  // NOTE: This CSS is used ONLY by the inline <style> in getHeaderHTML().
  // The exported css() function returns '' to prevent build-global.js from
  // pushing it to _et_pb_custom_css, where Divi strips @media wrappers
  // and exposes mobile-only rules at desktop width.
  return `
/* ===== HEADER ===== */
/* Divi section wrapper: override overflow:hidden so mega-menu dropdowns are visible */
.et_pb_section.et_pb_section_0_tb_header{overflow:visible !important}
/* Reset Divi's inherited line-height (23.8px from 1.49em×16px) and <p> padding on all header elements */
.dw-header,.dw-header *{line-height:1.6;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto}
.dw-header p,.dw-header h1,.dw-header h2,.dw-header h3{margin:0;padding:0}
.dw-header{background:${SPEC.header.background};backdrop-filter:blur(${SPEC.header.backdropBlur});-webkit-backdrop-filter:blur(${SPEC.header.backdropBlur});box-shadow:0 1px 0 rgba(37,59,80,0.08);position:fixed;top:0;left:0;right:0;z-index:${SPEC.header.zIndex};transition:all ${SPEC.animation.transition}}
.dw-header.scrolled{box-shadow:${SPEC.header.scrollShadow}}
.dw-header-inner{max-width:${SPEC.header.maxWidth};margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:${SPEC.header.height}}

/* Logo */
.dw-logo{display:flex;flex-wrap:wrap;align-items:center;text-decoration:none;transition:transform ${SPEC.animation.transition};gap:0}
.dw-logo:hover{transform:scale(1.02)}
.dw-logo-img{height:auto;display:block}
.dw-logo-img--desktop{width:${SPEC.logo.desktopWidth};display:block}
.dw-logo-img--mobile{width:${SPEC.logo.mobileWidth};display:none}
.dw-logo-since{display:block;width:100%;font-family:${SPEC.nav.fontFamily};font-size:${SPEC.logo.sinceFontSize};font-weight:400;letter-spacing:${SPEC.logo.sinceLetterSpacing};color:${SPEC.logo.sinceColor};margin-top:2px;transition:color ${SPEC.animation.transition}}
.dw-logo:hover .dw-logo-since{color:#00AFF0}

/* Nav */
.dw-nav{display:flex;align-items:center;gap:8px;position:relative;top:auto;left:auto;width:auto;height:auto;background:transparent;flex-direction:row;overflow-y:visible;padding:0;z-index:auto;box-shadow:none}
.dw-nav-item{position:relative;width:auto;border-bottom:none}
.dw-nav-link{font-family:${SPEC.nav.fontFamily};font-size:${SPEC.nav.fontSize};font-weight:${SPEC.nav.fontWeight};color:${SPEC.nav.color};text-decoration:none;padding:20px 24px;display:flex;align-items:center;gap:6px;transition:all ${SPEC.animation.transition};cursor:pointer;position:relative;justify-content:flex-start;width:auto}
.dw-nav-link::after{content:'';position:absolute;bottom:20px;left:20px;right:20px;height:2px;background:${SPEC.nav.underlineGradient};border-radius:2px;transform:scaleX(0);transition:transform ${SPEC.animation.cubicBezier}}
.dw-nav-link:hover{color:${SPEC.nav.hoverColor}}
.dw-nav-link:hover::after{transform:scaleX(1)}
.dw-nav-item.active .dw-nav-link::after{transform:scaleX(1)}
.dw-nav-link svg{width:14px;height:14px;transition:transform ${SPEC.animation.transition};stroke-width:2.5}
.dw-nav-item.active .dw-nav-link svg,.dw-nav-item:hover .dw-nav-link svg{transform:rotate(180deg)}

/* Mega menu */
.dw-mega-menu{position:fixed;top:${SPEC.header.height};left:0;right:0;background:${SPEC.megaMenu.background};box-shadow:${SPEC.megaMenu.shadow};z-index:999998;opacity:0;visibility:hidden;transform:translateY(-10px);transition:all ${SPEC.animation.cubicBezier};display:block;padding:0;width:auto;border-radius:0}
.dw-mega-menu.active{opacity:1;visibility:visible;transform:translateY(0)}
.dw-mega-menu::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:${SPEC.megaMenu.accentBar}}
.dw-mega-inner{max-width:${SPEC.header.maxWidth};margin:0 auto;padding:40px;display:grid;grid-template-columns:1fr 1fr 380px;gap:40px}
.dw-mega-column{display:flex;flex-direction:column;gap:4px}
.dw-mega-column-title{font-family:${SPEC.nav.fontFamily};font-size:12px;font-weight:600;color:${SPEC.megaMenu.columnTitleColor};text-transform:uppercase;letter-spacing:0.1em;padding:0 16px 12px;margin-bottom:8px;border-bottom:1px solid #f1f5f9}
.dw-mega-item{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:10px;text-decoration:none;transition:all 0.2s ease}
.dw-mega-item:hover{background:${SPEC.megaMenu.hoverBg}}
.dw-mega-item:hover .dw-mega-icon{background:${SPEC.featured.ctaBg}}
.dw-mega-item:hover .dw-mega-icon svg{stroke:${SPEC.featured.ctaColor}}
.dw-mega-item:hover .dw-mega-title{color:${SPEC.nav.hoverColor}}
.dw-mega-icon{width:36px;height:36px;min-width:36px;background:${SPEC.megaMenu.iconBg};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s ease}
.dw-mega-icon svg{width:20px;height:20px;stroke:${SPEC.megaMenu.iconStroke};stroke-width:1.5;fill:none;transition:all 0.2s ease}
.dw-mega-info{flex:1;min-width:0}
.dw-mega-title{font-family:${SPEC.nav.fontFamily};font-size:15px;font-weight:500;color:${SPEC.megaMenu.itemTitleColor};margin:0;transition:color 0.2s ease}
.dw-mega-desc{font-family:${SPEC.nav.fontFamily};font-size:13px;color:${SPEC.megaMenu.itemDescColor};margin:2px 0 0;line-height:1.3}

/* Featured panel */
.dw-mega-featured{background:linear-gradient(145deg,#f8fafc 0%,#f1f5f9 100%);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
.dw-mega-featured-image{height:180px;background:${SPEC.featured.imageBg};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.dw-mega-featured-image::before{content:'';position:absolute;top:0;right:0;width:70%;height:100%;background:radial-gradient(ellipse at right,rgba(0,175,240,0.3) 0%,transparent 70%)}
.dw-mega-featured-image svg{width:100px;height:100px;stroke:rgba(0,175,240,0.4);stroke-width:1;fill:none;position:relative;z-index:1}
.dw-mega-featured-content{padding:24px;flex:1;display:flex;flex-direction:column}
.dw-mega-featured-label{font-family:${SPEC.featured.labelFont};font-size:${SPEC.featured.labelSize};font-weight:500;color:${SPEC.featured.labelColor};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px}
.dw-mega-featured-title{font-family:${SPEC.nav.fontFamily};font-size:${SPEC.featured.titleSize};font-weight:700;color:${SPEC.featured.titleColor};margin:0 0 8px;line-height:1.3}
.dw-mega-featured-desc{font-family:${SPEC.nav.fontFamily};font-size:14px;color:${SPEC.featured.descColor};margin:0 0 20px;line-height:1.5;flex:1}
.dw-mega-featured-cta{display:inline-flex;align-items:center;gap:8px;font-family:${SPEC.nav.fontFamily};font-size:14px;font-weight:600;color:${SPEC.featured.ctaColor};background:${SPEC.featured.ctaBg};padding:12px 20px;border-radius:8px;text-decoration:none;transition:all ${SPEC.animation.transition};align-self:flex-start}
.dw-mega-featured-cta:hover{transform:translateY(-2px);box-shadow:${SPEC.featured.ctaShadow}}
.dw-mega-featured-cta svg{width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none;transition:transform 0.2s ease}
.dw-mega-featured-cta:hover svg{transform:translateX(3px)}
.dw-mega-viewall{display:flex;align-items:center;gap:8px;font-family:${SPEC.nav.fontFamily};font-size:14px;font-weight:600;color:${SPEC.nav.hoverColor};padding:16px;margin-top:auto;text-decoration:none;transition:all 0.2s ease;border-top:1px solid #e2e8f0}
.dw-mega-viewall:hover{color:${SPEC.nav.hoverColor};background:${SPEC.megaMenu.hoverBg}}
.dw-mega-viewall svg{width:16px;height:16px;stroke:currentColor;stroke-width:2;fill:none;transition:transform 0.2s ease}
.dw-mega-viewall:hover svg{transform:translateX(4px)}
.dw-mega-header,.dw-mega-content-wrap,.dw-mega-hub{display:none}

/* Language toggle */
.dw-lang-toggle{display:flex;align-items:center;gap:6px;margin-left:16px;font-family:${SPEC.nav.fontFamily};font-size:13px;font-weight:600}
.dw-lang-option{color:${SPEC.nav.color};text-decoration:none;padding:4px 6px;border-radius:4px;transition:all ${SPEC.animation.transition};opacity:0.5}
.dw-lang-option:hover{opacity:0.8}
.dw-lang-option.active{opacity:1;color:${SPEC.nav.hoverColor}}
.dw-lang-sep{color:rgba(37,59,80,0.3);font-weight:400;user-select:none}

/* CTA button */
.dw-header-cta{font-family:${SPEC.nav.fontFamily};font-size:${SPEC.cta.fontSize};font-weight:${SPEC.cta.fontWeight};background:${SPEC.cta.background};color:${SPEC.cta.color} !important;padding:${SPEC.cta.padding};border-radius:${SPEC.cta.borderRadius};text-decoration:none;transition:all ${SPEC.animation.cubicBezier};box-shadow:${SPEC.cta.shadow};position:relative;overflow:hidden;display:inline-flex}
.dw-header-cta::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s ease}
.dw-header-cta:hover::before{left:100%}
.dw-header-cta:hover{transform:translateY(-2px);box-shadow:${SPEC.cta.hoverShadow}}

/* Hamburger */
.dw-menu-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:12px;background:none;border:none;position:static;z-index:auto}
.dw-menu-toggle span{width:24px;height:2px;background:${SPEC.nav.color};transition:all ${SPEC.animation.transition}}
.dw-nav::after{content:none;display:none}

/* ===== RESPONSIVE + REDUCED MOTION ===== */
/* NOTE: @media rules moved to inline <style> in header HTML. */
/* Divi strips @media from _et_pb_custom_css in Theme Builder templates. */`;
}

// Export empty css() — all CSS is inline in <style> inside getHeaderHTML().
// Returning headerCss here would cause build-global.js to push it to
// _et_pb_custom_css, where Divi strips @media wrappers and leaks
// mobile-only rules (display:none, grid-column:1/-1) to desktop.
module.exports = { blocks, css: () => '', SPEC };
