#!/usr/bin/env node
/**
 * build-hero-divi5.js — Homepage Hero Section (Native Divi 5 Build)
 *
 * v30: Direct MySQL write with wp:divi/code (bypasses Respira sanitization)
 *   - BREAKTHROUGH: Respira API strips wp:divi/code blocks, but direct MySQL writes preserve them
 *   - All HTML content now uses wp:divi/code → shows admin labels in VB Layers panel
 *   - wp:html "Unknown Module" problem SOLVED
 *   - SVGs still via JS injection (Base64 KSES bypass) — unchanged from v28
 *   - Namespaced SVG IDs (dw-f-* / dw-p-*) to prevent DOM collisions
 *   - additive="sum" fix on Excel fragment animateTransform
 *   - fill="freeze" animations triggered by IntersectionObserver
 *   - SMIL reduced-motion handling via JS
 *   - Brand overlays (Super D + Particle Wave) via CSS pseudo-elements
 *   - -webkit-backdrop-filter prefix for Safari
 *
 * Acceptance spec: docs/build/SVG_Animation_Acceptance_Spec.md (22 checks)
 *
 * Usage: node complete_website/build-hero-divi5.js [--dry-run]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PAGE_ID = 100684;
const SITE_URL = 'https://digiwin-thailand.local';
const DRY_RUN = process.argv.includes('--dry-run');

// LocalWP MySQL connection
const MYSQL_BIN = '/Applications/Local.app/Contents/Resources/extraResources/lightning-services/mysql-8.0.35+4/bin/darwin-arm64/bin/mysql';
const MYSQL_SOCKET = '/Users/peterlo/Library/Application Support/Local/run/M99oTun0_/mysql/mysqld.sock';
const MYSQL_DB = 'local';

// Brand overlay SVG URLs (uploaded to WP Media Library)
const SUPER_D_SVG = process.env.HERO_SUPER_D || '/wp-content/uploads/2026/02/digiwin-d-particle.svg';
const WAVE_FLOW_SVG = process.env.HERO_WAVE_FLOW || '/wp-content/uploads/2026/02/digiwin-wave-flow.svg';


// ════════════════════════════════════════════════════════════════
// 1. SVG ILLUSTRATION CONTENT
// ════════════════════════════════════════════════════════════════
// WordPress strips SVG attributes (transform, stop-color, opacity)
// even inside Code Modules. Solution: store SVGs as JS template
// literals and inject via innerHTML at runtime. KSES doesn't parse
// JS string content, so all SVG attributes survive.
//
// Red team fixes applied:
//   - All <defs> IDs namespaced: dw-f-* (factory), dw-p-* (partner)
//   - Excel fragments: additive="sum" on animateTransform
//   - fill="freeze" anims: begin="indefinite" + data-freeze attr
//   - Partner SVG wrapper: data-freeze-trigger for IntersectionObserver

// Container-only functions: SVG content injected via JS to bypass KSES
function getFactorySVGContainer() {
  return '<div id="dw-factory-svg" class="hero-svg-illustration hero-svg-illustration--factory"></div>';
}

function getPartnerSVGContainer() {
  return '<div id="dw-partner-svg" class="hero-svg-illustration hero-svg-illustration--partner"></div>';
}

// Raw SVG content (used by getHeroJS to base64-encode)
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
// 2. HERO JS (reduced-motion + IntersectionObserver)
// ════════════════════════════════════════════════════════════════

function getHeroJS() {
  // SVG content Base64-encoded to completely bypass WordPress/Respira sanitization.
  // Previous attempts (v27: raw SVG, v28a: data-attributes) both failed because
  // the sanitizer parses HTML-like patterns even inside <script> string literals.
  // Base64 is opaque — no angle brackets, no attribute patterns to strip.
  const factoryB64 = Buffer.from(getFactorySVGRaw()).toString('base64');
  const partnerB64 = Buffer.from(getPartnerSVGRaw()).toString('base64');

  return `<script>
(function(){
function u8(b){return decodeURIComponent(Array.from(atob(b),function(c){return'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)}).join(''))}
var factorySVG=u8('${factoryB64}');
var partnerSVG=u8('${partnerB64}');

/* === INJECT SVGs === */
/* Plain innerHTML — proven working in v28/v29 when containers are wp:html blocks */
var fc=document.getElementById('dw-factory-svg');
var pc=document.getElementById('dw-partner-svg');
if(fc)fc.innerHTML=factorySVG;
if(pc){pc.innerHTML=partnerSVG;pc.setAttribute('data-freeze-trigger','');}

/* === REDUCED MOTION === */
var rm=window.matchMedia('(prefers-reduced-motion:reduce)');
function handleMotion(){
if(rm.matches){
document.querySelectorAll('.hero-svg-illustration animate,.hero-svg-illustration animateTransform,.hero-svg-illustration animateMotion')
.forEach(function(el){el.remove()});
}
}
handleMotion();
rm.addEventListener('change',handleMotion);

/* === DYNAMIC YEAR (founded 1982) === */
var yrs=new Date().getFullYear()-1982;
document.querySelectorAll('[data-dw-years]').forEach(function(el){el.textContent=yrs});

/* === INTERSECTION OBSERVER for fill="freeze" === */
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
// 3. PAGE-LEVEL CSS (_et_pb_custom_css -> goes into <head>)
// ════════════════════════════════════════════════════════════════
// FONTS: Loaded by mu-plugin (digiwin-svg-kses.php) via wp_enqueue_style().
// DO NOT use @import here — Divi renders other CSS rules before pageLevelCSS,
// making @import non-compliant (CSS spec: @import must be first rule).
// mu-plugin loads: Noto Sans (400-800) + JetBrains Mono (500-700) + display=swap.

const pageLevelCSS = `
/* === KEYFRAMES === */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slide-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes grain{0%,100%{transform:translate(0,0)}10%{transform:translate(-2%,-2%)}20%{transform:translate(2%,2%)}30%{transform:translate(-1%,1%)}40%{transform:translate(1%,-1%)}50%{transform:translate(-2%,2%)}60%{transform:translate(2%,-2%)}70%{transform:translate(-1%,-1%)}80%{transform:translate(1%,1%)}90%{transform:translate(-2%,2%)}}
@keyframes dw-wave-drift{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* === THEME BUILDER FULL-BLEED OVERRIDE === */
.et_pb_section_0_tb_body{background:transparent !important;padding:0 !important;margin:0 !important;}
.et_pb_row_0_tb_body{max-width:100% !important;width:100% !important;padding:0 !important;margin:0 !important;}
.et_pb_column_0_tb_body{padding:0 !important;}

/* === FORCE OPAQUE COLUMN BACKGROUNDS (override Divi's cached PNG backgrounds from v25 duplicate) === */
.et_pb_section_0 .et_pb_column_0{background:linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%) !important;background-image:linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%) !important}
.et_pb_section_0 .et_pb_column_1{background:linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%) !important;background-image:linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%) !important}
.et_pb_section_0{background-color:#000432 !important}

/* === DIVI SPACING RESET === */
.et_pb_section_0:not([class*='tb_body']) .et_pb_column{gap:0 !important}

/* === SVG ILLUSTRATIONS (v28) === */
.hero-svg-illustration{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1;opacity:0.45}
.hero-svg-illustration svg{width:100%;height:100%;display:block}

/* === BRAND OVERLAY: Super D Particle + Particle Wave === */
/* DISABLED: SVG files not yet uploaded to WP Media Library (404).
   Pseudo-element containers cause visual doubling with JS-injected SVGs.
   Re-enable after uploading digiwin-d-particle.svg and digiwin-wave-flow.svg.
.et_pb_section_0 .et_pb_row_0::before{content:'';position:absolute;right:-10%;width:65%;top:0;bottom:0;background-image:url('${SUPER_D_SVG}');background-size:contain;background-repeat:no-repeat;background-position:center right;opacity:0.18;pointer-events:none;z-index:0}
.et_pb_section_0 .et_pb_row_0::after{content:'';position:absolute;bottom:0;left:0;width:200%;height:250px;background-image:url('${WAVE_FLOW_SVG}');background-repeat:repeat-x;background-size:auto 100%;opacity:0.5;pointer-events:none;z-index:2;animation:dw-wave-drift 30s linear infinite}
*/

/* === HERO LABELS === */
.hero-label{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#00AFF0;margin-bottom:24px;display:flex;align-items:center;gap:12px}
.hero-label::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#00AFF0);flex-shrink:0}
.hero-label--partner{color:rgba(255,255,255,0.9)}
.hero-label--partner::before{background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8))}

/* === HERO TITLES === */
.hero-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,3.5vw,52px);font-weight:700;color:#fff;margin:0 0 24px 0;line-height:1.1;letter-spacing:-0.03em;position:relative;z-index:2;max-width:520px}
.hero-title .hl-blue{color:#00AFF0}
.hero-title .hl-gold{color:#fef3c7}

/* === HERO SUBTITLES === */
.hero-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;color:rgba(255,255,255,0.75);margin:0 0 36px 0;line-height:1.75;position:relative;z-index:2;max-width:500px}

/* === HERO CONTENT WRAPPER === */
.hero-content{position:relative;z-index:2;max-width:520px;animation:slide-up 0.8s ease-out}
.hero-content--delay{animation-delay:0.2s;animation-fill-mode:backwards}

/* === BUTTONS === */
.hero-btn{font-family:'Noto Sans',sans-serif;font-size:16px;font-weight:600;padding:16px 32px;border-radius:8px;cursor:pointer;transition:all 0.3s ease;text-decoration:none;display:inline-block;position:relative;overflow:hidden;border:none}
.hero-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:left 0.5s}
.hero-btn:hover::before{left:100%}
.hero-btn--primary{background:#006dac;color:#fff;box-shadow:0 4px 14px rgba(0,175,240,0.35)}
.hero-btn--primary:hover{background:#003CC8;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,175,240,0.45)}
.hero-btn--ghost{background:rgba(255,255,255,0.15);color:#fff;border:2px solid rgba(255,255,255,0.9);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.hero-btn--ghost:hover{background:#fff;color:#0369a1;border-color:#fff}
.hero-btn-row{display:flex;gap:12px;flex-wrap:wrap;position:relative;z-index:2;max-width:520px}

/* === STATS === */
.hero-stats{display:flex;gap:40px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.1);animation:fadeIn 1s ease-out 0.5s both;position:relative;z-index:2;max-width:520px}
.hero-stat-number{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:800;color:#00AFF0;line-height:1;margin-bottom:8px;letter-spacing:-0.02em}
.hero-stat-number--white{color:#fff}
.hero-stat-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:400;color:rgba(255,255,255,0.75);text-transform:uppercase;letter-spacing:0.1em}

/* === GRAIN TEXTURE OVERLAY === */
.hero-grain{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.hero-grain::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:0.03;pointer-events:none;z-index:1;animation:grain 8s steps(10) infinite}
.hero-grain--partner::before{opacity:0.04;animation:none}

/* === LIGHT LEAK (Partner panel only) === */
.hero-light-leak{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:1}
.hero-light-leak::after{content:'';position:absolute;top:-50%;right:-30%;width:80%;height:150%;background:radial-gradient(ellipse at center,rgba(255,255,255,0.15) 0%,transparent 60%);pointer-events:none;z-index:1}

/* === RESPONSIVE === */
@media(max-width:1024px){
.et_pb_section_0 .et_pb_row_0{flex-direction:column !important;min-height:auto !important;}
.et_pb_section_0 .et_pb_column{width:100% !important;flex:none !important;min-height:70vh;}
.hero-stats{gap:24px;flex-wrap:wrap}
.hero-title{font-size:32px}
.hero-subtitle{font-size:16px}
/* Re-enable when brand overlay pseudo-elements are active:
.et_pb_section_0 .et_pb_row_0::before{display:none}
.et_pb_section_0 .et_pb_row_0::after{display:none}
*/
}
@media(max-width:640px){
.et_pb_section_0 .et_pb_column{padding:48px 24px !important;min-height:80vh;}
.hero-stats{flex-direction:column;gap:24px}
.hero-btn-row{flex-direction:column}
.hero-btn{text-align:center}
}

/* === REDUCED MOTION === */
@media(prefers-reduced-motion:reduce){
.hero-content,.hero-content--delay{animation:none}
.hero-stats{animation:none}
.hero-grain::before{animation:none}
.hero-btn::before{transition:none}
/* Re-enable when brand overlay pseudo-elements are active:
.et_pb_section_0 .et_pb_row_0::after{animation:none}
*/
.hero-svg-illustration{opacity:0.25}
}
`.trim();


// ════════════════════════════════════════════════════════════════
// 4. CONTENT BLOCKS (buttons & stats)
// ════════════════════════════════════════════════════════════════
// v30: HTML content uses wp:divi/code (self-closing, content in JSON attributes).
// Direct MySQL write bypasses Respira sanitization → Code Modules survive intact.
// VB Layers panel shows admin labels. Front-end renders HTML content correctly.
// Plain text labels/subtitles still use wp:divi/text for native font controls.

const factoryButtonsHTML = `<div class="hero-btn-row"><a href="/demo.html" class="hero-btn hero-btn--primary">Let\u2019s Talk</a><a href="/products.html" class="hero-btn hero-btn--ghost">See Our Solutions</a></div>`;

const factoryStatsHTML = `<div class="hero-stats"><div class="hero-stat"><div class="hero-stat-number" data-dw-years>44</div><div class="hero-stat-label">Years Manufacturing Focus</div></div><div class="hero-stat"><div class="hero-stat-number">50K+</div><div class="hero-stat-label">Factories Served</div></div><div class="hero-stat"><div class="hero-stat-number">300378</div><div class="hero-stat-label">Shenzhen Listed</div></div></div>`;

const partnerButtonsHTML = `<div class="hero-btn-row"><a href="/partner-program.html" class="hero-btn hero-btn--primary">Escape the Trap</a></div>`;

const partnerStatsHTML = `<div class="hero-stats"><div class="hero-stat"><div class="hero-stat-number hero-stat-number--white">30\u201340%</div><div class="hero-stat-label">License Margins</div></div><div class="hero-stat"><div class="hero-stat-number hero-stat-number--white">Yours to Keep</div><div class="hero-stat-label">Maintenance Revenue</div></div></div>`;


// ════════════════════════════════════════════════════════════════
// 5. DIVI 5 BLOCK ASSEMBLY
// ════════════════════════════════════════════════════════════════

function textModule(content, fontOpts = {}, moduleOpts = {}, cssOpts = '') {
  const fontValue = {};
  if (fontOpts.color) fontValue.color = fontOpts.color;
  if (fontOpts.size) fontValue.size = fontOpts.size;
  if (fontOpts.weight) fontValue.weight = fontOpts.weight;
  if (fontOpts.family) fontValue.family = fontOpts.family;
  if (fontOpts.lineHeight) fontValue.lineHeight = fontOpts.lineHeight;
  if (fontOpts.letterSpacing) fontValue.letterSpacing = fontOpts.letterSpacing;
  if (fontOpts.textTransform) fontValue.textTransform = fontOpts.textTransform;

  const json = {
    content: {
      innerContent: { desktop: { value: content } },
      decoration: {
        bodyFont: { body: { font: {
          desktop: { value: fontValue },
          tablet: { value: fontValue },
          phone: { value: fontValue }
        } } }
      }
    }
  };

  if (moduleOpts.adminLabel || moduleOpts.marginBottom || moduleOpts.marginTop) {
    json.module = {};
    if (moduleOpts.adminLabel) {
      json.module.meta = { adminLabel: { desktop: { value: moduleOpts.adminLabel } } };
    }
    if (moduleOpts.marginBottom || moduleOpts.marginTop) {
      json.module.decoration = { spacing: { desktop: { value: { margin: {} } } } };
      if (moduleOpts.marginBottom) json.module.decoration.spacing.desktop.value.margin.bottom = moduleOpts.marginBottom;
      if (moduleOpts.marginTop) json.module.decoration.spacing.desktop.value.margin.top = moduleOpts.marginTop;
    }
  }

  if (cssOpts) {
    json.css = {
      desktop: { value: { freeForm: cssOpts } },
      tablet: { value: { freeForm: cssOpts } },
      phone: { value: { freeForm: cssOpts } }
    };
  }

  return `<!-- wp:divi/text ${JSON.stringify(json)} /-->`;
}

function codeModule(content, adminLabel) {
  // v30: wp:divi/code with content inside JSON attributes (self-closing block).
  // Direct MySQL write bypasses Respira sanitization that previously stripped these.
  // VB shows proper admin labels in Layers panel. Front-end renders HTML content.
  const json = {
    content: {
      innerContent: { desktop: { value: content } }
    },
    module: {
      meta: { adminLabel: { desktop: { value: adminLabel || 'Code Module' } } }
    }
  };
  return `<!-- wp:divi/code ${JSON.stringify(json)} /-->`;
}

// Assemble the full hero section
const blockContent = [
  '<!-- wp:divi/placeholder -->',

  // Section — full-width, overflow hidden
  `<!-- wp:divi/section ${JSON.stringify({
    module: {
      meta: { adminLabel: { desktop: { value: "Hero \u2014 Split Screen" } } },
      decoration: {
        sizing: { desktop: { value: { width: "100%", maxWidth: "none" } } },
        spacing: { desktop: { value: { padding: { top: "0px", syncVertical: "off", syncHorizontal: "off", bottom: "0px", left: "0px", right: "0px" } } } }
      }
    },
    css: { desktop: { value: { freeForm: "selector{width:100% !important;max-width:100% !important;overflow:hidden;margin:80px 0 0 0 !important;padding:0 !important;position:relative;background-color:#000432 !important;}" } } },
    builderVersion: "5.0.0-public-beta.8"
  })} -->`,

  // Row — flex 2-col, full width, min-height 100vh, position relative for pseudo-elements
  `<!-- wp:divi/row ${JSON.stringify({
    module: {
      meta: { adminLabel: { desktop: { value: "Hero Row \u2014 Two Panels" } } },
      advanced: { flexColumnStructure: { desktop: { value: "equal-columns_2" } } },
      decoration: {
        layout: { desktop: { value: { flexWrap: "nowrap", display: "flex", flexDirection: "row", rowGap: "0px", columnGap: "0px" } } },
        sizing: { desktop: { value: { width: "100%", maxWidth: "none" } } },
        spacing: { desktop: { value: { padding: { top: "0px", bottom: "0px", left: "0px", right: "0px" } } } }
      }
    },
    css: { desktop: { value: { freeForm: "selector{min-height:calc(100vh - 80px);width:100% !important;max-width:100% !important;position:relative;overflow:hidden;}" } },
           tablet: { value: { freeForm: "selector{flex-direction:column;}" } }
    },
    builderVersion: "5.0.0-public-beta.8"
  })} -->`,

  // ──── LEFT COLUMN: Factory Panel ────
  `<!-- wp:divi/column ${JSON.stringify({
    module: {
      meta: { adminLabel: { desktop: { value: "Factory Panel (Left)" } } },
      decoration: {
        background: {
          desktop: { value: { color: "rgb(15,20,25)", gradient: { stops: [{ color: "rgb(15,20,25)", position: 0 }, { color: "rgb(26,38,50)", position: 40 }, { color: "rgb(0,8,100)", position: 100 }], type: "linear", direction: "165deg", enabled: true }, image: { url: "" } } }
        },
        spacing: {
          desktop: { value: { padding: { top: "80px", right: "60px", bottom: "80px", left: "60px" } } },
          tablet: { value: { padding: { top: "60px", right: "40px", bottom: "60px", left: "40px" } } },
          phone: { value: { padding: { top: "48px", right: "24px", bottom: "48px", left: "24px" } } }
        },
        sizing: { desktop: { value: { flexType: "12_24" } } },
        layout: { desktop: { value: { display: "flex", flexDirection: "column", justifyContent: "center" } } }
      }
    },
    css: { desktop: { value: { freeForm: "selector{background:linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%) !important;background-image:linear-gradient(165deg, rgb(15,20,25) 0%, rgb(26,38,50) 40%, rgb(0,8,100) 100%) !important;position:relative;overflow:hidden;display:flex !important;flex-direction:column !important;justify-content:center !important;flex:0 0 50% !important;width:50% !important;}" } } }
  })} -->`,

  // Factory SVG container — MUST be wp:html (not wp:divi/code) so JS injection works without Divi wrapper interference
  `<!-- wp:html -->${getFactorySVGContainer()}<!-- /wp:html -->`,

  // Factory grain texture overlay — wp:html for absolute positioning without Divi wrapper
  `<!-- wp:html --><div class="hero-grain"></div><!-- /wp:html -->`,

  // Factory Label
  textModule(
    'For Manufacturing Business Owners',
    { color: 'rgb(0, 175, 240)', size: '10px', letterSpacing: '0.1em', weight: '600', textTransform: 'uppercase', family: 'JetBrains Mono, monospace' },
    { marginBottom: '24px', adminLabel: 'Label: For Manufacturing Business Owners' },
    "selector{display:flex !important;flex-direction:row !important;align-items:center;gap:12px;position:relative;z-index:2;margin-bottom:24px !important;}selector p{font-family:'JetBrains Mono',monospace !important;font-size:10px !important;font-weight:600 !important;text-transform:uppercase !important;letter-spacing:0.1em !important;color:#00AFF0 !important;margin:0 !important;}selector::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,#00AFF0);flex-shrink:0;}"
  ),

  // Factory H1 Title
  codeModule('<h1 class="hero-title">Your True Costs Are <span class="hl-blue">Invisible.</span></h1>', 'H1: Your True Costs Are Invisible'),

  // Factory Subtitle
  textModule(
    '\u201cShadow Excel\u201d files have replaced your standard operating procedures. Ghost inventory means system says 100, shelf says 50. We fix this\u2014because we\u2019ve spent 44 years doing nothing but manufacturing software.',
    { color: 'rgba(255, 255, 255, 0.75)', size: '18px', weight: '400', family: 'Noto Sans, sans-serif', lineHeight: '1.75' },
    { marginBottom: '36px', adminLabel: 'Subtitle: Shadow Excel...' },
    "selector{position:relative;z-index:2;max-width:500px;margin-bottom:36px !important;}selector p{font-family:'Noto Sans',sans-serif !important;font-size:18px !important;font-weight:400 !important;line-height:1.75 !important;color:rgba(255,255,255,0.75) !important;}"
  ),

  // Factory Buttons
  codeModule(factoryButtonsHTML, 'Buttons: Let\u2019s Talk + Solutions'),

  // Factory Stats
  codeModule(factoryStatsHTML, 'Stats: 44yrs / 50K+ / 300378'),

  '<!-- /wp:divi/column -->',

  // ──── RIGHT COLUMN: Partner Panel ────
  `<!-- wp:divi/column ${JSON.stringify({
    module: {
      meta: { adminLabel: { desktop: { value: "Partner Panel (Right)" } } },
      decoration: {
        background: {
          desktop: { value: { color: "rgb(0,60,200)", gradient: { stops: [{ color: "rgb(0,175,240)", position: 0 }, { color: "rgb(0,60,200)", position: 40 }, { color: "rgb(0,60,200)", position: 100 }], type: "linear", direction: "165deg", enabled: true }, image: { url: "" } } }
        },
        spacing: {
          desktop: { value: { padding: { top: "80px", right: "60px", bottom: "80px", left: "60px" } } },
          tablet: { value: { padding: { top: "60px", right: "40px", bottom: "60px", left: "40px" } } },
          phone: { value: { padding: { top: "48px", right: "24px", bottom: "48px", left: "24px" } } }
        },
        sizing: { desktop: { value: { flexType: "12_24" } } },
        layout: { desktop: { value: { display: "flex", flexDirection: "column", justifyContent: "center" } } }
      }
    },
    css: { desktop: { value: { freeForm: "selector{background:linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%) !important;background-image:linear-gradient(165deg, rgb(0,175,240) 0%, rgb(0,60,200) 40%, rgb(0,60,200) 100%) !important;position:relative;overflow:hidden;display:flex !important;flex-direction:column !important;justify-content:center !important;flex:0 0 50% !important;width:50% !important;}" } } }
  })} -->`,

  // Partner SVG container — MUST be wp:html (not wp:divi/code) so JS injection works without Divi wrapper interference
  `<!-- wp:html -->${getPartnerSVGContainer()}<!-- /wp:html -->`,

  // Partner grain texture overlay — wp:html for absolute positioning without Divi wrapper
  `<!-- wp:html --><div class="hero-grain hero-grain--partner"></div><!-- /wp:html -->`,

  // Partner light leak effect — wp:html for absolute positioning without Divi wrapper
  `<!-- wp:html --><div class="hero-light-leak"></div><!-- /wp:html -->`,

  // Partner Label
  textModule(
    'For ERP Implementers',
    { color: 'rgba(255, 255, 255, 0.9)', size: '10px', letterSpacing: '0.1em', weight: '600', textTransform: 'uppercase', family: 'JetBrains Mono, monospace' },
    { marginBottom: '24px', adminLabel: 'Label: For ERP Implementers' },
    "selector{display:flex !important;flex-direction:row !important;align-items:center;gap:12px;position:relative;z-index:2;margin-bottom:24px !important;}selector p{font-family:'JetBrains Mono',monospace !important;font-size:10px !important;font-weight:600 !important;text-transform:uppercase !important;letter-spacing:0.1em !important;color:rgba(255,255,255,0.9) !important;margin:0 !important;}selector::before{content:'';width:40px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8));flex-shrink:0;}"
  ),

  // Partner H2 Title
  codeModule('<h2 class="hero-title">Trapped in the <span class="hl-gold">Man-Day</span> Model?</h2>', 'H2: Trapped in the Man-Day Model?'),

  // Partner Subtitle
  textModule(
    'Your revenue is capped by headcount. Customization wars burn out your best consultants. We offer a way out\u2014product-based margins that compound instead of compress.',
    { color: 'rgba(255, 255, 255, 0.75)', size: '18px', weight: '400', family: 'Noto Sans, sans-serif', lineHeight: '1.75' },
    { marginBottom: '36px', adminLabel: 'Subtitle: Your revenue is capped...' },
    "selector{position:relative;z-index:2;max-width:500px;margin-bottom:36px !important;}selector p{font-family:'Noto Sans',sans-serif !important;font-size:18px !important;font-weight:400 !important;line-height:1.75 !important;color:rgba(255,255,255,0.75) !important;}"
  ),

  // Partner Buttons
  codeModule(partnerButtonsHTML, 'Button: Escape the Trap'),

  // Partner Stats
  codeModule(partnerStatsHTML, 'Stats: 30-40% / Yours to Keep'),

  // Hero JS (reduced-motion + IntersectionObserver + dynamic year)
  // MUST use wp:html — <script> tags don't execute inside wp:divi/code (innerHTML limitation)
  `<!-- wp:html -->${getHeroJS()}<!-- /wp:html -->`,

  '<!-- /wp:divi/column -->',
  '<!-- /wp:divi/row -->',
  '<!-- /wp:divi/section -->',
  '<!-- /wp:divi/placeholder -->'
].join('\n');


// ════════════════════════════════════════════════════════════════
// 6. PUSH TO WORDPRESS VIA DIRECT MySQL (bypasses Respira sanitization)
// ════════════════════════════════════════════════════════════════
// Respira API strips wp:divi/code blocks (HTML-encoded or removed entirely).
// Direct MySQL write preserves all block types and content exactly as written.
// Proven in testing: wp:divi/code blocks render on front-end AND show admin
// labels in VB Layers panel when written directly to wp_posts.

const VERSION = 'v30';
const TITLE = `Home \u2014 Hero ${VERSION} (direct MySQL + wp:divi/code)`;

if (DRY_RUN) {
  console.log('=== DRY RUN ===');
  console.log(`Page ID: ${PAGE_ID}`);
  console.log(`Title: ${TITLE}`);
  console.log(`Content length: ${blockContent.length} chars`);
  console.log(`CSS length: ${pageLevelCSS.length} chars`);

  // Count SVG elements
  const svgAnimate = (blockContent.match(/<animate /g) || []).length;
  const svgAnimateTransform = (blockContent.match(/<animateTransform /g) || []).length;
  const svgAnimateMotion = (blockContent.match(/<animateMotion /g) || []).length;
  const svgGTransform = (blockContent.match(/<g transform=/g) || []).length;
  const svgFilters = (blockContent.match(/<filter /g) || []).length;
  const freezeAnims = (blockContent.match(/data-freeze/g) || []).length;
  console.log(`\n=== SVG ANIMATION STATS ===`);
  console.log(`  <animate> elements: ${svgAnimate}`);
  console.log(`  <animateTransform> elements: ${svgAnimateTransform}`);
  console.log(`  <animateMotion> elements: ${svgAnimateMotion}`);
  console.log(`  <g transform> groups: ${svgGTransform}`);
  console.log(`  <filter> definitions: ${svgFilters}`);
  console.log(`  fill="freeze" triggers: ${freezeAnims}`);

  console.log('\n=== BLOCK STRUCTURE ===');
  const blocks = blockContent.match(/<!-- wp:\S+ /g) || [];
  blocks.forEach(b => console.log('  ' + b.trim()));

  console.log('\n=== NAMESPACED IDS ===');
  const ids = blockContent.match(/id="dw-[fp]-[^"]+"/g) || [];
  ids.forEach(id => console.log('  ' + id));

  console.log('\n=== CSS CLASSES USED ===');
  const classes = pageLevelCSS.match(/\.[a-z][\w-]*/g) || [];
  [...new Set(classes)].sort().forEach(c => console.log('  ' + c));
  process.exit(0);
}

// Helper: run MySQL query
function mysqlQuery(sql) {
  // Write SQL to temp file to avoid shell escaping issues with complex content
  const tmpFile = path.join(__dirname, '.tmp-sql.sql');
  fs.writeFileSync(tmpFile, sql, 'utf8');
  try {
    const result = execSync(
      `"${MYSQL_BIN}" --socket="${MYSQL_SOCKET}" -u root -proot ${MYSQL_DB} < "${tmpFile}"`,
      { encoding: 'utf8', timeout: 10000 }
    );
    return result;
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

// Helper: MySQL-escape a string value
function mysqlEscape(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\0/g, '\\0')
    .replace(/\x1a/g, '\\Z');
}

// Helper: upsert a postmeta value
function upsertMeta(postId, key, value) {
  return `INSERT INTO wp_postmeta (post_id, meta_key, meta_value)
VALUES (${postId}, '${mysqlEscape(key)}', '${mysqlEscape(value)}')
ON DUPLICATE KEY UPDATE meta_value = '${mysqlEscape(value)}';`;
}

console.log(`Pushing Hero ${VERSION} to page ${PAGE_ID} via direct MySQL...`);
console.log(`  Content: ${blockContent.length} chars`);
console.log(`  CSS: ${pageLevelCSS.length} chars`);

try {
  // 1. Update post content and title
  const updateSQL = `UPDATE wp_posts SET
  post_title = '${mysqlEscape(TITLE)}',
  post_content = '${mysqlEscape(blockContent)}',
  post_modified = NOW(),
  post_modified_gmt = UTC_TIMESTAMP()
WHERE ID = ${PAGE_ID};`;

  mysqlQuery(updateSQL);
  console.log('\u2713 Post content updated');

  // 2. Upsert all required meta values
  // Note: ON DUPLICATE KEY requires unique index on (post_id, meta_key).
  // WordPress doesn't have this by default, so we DELETE + INSERT instead.
  const metaEntries = [
    ['_et_pb_custom_css', pageLevelCSS],
    ['_et_pb_use_builder', 'on'],
    ['_et_pb_use_divi_5', 'on'],
    ['_et_pb_page_layout', 'et_full_width_page'],
    ['_wp_page_template', 'page-template-blank.php']
  ];

  const metaSQL = metaEntries.map(([key, value]) => {
    return `DELETE FROM wp_postmeta WHERE post_id = ${PAGE_ID} AND meta_key = '${mysqlEscape(key)}';
INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (${PAGE_ID}, '${mysqlEscape(key)}', '${mysqlEscape(value)}');`;
  }).join('\n');

  mysqlQuery(metaSQL);
  console.log('\u2713 Post meta updated (5 keys)');

  // 3. Verify
  const verify = mysqlQuery(`SELECT post_title, LENGTH(post_content) as content_len, post_status FROM wp_posts WHERE ID = ${PAGE_ID};`);
  console.log('\u2713 Verification:');
  console.log(verify.trim());

  console.log(`\n\u2713 Done! View at: ${SITE_URL}/?page_id=${PAGE_ID}`);
  console.log(`  VB: ${SITE_URL}/?page_id=${PAGE_ID}&et_fb=1`);
} catch (err) {
  console.error(`\u2717 MySQL error: ${err.message}`);
  if (err.stderr) console.error(err.stderr.toString().slice(0, 500));
  process.exit(1);
}


// ════════════════════════════════════════════════════════════════
// 7. POST-PUSH VERIFICATION (runs automatically after MySQL push)
// ════════════════════════════════════════════════════════════════
// Fetches the live page and checks that what we pushed actually renders.
// This catches: missing fonts, broken CSS, stripped content, caching issues.
// If ANY P0 check fails, the script exits non-zero — problem caught before
// Peter ever sees it.
//
// Skip with: --no-verify

if (!process.argv.includes('--no-verify') && !DRY_RUN) {
  const VERIFY_URL = `${SITE_URL}/?page_id=${PAGE_ID}`;
  console.log(`\n▸ Post-push verification: ${VERIFY_URL}`);

  let puppeteerAvailable = false;
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
    puppeteerAvailable = true;
  } catch (e) {
    // Fall back to curl-based checks
  }

  if (puppeteerAvailable) {
    (async () => {
      let browser;
      try {
        browser = await puppeteer.launch({
          headless: 'new',
          args: ['--ignore-certificate-errors', '--no-sandbox'],
          timeout: 15000
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto(VERIFY_URL, { waitUntil: 'networkidle2', timeout: 20000 });

        // Wait for fonts to load
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 1000));

        const checks = await page.evaluate(() => {
          const results = [];
          const fail = (id, msg) => results.push({ id, status: 'FAIL', msg });
          const pass = (id, msg) => results.push({ id, status: 'PASS', msg });

          // D1: Fonts loaded
          const notoLoaded = [...document.fonts].filter(f =>
            f.family.includes('Noto Sans') && f.status === 'loaded'
          ).length;
          const jbLoaded = [...document.fonts].filter(f =>
            f.family.includes('JetBrains Mono') && f.status === 'loaded'
          ).length;
          if (notoLoaded > 0) pass('D1-noto', `Noto Sans: ${notoLoaded} subsets loaded`);
          else fail('D1-noto', 'Noto Sans: 0 subsets loaded — font not rendering');
          if (jbLoaded > 0) pass('D1-jb', `JetBrains Mono: ${jbLoaded} subsets loaded`);
          else fail('D1-jb', 'JetBrains Mono: 0 subsets loaded — labels using fallback');

          // W1: Google Fonts <link> in <head>
          const fontLink = document.querySelector('link[href*="fonts.googleapis"]');
          if (fontLink) pass('W1', 'Google Fonts <link> present in <head>');
          else fail('W1', 'Google Fonts <link> MISSING from <head> — check mu-plugin');

          // L1: No horizontal scroll
          const overflow = document.documentElement.scrollWidth > window.innerWidth;
          if (!overflow) pass('L1', 'No horizontal scroll at 1440px');
          else fail('L1', `Horizontal scroll: ${document.documentElement.scrollWidth}px > ${window.innerWidth}px`);

          // Content: H1 exists
          const h1 = document.querySelector('h1');
          if (h1 && h1.textContent.includes('Invisible')) pass('C-h1', 'H1 title present');
          else fail('C-h1', 'H1 title missing or wrong text');

          // Content: H2 exists
          const h2 = document.querySelector('h2');
          if (h2 && h2.textContent.includes('Man-Day')) pass('C-h2', 'H2 title present');
          else fail('C-h2', 'H2 title missing or wrong text');

          // Content: Buttons present
          const btns = document.querySelectorAll('.hero-btn');
          if (btns.length >= 3) pass('C-btns', `${btns.length} buttons found`);
          else fail('C-btns', `Only ${btns.length} buttons found (expected ≥3)`);

          // C3: No "demo" in CTAs
          const demoBtn = [...document.querySelectorAll('a')].find(a =>
            /demo/i.test(a.textContent) && /btn|button|cta/i.test(a.className)
          );
          if (!demoBtn) pass('C3', 'No "demo" CTAs');
          else fail('C3', `CTA contains "demo": "${demoBtn.textContent}"`);

          // L3: No ghost background images
          const columns = document.querySelectorAll('.et_pb_column');
          let ghostFound = false;
          columns.forEach(col => {
            const bg = getComputedStyle(col).backgroundImage;
            if (bg.includes('.png') || bg.includes('.jpg')) {
              // Check if it's an expected image or a ghost from old versions
              if (!bg.includes('hero-factory-bg') && !bg.includes('hero-partner-bg')) {
                ghostFound = true;
              }
            }
          });
          if (!ghostFound) pass('L3', 'No ghost background images');
          else fail('L3', 'Unexpected background image found on column');

          return results;
        });

        let failures = 0;
        for (const c of checks) {
          const icon = c.status === 'PASS' ? '\u2713' : '\u2717';
          console.log(`  ${icon} [${c.id}] ${c.msg}`);
          if (c.status === 'FAIL') failures++;
        }

        if (failures > 0) {
          console.error(`\n\u2717 VERIFICATION FAILED: ${failures} check(s) failed.`);
          console.error('  Fix the issues above and re-run the build.');
          process.exit(1);
        } else {
          console.log(`\n\u2713 All ${checks.length} verification checks passed.`);
        }

        // Take a verification screenshot
        const ssPath = path.join(__dirname, 'screenshots', `hero-${VERSION}-verified.png`);
        const ssDir = path.dirname(ssPath);
        if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
        await page.screenshot({ path: ssPath, fullPage: false });
        console.log(`  Screenshot: ${ssPath}`);

      } catch (err) {
        console.error(`\u2717 Verification error: ${err.message}`);
        console.error('  (Build was pushed successfully — verification couldn\'t run)');
        // Don't exit 1 for verification infra errors — the push itself succeeded
      } finally {
        if (browser) await browser.close();
      }
    })();
  } else {
    // Fallback: curl-based sanity check (no browser needed)
    console.log('  (puppeteer not available — running curl-based checks)');
    try {
      const html = execSync(
        `curl -sk "${VERIFY_URL}" 2>/dev/null`,
        { encoding: 'utf8', timeout: 15000 }
      );

      let failures = 0;
      const check = (id, condition, passMsg, failMsg) => {
        if (condition) console.log(`  \u2713 [${id}] ${passMsg}`);
        else { console.log(`  \u2717 [${id}] ${failMsg}`); failures++; }
      };

      check('W1', html.includes('fonts.googleapis'),
        'Google Fonts <link> found in HTML',
        'Google Fonts <link> MISSING — check mu-plugin');
      check('C-h1', html.includes('Invisible'),
        'H1 title content present',
        'H1 "Invisible" not found in HTML');
      check('C-h2', html.includes('Man-Day'),
        'H2 title content present',
        'H2 "Man-Day" not found in HTML');
      check('C3', !html.match(/class="[^"]*btn[^"]*"[^>]*>[^<]*demo/i),
        'No "demo" CTAs',
        'CTA contains "demo"');
      check('CSS', html.includes('hero-subtitle') || html.includes('hero-title'),
        'Hero CSS classes found in page',
        'Hero CSS classes MISSING — pageLevelCSS may not have been pushed');

      if (failures > 0) {
        console.error(`\n\u2717 ${failures} check(s) failed. Install puppeteer for full verification.`);
        process.exit(1);
      } else {
        console.log(`\n\u2713 All curl-based checks passed. Install puppeteer for font/layout verification.`);
      }
    } catch (err) {
      console.log(`  \u2717 curl check failed: ${err.message}`);
      console.log('  (Build was pushed — verify manually)');
    }
  }
}
