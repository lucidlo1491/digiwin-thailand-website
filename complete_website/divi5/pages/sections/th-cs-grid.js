/**
 * th-cs-grid.js — Thai Case Studies Grid Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./case-studies-cs-grid');
const thCS = require('../../i18n/th/case-studies');

const t = thCS.grid;
const c = t.cards;

function blocks() {
  const html = `
    <div class="cs-grid-section">
    <div class="cs-grid-inner">


                <div class="cs-filters" role="group" aria-label="กรองตามอุตสาหกรรม">
                    <button class="cs-filter-btn active" aria-pressed="true" data-filter="all">${t.filters.all}</button>
                    <button class="cs-filter-btn" aria-pressed="false" data-filter="plastics-packaging">${t.filters.plasticsPackaging}</button>
                    <button class="cs-filter-btn" aria-pressed="false" data-filter="metal-precision">${t.filters.metalPrecision}</button>
                    <button class="cs-filter-btn" aria-pressed="false" data-filter="electronics">${t.filters.electronics}</button>
                    <button class="cs-filter-btn" aria-pressed="false" data-filter="fasteners">${t.filters.fasteners}</button>
                </div>


                <div class="cs-card-grid">


                    <a href="#case-ginfong" class="cs-card cs-animate" data-industry="metal-precision" aria-label="${c[0].company} กรณีศึกษา">
                        <div class="cs-card-badge">${c[0].badge}</div>
                        <h2 class="cs-card-company">${c[0].company}</h2>
                        <p class="cs-card-summary">${c[0].summary}</p>
                        <div class="cs-card-metric">${c[0].metric}</div>
                        <div class="cs-card-metric-label">${c[0].metricLabel}</div>
                        <div class="cs-card-products">
                            <span class="cs-card-product-tag">ERP</span>
                            <span class="cs-card-product-tag">SFT</span>
                        </div>
                        <span class="cs-card-link">${c[0].link}</span>
                    </a>


                    <a href="#case-thai-alpha" class="cs-card cs-animate" data-industry="plastics-packaging" aria-label="${c[1].company} กรณีศึกษา">
                        <div class="cs-card-badge">${c[1].badge}</div>
                        <h2 class="cs-card-company">${c[1].company}</h2>
                        <p class="cs-card-summary">${c[1].summary}</p>
                        <div class="cs-card-metric">${c[1].metric}</div>
                        <div class="cs-card-metric-label">${c[1].metricLabel}</div>
                        <div class="cs-card-products">
                            <span class="cs-card-product-tag">iGP ERP</span>
                            <span class="cs-card-product-tag">WMS</span>
                        </div>
                        <span class="cs-card-link">${c[1].link}</span>
                    </a>


                    <a href="#case-thai-hosheng" class="cs-card cs-animate" data-industry="plastics-packaging" aria-label="${c[2].company} กรณีศึกษา">
                        <div class="cs-card-badge">${c[2].badge}</div>
                        <h2 class="cs-card-company">${c[2].company}</h2>
                        <p class="cs-card-summary">${c[2].summary}</p>
                        <div class="cs-card-metric">${c[2].metric}</div>
                        <div class="cs-card-metric-label">${c[2].metricLabel}</div>
                        <div class="cs-card-products">
                            <span class="cs-card-product-tag">iGP ERP</span>
                            <span class="cs-card-product-tag">WMS</span>
                            <span class="cs-card-product-tag">SFT</span>
                        </div>
                        <span class="cs-card-link">${c[2].link}</span>
                    </a>


                    <a href="#case-mufu" class="cs-card cs-animate" data-industry="electronics" aria-label="${c[3].company} กรณีศึกษา">
                        <div class="cs-card-badge">${c[3].badge}</div>
                        <h2 class="cs-card-company">${c[3].company}</h2>
                        <p class="cs-card-summary">${c[3].summary}</p>
                        <div class="cs-card-metric" style="font-size: 1.5rem;">${c[3].metric}</div>
                        <div class="cs-card-metric-label">${c[3].metricLabel}</div>
                        <div class="cs-card-products">
                            <span class="cs-card-product-tag">iGP ERP</span>
                        </div>
                        <span class="cs-card-link">${c[3].link}</span>
                    </a>


                    <a href="#case-taiyo" class="cs-card cs-animate" data-industry="fasteners" aria-label="${c[4].company} กรณีศึกษา">
                        <div class="cs-card-badge">${c[4].badge}</div>
                        <h2 class="cs-card-company">${c[4].company}</h2>
                        <p class="cs-card-summary">${c[4].summary}</p>
                        <div class="cs-card-metric" style="font-size: 1.5rem;">${c[4].metric}</div>
                        <div class="cs-card-metric-label">${c[4].metricLabel}</div>
                        <div class="cs-card-products">
                            <span class="cs-card-product-tag">ERP</span>
                            <span class="cs-card-product-tag">WMS</span>
                        </div>
                        <span class="cs-card-link">${c[4].link}</span>
                    </a>

                </div>
            </div>
    </div>
    <script>
    (function(){
      var filterBtns = document.querySelectorAll('.cs-filter-btn');
      var cards = document.querySelectorAll('.cs-card');
      filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(){
          var filter = this.getAttribute('data-filter');
          filterBtns.forEach(function(b){
            b.classList.remove('active');
            b.setAttribute('aria-pressed','false');
          });
          this.classList.add('active');
          this.setAttribute('aria-pressed','true');
          cards.forEach(function(card){
            if(filter==='all'||card.getAttribute('data-industry')===filter){
              card.style.display='';
            }else{
              card.style.display='none';
            }
          });
        });
      });
      function smoothScrollTo(el, duration){
        var start = window.pageYOffset;
        var end = el.getBoundingClientRect().top + start;
        var dist = end - start;
        var startTime = null;
        function step(ts){
          if(!startTime) startTime = ts;
          var t = Math.min((ts - startTime) / duration, 1);
          var ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
          window.scrollTo(0, start + dist * ease);
          if(t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
      document.querySelectorAll('.cs-card').forEach(function(card){
        card.addEventListener('click', function(e){
          var href = this.getAttribute('href');
          if(href && href.startsWith('#')){
            e.preventDefault();
            var target = document.querySelector(href);
            if(target) smoothScrollTo(target, 800);
          }
        });
      });
    })();
    </script>
    `;

  return base.wrapInDiviSection('CS Grid (Thai)', html, 'CS Grid: Content');
}

module.exports = { blocks, css: () => en.css() };
