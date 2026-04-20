<?php
/**
 * Plugin Name: DigiWin Schema Markup (JSON-LD)
 * Description: Injects structured data (JSON-LD) into <head> for SEO and GEO optimization.
 *              Global schemas (Organization + WebSite) on every page.
 *              Per-page schemas stored in postmeta '_digiwin_schema'.
 * Version: 1.0
 * Author: DigiWin Thailand
 *
 * Installation:
 *   Upload to: wp-content/mu-plugins/digiwin-schema.php
 *   (via DirectAdmin File Manager)
 *   mu-plugins auto-activate — no activation step needed.
 *
 * How it works:
 *   1. Global Organization + WebSite JSON-LD injected on every front-end page
 *   2. Per-page JSON-LD stored in postmeta '_digiwin_schema' (pushed by build-page.js)
 *   3. wp_head action reads postmeta and outputs <script type="application/ld+json">
 *
 * Data flow:
 *   schema.js generates JSON → mysql.js pushes to _digiwin_schema postmeta →
 *   this plugin reads postmeta and outputs in <head>
 */

// Priority 5 — after font preload (priority 1-3) but early in <head>
add_action('wp_head', 'digiwin_schema_output', 5);

function digiwin_schema_output() {
    if (is_admin()) return;

    // ── Global schemas (every page) ──
    digiwin_output_global_schema();

    // ── Per-page schemas (from postmeta) ──
    digiwin_output_page_schema();
}

/**
 * Output global Organization + WebSite schema on every page
 */
function digiwin_output_global_schema() {
    $org = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'DigiWin Thailand',
        'alternateName' => 'Data Systems Consulting Co., Ltd.',
        'url' => 'https://www.digiwin.co.th',
        'logo' => 'https://www.digiwin.co.th/assets/digiwin-logo.svg',
        'foundingDate' => '1982',
        'numberOfEmployees' => array(
            '@type' => 'QuantitativeValue',
            'value' => 5000,
            'description' => 'Global employees across DigiWin group',
        ),
        'parentOrganization' => array(
            '@type' => 'Organization',
            'name' => 'DigiWin Software',
            'url' => 'https://www.digiwin.com',
        ),
        'address' => array(
            '@type' => 'PostalAddress',
            'streetAddress' => '399 Interchange 21 Building, 25th Floor, Unit 2501/2, Sukhumvit Road',
            'addressLocality' => 'Klongtoey Nua, Wattana',
            'addressRegion' => 'Bangkok',
            'postalCode' => '10110',
            'addressCountry' => 'TH',
        ),
        'contactPoint' => array(
            '@type' => 'ContactPoint',
            'contactType' => 'sales',
            'availableLanguage' => array('en', 'th', 'zh'),
        ),
    );

    $site = array(
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'DigiWin Thailand',
        'url' => 'https://www.digiwin.co.th',
        'inLanguage' => 'en',
        'description' => 'Smart Manufacturing ERP, MES, WMS & AIoT solutions for Thai factories. 44 years of manufacturing expertise, 50,000+ clients worldwide.',
    );

    echo '<!-- DigiWin Schema Markup -->' . "\n";
    echo '<script type="application/ld+json">' . wp_json_encode($org, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    echo '<script type="application/ld+json">' . wp_json_encode($site, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}

/**
 * Output per-page schema from postmeta '_digiwin_schema'
 */
function digiwin_output_page_schema() {
    if (!is_singular()) return;

    $post_id = get_the_ID();
    if (!$post_id) return;

    $schema_json = get_post_meta($post_id, '_digiwin_schema', true);
    if (empty($schema_json)) return;

    $schemas = json_decode($schema_json, true);
    if (!is_array($schemas)) return;

    foreach ($schemas as $schema) {
        if (empty($schema) || !isset($schema['@type'])) continue;
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
}
