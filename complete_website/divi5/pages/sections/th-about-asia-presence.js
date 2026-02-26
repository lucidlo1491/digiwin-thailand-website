/**
 * th-about-asia-presence.js — Thai About Us Asia Presence Section (S9)
 *
 * COPY strategy: reuse English blocks() entirely (SVG map + city names stay English),
 * but translate header text and legend/mobile text via string replacement.
 * CSS reused from English.
 * Source: about-asia-presence.js + i18n/th/about.js asiaPresence
 */

const base = require('../../lib/templates/_base');
const en = require('./about-asia-presence');
const th = require('../../i18n/th/about');

const D = th.asiaPresence;

function blocks() {
  // Get English blocks and do targeted text replacements
  const enBlocks = en.blocks();

  // Replace translatable strings in the HTML content blocks
  // The blocks are an array — the main content is typically in block [3] (the code module)
  const result = enBlocks.map(block => {
    let b = block;
    // Header text
    b = b.replace('ACROSS ASIA-PACIFIC', D.label);
    b = b.replace('Regional Presence', D.title);
    b = b.replace(/Dual headquarters in Taiwan and Shanghai, with 43 offices across China and ASEAN\./g, D.subtitle);
    // Legend
    b = b.replace('>Headquarters<', `>${D.legend.headquarters}<`);
    b = b.replace('>Thailand Office<', `>${D.legend.thailandOffice}<`);
    b = b.replace('>Branch Offices<', `>${D.legend.branchOffices}<`);
    // Mobile corridor
    b = b.replace(/<strong>Taiwan<\/strong>/, `<strong>${D.mobile.taiwan.name}</strong>`);
    b = b.replace(/>Global HQ</, `>${D.mobile.taiwan.detail}<`);
    b = b.replace(/<strong>China<\/strong>/, `<strong>${D.mobile.china.name}</strong>`);
    b = b.replace(/>33 branches</, `>${D.mobile.china.detail}<`);
    b = b.replace(/<strong>Thailand<\/strong>/, `<strong>${D.mobile.thailand.name}</strong>`);
    b = b.replace(/>You Are Here<\/span>/, `>${D.mobile.thailand.detail}</span>`);
    b = b.replace(/<strong>Vietnam<\/strong>/, `<strong>${D.mobile.vietnam.name}</strong>`);
    b = b.replace(/>Ho Chi Minh</, `>${D.mobile.vietnam.detail}<`);
    b = b.replace(/<strong>Malaysia<\/strong>/, `<strong>${D.mobile.malaysia.name}</strong>`);
    b = b.replace(/>Kuala Lumpur</, `>${D.mobile.malaysia.detail}<`);
    // Region blocks — translate labels
    b = b.replace(/>HQ \+ 33 branches</, `>${D.regions.chinaBadge}<`);
    b = b.replace(/>HQ \+ 5 branches</, `>${D.regions.taiwanBadge}<`);
    b = b.replace(/>3 more countries</, `>${D.regions.aseanBadge}<`);
    b = b.replace('>You Are Here</span>', `>${D.asiaPresence?.youAreHere || D.mobile.thailand.detail}</span>`);
    // Thailand details
    b = b.replace('>Theparat Road, Bangna District<', `>${D.regions.thailandDetail}<`);
    b = b.replace('>Thai + Bilingual consultants<', `>${D.regions.thailandConsultants}<`);
    // Expansion section
    b = b.replace('>ASEAN Expansion Timeline<', `>${D.expansion.title}<`);
    b = b.replace('>China Branches<', `>${D.expansion.stats[0].label}<`);
    b = b.replace('>Taiwan Branches<', `>${D.expansion.stats[1].label}<`);
    b = b.replace('>Employees<', `>${D.expansion.stats[2].label}<`);
    b = b.replace('>ASEAN Countries<', `>${D.expansion.stats[3].label}<`);
    // Toggle text
    b = b.replace('>+18 more cities<', `>${D.regions.moreCities}<`);
    b = b.replace('>− Show less<', `>${D.regions.showLess}<`);
    // Admin label
    b = b.replace("'Asia Presence'", "'เครือข่ายเอเชีย'");
    return b;
  });

  return result;
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
