/**
 * th-aiot-integration.js — Thai AIoT Integration Section (S8) — COPY
 *
 * Same layout/CSS as English aiot-integration.js, Thai strings from i18n.
 */

const base = require('../../lib/templates/_base');
const th = require('../../i18n/th/aiot');

function blocks() {
  const ig = th.integration;

  // SVG icons per node (same as English)
  const svgs = {
    ERP: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    MES: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><line x1="6" y1="12" x2="6" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="14" y2="12"/><line x1="18" y1="12" x2="18" y2="12"/></svg>',
    AIoT: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>',
    WMS: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>',
  };

  const nodesArr = ig.nodes.map(n => {
    const isActive = n.active;
    const tag = isActive ? 'div' : 'a';
    const hrefAttr = isActive ? '' : ` href="${n.href}"`;
    const activeClass = isActive ? ' aiot-active' : '';

    return `<${tag}${hrefAttr} class="integration-node${activeClass}">
                    <div class="node-icon">${svgs[n.title]}</div>
                    <div class="node-title">${n.title}</div>
                    <div class="node-subtitle">${n.subtitle}</div>
                </${tag}>`;
  });

  // Join nodes with arrows between them
  const nodesHTML = nodesArr.join('\n                <span class="integration-arrow">\u2194</span>\n                ');

  const linksHTML = ig.links.map(l =>
    `<a href="${l.href}" class="integration-link">${l.text} <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>`
  ).join('\n                ');

  const html = `
    <div class="integration-section">
    <div class="integration-header">
                <h2>${ig.title}</h2>
                <p>${ig.subtitle}</p>
            </div>
            <div class="integration-diagram">
                ${nodesHTML}
            </div>

            <div class="integration-message">
                <div class="integration-gradient-bar" aria-hidden="true"></div>
                <p>${ig.message}</p>
            </div>

            <div class="integration-links">
                ${linksHTML}
            </div>
    </div>
    `;

  return base.wrapInDiviSection(ig.adminLabel, html, 'Integration: Content');
}

// Reuse English CSS
const { css } = require('./aiot-integration');

module.exports = { blocks, css };
