/**
 * home-stats-banner.js — Stats Banner Section Builder
 *
 * ContentSpec §3.7 — 6 Key Numbers
 * Dark gradient with animated counters, grain texture, blue glow.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');

// SPEC tokens from ContentSpec §3.7
const SPEC = {
  sectionBg: 'linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)',
  sectionPadding: '100px 40px',
  gridGap: '48px',
  numberSize: 'clamp(48px, 6vw, 72px)',
  numberColor: '#0369a1',
  numberWeight: '800',
  numberTracking: '-0.03em',
  labelSize: '11px',
  labelColor: 'rgba(255,255,255,0.75)',
  labelSpacing: '0.12em',
  sourceSize: '11px',
  sourceColor: 'rgba(255,255,255,0.75)',
  mobilePadding: '80px 24px',
  dividerColor: 'linear-gradient(180deg, transparent, rgba(0,175,240,0.3), transparent)',
};

const stats = [
  { number: '44', label: 'Years in Manufacturing Software', animated: true },
  { number: '50,000+', label: 'Factory Deployments Across Asia', animated: true },
  { number: '100+', label: 'Thai Implementations', animated: true },
  { number: '80%', label: "of Taiwan's Top 2,000 Manufacturers", animated: true },
  { number: '54%', label: 'Taiwan Manufacturing Solutions Market Share', animated: true },
  { number: '300378', label: 'Shenzhen Stock Exchange', animated: false },
];

function blocks() {
  const statsHTML = stats.map((stat, index) => `
    <div class="stats-item" data-index="${index}">
      <div class="stats-number${stat.animated ? ' stats-counter' : ''}" data-target="${stat.number}">
        ${stat.animated ? '0' : stat.number}
      </div>
      <div class="stats-label">${stat.label}</div>
    </div>
  `).join('');

  const html = `
    <div class="stats-section">
    <div class="stats-container">
      <div class="stats-grid">
        ${statsHTML}
      </div>
      <div class="stats-source">
        Source: Common Wealth Magazine, 2023
      </div>
    </div>
    </div>
    <script>
      (function() {
        var counters = document.querySelectorAll('.stats-counter');
        var animated = false;
        function animateCounter(el) {
          var target = el.getAttribute('data-target');
          var isPercentage = target.indexOf('%') !== -1;
          var hasPlus = target.indexOf('+') !== -1;
          var hasComma = target.indexOf(',') !== -1;
          var numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
          var current = 0;
          var increment = numericTarget / 60;
          var frameRate = 1000 / 60;
          el.classList.add('counting');
          var timer = setInterval(function() {
            current += increment;
            if (current >= numericTarget) { current = numericTarget; clearInterval(timer); }
            var displayValue = Math.floor(current).toString();
            if (hasComma && current >= 1000) displayValue = displayValue.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
            if (hasPlus) displayValue += '+';
            if (isPercentage) displayValue += '%';
            el.textContent = displayValue;
          }, frameRate);
        }
        function checkScroll() {
          if (animated) return;
          var section = document.querySelector('.stats-container');
          if (!section) return;
          var rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
            animated = true;
            counters.forEach(function(counter, index) {
              setTimeout(function() { animateCounter(counter); }, index * 100);
            });
          }
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', checkScroll);
        else checkScroll();
        window.addEventListener('scroll', function() { checkScroll(); }, { passive: true });
        // Dynamic year calculation
        var years = new Date().getFullYear() - 1982;
        document.querySelectorAll('.dw-years').forEach(function(el) { el.textContent = years; });
        // Update the 44 stat to dynamic value
        var yearStat = document.querySelector('.stats-counter[data-target="44"]');
        if (yearStat) yearStat.setAttribute('data-target', String(years));
      })();
    </script>
  `;

  return [
    sectionOpen({ adminLabel: 'Stats Banner: 6 Key Numbers' }),
    rowOpen(),
    columnOpen(),
    codeModule(html, 'Stats Banner: 6 Numbers + Counter JS'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* === STATS BANNER === */
.stats-section{background:${SPEC.sectionBg};padding:${SPEC.sectionPadding};position:relative;overflow:hidden}
.stats-container{position:relative;z-index:2;max-width:1200px;margin:0 auto}
.stats-container::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
.stats-container::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(0,175,240,0.15) 0%,transparent 70%);pointer-events:none;z-index:1}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:${SPEC.gridGap};margin-bottom:48px}
.stats-item{text-align:center;position:relative;padding:0 24px}
.stats-item:not(:nth-child(3n))::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:1px;height:60%;background:${SPEC.dividerColor}}
.stats-number{font-family:'Noto Sans',sans-serif;font-weight:${SPEC.numberWeight};font-size:${SPEC.numberSize};color:${SPEC.numberColor};letter-spacing:${SPEC.numberTracking};line-height:1.1;margin-bottom:12px}
.stats-label{font-family:'JetBrains Mono',monospace;font-size:${SPEC.labelSize};color:${SPEC.labelColor};text-transform:uppercase;letter-spacing:${SPEC.labelSpacing};line-height:1.5}
.stats-source{text-align:center;font-family:'JetBrains Mono',monospace;font-size:${SPEC.sourceSize};color:${SPEC.sourceColor};margin-top:24px}
@media(max-width:991px){.stats-grid{grid-template-columns:repeat(2,1fr);gap:36px}.stats-item:nth-child(2n)::after{display:none}}
@media(max-width:767px){.stats-grid{gap:28px}.stats-item{padding:0 12px}.stats-number{font-size:clamp(36px,10vw,48px)}.stats-label{font-size:10px}}
@media(prefers-reduced-motion:reduce){.stats-counter{animation:none !important}}`;
}

module.exports = { blocks, css };
