/**
 * th-home-hero.js — Thai Homepage Hero Section
 * Reuses hero-gradient template with Thai-translated content.
 * Same layout, CSS, animations as English hero.
 *
 * Template: hero-gradient
 */

const heroGradient = require('../../lib/templates/hero-gradient');

// Reuse the exact same SVG illustrations from English hero
const enHero = require('./home-hero');

// ════════════════════════════════════════════════════════════════
// SVG ILLUSTRATIONS — imported from English hero (same visuals)
// ════════════════════════════════════════════════════════════════

// We need the raw SVG functions — extract from home-hero DATA
// Since home-hero only exports blocks/css, we replicate the SVG refs here
// by requiring the English module's internal functions via the template

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
// DATA CONFIG — Thai translation
// ════════════════════════════════════════════════════════════════

const DATA = {
  adminLabel: 'Hero — Split Screen (Thai)',
  sectionPrefix: 'hero',
  sectionBg: '#000432',
  dynamicYear: true,
  highlights: [
    { class: 'hl-blue', color: '#00AFF0' },
    { class: 'hl-gold', color: '#fef3c7' },
  ],
  panels: [
    {
      id: 'factory',
      gradient: 'linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%)',
      svgRaw: getFactorySVGRaw,
      headingTag: 'h1',
      label: '\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e40\u0e08\u0e49\u0e32\u0e02\u0e2d\u0e07\u0e42\u0e23\u0e07\u0e07\u0e32\u0e19\u0e1c\u0e25\u0e34\u0e15',  // สำหรับเจ้าของโรงงานผลิต
      title: '\u0e15\u0e49\u0e19\u0e17\u0e38\u0e19\u0e17\u0e35\u0e48\u0e41\u0e17\u0e49\u0e08\u0e23\u0e34\u0e07\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13 <span class="hl-blue">\u0e21\u0e2d\u0e07\u0e44\u0e21\u0e48\u0e40\u0e2b\u0e47\u0e19</span>',  // ต้นทุนที่แท้จริงของคุณ มองไม่เห็น
      subtitle: '\u0e44\u0e1f\u0e25\u0e4c Excel \u0e25\u0e31\u0e1a\u0e46 \u0e40\u0e02\u0e49\u0e32\u0e21\u0e32\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e02\u0e31\u0e49\u0e19\u0e15\u0e2d\u0e19\u0e01\u0e32\u0e23\u0e17\u0e33\u0e07\u0e32\u0e19\u0e21\u0e32\u0e15\u0e23\u0e10\u0e32\u0e19\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e49\u0e27 \u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32\u0e1c\u0e35 \u0e23\u0e30\u0e1a\u0e1a\u0e1a\u0e2d\u0e01 100 \u0e0a\u0e31\u0e49\u0e19\u0e08\u0e23\u0e34\u0e07\u0e21\u0e35 50 \u0e40\u0e23\u0e32\u0e41\u0e01\u0e49\u0e1b\u0e31\u0e0d\u0e2b\u0e32\u0e19\u0e35\u0e49\u0e44\u0e14\u0e49\u2014\u0e40\u0e1e\u0e23\u0e32\u0e30\u0e40\u0e23\u0e32\u0e17\u0e33\u0e0b\u0e2d\u0e1f\u0e15\u0e4c\u0e41\u0e27\u0e23\u0e4c\u0e42\u0e23\u0e07\u0e07\u0e32\u0e19\u0e21\u0e32 <span data-dw-years>44</span> \u0e1b\u0e35\u0e41\u0e25\u0e49\u0e27',  // ไฟล์ Excel ลับๆ เข้ามาแทนที่... เราแก้ปัญหานี้ได้—เพราะเราทำซอฟต์แวร์โรงงานมา 44 ปีแล้ว
      buttons: [
        { text: '\u0e1e\u0e39\u0e14\u0e04\u0e38\u0e22\u0e01\u0e31\u0e1a\u0e40\u0e23\u0e32', href: '/demo.html', style: 'primary' },  // พูดคุยกับเรา
        { text: '\u0e14\u0e39\u0e42\u0e0b\u0e25\u0e39\u0e0a\u0e31\u0e48\u0e19\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14', href: '/products.html', style: 'ghost' },  // ดูโซลูชั่นทั้งหมด
      ],
      stats: [
        { value: '44', label: '\u0e1b\u0e35\u0e40\u0e0a\u0e35\u0e48\u0e22\u0e27\u0e0a\u0e32\u0e0d\u0e14\u0e49\u0e32\u0e19\u0e01\u0e32\u0e23\u0e1c\u0e25\u0e34\u0e15', dynamic: true },  // ปีเชี่ยวชาญด้านการผลิต
        { value: '50K+', label: '\u0e42\u0e23\u0e07\u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e43\u0e2b\u0e49\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23' },  // โรงงานที่ให้บริการ
        { value: '300378', label: '\u0e08\u0e14\u0e17\u0e30\u0e40\u0e1a\u0e35\u0e22\u0e19\u0e40\u0e2a\u0e34\u0e48\u0e19\u0e40\u0e08\u0e34\u0e49\u0e19' },  // จดทะเบียนเสิ่นเจิ้น
      ],
    },
    {
      id: 'partner',
      gradient: 'linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%)',
      svgRaw: getPartnerSVGRaw,
      freezeTrigger: true,
      headingTag: 'h2',
      label: '\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e43\u0e2b\u0e49\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23 ERP',  // สำหรับผู้ให้บริการ ERP
      labelColor: 'rgba(255,255,255,0.9)',
      grainVariant: 'partner',
      lightLeak: true,
      title: '\u0e15\u0e34\u0e14\u0e01\u0e31\u0e1a\u0e14\u0e31\u0e01\u0e43\u0e19\u0e42\u0e21\u0e40\u0e14\u0e25 <span class="hl-gold">Man-Day</span> \u0e2d\u0e22\u0e39\u0e48\u0e2b\u0e23\u0e37\u0e2d?',  // ติดกับดักในโมเดล Man-Day อยู่หรือ?
      subtitle: '\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e16\u0e39\u0e01\u0e08\u0e33\u0e01\u0e31\u0e14\u0e14\u0e49\u0e27\u0e22\u0e08\u0e33\u0e19\u0e27\u0e19\u0e04\u0e19 \u0e07\u0e32\u0e19 Customize \u0e17\u0e33\u0e43\u0e2b\u0e49\u0e17\u0e35\u0e21\u0e07\u0e32\u0e19\u0e2b\u0e21\u0e14\u0e41\u0e23\u0e07 \u0e40\u0e23\u0e32\u0e21\u0e35\u0e17\u0e32\u0e07\u0e2d\u0e2d\u0e01\u2014\u0e21\u0e32\u0e23\u0e4c\u0e08\u0e34\u0e19\u0e08\u0e32\u0e01\u0e1c\u0e25\u0e34\u0e15\u0e20\u0e31\u0e13\u0e11\u0e4c\u0e17\u0e35\u0e48\u0e40\u0e15\u0e34\u0e1a\u0e42\u0e15\u0e41\u0e17\u0e19\u0e17\u0e35\u0e48\u0e08\u0e30\u0e2b\u0e14\u0e25\u0e07',  // รายได้ของคุณถูกจำกัดด้วยจำนวนคน... เรามีทางออก—มาร์จินจากผลิตภัณฑ์ที่เติบโตแทนที่จะหดลง
      buttons: [
        { text: '\u0e2b\u0e25\u0e38\u0e14\u0e1e\u0e49\u0e19\u0e08\u0e32\u0e01\u0e01\u0e31\u0e1a\u0e14\u0e31\u0e01', href: '/partner-program.html', style: 'primary' },  // หลุดพ้นจากกับดัก
      ],
      stats: [
        { value: '30\u201340%', label: '\u0e21\u0e32\u0e23\u0e4c\u0e08\u0e34\u0e19\u0e25\u0e34\u0e02\u0e2a\u0e34\u0e17\u0e18\u0e34\u0e4c', white: true },  // มาร์จินลิขสิทธิ์
        { value: '\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14', label: '\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49\u0e1a\u0e33\u0e23\u0e38\u0e07\u0e23\u0e31\u0e01\u0e29\u0e32', white: true },  // ของคุณทั้งหมด / รายได้บำรุงรักษา
      ],
    },
  ],
};

// Thai font override — appended to template CSS
const THAI_FONT_CSS = `
/* === THAI FONT OVERRIDE === */
.hero-title, .hero-subtitle, .hero-label--factory, .hero-label--partner,
.hero-stat-label, .hero-btn--primary, .hero-btn--ghost {
  font-family: 'Noto Sans Thai', 'Noto Sans', sans-serif !important;
}
`;

module.exports = {
  blocks: () => heroGradient.blocks(DATA),
  css: () => heroGradient.css(DATA) + THAI_FONT_CSS,
};
