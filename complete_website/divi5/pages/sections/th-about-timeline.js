/**
 * th-about-timeline.js — Thai About Us Timeline Section (S3)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-timeline.js + i18n/th/about.js timeline
 */

const base = require('../../lib/templates/_base');
const en = require('./about-timeline');
const th = require('../../i18n/th/about');

const D = th.timeline;
const M = D.milestones;

function milestoneHTML(m, position) {
  const badgeHTML = m.badge ? `\n                                    <span class="milestone-badge ${m.badgeClass}">${m.badge}</span>` : '';
  const glowClass = (m.year === '1982' || m.year === '2014' || m.year === '2026') ? ' glow' : '';

  if (position === 'above') {
    return `
                            <div class="milestone above">
                                <div class="milestone-card">
                                    <div class="milestone-year">${m.year}</div>
                                    <div class="milestone-title">${m.title}</div>
                                    <div class="milestone-desc">${m.desc}</div>${badgeHTML}
                                </div>
                                <div class="milestone-connector"></div>
                                <div class="milestone-dot${glowClass}"></div>
                            </div>`;
  }
  return `
                            <div class="milestone below">
                                <div class="milestone-dot${glowClass}"></div>
                                <div class="milestone-connector"></div>
                                <div class="milestone-card">
                                    <div class="milestone-year">${m.year}</div>
                                    <div class="milestone-title">${m.title}</div>
                                    <div class="milestone-desc">${m.desc}</div>${badgeHTML}
                                </div>
                            </div>`;
}

function blocks() {
  const milestonesHTML = M.map((m, i) =>
    milestoneHTML(m, i % 2 === 0 ? 'above' : 'below')
  ).join('\n');

  const html = `
    <div class="timeline-section">
    <div class="timeline-inner">
                <div class="timeline-header">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>

                <div class="timeline-scroll-container">
                    <div class="timeline-rail-wrapper">
                        <div class="timeline-rail">
${milestonesHTML}
                        </div>
                    </div>
                    <div class="scroll-hint">${D.scrollHint}</div>
                </div>
            </div>
    <script>(function(){var y=new Date().getFullYear();document.querySelectorAll('.dw-years').forEach(function(e){e.textContent=y-1982})})();</script>
    </div>
    `;

  return base.wrapInDiviSection('ไทม์ไลน์', html, 'Timeline: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
