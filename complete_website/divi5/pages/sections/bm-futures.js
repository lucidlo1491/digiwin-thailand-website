/**
 * bm-futures.js — Three Possible Futures Section (S5)
 *
 * 3 path cards (red/yellow/green) stacked vertically + dark insight box with diamond pattern.
 * Custom builder (unique stacked-card-with-insight pattern).
 *
 * Source: business-model.html lines 910-970
 */

const base = require('../../lib/templates/_base');

const P = 'futures'; // CSS prefix

// ════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════
const ICON_X = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const ICON_ALERT = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// ════════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════════
const PATHS = [
  {
    id: 'red',
    icon: ICON_X,
    iconGradient: 'linear-gradient(135deg,#dc2626,#b91c1c)',
    bgGradient: 'linear-gradient(135deg,#fef2f2,#fff5f5)',
    border: '#fecaca',
    titleColor: '#7f1d1d',
    subtitleColor: '#991b1b',
    bodyColor: '#991b1b',
    title: 'Path 1: \u201CWork Harder\u201D',
    subtitle: 'Why this fails: You cannot outwork structural margin compression.',
    body: 'Senior consultants spend <strong>50% of their time</strong> as \u201Cdata babysitters\u201D instead of billing high-value architecture. Same effort now yields half the profit. Working harder on the same model = running faster on a treadmill.',
  },
  {
    id: 'yellow',
    icon: ICON_ALERT,
    iconGradient: 'linear-gradient(135deg,#eab308,#ca8a04)',
    bgGradient: 'linear-gradient(135deg,#fef9c3,#fefce8)',
    border: '#fde047',
    titleColor: '#713f12',
    subtitleColor: '#854d0e',
    bodyColor: '#854d0e',
    title: 'Path 2: \u201CFind a Niche\u201D',
    subtitle: 'Why this is limited: You hit a ceiling on client size and technical capability.',
    body: 'Niche software often lacks native connectivity for <strong>Industry 4.0</strong>. Specializing means building heavy custom code\u2014creating \u201Cgolden handcuffs\u201D where your best people maintain old code instead of deploying new projects. Past success becomes a prison.',
  },
  {
    id: 'green',
    icon: ICON_CHECK,
    iconGradient: 'linear-gradient(135deg,#22c55e,#16a34a)',
    bgGradient: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
    border: '#86efac',
    titleColor: '#166534',
    subtitleColor: '#15803d',
    bodyColor: '#15803d',
    title: 'Path 3: \u201CChange the Model\u201D',
    subtitle: 'Why this is logical: It decouples revenue from hours.',
    body: 'Leverage a <strong>PaaS platform</strong> to build reusable industry templates. Convert one-off customization into licensable IP. Enter clients via low-risk <strong>\u201CReverse Cut\u201D</strong> (MES/AIoT first), then expand. A 35-person firm generates the revenue of a 50-person firm through technology arbitrage.',
  },
];

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const pathsHTML = PATHS.map(p => `
        <div class="${P}-path ${P}-path--${p.id}" style="background:${p.bgGradient};border-color:${p.border}">
          <div class="${P}-path-top">
            <div class="${P}-path-icon" style="background:${p.iconGradient}">${p.icon}</div>
            <div>
              <h3 style="color:${p.titleColor}">${p.title}</h3>
              <p class="${P}-path-subtitle" style="color:${p.subtitleColor}">${p.subtitle}</p>
            </div>
          </div>
          <p class="${P}-path-body" style="color:${p.bodyColor}">${p.body}</p>
        </div>`).join('');

  // Diamond pattern as CSS background (not SVG — simpler, no wp_kses issues)
  const html = `
    <div class="${P}-section">
      <div class="${P}-wave-vertical" aria-hidden="true"></div>
      <div class="${P}-inner">
        <div class="${P}-header">
          <h2 class="${P}-title">Three Possible Futures</h2>
          <p class="${P}-subtitle">You have three paths. Only one leads to sustainable growth.</p>
        </div>
        <div class="${P}-paths">${pathsHTML}
        </div>
        <div class="${P}-insight">
          <div class="${P}-insight-inner">
            <p class="${P}-insight-quote">\u201CShift from selling hours to building assets. From labor arbitrage to technology arbitrage.\u201D</p>
            <p class="${P}-insight-subtext">The goal isn\u2019t to sell more software\u2014it\u2019s to stop relying on unpredictable one-off fees and build a sustainable \u201Cfarming\u201D practice based on recurring maintenance and add-on modules.</p>
          </div>
        </div>
      </div>
    </div>`;

  return base.wrapInDiviSection('Futures: Three Paths', html, 'Futures: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === THREE FUTURES (S5) === */
.${P}-section{padding:100px 24px;background:#fff;position:relative;overflow:hidden;${base.fontSmoothingReset(P)}font-size:16px}
.${P}-wave-vertical{position:absolute;top:0;left:0;width:200px;height:100%;background:linear-gradient(90deg,rgba(0,175,240,0.04),transparent);pointer-events:none;z-index:0;opacity:0.06}
.${P}-inner{max-width:900px;margin:0 auto;position:relative;z-index:2}
.${P}-header{text-align:center;max-width:700px;margin:0 auto 48px}
.${P}-title{font-family:'Noto Sans',sans-serif;font-size:40px;font-weight:700;color:#000864;line-height:1.6;margin:0 0 16px;padding:0}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0 auto;padding:0}
.${P}-paths{display:grid;gap:24px;margin-bottom:48px}
.${P}-path{border:1px solid;border-radius:16px;padding:32px}
.${P}-path-top{display:flex;align-items:center;gap:16px;margin-bottom:16px}
.${P}-path-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.${P}-path h3{font-family:'Noto Sans',sans-serif;font-size:20px;font-weight:600;margin:0;padding:0}
.${P}-path-subtitle{font-family:'Noto Sans',sans-serif;font-size:14px;margin:4px 0 0 0;padding:0}
.${P}-path-body{font-family:'Noto Sans',sans-serif;font-size:15px;line-height:1.7;margin:0;padding:0}
.${P}-insight{background:linear-gradient(135deg,#000864 0%,#000432 100%);border-radius:24px;padding:60px;text-align:center;position:relative;overflow:hidden}
.${P}-insight::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 0l20 20-20 20L0 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
.${P}-insight-inner{position:relative;z-index:1}
.${P}-insight-quote{font-family:'Noto Sans',sans-serif;font-size:32px;font-weight:500;color:#fff;line-height:1.4;margin:0 0 32px;padding:0}
.${P}-insight-subtext{font-family:'Noto Sans',sans-serif;font-size:18px;color:rgba(255,255,255,0.8);line-height:1.7;max-width:600px;margin:0 auto;padding:0}
@media(max-width:${base.BREAKPOINTS.mobile}px){
  .${P}-section{padding:80px 20px}
  .${P}-insight{padding:40px 24px}
  .${P}-insight-quote{font-size:24px}
  .${P}-header{margin-bottom:40px}
}
${base.reducedMotion(`.${P}-path,.${P}-insight{transition:none !important}`)}`.trim();
}

module.exports = { blocks, css };
