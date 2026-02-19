/**
 * home-stats-banner.js — Stats Banner Section Builder
 *
 * ContentSpec §3.7 — 6 Key Numbers
 * Dark gradient with animated counters, grain texture, blue glow.
 */

const { codeModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const superD = require('../../lib/super-d');

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
        ${stat.number}
      </div>
      <div class="stats-label">${stat.label}</div>
    </div>
  `).join('');

  const html = `
    <div class="stats-section" data-particles="bold">
    <div class="stats-container">
      <div class="stats-grid">
        ${statsHTML}
      </div>
      <div class="stats-source">
        Source: Common Wealth Magazine, 2023
      </div>
    </div>
    <!-- Wave fade transition to next section -->
    <div class="dw-wave-fade"></div>
    </div>
    <script>
      // ── Particle Ocean (DataOcean) — self-contained for WordPress ──
      (function(){
        'use strict';
        var reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var PI2=Math.PI*2;
        var BLUE=[0,175,240],CYAN=[0,230,255];
        var PRESETS={
          subtle:{frontOpacity:0.30,backOpacity:0.04,frontRadius:4.5,backRadius:0.6,color:BLUE,colorAlt:CYAN,altRatio:0.12},
          medium:{frontOpacity:0.45,backOpacity:0.06,frontRadius:5.0,backRadius:0.8,color:BLUE,colorAlt:CYAN,altRatio:0.18},
          bold:{frontOpacity:0.60,backOpacity:0.10,frontRadius:5.5,backRadius:1.0,color:CYAN,colorAlt:BLUE,altRatio:0.25}
        };
        function lerp(a,b,t){return a+(b-a)*t}
        function DataOcean(el){
          this.el=el;this.canvas=null;this.ctx=null;this.w=0;this.h=0;
          this.dpr=Math.min(window.devicePixelRatio||1,2);this.visible=false;this.raf=null;this.time=0;this.resizeTimer=null;this.colors=null;
          this.opts=this._parseOpts();this._setup();this._buildColors();this._observe();
          if(!reducedMotion){this._loop()}else{this.visible=true;this._draw(0)}
        }
        DataOcean.prototype._parseOpts=function(){var n=this.el.getAttribute('data-particles')||'subtle';if(n===''||n==='true')n='subtle';return PRESETS[n]||PRESETS.subtle};
        DataOcean.prototype._setup=function(){
          var c=document.createElement('canvas');c.setAttribute('aria-hidden','true');
          c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
          var pos=getComputedStyle(this.el).position;if(pos==='static')this.el.style.position='relative';
          this.el.style.overflow='hidden';this.el.insertBefore(c,this.el.firstChild);this.canvas=c;this.ctx=c.getContext('2d');this._resize();
          var self=this;window.addEventListener('resize',function(){clearTimeout(self.resizeTimer);self.resizeTimer=setTimeout(function(){self._resize();self._buildColors()},200)});
        };
        DataOcean.prototype._resize=function(){var r=this.el.getBoundingClientRect();this.w=r.width;this.h=r.height;this.canvas.width=this.w*this.dpr;this.canvas.height=this.h*this.dpr;this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0)};
        DataOcean.prototype._buildColors=function(){var cols=Math.min(65,Math.ceil(this.w/22)+4);var rows=35;this._cols=cols;this._rows=rows;var n=cols*rows;this.colors=new Array(n);var alt=this.opts.altRatio;for(var i=0;i<n;i++){this.colors[i]=Math.random()<alt?this.opts.colorAlt:this.opts.color}};
        DataOcean.prototype._observe=function(){var self=this;if('IntersectionObserver' in window){this._obs=new IntersectionObserver(function(e){self.visible=e[0].isIntersecting},{rootMargin:'150px 0px'});this._obs.observe(this.el)}else{this.visible=true}};
        DataOcean.prototype._loop=function(){var self=this;var last=0;(function tick(ts){self.raf=requestAnimationFrame(tick);if(!self.visible)return;if(ts-last<30)return;last=ts;self.time+=0.006;self._draw(self.time)})(0)};
        DataOcean.prototype._draw=function(t){
          var ctx=this.ctx,w=this.w,h=this.h,opts=this.opts,cols=this._cols,rows=this._rows;
          ctx.clearRect(0,0,w,h);var ground=h+10,horizon=h*0.35,totalSpan=ground-horizon,idx=0;
          for(var row=rows-1;row>=0;row--){
            var depth=row/(rows-1),mappedDepth=Math.pow(depth,0.55),baseY=ground-mappedDepth*totalSpan;
            var dotR=lerp(opts.frontRadius,opts.backRadius,depth),dotA=lerp(opts.frontOpacity,opts.backOpacity,depth);
            var colSpacing=lerp(w/(cols-4),w/(cols+15),depth),rowShift=depth*w*0.12;
            var waveScale=1-depth*0.75,amp1=70*waveScale,amp2=25*waveScale;
            for(var col=0;col<cols;col++){
              var screenX=col*colSpacing-rowShift+colSpacing*0.5;
              if(screenX<-30||screenX>w+30){idx++;continue}
              var worldX=col*24,worldZ=row*18;
              var wave=amp1*Math.sin(worldX*0.0065+worldZ*0.012+t*0.9);
              wave+=amp2*Math.sin(worldX*0.013-worldZ*0.008+t*0.55+1.8);
              var screenY=baseY-wave;if(screenY<-15||screenY>h+15){idx++;continue}
              var c=this.colors[idx%this.colors.length];
              ctx.beginPath();ctx.arc(screenX,screenY,dotR,0,PI2);
              ctx.fillStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+dotA+')';ctx.fill();idx++;
            }
          }
        };
        DataOcean.prototype.destroy=function(){if(this.raf)cancelAnimationFrame(this.raf);if(this._obs)this._obs.disconnect();if(this.canvas&&this.canvas.parentNode)this.canvas.parentNode.removeChild(this.canvas)};
        function init(){var els=document.querySelectorAll('.stats-section[data-particles]');for(var i=0;i<els.length;i++)new DataOcean(els[i])}
        if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
      })();
    </script>
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
        // Fallback: fire counters after 3s even without scroll (ensures screenshots capture final values)
        setTimeout(function() { if (!animated) { animated = true; counters.forEach(function(c,i) { setTimeout(function() { animateCounter(c); }, i * 100); }); } }, 3000);
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
    sectionOpen({ adminLabel: 'Stats Banner: 6 Key Numbers', css: 'selector{background:transparent !important;padding:0 !important;}' }),
    rowOpen(),
    columnOpen(),
    codeModule(superD.html('stats-deco'), 'Decoration: Super D Corner'),
    codeModule(html, 'Stats Banner: 6 Numbers + Counter JS'),
    columnClose(),
    rowClose(),
    sectionClose(),
  ];
}

function css() {
  return `
/* Super D: outline corner-br */
${superD.css('stats-deco', { variant: 'outline', position: 'corner-tr', opacity: 0.08, width: '25%', minHeight: '25vh' })}
/* === STATS BANNER === */
.stats-section{background:${SPEC.sectionBg};padding:${SPEC.sectionPadding};position:relative;overflow:hidden;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-size:16px}
.stats-container{position:relative;z-index:2;max-width:1200px;margin:0 auto}
.stats-container::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
.stats-container::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(0,175,240,0.15) 0%,transparent 70%);pointer-events:none;z-index:1}
.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:${SPEC.gridGap};max-width:1200px;margin:0 80px;position:relative;z-index:2;line-height:1.6}
.stats-item{text-align:center;position:relative;padding:0 24px}
.stats-item:not(:nth-child(3n))::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:1px;height:60%;background:${SPEC.dividerColor}}
.stats-number{font-family:'Noto Sans',sans-serif;font-weight:${SPEC.numberWeight};font-size:${SPEC.numberSize};color:${SPEC.numberColor};letter-spacing:${SPEC.numberTracking};line-height:1;margin-bottom:16px}
.stats-label{font-family:'JetBrains Mono',monospace;font-size:${SPEC.labelSize};color:${SPEC.labelColor};text-transform:uppercase;letter-spacing:${SPEC.labelSpacing};line-height:1.6}
.stats-source{text-align:center;font-family:'JetBrains Mono',monospace;font-size:${SPEC.sourceSize};color:${SPEC.sourceColor};margin-top:24px}
@media(max-width:991px){.stats-grid{grid-template-columns:repeat(2,1fr);gap:36px}.stats-item:nth-child(2n)::after{display:none}}
@media(max-width:767px){.stats-grid{gap:28px}.stats-item{padding:0 12px}.stats-number{font-size:clamp(36px,10vw,48px)}.stats-label{font-size:10px}}
/* === WAVE FADE TRANSITION === */
.dw-wave-fade{position:absolute;bottom:-60px;left:0;right:0;height:120px;z-index:3;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='wf' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23000864' stop-opacity='0.6'/%3E%3Cstop offset='40%25' stop-color='%23000864' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1440' height='120' fill='url(%23wf)'/%3E%3C/svg%3E");background-size:100% 100%;pointer-events:none}
@media(prefers-reduced-motion:reduce){.stats-counter{animation:none !important}}`;
}

module.exports = { blocks, css };
