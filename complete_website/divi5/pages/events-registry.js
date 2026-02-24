/**
 * events-registry.js — Shared event metadata for cross-page references
 *
 * Used by event-related section builders to pick 3 events by slug.
 * Single source of truth for event metadata (title, date, location, color, href).
 */

const ALL_EVENTS = {
  'boi-compliance-workshop': {
    slug: 'boi-compliance-workshop',
    title: 'BOI Compliance Workshop: Production-Level Reconciliation That Passes Every Audit',
    shortTitle: 'BOI Compliance Workshop',
    typeBadge: 'Workshop',
    date: 'March 15, 2026',
    location: 'Bangkok, Thailand',
    href: '/events/boi-compliance-workshop/',
    color: '#15803d',
  },
  'factory-tour-mes': {
    slug: 'factory-tour-mes',
    title: 'Live Factory Tour: See DigiWin MES in Action',
    shortTitle: 'Factory Tour: MES in Action',
    typeBadge: 'Factory Visit',
    date: 'May 8, 2026',
    location: 'EEC Industrial Zone',
    href: '/news/', // TODO: update when event page is built
    color: '#b45309',
  },
  'manufacturing-expo-2026': {
    slug: 'manufacturing-expo-2026',
    title: 'Manufacturing Expo 2026: DigiWin Thailand Booth',
    shortTitle: 'Manufacturing Expo 2026',
    typeBadge: 'Trade Show',
    date: 'June 19–22, 2026',
    location: 'BITEC, Bangkok',
    href: '/news/', // TODO: update when event page is built
    color: '#6d28d9',
  },
  'production-transparency-seminar': {
    slug: 'production-transparency-seminar',
    title: 'Production Transparency: From Paper Reports to Real-Time Dashboards',
    shortTitle: 'Production Transparency Seminar',
    typeBadge: 'Seminar',
    date: 'April 10, 2026',
    location: 'Bangkok, Thailand',
    href: '/events/production-transparency-seminar/',
    color: '#0369a1',
  },
  'shop-floor-data-workshop': {
    slug: 'shop-floor-data-workshop',
    title: 'Hands-On: Setting Up Shop Floor Data Collection with MES',
    shortTitle: 'Shop Floor Data Workshop',
    typeBadge: 'Workshop',
    date: 'April 24, 2026',
    location: 'Bangkok, Thailand',
    href: '/news/', // TODO: update when event page is built
    color: '#15803d',
  },
};

/**
 * Pick N events by slug, excluding a specific slug (the current page).
 * @param {string} excludeSlug — slug to exclude (current event)
 * @param {number} [count=3] — how many to pick
 * @returns {object[]} array of event objects
 */
function pickRelated(excludeSlug, count = 3) {
  return Object.values(ALL_EVENTS)
    .filter(e => e.slug !== excludeSlug)
    .slice(0, count);
}

module.exports = { ALL_EVENTS, pickRelated };
