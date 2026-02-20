/**
 * home-industry-tabs.js
 *
 * Divi 5 section builder for Industry Selector Tabs (Section 6 of homepage).
 * ContentSpec §3.6 — Industry Expertise
 *
 * Three JavaScript-powered tabs (Automotive, Electronics, Metal & Plastics).
 * Each tab shows industry-specific features, benefits, and CTA.
 * Placeholder divs for SVG illustrations (to be added later).
 */

const fs = require('fs');
const path = require('path');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

// Extract SVGs from HTML prototype at build time
const PROTO_PATH = path.join(__dirname, '..', '..', '..', 'src', 'pages', 'index.html');

function extractIndustrySVG(industryId) {
  try {
    const html = fs.readFileSync(PROTO_PATH, 'utf8');
    const marker = 'id="industry-' + industryId + '"';
    const start = html.indexOf(marker);
    if (start === -1) return null;
    const svgStart = html.indexOf('<svg', start);
    const svgEnd = html.indexOf('</svg>', svgStart) + 6;
    return html.substring(svgStart, svgEnd);
  } catch (e) { return null; }
}

/**
 * Blocks array — one Code Module containing the entire tab interface
 */
function blocks() {
  const codeHTML = `
    <div class="ind-section">
    <div class="ind-container">
      <!-- Section Header -->
      <div class="ind-header">
        <div class="ind-label">Industry Expertise</div>
        <h2 class="ind-title">Built for Your Industry</h2>
        <p class="ind-subtitle">We don't just understand manufacturing—we understand YOUR manufacturing.</p>
      </div>

      <!-- Tab Bar + Content (centered wrapper) -->
      <div class="ind-content-wrapper-outer">
      <div class="ind-tab-bar">
        <button class="ind-tab ind-tab-active" data-tab="automotive" onclick="dwSwitchTab('automotive')">
          Automotive Parts
        </button>
        <button class="ind-tab" data-tab="electronics" onclick="dwSwitchTab('electronics')">
          Electronics Assembly
        </button>
        <button class="ind-tab" data-tab="metal-plastics" onclick="dwSwitchTab('metal-plastics')">
          Metal & Plastics
        </button>
      </div>

      <!-- Tab Content -->
      <div class="ind-content-wrapper">

        <!-- Tab 1: Automotive Parts -->
        <div class="ind-tab-content ind-tab-active" id="tab-automotive">
          <div class="ind-grid">
            <div class="ind-image-container" id="ind-svg-automotive"></div>
            <div class="ind-text-content">
              <h3 class="ind-content-title">Automotive Parts Manufacturing</h3>
              <p class="ind-content-desc">Thailand is ASEAN's automotive hub. We understand what tier-1 OEMs (Original Equipment Manufacturers) demand: perfect traceability, just-in-time delivery, and EDI (Electronic Data Interchange) integration that works — every time.</p>
              <ul class="ind-features">
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-1)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  OEM EDI integration ready
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-2)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  IATF 16949 compliance support
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-3)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Lot-level traceability for recalls
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-4)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Kanban and just-in-time scheduling
                </li>
              </ul>
              <a href="/industries/automotive.html" class="ind-cta">
                Explore Automotive Solutions
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Tab 2: Electronics Assembly -->
        <div class="ind-tab-content" id="tab-electronics">
          <div class="ind-grid">
            <div class="ind-image-container" id="ind-svg-electronics"></div>
            <div class="ind-text-content">
              <h3 class="ind-content-title">Electronics Assembly</h3>
              <p class="ind-content-desc">High-mix, low-volume. Fast product cycles. Thousands of components per board. We built our MES for exactly this complexity.</p>
              <ul class="ind-features">
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-5)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  SMT (Surface Mount Technology) machine integration
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-6)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Component-level traceability
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-7)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  MSD (Moisture Sensitivity Device) management
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-8)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  AOI (Automated Optical Inspection) integration and defect tracking
                </li>
              </ul>
              <a href="/industries/electronics.html" class="ind-cta">
                Explore Electronics Solutions
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Tab 3: Metal & Plastics -->
        <div class="ind-tab-content" id="tab-metal-plastics">
          <div class="ind-grid">
            <div class="ind-image-container" id="ind-svg-metal"></div>
            <div class="ind-text-content">
              <h3 class="ind-content-title">Metal & Plastics Processing</h3>
              <p class="ind-content-desc">Stamping, injection molding, CNC machining. Process manufacturing where yield optimization and scrap reduction drive your margins.</p>
              <ul class="ind-features">
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-9)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Process parameter monitoring
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-10" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-10)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Mold/die lifecycle management
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-11" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-11)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Scrap analysis and reduction
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ind-check-12" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#003CC8;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="20" height="20" rx="4" fill="url(#ind-check-12)"/>
                    <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Cycle time optimization
                </li>
              </ul>
              <a href="/industries/metal-plastics.html" class="ind-cta">
                Explore Metal & Plastics Solutions
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
    </div>

    <script>
      // Tab switching logic
      function dwSwitchTab(tabName) {
        document.querySelectorAll('.ind-tab').forEach(function(tab) {
          tab.classList.remove('ind-tab-active');
        });
        document.querySelectorAll('.ind-tab-content').forEach(function(content) {
          content.classList.remove('ind-tab-active');
        });
        var selectedTab = document.querySelector('.ind-tab[data-tab="' + tabName + '"]');
        var selectedContent = document.getElementById('tab-' + tabName);
        if (selectedTab) selectedTab.classList.add('ind-tab-active');
        if (selectedContent) selectedContent.classList.add('ind-tab-active');
      }
      // SVG injection (Base64 decoded at runtime — D41 pattern)
      (function(){
        function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
        var svgs=%%IND_SVGS%%;
        for(var k in svgs){var el=document.getElementById('ind-svg-'+k);if(el&&svgs[k])el.innerHTML=u8(svgs[k]);}
        // Reduced-motion: remove all SVG animations
        var rm=window.matchMedia('(prefers-reduced-motion:reduce)');
        function handleMotion(){
          if(rm.matches){
            document.querySelectorAll('.ind-image-container animate,.ind-image-container animateTransform,.ind-image-container animateMotion')
            .forEach(function(el){el.remove()});
          }
        }
        handleMotion();
        if(rm.addEventListener)rm.addEventListener('change',handleMotion);
      })();
    </script>
  `;

  // Build Base64 SVG map at build time
  const svgMap = {};
  ['automotive', 'electronics', 'metal'].forEach(id => {
    const svg = extractIndustrySVG(id);
    if (svg) svgMap[id] = Buffer.from(svg).toString('base64');
  });
  const finalHTML = codeHTML.replace('%%IND_SVGS%%', JSON.stringify(svgMap));

  return [
    sectionOpen({
      adminLabel: 'Industry Tabs',
      css: 'selector{background:transparent !important;padding:0 !important;}'
    }),
    rowOpen({ fullWidth: true }),
    columnOpen(),
    codeModule(finalHTML, 'Industry Tabs: 3 Industries'),
    columnClose(),
    rowClose(),
    sectionClose()
  ];
}

/**
 * Section CSS
 */
function css() {
  return `
/* === INDUSTRY TABS === */
.ind-section{background:#ffffff;padding:100px 80px;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-size:16px}
.ind-container{max-width:1200px;margin:0 auto;padding:0 20px}
.ind-header{text-align:center;margin-bottom:56px}
.ind-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#0369a1;margin-bottom:12px;line-height:1.6}
.ind-title{font-family:'Noto Sans',sans-serif;font-size:44px;font-weight:700;line-height:1.15;color:#000864;margin:0 0 16px 0}
.ind-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;line-height:1.6;color:#5b6b80;margin:0}
.ind-content-wrapper-outer{display:flex;flex-direction:column;align-items:center}
.ind-tab-bar{display:inline-flex;background:#f1f5f9;border-radius:16px 16px 0 0;padding:6px 6px 0 6px;margin-bottom:-1px;position:relative;z-index:2}
.ind-tab{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:500;color:#5b6b80;background:transparent;border:none;padding:14px 28px;cursor:pointer;transition:all 0.25s ease;border-radius:12px 12px 0 0;position:relative}
.ind-tab:hover{color:#0369a1;background:rgba(0,175,240,0.08)}
button.ind-tab.ind-tab-active{background:#ffffff;color:#000864;font-weight:600;box-shadow:0 -2px 8px rgba(0,0,0,0.04)}
button.ind-tab.ind-tab-active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#00AFF0 0%,#003CC8 100%)}
.ind-content-wrapper{background:#ffffff;border-radius:24px;box-shadow:0 12px 48px rgba(0,0,0,0.08);position:relative;z-index:1;width:100%;margin-top:-1px}
.ind-tab-content{display:none;animation:indFadeIn 0.5s ease}
.ind-tab-content.ind-tab-active{display:block}
@keyframes indFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.ind-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:48px;align-items:center}
.ind-image-container{height:450px;background:linear-gradient(145deg,#0f1419 0%,#1a2632 50%,#000864 100%);border-radius:16px;overflow:hidden;position:relative}
.ind-image-container svg{position:absolute;top:0;left:0;width:100%;height:100%}
.ind-text-content{display:flex;flex-direction:column;gap:24px}
.ind-content-title{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:700;line-height:1.6;letter-spacing:-0.02em;color:#000864;margin:0 0 16px}
.ind-content-desc{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:400;line-height:1.75;color:#5b6b80;margin:0 0 28px}
.ind-features{list-style:none !important;padding:0 !important;margin:0 0 36px 0;display:flex;flex-direction:column;gap:8px}
.ind-features li{list-style:none !important;font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#475569;padding:10px 0 10px 32px;position:relative;line-height:1.6}
.ind-features li svg{position:absolute;left:0;top:10px;flex-shrink:0}
.ind-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;color:#ffffff;background:#006dac;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;align-self:flex-start;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.ind-cta:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45);color:#ffffff}
.ind-cta svg{transition:transform 0.3s ease;display:none}
.ind-cta:hover svg{transform:translateX(4px)}
@media(max-width:1024px){.ind-grid{grid-template-columns:1fr;gap:32px;padding:40px}.ind-image-container{height:300px}.ind-title{font-size:36px}.ind-subtitle{font-size:16px}.ind-content-title{font-size:28px}}
@media(max-width:640px){.ind-container{padding:0 16px}.ind-header{margin-bottom:40px}.ind-title{font-size:28px}.ind-subtitle{font-size:15px}.ind-tab-bar{display:flex;flex-direction:column;padding:4px;border-radius:12px;width:100%}.ind-tab{font-size:14px;padding:12px 16px;border-radius:8px}.ind-grid{grid-template-columns:1fr;gap:24px;padding:24px}.ind-image-container{height:250px}.ind-content-title{font-size:24px}.ind-content-desc{font-size:15px}.ind-features li{font-size:14px;padding:8px 0 8px 28px}.ind-features li svg{width:18px;height:18px;top:8px}.ind-cta{font-size:15px}}
@media(prefers-reduced-motion:reduce){.ind-tab-content{animation:none !important}.ind-tab,.ind-cta,.ind-cta svg{transition:none !important}}`;
}

module.exports = { blocks, css };
