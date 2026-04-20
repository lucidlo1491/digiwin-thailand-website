<?php
/**
 * Plugin Name: DigiWin Favicon (Super D)
 * Description: Sets the browser tab icon to the DigiWin Super D mark
 * Version: 1.0
 * Author: DigiWin Thailand
 *
 * Upload to: wp-content/mu-plugins/digiwin-favicon.php
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Remove default WordPress site icon and inject DigiWin Super D favicon.
 * Uses inline SVG data URI — no file upload needed.
 */
add_action( 'wp_head', 'digiwin_favicon', 1 );
add_action( 'admin_head', 'digiwin_favicon', 1 );
add_action( 'login_head', 'digiwin_favicon', 1 );

function digiwin_favicon() {
    // Remove any existing site icon output
    remove_action( 'wp_head', 'wp_site_icon', 99 );

    // Super D mark SVG — fully percent-encoded for safe embedding in href=""
    $svg_encoded = '%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16.73 16.89%27%3E%3Cpath fill=%27%2300AFF0%27 d=%27M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z%27/%3E%3Cpath fill=%27%2300AFF0%27 d=%27M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0%27/%3E%3C/svg%3E';

    echo '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,' . $svg_encoded . '">' . "\n";
    echo '<link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,' . $svg_encoded . '">' . "\n";
}

/**
 * Also override the site icon in REST API / customizer to prevent WP from
 * adding its own favicon tags.
 */
add_filter( 'get_site_icon_url', function() {
    return 'data:image/svg+xml,' . rawurlencode( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.73 16.89"><path fill="#00AFF0" d="M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z"/><path fill="#00AFF0" d="M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0"/></svg>' );
}, 99 );
