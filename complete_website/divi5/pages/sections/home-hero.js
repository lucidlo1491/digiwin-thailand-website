/**
 * home-hero.js — Homepage Hero Section Builder (Code Module Approach)
 *
 * ONE Code Module contains the entire hero HTML.
 * CSS Grid handles the 2-panel split. No Divi column layout dependencies.
 * SVGs are Base64-injected at runtime (wp_kses bypass).
 * Scripts go in a separate wp:html block (won't execute in Code Modules).
 *
 * ContentSpec: §3.1 "Hero Section — Dual Panel" (lines 99-196)
 */

const { codeModule, htmlBlock, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

// ────────────────────────────────────────────────────────────────
// SPEC — Design tokens from ContentSpec_Home_Divi5_2.0.md §3.1
// ────────────────────────────────────────────────────────────────
const SPEC = {
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    colorFactory: '#00AFF0',
    colorPartner: 'rgba(255,255,255,0.9)',
  },
  title: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: 'clamp(32px, 3.5vw, 52px)',
    fontWeight: '700',
    lineHeight: '1.1',
    letterSpacing: '-0.03em',
    color: '#fff',
    marginBottom: '24px',
  },
  subtitle: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.75',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: '36px',
  },
  cta: {
    fontFamily: "'Noto Sans', sans-serif",
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    padding: '14px 32px',
    primaryBg: '#00AFF0',
    secondaryBorder: 'rgba(255,255,255,0.3)',
  },
};

// ════════════════════════════════════════════════════════════════
// SVG ILLUSTRATIONS (Base64-encoded at build time for KSES bypass)
// ════════════════════════════════════════════════════════════════

function getFactorySVGRaw() {
  return '<svg aria-hidden="true" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">'
+'<defs>'
+'<linearGradient id="dw-f-ghost-fade" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0369a1" stop-opacity="0.4"/><stop offset="100%" stop-color="#0369a1" stop-opacity="0.05"/></linearGradient>'
+'<linearGradient id="dw-f-reality-solid" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0369a1" stop-opacity="0.7"/><stop offset="100%" stop-color="#0369a1" stop-opacity="0.4"/></linearGradient>'
+'<filter id="dw-f-ghost-blur"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
+'<pattern id="dw-f-excel-grid" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="none" stroke="rgba(0,175,240,0.15)" stroke-width="0.5"/></pattern>'
+'</defs>'
+'<g transform="translate(420,80)">'
+'<rect x="0" y="0" width="280" height="220" fill="none" stroke="rgba(0,175,240,0.25)" stroke-width="2" rx="8"/>'
+'<line x1="0" y1="55" x2="280" y2="55" stroke="rgba(0,175,240,0.2)" stroke-width="2"/>'
+'<line x1="0" y1="110" x2="280" y2="110" stroke="rgba(0,175,240,0.2)" stroke-width="2"/>'
+'<line x1="0" y1="165" x2="280" y2="165" stroke="rgba(0,175,240,0.2)" stroke-width="2"/>'
+'<line x1="95" y1="0" x2="95" y2="220" stroke="rgba(0,175,240,0.15)" stroke-width="1"/>'
+'<line x1="190" y1="0" x2="190" y2="220" stroke="rgba(0,175,240,0.15)" stroke-width="1"/>'
+'<rect x="15" y="15" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.5)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/></rect>'
+'<rect x="110" y="15" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.5)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.4;0.7;0.4" dur="2.5s" repeatCount="indefinite"/></rect>'
+'<rect x="205" y="15" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.5)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite"/></rect>'
+'<rect x="15" y="70" width="60" height="30" fill="url(#dw-f-reality-solid)" stroke="#00AFF0" stroke-width="1.5" rx="4"/>'
+'<rect x="110" y="70" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.4)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.8s" repeatCount="indefinite"/></rect>'
+'<rect x="205" y="70" width="60" height="30" fill="url(#dw-f-reality-solid)" stroke="#00AFF0" stroke-width="1.5" rx="4"/>'
+'<rect x="15" y="125" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.4)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.25;0.55;0.25" dur="3.2s" repeatCount="indefinite"/></rect>'
+'<rect x="110" y="125" width="60" height="30" fill="url(#dw-f-reality-solid)" stroke="#00AFF0" stroke-width="1.5" rx="4"/>'
+'<rect x="205" y="125" width="60" height="30" fill="url(#dw-f-ghost-fade)" stroke="rgba(0,175,240,0.4)" stroke-width="1" stroke-dasharray="4 2" rx="4" filter="url(#dw-f-ghost-blur)"><animate attributeName="opacity" values="0.35;0.6;0.35" dur="2.6s" repeatCount="indefinite"/></rect>'
+'<g transform="translate(0,180)"><text x="45" y="25" text-anchor="middle" fill="rgba(0,175,240,0.4)" font-family="JetBrains Mono,monospace" font-size="10" font-weight="500">SYS:100</text><text x="140" y="25" text-anchor="middle" fill="#00AFF0" font-family="JetBrains Mono,monospace" font-size="10" font-weight="600">REAL:47</text><text x="235" y="25" text-anchor="middle" fill="rgba(255,100,100,0.7)" font-family="JetBrains Mono,monospace" font-size="9">\u0394 -53</text></g>'
+'</g>'
+'<g transform="translate(450,320)">'
+'<rect x="0" y="0" width="180" height="130" fill="url(#dw-f-excel-grid)" stroke="rgba(0,175,240,0.3)" stroke-width="1.5" rx="6"/>'
+'<rect x="0" y="0" width="180" height="20" fill="rgba(0,175,240,0.15)" rx="6"/><rect x="0" y="14" width="180" height="6" fill="rgba(0,175,240,0.15)"/>'
+'<circle cx="12" cy="10" r="4" fill="rgba(255,100,100,0.5)"/><circle cx="26" cy="10" r="4" fill="rgba(255,200,100,0.5)"/><circle cx="40" cy="10" r="4" fill="rgba(100,200,100,0.5)"/>'
+'<g><rect x="190" y="-20" width="35" height="25" fill="url(#dw-f-excel-grid)" stroke="rgba(0,175,240,0.2)" rx="3" transform="rotate(15)"><animateTransform attributeName="transform" type="translate" values="0,0;30,-40;60,-30" dur="4s" repeatCount="indefinite" additive="sum"/><animate attributeName="opacity" values="0.6;0.3;0" dur="4s" repeatCount="indefinite"/></rect>'
+'<rect x="200" y="60" width="28" height="22" fill="url(#dw-f-excel-grid)" stroke="rgba(0,175,240,0.2)" rx="3" transform="rotate(-10)"><animateTransform attributeName="transform" type="translate" values="0,0;40,20;70,50" dur="5s" repeatCount="indefinite" additive="sum"/><animate attributeName="opacity" values="0.5;0.25;0" dur="5s" repeatCount="indefinite"/></rect>'
+'<rect x="195" y="120" width="32" height="20" fill="url(#dw-f-excel-grid)" stroke="rgba(0,175,240,0.2)" rx="3" transform="rotate(8)"><animateTransform attributeName="transform" type="translate" values="0,0;25,35;55,70" dur="4.5s" repeatCount="indefinite" additive="sum"/><animate attributeName="opacity" values="0.55;0.2;0" dur="4.5s" repeatCount="indefinite"/></rect></g>'
+'<text x="90" y="80" text-anchor="middle" fill="rgba(0,175,240,0.25)" font-family="JetBrains Mono,monospace" font-size="14" font-weight="600" letter-spacing="0.15em">SHADOW.xlsx</text>'
+'</g>'
+'<g transform="translate(30,100)">'
+'<path d="M0 0 Q60 -20 120 0 T240 -10" fill="none" stroke="rgba(0,175,240,0.5)" stroke-width="3" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0,300;150,150;300,0" dur="3s" repeatCount="indefinite"/></path>'
+'<path d="M280 -5 L320 15 L340 -20" fill="none" stroke="rgba(255,100,100,0.4)" stroke-width="2" stroke-dasharray="8 4"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/></path>'
+'<circle r="5" fill="#00AFF0"><animateMotion dur="2.5s" repeatCount="indefinite" path="M0 0 Q60 -20 120 0 T240 -10"/><animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite"/></circle>'
+'<circle r="4" fill="rgba(255,100,100,0.6)"><animateMotion dur="3s" repeatCount="indefinite" path="M280 -5 L320 15 L340 -20"/><animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite"/></circle>'
+'</g>'
+'<g transform="translate(50,350)">'
+'<g><circle cx="30" cy="100" r="25" fill="none" stroke="rgba(255,150,100,0.3)" stroke-width="2"><animate attributeName="cy" values="150;50;-50" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.8;0" dur="6s" repeatCount="indefinite"/><animate attributeName="r" values="15;30;40" dur="6s" repeatCount="indefinite"/></circle>'
+'<text x="30" y="105" text-anchor="middle" fill="rgba(255,150,100,0.6)" font-family="Noto Sans" font-size="11" font-weight="600"><animate attributeName="y" values="155;55;-45" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite"/>$$$</text></g>'
+'<g transform="translate(100,30)"><circle cx="25" cy="100" r="20" fill="none" stroke="rgba(255,150,100,0.25)" stroke-width="2"><animate attributeName="cy" values="140;60;-20" dur="7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.7;0" dur="7s" repeatCount="indefinite"/></circle>'
+'<text x="25" y="105" text-anchor="middle" fill="rgba(255,150,100,0.5)" font-family="Noto Sans" font-size="9"><animate attributeName="y" values="145;65;-15" dur="7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.9;0" dur="7s" repeatCount="indefinite"/>COST</text></g>'
+'</g>'
+'<g transform="translate(580,450)" opacity="0.15">'
+'<path d="M0 100 L0 60 L30 60 L30 40 L60 40 L60 20 L90 20 L90 40 L120 40 L120 60 L150 60 L150 100 Z" fill="none" stroke="#00AFF0" stroke-width="2"/>'
+'<rect x="20" y="70" width="25" height="25" fill="#00AFF0" opacity="0.3" rx="2"/><rect x="60" y="50" width="30" height="45" fill="#00AFF0" opacity="0.3" rx="2"/><rect x="105" y="65" width="20" height="30" fill="#00AFF0" opacity="0.3" rx="2"/>'
+'</g>'
+'</svg>';
}

function getPartnerSVGRaw() {
  return '<svg aria-hidden="true" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">'
+'<defs>'
+'<linearGradient id="dw-p-freedom-gradient" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#fef3c7" stop-opacity="0.2"/><stop offset="100%" stop-color="#fef3c7" stop-opacity="0.6"/></linearGradient>'
+'<linearGradient id="dw-p-cage-gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/></linearGradient>'
+'<filter id="dw-p-glow-warm"><feGaussianBlur stdDeviation="3" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
+'</defs>'
+'<g transform="translate(50,150)">'
+'<line x1="0" y1="0" x2="0" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="4" stroke-linecap="round"/>'
+'<line x1="40" y1="0" x2="40" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="4" stroke-linecap="round"/>'
+'<line x1="80" y1="0" x2="80" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round"/>'
+'<path d="M120 0 Q140 60 160 90 Q180 120 200 130" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"><animate attributeName="d" values="M120 0 L120 180;M120 0 Q140 60 160 90 Q180 120 200 130" dur="2s" fill="freeze" begin="indefinite" data-freeze="1"/></path>'
+'<line x1="-10" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>'
+'<line x1="-10" y1="180" x2="130" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>'
+'<text x="60" y="100" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-family="JetBrains Mono,monospace" font-size="12" font-weight="600" transform="rotate(-90,60,100)">MAN-DAY</text>'
+'<circle r="4" fill="#fef3c7"><animate attributeName="cx" values="100;180;260" dur="3s" repeatCount="indefinite"/><animate attributeName="cy" values="90;60;30" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/></circle>'
+'<circle r="3" fill="#fef3c7"><animate attributeName="cx" values="110;200;290" dur="3.5s" repeatCount="indefinite"/><animate attributeName="cy" values="100;80;50" dur="3.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.8;0" dur="3.5s" repeatCount="indefinite"/></circle>'
+'<circle r="5" fill="rgba(254,243,199,0.8)"><animate attributeName="cx" values="95;170;250" dur="2.8s" repeatCount="indefinite"/><animate attributeName="cy" values="85;45;10" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite"/></circle>'
+'</g>'
+'<g transform="translate(380,80)">'
+'<line x1="0" y1="120" x2="350" y2="120" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="20 10"/>'
+'<text x="175" y="145" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="JetBrains Mono,monospace" font-size="10" letter-spacing="0.1em">REVENUE CAP</text>'
+'<path d="M20 280 L70 250 L120 230 L170 200 L220 150 L270 90 L320 20" fill="none" stroke="url(#dw-p-freedom-gradient)" stroke-width="4" stroke-linecap="round" filter="url(#dw-p-glow-warm)"><animate attributeName="stroke-dasharray" values="0,600;600,0" dur="2.5s" fill="freeze" begin="indefinite" data-freeze="1"/></path>'
+'<g transform="translate(320,20)"><polygon points="0,0 -15,20 -5,15 -8,30 8,30 5,15 15,20" fill="#fef3c7" opacity="0.9"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></polygon></g>'
+'<g transform="translate(280,100)"><circle cx="0" cy="0" r="3" fill="#fef3c7"><animate attributeName="cx" values="0;-30;-50" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="0;-20;-40" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.5;0" dur="2s" repeatCount="indefinite"/></circle>'
+'<circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.8)"><animate attributeName="cx" values="0;30;60" dur="2.2s" repeatCount="indefinite"/><animate attributeName="cy" values="0;-25;-55" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.6;0" dur="2.2s" repeatCount="indefinite"/></circle>'
+'<circle cx="0" cy="0" r="4" fill="#fef3c7"><animate attributeName="cx" values="0;10;25" dur="1.8s" repeatCount="indefinite"/><animate attributeName="cy" values="0;-35;-70" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.7;0" dur="1.8s" repeatCount="indefinite"/></circle></g>'
+'</g>'
+'<g transform="translate(450,380)">'
+'<path d="M0 0 Q50 30 100 20" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><animate attributeName="stroke-dasharray" values="0,200;100,100;200,0" dur="3s" repeatCount="indefinite"/></path>'
+'<path d="M0 40 Q50 50 100 30" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"><animate attributeName="stroke-dasharray" values="0,200;100,100;200,0" dur="3.3s" repeatCount="indefinite"/></path>'
+'<path d="M0 80 Q50 70 100 40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><animate attributeName="stroke-dasharray" values="0,200;100,100;200,0" dur="3.6s" repeatCount="indefinite"/></path>'
+'<path d="M100 30 Q150 35 200 10 Q250 -15 300 -50" fill="none" stroke="url(#dw-p-freedom-gradient)" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0,400;200,200;400,0" dur="2.5s" repeatCount="indefinite"/></path>'
+'<text x="10" y="-10" fill="rgba(255,255,255,0.3)" font-family="JetBrains Mono,monospace" font-size="8">LICENSE</text>'
+'<text x="10" y="32" fill="rgba(255,255,255,0.3)" font-family="JetBrains Mono,monospace" font-size="8">SERVICE</text>'
+'<text x="10" y="72" fill="rgba(255,255,255,0.3)" font-family="JetBrains Mono,monospace" font-size="8">RECURRING</text>'
+'<text x="200" y="5" fill="rgba(254,243,199,0.5)" font-family="JetBrains Mono,monospace" font-size="9" font-weight="600">COMPOUND</text>'
+'</g>'
+'<g transform="translate(180,380)">'
+'<circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite"/></circle>'
+'<line x1="50" y1="50" x2="50" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="30s" repeatCount="indefinite"/></line>'
+'<line x1="50" y1="50" x2="70" y2="50" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="120s" repeatCount="indefinite"/></line>'
+'<text x="50" y="110" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-family="JetBrains Mono,monospace" font-size="8">BILLABLE HRS</text>'
+'</g>'
+'<g transform="translate(600,480)">'
+'<line x1="40" y1="40" x2="40" y2="-20" stroke="rgba(254,243,199,0.4)" stroke-width="2"><animate attributeName="y2" values="20;-30;20" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/></line>'
+'<line x1="40" y1="40" x2="80" y2="10" stroke="rgba(254,243,199,0.3)" stroke-width="2"><animate attributeName="x2" values="60;90;60" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.2s" repeatCount="indefinite"/></line>'
+'<line x1="40" y1="40" x2="0" y2="10" stroke="rgba(254,243,199,0.3)" stroke-width="2"><animate attributeName="x2" values="20;-10;20" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.4s" repeatCount="indefinite"/></line>'
+'<circle cx="40" cy="40" r="15" fill="rgba(254,243,199,0.15)"><animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/></circle>'
+'</g>'
+'<g transform="translate(550,300)">'
+'<text x="0" y="0" fill="rgba(254,243,199,0.5)" font-family="Noto Sans" font-size="28" font-weight="600">\u25B2</text>'
+'<text x="40" y="0" fill="rgba(254,243,199,0.4)" font-family="Noto Sans" font-size="24" font-weight="600">\u2192</text>'
+'<text x="80" y="0" fill="rgba(254,243,199,0.7)" font-family="Noto Sans" font-size="34" font-weight="700" filter="url(#dw-p-glow-warm)">\u25B2\u25B2</text>'
+'</g>'
+'</svg>';
}

// ════════════════════════════════════════════════════════════════
// HERO JS (SVG injection + reduced-motion + dynamic year + IntersectionObserver)
// ════════════════════════════════════════════════════════════════
function getHeroJS() {
  const factoryB64 = Buffer.from(getFactorySVGRaw()).toString('base64');
  const partnerB64 = Buffer.from(getPartnerSVGRaw()).toString('base64');

  return `<script>
(function(){
function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
var factorySVG=u8('${factoryB64}');
var partnerSVG=u8('${partnerB64}');
var fc=document.getElementById('dw-factory-svg');
var pc=document.getElementById('dw-partner-svg');
if(fc)fc.innerHTML=factorySVG;
if(pc){pc.innerHTML=partnerSVG;pc.setAttribute('data-freeze-trigger','');}
var rm=window.matchMedia('(prefers-reduced-motion:reduce)');
function handleMotion(){
if(rm.matches){
document.querySelectorAll('.hero-svg-illustration animate,.hero-svg-illustration animateTransform,.hero-svg-illustration animateMotion')
.forEach(function(el){el.remove()});
}
}
handleMotion();
rm.addEventListener('change',handleMotion);
var yrs=new Date().getFullYear()-1982;
document.querySelectorAll('[data-dw-years]').forEach(function(el){el.textContent=yrs});
if(!rm.matches){if('IntersectionObserver' in window){
document.querySelectorAll('[data-freeze-trigger]').forEach(function(wrapper){
var obs=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
wrapper.querySelectorAll('[data-freeze]').forEach(function(anim){
try{anim.beginElement()}catch(e){}
});
}
});
},{threshold:0.3});
obs.observe(wrapper);
});
}}
})();
</script>`;
}

// ════════════════════════════════════════════════════════════════
// HERO HTML — Entire section in ONE Code Module
// ════════════════════════════════════════════════════════════════

function getHeroHTML() {
  return `
<div class="hero-split">
  <!-- Factory Operators Panel -->
  <div class="hero-panel hero-panel--factory">
    <div id="dw-factory-svg" class="hero-svg-illustration hero-svg-illustration--factory"></div>
    <div class="hero-grain"></div>
    <div class="hero-content">
      <p class="hero-label hero-label--factory">For Manufacturing Business Owners</p>
      <h1 class="hero-title">Your True Costs Are <span class="hl-blue">Invisible.</span></h1>
      <p class="hero-subtitle">"Shadow Excel" files have replaced your standard operating procedures. Ghost inventory means system says 100, shelf says 50. We fix this\u2014because we've spent <span data-dw-years>44</span> years doing nothing but manufacturing software.</p>
      <div class="hero-btn-row">
        <a href="/demo.html" class="hero-btn hero-btn--primary">Let's Talk</a>
        <a href="/products.html" class="hero-btn hero-btn--ghost">See Our Solutions</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-number" data-dw-years>44</div>
          <div class="hero-stat-label">Years Manufacturing Focus</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-number">50K+</div>
          <div class="hero-stat-label">Factories Served</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-number">300378</div>
          <div class="hero-stat-label">Shenzhen Listed</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Partner Prospects Panel -->
  <div class="hero-panel hero-panel--partner">
    <div id="dw-partner-svg" class="hero-svg-illustration hero-svg-illustration--partner"></div>
    <div class="hero-grain hero-grain--partner"></div>
    <div class="hero-light-leak"></div>
    <div class="hero-content">
      <p class="hero-label hero-label--partner">For ERP Implementers</p>
      <h2 class="hero-title">Trapped in the <span class="hl-gold">Man-Day</span> Model?</h2>
      <p class="hero-subtitle">Your revenue is capped by headcount. Customization wars burn out your best consultants. We offer a way out\u2014product-based margins that compound instead of compress.</p>
      <div class="hero-btn-row">
        <a href="/partner-program.html" class="hero-btn hero-btn--primary">Escape the Trap</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-number hero-stat-number--white">30\u201340%</div>
          <div class="hero-stat-label">License Margins</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-number hero-stat-number--white">Yours to Keep</div>
          <div class="hero-stat-label">Maintenance Revenue</div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

// ════════════════════════════════════════════════════════════════
// EXPORTS: blocks() and css()
// ════════════════════════════════════════════════════════════════

function blocks() {
  return [
    // Thin Divi wrapper: Section → Row → Column → Code Module
    sectionOpen({
      adminLabel: 'Hero \u2014 Split Screen',
      css: 'selector{background:transparent !important;padding:0 !important;margin:0 !important;}',
    }),

    rowOpen({
      adminLabel: 'Hero Row',
      columns: 1,
      css: 'selector{max-width:100% !important;width:100% !important;margin:0 !important;padding:0 !important;}',
    }),
    columnOpen({ css: 'selector{width:100% !important;padding:0 !important;}' }),

    // ONE Code Module with the entire hero HTML
    codeModule(getHeroHTML(), 'Hero: Dual Panel Split Screen'),

    // Script block — wp:html because scripts don't execute in Code Modules
    htmlBlock(getHeroJS()),

    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function heroCss() {
  return `
/* ============================================
   Hero Section — Code Module Approach
   CSS Grid handles the 2-panel split.
   No Divi column layout dependencies.
   ============================================ */

/* === THEME BUILDER FULL-BLEED OVERRIDES === */
/* Theme builder wraps page content in its own section/row/column — must override all */
.et_pb_section_0_tb_body{background:transparent !important;padding:0 !important;margin:0 !important;width:100% !important}
.et_pb_row_0_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_column_0_tb_body{padding:0 !important;width:100% !important}
.et_pb_post_content_0_tb_body{width:100% !important;max-width:100% !important}
/* Nested row inside theme builder */
.et_pb_row_1_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_column_1_tb_body{width:100% !important;padding:0 !important}

/* === PAGE-LEVEL DIVI WRAPPER RESETS === */
.et_pb_section_0{background:transparent !important;padding:0 !important;margin:0 !important}
.et_pb_section_0 .et_pb_row{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important}
.et_pb_section_0 .et_pb_column{width:100% !important;padding:0 !important}
.et_pb_section_0 .et_pb_code,.et_pb_section_0 .et_pb_code_inner{position:static !important;overflow:visible !important}

/* === SPLIT SCREEN GRID === */
.hero-split{
  display:grid;
  grid-template-columns:1fr 1fr;
  min-height:calc(100vh - 80px);
  margin-top:80px;
  position:relative;
  overflow:hidden;
  background-color:#000432;
  -webkit-font-smoothing:auto;
  -moz-osx-font-smoothing:auto;
  /* Break out of any constrained parent to full viewport width */
  width:100vw;
  margin-left:calc(-50vw + 50%);
}

/* === PANELS === */
.hero-panel{
  position:relative;
  overflow:hidden;
  padding:80px 60px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}
.hero-panel--factory{
  background:linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%);
}
.hero-panel--partner{
  background:linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%);
}

/* === SVG ILLUSTRATIONS === */
.hero-svg-illustration{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1;opacity:0.45}
.hero-svg-illustration svg{width:100%;height:100%;display:block}

/* === HERO CONTENT === */
.hero-content{position:relative;z-index:2;max-width:520px}

/* === HERO LABELS === */
.hero-label{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;line-height:1.6;color:#00AFF0;margin:0 0 24px;padding:0;display:flex;align-items:center;gap:12px}
.hero-label::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#00AFF0);flex-shrink:0}
.hero-label--partner{color:rgba(255,255,255,0.9)}
.hero-label--partner::before{background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8))}

/* === HERO TITLES === */
.hero-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,52px);font-weight:700;color:#fff;margin:0 0 24px;line-height:1.1;letter-spacing:-0.03em;max-width:520px}
.hero-title .hl-blue{color:#00AFF0}
.hero-title .hl-gold{color:#fef3c7}

/* === HERO SUBTITLES === */
.hero-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:rgba(255,255,255,0.75);margin:0 0 36px;line-height:1.75;max-width:500px}

/* === BUTTONS === */
.hero-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;line-height:1.6;padding:16px 32px;border-radius:8px;cursor:pointer;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);text-decoration:none;display:inline-flex !important;align-items:center;position:relative;overflow:hidden;border:none}
.hero-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}
.hero-btn:hover::before{left:100%}
.hero-btn--primary{background:#006dac;color:#fff;box-shadow:0 4px 14px rgba(0,175,240,0.35);gap:8px}
.hero-btn--primary:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}
.hero-btn--ghost{background:rgba(255,255,255,0.15);color:#fff;border:2px solid rgba(255,255,255,0.9);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.hero-btn--ghost:hover{background:#fff;color:#0369a1;border-color:#fff}
.hero-btn-row{max-width:520px;font-size:16px}
.hero-btn-row .hero-btn--ghost{margin-left:12px}

/* === STATS === */
.hero-stats{display:flex;gap:40px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);max-width:520px}
.hero-stat-number{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:800;color:#00AFF0;line-height:1;margin-bottom:8px;letter-spacing:-0.02em}
.hero-stat-number--white{color:#fff}
.hero-stat-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:400;color:rgba(255,255,255,0.75);text-transform:uppercase;letter-spacing:0.1em;line-height:1.6}

/* === GRAIN TEXTURE OVERLAY === */
.hero-grain{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.hero-grain::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1;animation:grain 8s steps(10) infinite}
.hero-grain--partner::before{opacity:0.04;animation:none}

/* === LIGHT LEAK (Partner panel only) === */
.hero-light-leak{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.hero-light-leak::after{content:'';position:absolute;top:-50%;right:-30%;width:80%;height:150%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.15) 0%,transparent 60%);pointer-events:none;z-index:1}

/* === RESPONSIVE === */
@media(max-width:1024px){
  .hero-split{grid-template-columns:1fr;min-height:auto}
  .hero-panel{min-height:70vh;padding:60px 40px}
  .hero-stats{gap:24px;flex-wrap:wrap}
  .hero-title{font-size:32px}
  .hero-subtitle{font-size:16px}
}
@media(max-width:640px){
  .hero-panel{padding:48px 24px;min-height:80vh}
  .hero-stats{flex-direction:column;gap:24px}
  .hero-btn-row{flex-direction:column}
  .hero-btn{text-align:center}
}

/* === REDUCED MOTION === */
@media(prefers-reduced-motion:reduce){
  .hero-grain::before{animation:none}
  .hero-btn::before{transition:none}
  .hero-svg-illustration{opacity:0.25}
}

/* === GRAIN ANIMATION KEYFRAME === */
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0%)}70%{transform:translate(0%,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}}
`;
}

module.exports = { blocks, css: heroCss, SPEC, getHeroJS };
