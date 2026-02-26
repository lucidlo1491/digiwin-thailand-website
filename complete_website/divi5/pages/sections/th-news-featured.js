/**
 * th-news-featured.js — Thai News Featured Section (S2)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-featured.js + i18n/th/news.js featured
 */

const base = require('../../lib/templates/_base');
const en = require('./news-featured');
const th = require('../../i18n/th/news');

const P = 'fea'; // Same CSS prefix as English
const D = th.featured;

function blocks() {
  const html = `
    <div class="particle-ocean-host" data-particles style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;"></div>
            <div class="featured-inner" style="position: relative; z-index: 2;">
                <span class="featured-label">${D.label}</span>
                <div class="featured-card">
                    <div class="featured-image">
                        <div class="${P}">
                            <div class="${P}-month">Mar</div>
                            <div class="${P}-day">15</div>
                            <div class="${P}-year">2026</div>
                            <div class="${P}-divider"></div>
                        </div>
                        <div class="${P}-meta">
                            <div class="${P}-meta-item">
                                <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${D.time}
                            </div>
                            <div class="${P}-meta-item">
                                <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                ${D.location}
                            </div>
                        </div>
                        <span class="urgency-badge">
                            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                            ${D.urgency}
                        </span>
                    </div>
                    <div class="featured-content">
                        <span class="event-type-badge workshop">${D.eventType}</span>
                        <h2>${D.title}</h2>
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                ${D.date}
                            </div>
                            <div class="event-meta-item">
                                <svg aria-hidden="true" viewBox="0 0 24 24" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                ${D.location}
                            </div>
                        </div>
                        <p>${D.description}</p>
                        <a href="/news/events/boi-compliance-workshop/" class="event-cta">${D.ctaText}
                            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <script>
(function(){
'use strict';
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var PI2=Math.PI*2;
var BLUE=[0,175,240],CYAN=[0,230,255];
var PRESET={frontOpacity:0.30,backOpacity:0.04,frontRadius:4.5,backRadius:0.6,color:BLUE,colorAlt:CYAN,altRatio:0.12};
function lerp(a,b,t){return a+(b-a)*t;}

function DataOcean(section){
this.el=section;this.canvas=null;this.ctx=null;this.w=0;this.h=0;
this.dpr=Math.min(window.devicePixelRatio||1,2);this.visible=false;this.raf=null;this.time=0;this.resizeTimer=null;this.colors=null;
this.opts=PRESET;this._setup();this._buildColors();this._observe();
if(!rm){this._loop();}else{this.visible=true;this._draw(0);}
}

DataOcean.prototype._setup=function(){
var c=document.createElement('canvas');c.setAttribute('aria-hidden','true');
c.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
this.el.style.position='relative';
this.el.style.overflow='hidden';
this.el.insertBefore(c,this.el.firstChild);
this.canvas=c;this.ctx=c.getContext('2d');this._resize();
var self=this;window.addEventListener('resize',function(){clearTimeout(self.resizeTimer);self.resizeTimer=setTimeout(function(){self._resize();self._buildColors();},200);});
};

DataOcean.prototype._resize=function(){
this.w=this.el.clientWidth;this.h=this.el.clientHeight;
this.canvas.width=this.w*this.dpr;this.canvas.height=this.h*this.dpr;
this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
};

DataOcean.prototype._buildColors=function(){var cols=Math.min(65,Math.ceil(this.w/22)+4);var rows=35;this._cols=cols;this._rows=rows;var n=cols*rows;this.colors=new Array(n);var alt=this.opts.altRatio;for(var i=0;i<n;i++){this.colors[i]=Math.random()<alt?this.opts.colorAlt:this.opts.color;}};
DataOcean.prototype._observe=function(){var self=this;if('IntersectionObserver' in window){this._obs=new IntersectionObserver(function(e){self.visible=e[0].isIntersecting;},{rootMargin:'150px 0px'});this._obs.observe(this.el);}else{this.visible=true;}};
DataOcean.prototype._loop=function(){var self=this;var last=0;(function tick(ts){self.raf=requestAnimationFrame(tick);if(!self.visible)return;if(ts-last<30)return;last=ts;self.time+=0.006;self._draw(self.time);})(0);};

DataOcean.prototype._draw=function(t){
var ctx=this.ctx,w=this.w,h=this.h,opts=this.opts,cols=this._cols,rows=this._rows;
ctx.clearRect(0,0,w,h);
var ground=h+10,horizon=h*0.35,totalSpan=ground-horizon,idx=0;
for(var row=rows-1;row>=0;row--){
var depth=row/(rows-1),mappedDepth=Math.pow(depth,0.55),baseY=ground-mappedDepth*totalSpan;
var dotR=lerp(opts.frontRadius,opts.backRadius,depth),dotA=lerp(opts.frontOpacity,opts.backOpacity,depth);
var colSpacing=lerp(w/(cols-4),w/(cols+15),depth),rowShift=depth*w*0.12;
var waveScale=(1-depth*0.75),amp1=70*waveScale,amp2=25*waveScale;
for(var col=0;col<cols;col++){
var screenX=col*colSpacing-rowShift+colSpacing*0.5;
if(screenX<-30||screenX>w+30){idx++;continue;}
var worldX=col*24,worldZ=row*18;
var wave=amp1*Math.sin(worldX*0.0065+worldZ*0.012+t*0.9);
wave+=amp2*Math.sin(worldX*0.013-worldZ*0.008+t*0.55+1.8);
var screenY=baseY-wave;if(screenY<-15||screenY>h+15){idx++;continue;}
var c=this.colors[idx%this.colors.length];
ctx.beginPath();ctx.arc(screenX,screenY,dotR,0,PI2);
ctx.fillStyle='rgba('+c[0]+','+c[1]+','+c[2]+','+dotA+')';ctx.fill();idx++;
}}};

function init(){
var marker=document.querySelector('.particle-ocean-host');
if(!marker)return;
var section=marker.closest('.et_pb_section');
if(!section){section=marker.closest('.featured-section');}
if(!section)return;
marker.remove();
new DataOcean(section);
}
if(document.readyState==='complete'){setTimeout(init,200);}
else{window.addEventListener('load',function(){setTimeout(init,200);});}
})();
            </script>`;

  return base.wrapInDiviSection('Featured', html, 'Featured: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
