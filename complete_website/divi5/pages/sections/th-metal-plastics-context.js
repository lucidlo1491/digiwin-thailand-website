/**
 * th-metal-plastics-context.js — Thai Context Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./metal-plastics-context');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.context;
const P = 'context';

function blocks() {
  const html = `
    <div class="${P}-inner">
                <h2>${t.h2}</h2>
                <p>${t.body}</p>
            </div>`;

  return base.wrapInDiviSection('Context (Thai)', html, 'Context: Content');
}

module.exports = { blocks, css: () => en.css() };
