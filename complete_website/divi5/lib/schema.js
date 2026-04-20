/**
 * schema.js — JSON-LD structured data generators for DigiWin Thailand
 *
 * Generates schema.org JSON-LD blocks for WordPress injection via mu-plugin.
 * All data extracted verbatim from existing HTML prototype JSON-LD blocks.
 *
 * ANTI-HALLUCINATION: Never fabricate data. All values must trace to:
 *   - HTML prototype JSON-LD blocks (complete_website/*.html)
 *   - memory/data-crosscheck-findings.md
 *   - Approved content specs
 *
 * Usage:
 *   const schema = require('./lib/schema');
 *   const schemas = [schema.organization(), schema.breadcrumbList([...])];
 *   const json = schema.serialize(schemas);
 *   // Pass to mysql.pushPage() as schemaMeta
 */

const SITE_URL = 'https://www.digiwin.co.th';
const LOGO_URL = `${SITE_URL}/assets/digiwin-logo.svg`;

/**
 * Organization schema — global, injected on every page via mu-plugin
 * Source: complete_website/index.html JSON-LD block
 */
function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DigiWin Thailand',
    alternateName: 'Data Systems Consulting Co., Ltd.',
    url: SITE_URL,
    logo: LOGO_URL,
    foundingDate: '1982',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 5000,
      description: 'Global employees across DigiWin group',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'DigiWin Software',
      url: 'https://www.digiwin.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '399 Interchange 21 Building, 25th Floor, Unit 2501/2, Sukhumvit Road',
      addressLocality: 'Klongtoey Nua, Wattana',
      addressRegion: 'Bangkok',
      postalCode: '10110',
      addressCountry: 'TH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['en', 'th', 'zh'],
    },
    sameAs: [],
  };
}

/**
 * WebSite schema — global, injected on every page via mu-plugin
 * Source: complete_website/index.html JSON-LD block
 */
function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DigiWin Thailand',
    url: SITE_URL,
    inLanguage: 'en',
    description: 'Smart Manufacturing ERP, MES, WMS & AIoT solutions for Thai factories. 44 years of manufacturing expertise, 50,000+ clients worldwide.',
  };
}

/**
 * BreadcrumbList schema — per-page navigation path
 * @param {Array<{name: string, url: string}>} items — breadcrumb trail
 */
function breadcrumbList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * SoftwareApplication schema — product pages (ERP, MES, WMS, AIoT)
 * @param {object} data — { name, subCategory, description, url, features, featureList }
 */
function softwareApplication(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: data.subCategory,
    description: data.description,
    operatingSystem: data.operatingSystem || 'Web-based',
    url: data.url.startsWith('http') ? data.url : `${SITE_URL}${data.url}`,
    featureList: data.featureList,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'THB',
      description: 'Contact for pricing',
      url: `${SITE_URL}/demo/`,
    },
    provider: {
      '@type': 'Organization',
      name: 'DigiWin Thailand',
      url: SITE_URL,
    },
  };
}

/**
 * FAQPage schema — from FAQ accordion data
 * @param {Array<{question: string, answer: string}>} items
 */
function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answer),
      },
    })),
  };
}

/**
 * Event schema — event pages
 * @param {object} data — { name, description, startDate, endDate, locationName, city, country, isAccessibleForFree }
 */
function event(data) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: data.locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.city || 'Bangkok',
        addressCountry: data.country || 'TH',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'DigiWin Thailand',
      url: SITE_URL,
    },
    isAccessibleForFree: data.isAccessibleForFree !== false,
  };
  return schema;
}

/**
 * Article/BlogPosting schema — blog posts
 * @param {object} data — { headline, description, datePublished, dateModified, url }
 */
function blogPosting(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Organization',
      name: 'DigiWin Thailand',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DigiWin Thailand',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url.startsWith('http') ? data.url : `${SITE_URL}${data.url}`,
    },
  };
}

/**
 * WebPage schema — generic pages (industries, about, etc.)
 * @param {object} data — { name, description, url }
 */
function webPage(data) {
  return {
    '@context': 'https://schema.org',
    '@type': data.type || 'WebPage',
    name: data.name,
    description: data.description,
    url: data.url.startsWith('http') ? data.url : `${SITE_URL}${data.url}`,
  };
}

/**
 * LocalBusiness schema — for Thai locale pages
 */
function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DigiWin Thailand (Data Systems Consulting)',
    image: LOGO_URL,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '399 Interchange 21 Building, 25th Floor, Unit 2501/2, Sukhumvit Road',
      addressLocality: 'Klongtoey Nua, Wattana',
      addressRegion: 'Bangkok',
      postalCode: '10110',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.7380,
      longitude: 100.5613,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$$$',
  };
}

// ── Helpers ──

/**
 * Strip HTML tags from string (for FAQ answer text)
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Serialize array of schema objects to JSON string for postmeta storage
 * @param {Array} schemas — array of schema objects
 * @returns {string} JSON string (array of objects)
 */
function serialize(schemas) {
  return JSON.stringify(schemas);
}

/**
 * Create Thai variant of a schema by adding inLanguage and adjusting URLs
 * @param {object} schema — original EN schema
 * @param {object} overrides — { name, description } in Thai
 */
function thaiVariant(schema, overrides = {}) {
  const copy = JSON.parse(JSON.stringify(schema));
  copy.inLanguage = 'th';

  // Override name/description if provided
  if (overrides.name) copy.name = overrides.name;
  if (overrides.description) copy.description = overrides.description;

  // Adjust URLs: add /th/ prefix
  if (copy.url && !copy.url.includes('/th/')) {
    copy.url = copy.url.replace(SITE_URL, `${SITE_URL}/th`);
  }
  if (copy.mainEntityOfPage && copy.mainEntityOfPage['@id']) {
    copy.mainEntityOfPage['@id'] = copy.mainEntityOfPage['@id'].replace(SITE_URL, `${SITE_URL}/th`);
  }

  // Adjust BreadcrumbList URLs
  if (copy['@type'] === 'BreadcrumbList' && copy.itemListElement) {
    copy.itemListElement = copy.itemListElement.map(item => ({
      ...item,
      item: item.item.replace(SITE_URL, `${SITE_URL}/th`),
    }));
  }

  return copy;
}

module.exports = {
  SITE_URL,
  LOGO_URL,
  organization,
  webSite,
  breadcrumbList,
  softwareApplication,
  faqPage,
  event,
  blogPosting,
  webPage,
  localBusiness,
  serialize,
  thaiVariant,
  stripHtml,
};
