/**
 * th-news-hero.js — Thai News Hero Section (S1)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-hero.js + i18n/th/news.js hero
 */

const base = require('../../lib/templates/_base');
const en = require('./news-hero');
const th = require('../../i18n/th/news');

const P = 'hero'; // Same CSS prefix as English
const D = th.hero;

function blocks() {
  const html = `
    <div class="${P}-illustration">
                <svg aria-hidden="true" viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <rect x="320" y="60" width="200" height="180" rx="12" stroke="#00AFF0" stroke-width="1.2"/>
                    <line x1="320" y1="100" x2="520" y2="100" stroke="#00AFF0" stroke-width="0.8"/>
                    <line x1="370" y1="100" x2="370" y2="240" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>
                    <line x1="420" y1="100" x2="420" y2="240" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>
                    <line x1="470" y1="100" x2="470" y2="240" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>
                    <line x1="320" y1="140" x2="520" y2="140" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>
                    <line x1="320" y1="180" x2="520" y2="180" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>
                    <line x1="320" y1="220" x2="520" y2="220" stroke="#00AFF0" stroke-width="0.5" stroke-dasharray="4 4"/>

                    <line x1="380" y1="45" x2="380" y2="75" stroke="#00AFF0" stroke-width="1.5" stroke-linecap="round"/>
                    <line x1="460" y1="45" x2="460" y2="75" stroke="#00AFF0" stroke-width="1.5" stroke-linecap="round"/>

                    <rect x="371" y="141" width="48" height="38" rx="4" fill="#00AFF0" fill-opacity="0.15"/>

                    <circle cx="200" cy="160" r="6" stroke="#00AFF0" stroke-width="1.2"/>
                    <circle cx="280" cy="120" r="4" stroke="#00AFF0" stroke-width="1"/>
                    <circle cx="260" cy="220" r="5" stroke="#00AFF0" stroke-width="1"/>
                    <circle cx="160" cy="280" r="4" stroke="#00AFF0" stroke-width="1"/>
                    <circle cx="300" cy="300" r="6" stroke="#00AFF0" stroke-width="1.2"/>
                    <circle cx="400" cy="320" r="5" stroke="#00AFF0" stroke-width="1"/>

                    <line x1="206" y1="158" x2="276" y2="122" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="6 4"/>
                    <line x1="198" y1="166" x2="262" y2="216" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="6 4"/>
                    <line x1="264" y1="224" x2="296" y2="296" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="6 4"/>
                    <line x1="306" y1="300" x2="396" y2="320" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="6 4"/>
                    <line x1="164" y1="278" x2="294" y2="302" stroke="#00AFF0" stroke-width="0.8" stroke-dasharray="6 4"/>

                    <circle cx="140" cy="380" r="40" stroke="#00AFF0" stroke-width="1" stroke-dasharray="8 4"/>
                    <line x1="140" y1="380" x2="140" y2="352" stroke="#00AFF0" stroke-width="1.2" stroke-linecap="round"/>
                    <line x1="140" y1="380" x2="160" y2="390" stroke="#00AFF0" stroke-width="1.2" stroke-linecap="round"/>

                    <line x1="140" y1="342" x2="140" y2="346" stroke="#00AFF0" stroke-width="0.8"/>
                    <line x1="178" y1="380" x2="174" y2="380" stroke="#00AFF0" stroke-width="0.8"/>
                    <line x1="140" y1="418" x2="140" y2="414" stroke="#00AFF0" stroke-width="0.8"/>
                    <line x1="102" y1="380" x2="106" y2="380" stroke="#00AFF0" stroke-width="0.8"/>

                    <circle cx="450" cy="380" r="2" fill="#00AFF0" fill-opacity="0.3"/>
                    <circle cx="480" cy="400" r="1.5" fill="#00AFF0" fill-opacity="0.2"/>
                    <circle cx="350" cy="420" r="2" fill="#00AFF0" fill-opacity="0.25"/>
                    <circle cx="240" cy="350" r="1.5" fill="#00AFF0" fill-opacity="0.2"/>
                    <circle cx="100" cy="100" r="2" fill="#00AFF0" fill-opacity="0.2"/>
                    <circle cx="140" cy="140" r="1.5" fill="#00AFF0" fill-opacity="0.15"/>
                </svg>
            </div>
            <div class="${P}-inner">
                <div class="${P}-badge">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${D.badge}
                </div>
                <h1>${D.title}</h1>
                <p class="${P}-subtitle">${D.subtitle}</p>
                <div class="${P}-stats">
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${D.stats[0].value}</div>
                        <div class="${P}-stat-label">${D.stats[0].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${D.stats[1].value}</div>
                        <div class="${P}-stat-label">${D.stats[1].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${D.stats[2].value}</div>
                        <div class="${P}-stat-label">${D.stats[2].label}</div>
                    </div>
                </div>
            </div>
            <div class="super-d-marker" style="display:none"></div>
            <script>
(function(){
  function injectSuperD(){
    var marker = document.querySelector('.super-d-marker');
    if(!marker) return;
    var el = marker;
    var section = null;
    while(el){
      if(el.classList && el.classList.contains('et_pb_section')){section=el;break;}
      if(el.classList && el.classList.contains('news-hero')){section=el;break;}
      el = el.parentElement;
    }
    if(!section) return;
    section.style.position = 'relative';
    var d = document.createElement('div');
    d.setAttribute('aria-hidden','true');
    d.style.cssText = 'position:absolute;left:30%;top:36%;transform:translateY(-50%);width:36%;height:95%;background:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTA0IiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwNCIgZmlsbD0ibm9uZSI+CiAgPCEtLSBEaWdpV2luIFN1cGVyIEQgLSBPdXRsaW5lIHZhcmlhbnQgKHN0cm9rZS1vbmx5LCBmb3IgZGFyayBoZXJvIGJhY2tncm91bmRzKSAtLT4KICA8IS0tIFNjYWxlZCBmcm9tIGQtbWFyayAoMTYuNzPDlzE2Ljg5KSBieSB+MzB4IGZvciBiYWNrZ3JvdW5kIHVzZSAtLT4KICA8IS0tIEFyYyBzaGFwZSAtLT4KICA8cGF0aCBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgZD0iTSAwIDUwNCBDIDAgNDUzLjggNDAuNyA0MTMuMyA5MC43IDQxMy4zIEwgMjQ3IDQxMy4zIEMgMzM2LjEgNDEzLjMgNDA4LjUgMzQxLjEgNDA4LjUgMjUyIEMgNDA4LjUgMTYyLjkgMzM2LjEgOTAuNyAyNDcgOTAuNyBMIDkwLjcgOTAuNyBDIDQwLjcgOTAuNyAwIDUwIDAgMCBMIDI0NyAwIEMgMzg2LjIgMCA0OTkgMTEyLjggNDk5IDI1MiBDIDQ5OSAzOTEuMiAzODYuMiA1MDQgMjQ3IDUwNCBaIi8+CiAgPCEtLSBDaXJjbGUvZG90IC0tPgogIDxwYXRoIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBkPSJNIDI2LjcgMjUyIEMgMjYuNyAyMTYuMSA1NS45IDE4Ni45IDkxLjggMTg2LjkgQyAxMjcuNiAxODYuOSAxNTYuOCAyMTYuMSAxNTYuOCAyNTIgQyAxNTYuOCAyODcuOCAxMjcuNiAzMTcgOTEuOCAzMTcgQyA1NS45IDMxNyAyNi43IDI4Ny44IDI2LjcgMjUyIi8+Cjwvc3ZnPgo=") no-repeat center center;background-size:contain;opacity:0.15;pointer-events:none;z-index:0;';
    section.insertBefore(d, section.firstChild);
  }
  if(document.readyState==='complete') setTimeout(injectSuperD,200);
  else window.addEventListener('load',function(){setTimeout(injectSuperD,200);});
})();
            </script>`;

  return base.wrapInDiviSection('Hero', html, 'Hero: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
