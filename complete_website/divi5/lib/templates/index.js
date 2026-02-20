/**
 * index.js — Template registry
 *
 * Exports all templates by name. Used by:
 * - Page section builders (require a specific template)
 * - library-push.js (iterates all templates for WordPress Layout Library)
 *
 * Each template exports { blocks(data), css(data), schema }
 */

const cardGridDark = require('./card-grid-dark');
const cardGridLight = require('./card-grid-light');
const statsBanner = require('./stats-banner');
const ctaGradient = require('./cta-gradient');
const heroGradient = require('./hero-gradient');
const logoMarquee = require('./logo-marquee');
const footerOcean = require('./footer-ocean');
const resultCards = require('./result-cards');
const tabContent = require('./tab-content');

// Registry: name → template module
const templates = {
  'card-grid-dark': cardGridDark,
  'card-grid-light': cardGridLight,
  'stats-banner': statsBanner,
  'cta-gradient': ctaGradient,
  'hero-gradient': heroGradient,
  'logo-marquee': logoMarquee,
  'footer-ocean': footerOcean,
  'result-cards': resultCards,
  'tab-content': tabContent,
};

/**
 * Get a template by name.
 * @param {string} name — template name
 * @returns {object} { blocks, css, schema }
 */
function get(name) {
  const tmpl = templates[name];
  if (!tmpl) throw new Error(`Template not found: "${name}". Available: ${Object.keys(templates).join(', ')}`);
  return tmpl;
}

/**
 * List all registered templates.
 * @returns {object[]} Array of { name, description, category }
 */
function list() {
  return Object.entries(templates).map(([name, tmpl]) => ({
    name,
    ...tmpl.schema,
  }));
}

module.exports = { templates, get, list };
