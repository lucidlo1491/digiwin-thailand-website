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
const relatedSolutions = require('./related-solutions');
const faqAccordion = require('./faq-accordion');
const eventHero = require('./event-hero');
const eventProblem = require('./event-problem');
const eventOutcomes = require('./event-outcomes');
const eventAgenda = require('./event-agenda');
const eventPersonas = require('./event-personas');
const eventProof = require('./event-proof');
const eventLogistics = require('./event-logistics');
const eventRegister = require('./event-register');
const eventRelated = require('./event-related');

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
  'related-solutions': relatedSolutions,
  'faq-accordion': faqAccordion,
  'event-hero': eventHero,
  'event-problem': eventProblem,
  'event-outcomes': eventOutcomes,
  'event-agenda': eventAgenda,
  'event-personas': eventPersonas,
  'event-proof': eventProof,
  'event-logistics': eventLogistics,
  'event-register': eventRegister,
  'event-related': eventRelated,
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
