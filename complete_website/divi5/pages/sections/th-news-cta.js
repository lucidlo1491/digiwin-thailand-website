/**
 * th-news-cta.js — Thai News CTA Section (S6)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: news-cta.js + i18n/th/news.js cta
 */

const base = require('../../lib/templates/_base');
const en = require('./news-cta');
const th = require('../../i18n/th/news');

const P = 'cta'; // Same CSS prefix as English
const D = th.cta;

function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--left" style="opacity: 0.12;"></div>
            <div class="news-cta-inner fade-in-section" style="position: relative; z-index: 3;">
                <h2>${D.title}</h2>
                <p>${D.subtitle}</p>
                <form class="${P}-form" onsubmit="event.preventDefault();">
                    <label for="subscribe-email" class="sr-only">Email address</label>
                    <input type="email" id="${P}-email" class="${P}-input" placeholder="${D.subscribePlaceholder}" required>
                    <button type="submit" class="${P}-btn">${D.subscribeBtn}</button>
                </form>
                <a href="/contact/" class="cta-secondary-link">${D.secondaryLink} <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
            </div>
            <script>
            (function(){
              var els = document.querySelectorAll('.fade-in-section');
              if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && els.length) {
                var io = new IntersectionObserver(function(entries){
                  entries.forEach(function(e){
                    if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}
                  });
                }, {threshold:0.15});
                els.forEach(function(el){io.observe(el);});
              } else {
                els.forEach(function(el){el.classList.add('is-visible');});
              }
              var tabs = document.querySelectorAll('.filter-tab');
              var cards = document.querySelectorAll('.past-card');
              tabs.forEach(function(tab){
                tab.addEventListener('click', function(){
                  tabs.forEach(function(t){t.classList.remove('active');});
                  tab.classList.add('active');
                  var f = tab.getAttribute('data-filter');
                  cards.forEach(function(c){
                    if(f==='all'||c.getAttribute('data-type')===f){
                      c.style.display='';
                      c.classList.remove('is-visible');
                      setTimeout(function(){c.classList.add('is-visible');},50);
                    } else {c.style.display='none';}
                  });
                });
              });
            })();
            </script>`;

  return base.wrapInDiviSection('Cta', html, 'Cta: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
