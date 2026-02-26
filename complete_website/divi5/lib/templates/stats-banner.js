/**
 * stats-banner.js — Animated counter stats banner template
 *
 * Used by: home-stats-banner
 * Dark gradient with particle ocean, grain texture, counter animation.
 *
 * Data shape:
 * {
 *   adminLabel: string,
 *   sectionPrefix: string,
 *   background: string,
 *   padding?: string,
 *   stats: [{
 *     number: string,              // e.g. '50,000+', '80%', '300378'
 *     label: string,
 *     animated?: boolean,          // default true — triggers counter animation
 *   }],
 *   source?: string,               // e.g. 'Source: Common Wealth Magazine, 2023'
 *   particles?: 'bold'|'medium'|'subtle',  // particle ocean intensity
 *   waveFade?: boolean,            // add wave fade transition at bottom
 *   superD?: { class, variant, position, opacity, label },
 *   counterScript?: string,        // custom counter JS (or use default)
 *   particleScript?: string,       // custom particle JS (or use default)
 * }
 */

const base = require('./_base');

const schema = {
  name: 'stats-banner',
  description: 'Dark gradient stats banner with animated counters and particle ocean',
  category: 'DigiWin Templates',
};

// Default particle ocean script
const DEFAULT_PARTICLE_SCRIPT = `
<script>
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
  function init(){var els=document.querySelectorAll('[data-particles]');for(var i=0;i<els.length;i++)new DataOcean(els[i])}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
</script>`;

// Default counter animation script
const DEFAULT_COUNTER_SCRIPT = `
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
  setTimeout(function() { if (!animated) { animated = true; counters.forEach(function(c,i) { setTimeout(function() { animateCounter(c); }, i * 100); }); } }, 3000);
  var years = new Date().getFullYear() - 1982;
  document.querySelectorAll('.dw-years').forEach(function(el) { el.textContent = years; });
  var yearStat = document.querySelector('.stats-counter[data-target="44"]');
  if (yearStat) yearStat.setAttribute('data-target', String(years));
})();
</script>`;

function blocks(data) {
  const p = data.sectionPrefix || 'stats';
  const particles = data.particles || 'bold';

  const statsHTML = data.stats.map((stat, i) => {
    const animated = stat.animated !== false;
    return `
    <div class="${p}-item" data-index="${i}">
      <div class="${p}-number${animated ? ' stats-counter' : ''}" data-target="${stat.number}">
        ${stat.number}
      </div>
      <div class="${p}-label">${stat.label}</div>
    </div>`;
  }).join('');

  const sourceHTML = data.source
    ? `<div class="${p}-source">${data.source}</div>`
    : '';

  const waveFadeHTML = data.waveFade !== false
    ? `<div class="dw-wave-fade"></div>`
    : '';

  const html = `
    <div class="${p}-section" data-particles="${particles}">
    <div class="${p}-container">
      <div class="${p}-grid">
        ${statsHTML}
      </div>
      ${sourceHTML}
    </div>
    ${waveFadeHTML}
    </div>
    ${data.particleScript || DEFAULT_PARTICLE_SCRIPT}
    ${data.counterScript || DEFAULT_COUNTER_SCRIPT}
  `;

  return base.wrapInDiviSection(
    data.adminLabel,
    html,
    `${data.adminLabel}: Content`,
    data.superD ? { superDClass: data.superD.class, superDLabel: data.superD.label } : {}
  );
}

function css(data) {
  const p = data.sectionPrefix || 'stats';

  const superDPart = data.superD
    ? `/* Super D decoration */\n${base.superDCSS(data.superD.class, { variant: data.superD.variant, position: data.superD.position, opacity: data.superD.opacity, width: data.superD.width, minHeight: data.superD.minHeight })}`
    : '';

  const gridCols = data.gridCols || 3;
  const dividerColor = data.dividerColor || 'linear-gradient(180deg, transparent, rgba(0,175,240,0.3), transparent)';

  return `
${superDPart}
/* === ${data.adminLabel.toUpperCase()} === */
.${p}-section{background:${data.background};padding:${data.padding || '100px 40px'};position:relative;overflow:hidden;${base.fontSmoothingReset(p)}font-size:16px}
.${p}-container{position:relative;z-index:2;max-width:1200px;margin:0 auto}
${base.grainCSS(`.${p}-container`)}
.${p}-container::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(0,175,240,0.15) 0%,transparent 70%);pointer-events:none;z-index:1}
.${p}-grid{display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:${data.gridGap || '48px'};max-width:1200px;margin:0 80px;position:relative;z-index:2;line-height:1.6}
.${p}-item{text-align:center;position:relative;padding:0 24px}
.${p}-item:not(:nth-child(${gridCols}n))::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);width:1px;height:60%;background:${dividerColor}}
.${p}-number{font-family:'Noto Sans',sans-serif;font-weight:${data.numberWeight || '800'};font-size:${data.numberSize || 'clamp(48px, 6vw, 72px)'};color:${data.numberColor || '#0369a1'};letter-spacing:${data.numberTracking || '-0.03em'};line-height:1;margin-bottom:16px}
.${p}-label{font-family:${data.labelFont || "'JetBrains Mono',monospace"};font-size:${data.labelSize || '11px'};color:${data.labelColor || 'rgba(255,255,255,0.75)'};text-transform:${data.labelTextTransform || 'uppercase'};letter-spacing:${data.labelSpacing || '0.12em'};line-height:${data.labelLineHeight || '1.6'}}
${data.source ? `.${p}-source{text-align:center;font-family:${data.sourceFont || "'JetBrains Mono',monospace"};font-size:${data.sourceFontSize || '11px'};color:rgba(255,255,255,0.75);line-height:1.6;letter-spacing:${data.sourceSpacing || '0.08em'};text-transform:${data.sourceTextTransform || 'uppercase'};margin-top:${data.sourceMarginTop || '-16px'};padding-top:${data.sourcePaddingTop || '0'}}` : ''}
@media(max-width:991px){.${p}-grid{grid-template-columns:repeat(2,1fr);gap:36px}.${p}-item:nth-child(2n)::after{display:none}}
@media(max-width:767px){.${p}-grid{gap:28px}.${p}-item{padding:0 12px}.${p}-number{font-size:clamp(36px,10vw,48px)}.${p}-label{font-size:10px}}
/* Wave Fade */
${data.waveFade !== false ? `.dw-wave-fade{position:absolute;bottom:-60px;left:0;right:0;height:120px;z-index:3;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='wf' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23000864' stop-opacity='0.6'/%3E%3Cstop offset='40%25' stop-color='%23000864' stop-opacity='0.2'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1440' height='120' fill='url(%23wf)'/%3E%3C/svg%3E");background-size:100% 100%;pointer-events:none}` : ''}
${base.reducedMotion(`.stats-counter{animation:none !important}`)}`.trim();
}

module.exports = { blocks, css, schema, DEFAULT_PARTICLE_SCRIPT, DEFAULT_COUNTER_SCRIPT };
