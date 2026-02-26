/**
 * th-about-mission.js — Thai About Us Mission Section (S2)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-mission.js + i18n/th/about.js mission
 */

const base = require('../../lib/templates/_base');
const en = require('./about-mission');
const th = require('../../i18n/th/about');

const D = th.mission;

function blocks() {
  const html = `
    <div class="mission-section">
    <div class="dw-d-bg dw-d-bg--center" style="opacity: 0.06;"></div>
            <div class="mission-inner" style="position: relative; z-index: 2;">
                <div class="mission-content">
                    <h2>${D.title}</h2>
                    <p>${D.paragraphs[0]}</p>
                    <p>${D.paragraphs[1]}</p>
                    <p>${D.paragraphs[2]}</p>
                    <p>${D.paragraphs[3]}</p>
                    <div class="mission-origin">
                        <div class="mission-origin-chinese">${D.originChinese}</div>
                        <div class="mission-origin-pinyin">${D.originPinyin}</div>
                        <div class="mission-origin-meaning">${D.originMeaning}</div>
                    </div>
                </div>
                <div class="mission-visual">
                    <div class="mission-image">
                        <img src="/wp-content/uploads/2026/02/about-mission.jpg" alt="${D.imageAlt}" loading="lazy">
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('พันธกิจ', html, 'Mission: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
