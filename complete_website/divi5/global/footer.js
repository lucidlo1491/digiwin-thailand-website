/**
 * footer.js — Divi 5 Global Footer Builder
 *
 * Dark navy footer with ocean gradient background (CSS-only, no PNG),
 * logo, company info, 3 link columns, social icons, and legal bar.
 * Dynamic year calculation via inline script.
 *
 * ContentSpec: §10 "Footer" — site-wide global element
 */

const fs = require('fs');
const path = require('path');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../lib/modules');

// ────────────────────────────────────────────────────────────────
// SVG Base64 encoding at build time
// ────────────────────────────────────────────────────────────────
const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');

function getSvgDataUri(filename) {
  const filePath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(filePath)) return '';
  const svg = fs.readFileSync(filePath, 'utf8');
  return 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');
}

// ────────────────────────────────────────────────────────────────
// SPEC — Design tokens
// ────────────────────────────────────────────────────────────────
const SPEC = {
  section: {
    background: '#000864',             // --dw-navy
    padding: '80px 0 0 0',
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255,255,255,0.85)',
    accent: '#00AFF0',                 // --dw-blue
  },
  heading: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  link: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.85)',
    hoverColor: '#00AFF0',
  },
  tagline: {
    fontSize: '16px',
    lineHeight: '1.6',
  },
  stock: {
    fontSize: '13px',
    letterSpacing: '0.05em',
  },
  copyright: {
    fontSize: '14px',
  },
  social: {
    size: '48px',
    borderRadius: '8px',
    bgDefault: 'rgba(255,255,255,0.1)',
    bgHover: '#00AFF0',
  },
  grid: {
    columns: '1.5fr 1fr 1fr 1fr',
    gap: '48px',
  },
  inner: {
    maxWidth: '1200px',
    padding: '0 40px',
  },
};

// ════════════════════════════════════════════════════════════════
// FOOTER HTML
// ════════════════════════════════════════════════════════════════

function getFooterHTML() {
  const whiteLogoUri = getSvgDataUri('digiwin-logo-en-white.svg');

  return `<footer class="dw-footer">
  <div class="dw-footer-ocean" aria-hidden="true"></div>
  <div class="dw-footer-inner">
    <div class="dw-footer-grid">
      <div class="dw-footer-brand">
        <div class="dw-footer-logo">
          <img src="${whiteLogoUri}" alt="DigiWin" width="140" height="35">
        </div>
        <p class="dw-footer-tagline"><span class="dw-years">44</span> years of manufacturing intelligence. Helping factories see clearly, act decisively, and grow confidently.</p>
        <p class="dw-footer-stock">Shenzhen Stock Exchange: <strong>300378</strong></p>
      </div>

      <div class="dw-footer-column">
        <p class="dw-footer-heading">Products</p>
        <ul class="dw-footer-links">
          <li><a href="/products.html">All Products</a></li>
          <li><a href="/products/erp.html">ERP: T100 &amp; iGP</a></li>
          <li><a href="/products/mes.html">MES &amp; SFT</a></li>
          <li><a href="/products/wms.html">WMS: sFLS</a></li>
          <li><a href="/products/aiot.html">AIoT &amp; Smart Factory</a></li>
        </ul>
      </div>

      <div class="dw-footer-column">
        <p class="dw-footer-heading">Industries</p>
        <ul class="dw-footer-links">
          <li><a href="/industries.html">All Industries</a></li>
          <li><a href="/industries/automotive.html">Automotive Parts</a></li>
          <li><a href="/industries/electronics.html">Electronics Assembly</a></li>
          <li><a href="/industries/metal-plastics.html">Metal &amp; Plastics</a></li>
        </ul>
        <p class="dw-footer-heading" style="margin-top:24px">Partners</p>
        <ul class="dw-footer-links">
          <li><a href="/partner-program.html">Partner Program</a></li>
          <li><a href="/partner-program/economics.html">Partner Economics</a></li>
        </ul>
        <p class="dw-footer-heading" style="margin-top:24px">Resources</p>
        <ul class="dw-footer-links">
          <li><a href="/case-studies.html">Case Studies</a></li>
          <li><a href="/news.html">News &amp; Events</a></li>
          <li><a href="/blog.html">Insights &amp; Knowledge</a></li>
        </ul>
      </div>

      <div class="dw-footer-column">
        <p class="dw-footer-heading">Contact</p>
        <div class="dw-footer-contact">
          <p><strong>DigiWin Thailand</strong><br>No. 2/117-118, Bangna Complex Office Tower,<br>22nd Floor, Theparat Road,<br>Bangna, Bangkok 10260</p>
          <p><a href="mailto:info@digiwin.co.th">info@digiwin.co.th</a></p>
        </div>
        <div class="dw-footer-social">
          <a href="#" title="LinkedIn">in</a>
          <a href="#" title="Facebook">f</a>
          <a href="#" title="LINE">L</a>
        </div>
      </div>
    </div>

    <div class="dw-footer-bottom">
      <p class="dw-footer-copyright">&copy; <span class="dw-footer-year">2026</span> DigiWin Thailand. All rights reserved.</p>
      <div class="dw-footer-legal">
        <a href="/privacy-policy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
        <a href="/about.html">About Us</a>
      </div>
    </div>
  </div>
</footer>
<script>
(function(){
  var y=new Date().getFullYear();
  var ys=document.querySelector('.dw-years');if(ys)ys.textContent=y-1982;
  var yc=document.querySelector('.dw-footer-year');if(yc)yc.textContent=y;
})();
</script>`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTS: blocks() and css()
// ════════════════════════════════════════════════════════════════

function blocks() {
  return [
    sectionOpen({
      adminLabel: 'Footer',
      css: `selector{padding:0 !important;margin:0 !important;background:${SPEC.section.background} !important;width:100% !important;max-width:100% !important;}`,
    }),
    rowOpen({
      adminLabel: 'Footer Row',
      css: 'selector{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important;}',
    }),
    columnOpen({
      adminLabel: 'Footer Column',
      css: 'selector{padding:0 !important;}',
    }),
    codeModule(getFooterHTML(), 'Site Footer: Links + Contact + Legal'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function footerCss() {
  return `
/* ===== FOOTER ===== */
.dw-footer{background:${SPEC.section.background};color:${SPEC.text.primary};padding:${SPEC.section.padding};position:relative;overflow:hidden}

/* Ocean background — CSS gradient approximation (replaces 418KB PNG) */
.dw-footer-ocean{position:absolute;inset:0;background:
  radial-gradient(ellipse 120% 60% at 50% 100%, rgba(0,175,240,0.08) 0%, transparent 60%),
  radial-gradient(ellipse 80% 40% at 30% 90%, rgba(0,175,240,0.05) 0%, transparent 50%),
  radial-gradient(ellipse 60% 30% at 70% 95%, rgba(0,60,200,0.06) 0%, transparent 40%);
  pointer-events:none;z-index:0;opacity:0.9}

.dw-footer-inner{max-width:${SPEC.inner.maxWidth};margin:0 auto;padding:${SPEC.inner.padding};position:relative;z-index:1}

.dw-footer-grid{display:grid;grid-template-columns:${SPEC.grid.columns};gap:${SPEC.grid.gap};padding-bottom:60px;border-bottom:1px solid rgba(255,255,255,0.1)}

.dw-footer-brand{padding-right:40px}

.dw-footer-logo{margin-bottom:16px}
.dw-footer-logo img{display:block}

.dw-footer-tagline{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.tagline.fontSize};color:${SPEC.text.secondary};line-height:${SPEC.tagline.lineHeight};margin-bottom:24px}

.dw-footer-stock{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.stock.fontSize};color:${SPEC.text.secondary};text-transform:uppercase;letter-spacing:${SPEC.stock.letterSpacing}}
.dw-footer-stock strong{color:${SPEC.text.accent}}

.dw-footer-heading{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.heading.fontSize};font-weight:${SPEC.heading.fontWeight};color:${SPEC.text.primary};text-transform:${SPEC.heading.textTransform};letter-spacing:${SPEC.heading.letterSpacing};margin:0 0 20px 0}

.dw-footer-links{list-style:none;padding:0;margin:0}
.dw-footer-links li{margin-bottom:12px}
.dw-footer-links a{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.link.fontSize};color:${SPEC.link.color};text-decoration:none;transition:color 0.2s ease;display:inline-flex;align-items:center;min-height:44px}
.dw-footer-links a:hover{color:${SPEC.link.hoverColor}}

.dw-footer-contact p{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.link.fontSize};color:${SPEC.text.secondary};line-height:1.6;margin:0 0 16px 0}
.dw-footer-contact a{color:${SPEC.text.accent};text-decoration:none;display:inline-flex;align-items:center;min-height:44px}

.dw-footer-social{display:flex;gap:12px;margin-top:24px}
.dw-footer-social a{width:${SPEC.social.size};height:${SPEC.social.size};background:${SPEC.social.bgDefault};border-radius:${SPEC.social.borderRadius};display:flex;align-items:center;justify-content:center;color:${SPEC.text.primary};text-decoration:none;transition:all 0.2s ease;font-family:${SPEC.heading.fontFamily};font-weight:600}
.dw-footer-social a:hover{background:${SPEC.social.bgHover}}

.dw-footer-bottom{padding:24px 0;display:flex;justify-content:space-between;align-items:center}
.dw-footer-copyright{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.copyright.fontSize};color:${SPEC.text.secondary};margin:0}
.dw-footer-legal{display:flex;gap:24px}
.dw-footer-legal a{font-family:${SPEC.heading.fontFamily};font-size:${SPEC.copyright.fontSize};color:${SPEC.text.secondary};text-decoration:none;transition:color 0.2s ease;padding:15px 0}
.dw-footer-legal a:hover{color:${SPEC.link.hoverColor}}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .dw-footer-grid{grid-template-columns:1fr 1fr}
  .dw-footer-brand{grid-column:1 / -1;padding-right:0}
}
@media(max-width:640px){
  .dw-footer{padding:60px 0 0 0}
  .dw-footer-inner{padding:0 24px}
  .dw-footer-grid{grid-template-columns:1fr;gap:36px}
  .dw-footer-bottom{flex-direction:column;text-align:center;gap:16px}
  .dw-footer-legal{flex-wrap:wrap;justify-content:center}
}

/* ===== REDUCED MOTION ===== */
@media(prefers-reduced-motion:reduce){
  .dw-footer-social a{transition:none}
  .dw-footer-links a{transition:none}
  .dw-footer-legal a{transition:none}
}`;
}

module.exports = { blocks, css: footerCss, SPEC };
