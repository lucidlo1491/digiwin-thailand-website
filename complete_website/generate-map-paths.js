#!/usr/bin/env node
/**
 * Converts Natural Earth GeoJSON country boundaries to SVG path data
 * for the DigiWin About page Asia-Pacific map.
 *
 * Uses Mercator projection, scaled to fit a sensible SVG viewBox.
 */

const fs = require('fs');

// Load GeoJSON
const geojson = JSON.parse(fs.readFileSync('./ne_countries_110m.geojson', 'utf8'));

// Countries we need (by ISO A3 code)
const COUNTRIES = {
  'CHN': { name: 'China', fill: 'rgba(0,175,240,0.15)', stroke: 'rgba(0,175,240,0.4)', strokeWidth: 1.2 },
  'TWN': { name: 'Taiwan', fill: 'rgba(0,175,240,0.18)', stroke: 'rgba(0,175,240,0.5)', strokeWidth: 1.5 },
  'THA': { name: 'Thailand', fill: 'rgba(245,158,11,0.15)', stroke: 'rgba(245,158,11,0.5)', strokeWidth: 1.5 },
  'VNM': { name: 'Vietnam', fill: 'rgba(100,116,139,0.2)', stroke: 'rgba(100,116,139,0.4)', strokeWidth: 1 },
  'MYS': { name: 'Malaysia', fill: 'rgba(100,116,139,0.15)', stroke: 'rgba(100,116,139,0.35)', strokeWidth: 1 },
  'MMR': { name: 'Myanmar', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'LAO': { name: 'Laos', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'KHM': { name: 'Cambodia', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'IDN': { name: 'Indonesia', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'PHL': { name: 'Philippines', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'KOR': { name: 'South Korea', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'PRK': { name: 'North Korea', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
  'MNG': { name: 'Mongolia', fill: 'rgba(100,116,139,0.05)', stroke: 'rgba(100,116,139,0.15)', strokeWidth: 0.5 },
  'JPN': { name: 'Japan', fill: 'rgba(100,116,139,0.08)', stroke: 'rgba(100,116,139,0.2)', strokeWidth: 0.5 },
};

// Geographic bounds for our map region (lng/lat)
const BOUNDS = {
  west: 73,    // Western China border
  east: 145,   // Past Japan/Philippines
  north: 54,   // Northern China/Mongolia
  south: -2    // Below Malaysia/Indonesia
};

// SVG output dimensions
const SVG_WIDTH = 1000;
const SVG_HEIGHT = 800;
const PADDING = 20;

// Mercator projection
function mercatorY(lat) {
  const latRad = lat * Math.PI / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}

function projectLng(lng) {
  return PADDING + ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * (SVG_WIDTH - 2 * PADDING);
}

function projectLat(lat) {
  const yMin = mercatorY(BOUNDS.south);
  const yMax = mercatorY(BOUNDS.north);
  const y = mercatorY(lat);
  return PADDING + ((yMax - y) / (yMax - yMin)) * (SVG_HEIGHT - 2 * PADDING);
}

// Convert a GeoJSON coordinate ring to SVG path data
function ringToPath(ring) {
  let d = '';
  for (let i = 0; i < ring.length; i++) {
    const [lng, lat] = ring[i];

    // Skip points outside our bounds (with margin)
    // But still include them for continuity
    const x = projectLng(lng);
    const y = projectLat(lat);

    if (i === 0) {
      d += `M${Math.round(x)} ${Math.round(y)}`;
    } else {
      d += `L${Math.round(x)} ${Math.round(y)}`;
    }
  }
  d += 'Z';
  return d;
}

// Convert a GeoJSON geometry to SVG path data
function geometryToPath(geometry) {
  let paths = [];

  if (geometry.type === 'Polygon') {
    // Only use the outer ring (index 0)
    paths.push(ringToPath(geometry.coordinates[0]));
  } else if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      paths.push(ringToPath(polygon[0]));
    }
  }

  return paths.join(' ');
}

// Extract countries
const results = [];

for (const feature of geojson.features) {
  const iso = feature.properties.ISO_A3 || feature.properties.ISO_A3_EH;
  const name = feature.properties.NAME;

  // Try matching by ISO code or name
  let config = COUNTRIES[iso];
  if (!config && name === 'Taiwan') config = COUNTRIES['TWN'];
  if (!config && name === 'China') config = COUNTRIES['CHN'];

  if (config) {
    const pathData = geometryToPath(feature.geometry);
    results.push({
      iso,
      name: config.name,
      fill: config.fill,
      stroke: config.stroke,
      strokeWidth: config.strokeWidth,
      pathData
    });
    console.error(`✓ Found ${config.name} (${iso})`);
  }
}

// City positions (real lat/lng → projected SVG coords)
const CITIES = [
  // China cities
  { name: 'Beijing', lng: 116.4, lat: 39.9, type: 'branch' },
  { name: 'Tianjin', lng: 117.2, lat: 39.1, type: 'branch' },
  { name: 'Dalian', lng: 121.6, lat: 38.9, type: 'branch' },
  { name: 'Jinan', lng: 117.0, lat: 36.7, type: 'branch' },
  { name: 'Qingdao', lng: 120.4, lat: 36.1, type: 'branch' },
  { name: 'Shanghai', lng: 121.5, lat: 31.2, type: 'hq', sublabel: 'China HQ' },
  { name: 'Suzhou', lng: 120.6, lat: 31.3, type: 'branch' },
  { name: 'Nanjing', lng: 118.8, lat: 32.1, type: 'branch' },
  { name: 'Hangzhou', lng: 120.2, lat: 30.3, type: 'branch' },
  { name: 'Wuhan', lng: 114.3, lat: 30.6, type: 'branch' },
  { name: 'Chengdu', lng: 104.1, lat: 30.6, type: 'branch' },
  { name: 'Chongqing', lng: 106.5, lat: 29.6, type: 'branch' },
  { name: 'Fuzhou', lng: 119.3, lat: 26.1, type: 'branch' },
  { name: 'Xiamen', lng: 118.1, lat: 24.5, type: 'branch' },
  { name: 'Dongguan', lng: 113.75, lat: 23.05, type: 'branch' },
  { name: 'Guangzhou', lng: 113.3, lat: 23.1, type: 'branch' },
  { name: 'Shenzhen', lng: 114.1, lat: 22.5, type: 'branch' },
  // Missing 16 cities from card
  { name: 'Ningbo', lng: 121.5, lat: 29.9, type: 'branch' },
  { name: 'Changsha', lng: 113.0, lat: 28.2, type: 'branch' },
  { name: 'Wuxi', lng: 120.3, lat: 31.6, type: 'branch' },
  { name: 'Changzhou', lng: 119.9, lat: 31.8, type: 'branch' },
  { name: 'Hefei', lng: 117.3, lat: 31.8, type: 'branch' },
  { name: 'Zhengzhou', lng: 113.6, lat: 34.7, type: 'branch' },
  { name: "Xi'an", lng: 108.9, lat: 34.3, type: 'branch' },
  { name: 'Shenyang', lng: 123.4, lat: 41.8, type: 'branch' },
  { name: 'Kunming', lng: 102.7, lat: 25.0, type: 'branch' },
  { name: 'Nanchang', lng: 115.9, lat: 28.7, type: 'branch' },
  { name: 'Huizhou', lng: 114.4, lat: 23.1, type: 'branch' },
  { name: 'Foshan', lng: 113.1, lat: 23.0, type: 'branch' },
  { name: 'Zhongshan', lng: 113.4, lat: 22.5, type: 'branch' },
  { name: 'Zhuhai', lng: 113.6, lat: 22.3, type: 'branch' },
  { name: 'Wenzhou', lng: 120.7, lat: 28.0, type: 'branch' },
  { name: 'Jiaxing', lng: 120.8, lat: 30.8, type: 'branch' },
  { name: 'Shaoxing', lng: 120.6, lat: 30.0, type: 'branch' },
  // Taiwan
  { name: 'Taipei', lng: 121.5, lat: 25.0, type: 'hq', sublabel: 'Taiwan HQ' },
  { name: 'Kaohsiung', lng: 120.3, lat: 22.6, type: 'branch' },
  // Thailand
  { name: 'Bangkok', lng: 100.5, lat: 13.8, type: 'featured', sublabel: 'You Are Here' },
  // Vietnam
  { name: 'Ho Chi Minh City', lng: 106.7, lat: 10.8, type: 'branch' },
  // Malaysia
  { name: 'Kuala Lumpur', lng: 101.7, lat: 3.1, type: 'branch' },
];

// Country label positions
const COUNTRY_LABELS = [
  { name: 'China', lng: 100, lat: 37, size: 28, color: 'rgba(255,255,255,0.5)', weight: 500 },
  { name: 'Thailand', lng: 100, lat: 16, size: 14, color: 'rgba(245,158,11,0.7)', weight: 500 },
  { name: 'Vietnam', lng: 107.5, lat: 16.5, size: 14, color: 'rgba(255,255,255,0.4)', weight: 500 },
  { name: 'Malaysia', lng: 102, lat: 5, size: 14, color: 'rgba(255,255,255,0.4)', weight: 500 },
];

// Generate output
console.log(`<!-- SVG viewBox: 0 0 ${SVG_WIDTH} ${SVG_HEIGHT} -->`);
console.log(`<!-- Generated from Natural Earth 110m data -->`);
console.log('');

// Country paths
for (const r of results) {
  console.log(`                    <!-- ${r.name} -->`);
  console.log(`                    <path d="${r.pathData}"`);
  console.log(`                          fill="${r.fill}" stroke="${r.stroke}" stroke-width="${r.strokeWidth}"/>`);
  console.log('');
}

// City markers
console.log('                    <!-- ====== CITY MARKERS ====== -->');
console.log('');

for (const city of CITIES) {
  const x = projectLng(city.lng).toFixed(1);
  const y = projectLat(city.lat).toFixed(1);

  console.log(`                    <!-- ${city.name} -->`);

  if (city.type === 'hq') {
    console.log(`                    <circle cx="${x}" cy="${y}" r="10" fill="#00AFF0" filter="url(#glow)"/>`);
    console.log(`                    <text x="${(parseFloat(x) + 16).toFixed(1)}" y="${(parseFloat(y) - 4).toFixed(1)}" fill="#fff" font-size="16" font-weight="600" font-family="Noto Sans">${city.name}</text>`);
    console.log(`                    <text x="${(parseFloat(x) + 16).toFixed(1)}" y="${(parseFloat(y) + 14).toFixed(1)}" fill="rgba(0,175,240,0.8)" font-size="12" font-family="JetBrains Mono">${city.sublabel}</text>`);
  } else if (city.type === 'featured') {
    console.log(`                    <circle cx="${x}" cy="${y}" r="14" fill="#F59E0B" filter="url(#glow)"/>`);
    console.log(`                    <circle cx="${x}" cy="${y}" r="22" fill="none" stroke="#F59E0B" stroke-width="2" stroke-opacity="0.5">`);
    console.log(`                        <animate attributeName="r" values="22;30;22" dur="2s" repeatCount="indefinite"/>`);
    console.log(`                        <animate attributeName="stroke-opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite"/>`);
    console.log(`                    </circle>`);
    console.log(`                    <text x="${x}" y="${(parseFloat(y) + 32).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="16" font-weight="700" font-family="Noto Sans">${city.name}</text>`);
    console.log(`                    <text x="${x}" y="${(parseFloat(y) + 48).toFixed(1)}" text-anchor="middle" fill="rgba(245,158,11,0.9)" font-size="13" font-family="JetBrains Mono">${city.sublabel}</text>`);
  } else {
    console.log(`                    <circle cx="${x}" cy="${y}" r="4" fill="#f97316"/>`);
    console.log(`                    <text x="${(parseFloat(x) + 10).toFixed(1)}" y="${(parseFloat(y) - 2).toFixed(1)}" fill="rgba(255,255,255,0.7)" font-size="13" font-family="JetBrains Mono">${city.name}</text>`);
  }
  console.log('');
}

// Country labels
console.log('                    <!-- Country Labels -->');
for (const label of COUNTRY_LABELS) {
  const x = projectLng(label.lng).toFixed(1);
  const y = projectLat(label.lat).toFixed(1);
  console.log(`                    <text x="${x}" y="${y}" fill="${label.color}" font-size="${label.size}" font-family="Noto Sans" font-weight="${label.weight}">${label.name}</text>`);
}

// Print viewBox info
console.error(`\nSVG viewBox: 0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`);
console.error(`Countries found: ${results.length}/${Object.keys(COUNTRIES).length}`);
console.error(`Cities: ${CITIES.length}`);
