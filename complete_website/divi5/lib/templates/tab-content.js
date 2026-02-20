/**
 * tab-content.js — Tabbed content panels with JS switching
 *
 * White/light background section with centered header, horizontal tab bar,
 * and content panels. Each tab panel has a 2-column grid: image/illustration
 * area (left) + text content with feature checklist (right).
 *
 * Supports SVG illustrations via Base64 injection at build time.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,
 *   background?: string,             // default: '#ffffff'
 *   header: { label, title, subtitle },
 *   tabs: [{
 *     id: string,                     // unique tab ID (e.g. 'automotive')
 *     label: string,                  // tab button text
 *     title: string,                  // content panel title (h3)
 *     description: string,            // content panel description
 *     features: string[],             // checklist items
 *     cta: { text, href },            // per-tab CTA button
 *     svgBase64?: string,             // optional Base64-encoded SVG for illustration
 *   }],
 *   extractSvg?: function(tabId),     // optional build-time SVG extractor
 * }
 */

'use strict';

const base = require('./_base');
const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../modules');

const schema = {
  name: 'tab-content',
  description: 'Tabbed content panels with image + feature checklist',
  category: 'DigiWin Templates',
};

// Reusable gradient checkbox SVG (single gradient def, referenced by all items)
function checkSvg(gradientId) {
  return `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00AFF0;stop-opacity:1"/><stop offset="100%" style="stop-color:#003CC8;stop-opacity:1"/></linearGradient></defs><rect width="20" height="20" rx="4" fill="url(#${gradientId})"/><path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

const arrowSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function blocks(data) {
  const p = data.sectionPrefix;

  // Build tab buttons
  const tabBarHTML = data.tabs.map((tab, i) =>
    `<button class="${p}-tab${i === 0 ? ` ${p}-tab-active` : ''}" data-tab="${tab.id}" onclick="dwSwitchTab_${p}('${tab.id}')">${tab.label}</button>`
  ).join('\n        ');

  // Build tab content panels
  const tabPanelsHTML = data.tabs.map((tab, i) => {
    const featuresHTML = tab.features.map((feat, fi) =>
      `<li>${checkSvg(`${p}-check-${tab.id}-${fi}`)}${feat}</li>`
    ).join('\n                ');

    return `
        <div class="${p}-tab-content${i === 0 ? ` ${p}-tab-active` : ''}" id="${p}-tab-${tab.id}">
          <div class="${p}-grid">
            <div class="${p}-image-container" id="${p}-svg-${tab.id}"></div>
            <div class="${p}-text-content">
              <h3 class="${p}-content-title">${tab.title}</h3>
              <p class="${p}-content-desc">${tab.description}</p>
              <ul class="${p}-features">
                ${featuresHTML}
              </ul>
              <a href="${tab.cta.href}" class="${p}-cta">${tab.cta.text}${arrowSvg}</a>
            </div>
          </div>
        </div>`;
  }).join('\n');

  // Build SVG map for Base64 injection
  const svgMap = {};
  data.tabs.forEach(tab => {
    if (tab.svgBase64) {
      svgMap[tab.id] = tab.svgBase64;
    } else if (data.extractSvg) {
      const svg = data.extractSvg(tab.id);
      if (svg) svgMap[tab.id] = Buffer.from(svg).toString('base64');
    }
  });

  const html = `
    <div class="${p}-section">
    <div class="${p}-container">
      <div class="${p}-header">
        <div class="${p}-label">${data.header.label}</div>
        <h2 class="${p}-title">${data.header.title}</h2>
        <p class="${p}-subtitle">${data.header.subtitle}</p>
      </div>

      <div class="${p}-content-wrapper-outer">
      <div class="${p}-tab-bar">
        ${tabBarHTML}
      </div>

      <div class="${p}-content-wrapper">
        ${tabPanelsHTML}
      </div>
      </div>
    </div>
    </div>

    <script>
      function dwSwitchTab_${p}(tabName) {
        document.querySelectorAll('.${p}-tab').forEach(function(tab) {
          tab.classList.remove('${p}-tab-active');
        });
        document.querySelectorAll('.${p}-tab-content').forEach(function(content) {
          content.classList.remove('${p}-tab-active');
        });
        var selectedTab = document.querySelector('.${p}-tab[data-tab="' + tabName + '"]');
        var selectedContent = document.getElementById('${p}-tab-' + tabName);
        if (selectedTab) selectedTab.classList.add('${p}-tab-active');
        if (selectedContent) selectedContent.classList.add('${p}-tab-active');
      }
      (function(){
        function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
        var svgs=${JSON.stringify(svgMap)};
        for(var k in svgs){var el=document.getElementById('${p}-svg-'+k);if(el&&svgs[k])el.innerHTML=u8(svgs[k]);}
        var rm=window.matchMedia('(prefers-reduced-motion:reduce)');
        function handleMotion(){
          if(rm.matches){
            document.querySelectorAll('.${p}-image-container animate,.${p}-image-container animateTransform,.${p}-image-container animateMotion')
            .forEach(function(el){el.remove()});
          }
        }
        handleMotion();
        if(rm.addEventListener)rm.addEventListener('change',handleMotion);
      })();
    </script>`;

  return [
    sectionOpen({
      adminLabel: data.adminLabel,
      css: 'selector{background:transparent !important;padding:0 !important;}',
    }),
    rowOpen({ fullWidth: true }),
    columnOpen(),
    codeModule(html, `${data.adminLabel}: Content`),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css(data) {
  const p = data.sectionPrefix;
  const bg = data.background || '#ffffff';

  return `
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{background:${bg};padding:100px 80px;${base.fontSmoothingReset(p)}font-size:16px}
.${p}-container{max-width:1200px;margin:0 auto;padding:0 20px}
.${p}-header{text-align:center;margin-bottom:56px}
.${p}-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#0369a1;margin-bottom:12px;line-height:1.6}
.${p}-title{font-family:'Noto Sans',sans-serif;font-size:44px;font-weight:700;line-height:1.15;color:${base.COLORS.navy};margin:0 0 16px 0}
.${p}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;line-height:1.6;color:#5b6b80;margin:0}
.${p}-content-wrapper-outer{display:flex;flex-direction:column;align-items:center}
.${p}-tab-bar{display:inline-flex;background:#f1f5f9;border-radius:16px 16px 0 0;padding:6px 6px 0 6px;margin-bottom:-1px;position:relative;z-index:2}
.${p}-tab{font-family:'Noto Sans',sans-serif;font-size:14px;font-weight:500;color:#5b6b80;background:transparent;border:none;padding:14px 28px;cursor:pointer;transition:all 0.25s ease;border-radius:12px 12px 0 0;position:relative}
.${p}-tab:hover{color:#0369a1;background:rgba(0,175,240,0.08)}
button.${p}-tab.${p}-tab-active{background:#ffffff;color:${base.COLORS.navy};font-weight:600;box-shadow:0 -2px 8px rgba(0,0,0,0.04)}
button.${p}-tab.${p}-tab-active::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#00AFF0 0%,#003CC8 100%)}
.${p}-content-wrapper{background:#ffffff;border-radius:24px;box-shadow:0 12px 48px rgba(0,0,0,0.08);position:relative;z-index:1;width:100%;margin-top:-1px}
.${p}-tab-content{display:none;animation:${p}FadeIn 0.5s ease}
.${p}-tab-content.${p}-tab-active{display:block}
@keyframes ${p}FadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.${p}-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:48px;align-items:center}
.${p}-image-container{height:450px;background:linear-gradient(145deg,#0f1419 0%,#1a2632 50%,#000864 100%);border-radius:16px;overflow:hidden;position:relative}
.${p}-image-container svg{position:absolute;top:0;left:0;width:100%;height:100%}
.${p}-text-content{display:flex;flex-direction:column;gap:24px}
.${p}-content-title{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:700;line-height:1.6;letter-spacing:-0.02em;color:${base.COLORS.navy};margin:0 0 16px}
.${p}-content-desc{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:400;line-height:1.75;color:#5b6b80;margin:0 0 28px}
.${p}-features{list-style:none !important;padding:0 !important;margin:0 0 36px 0;display:flex;flex-direction:column;gap:8px}
.${p}-features li{list-style:none !important;font-family:'Noto Sans',sans-serif;font-size:15px;font-weight:400;color:#475569;padding:10px 0 10px 32px;position:relative;line-height:1.6}
.${p}-features li svg{position:absolute;left:0;top:10px;flex-shrink:0}
.${p}-cta{display:inline-flex;align-items:center;gap:8px;font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;color:#ffffff;background:#006dac;padding:16px 32px;border-radius:8px;text-decoration:none;transition:all 0.3s ease;align-self:flex-start;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.${p}-cta:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45);color:#ffffff}
.${p}-cta svg{transition:transform 0.3s ease;display:none}
.${p}-cta:hover svg{transform:translateX(4px)}
@media(max-width:1024px){.${p}-grid{grid-template-columns:1fr;gap:32px;padding:40px}.${p}-image-container{height:300px}.${p}-title{font-size:36px}.${p}-subtitle{font-size:16px}.${p}-content-title{font-size:28px}}
@media(max-width:640px){.${p}-container{padding:0 16px}.${p}-header{margin-bottom:40px}.${p}-title{font-size:28px}.${p}-subtitle{font-size:15px}.${p}-tab-bar{display:flex;flex-direction:column;padding:4px;border-radius:12px;width:100%}.${p}-tab{font-size:14px;padding:12px 16px;border-radius:8px}.${p}-grid{grid-template-columns:1fr;gap:24px;padding:24px}.${p}-image-container{height:250px}.${p}-content-title{font-size:24px}.${p}-content-desc{font-size:15px}.${p}-features li{font-size:14px;padding:8px 0 8px 28px}.${p}-features li svg{width:18px;height:18px;top:8px}.${p}-cta{font-size:15px}}
${base.reducedMotion(`.${p}-tab-content{animation:none !important}.${p}-tab,.${p}-cta,.${p}-cta svg{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css, schema };
