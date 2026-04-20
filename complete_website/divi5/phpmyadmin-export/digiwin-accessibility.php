<?php
/**
 * Plugin Name: DigiWin Accessibility Fixes
 * Description: Adds <main> landmark and restores pinch-to-zoom (WCAG 2.1 compliance)
 * Version: 1.0
 * Author: DigiWin Thailand
 *
 * Installation:
 *   Upload this file to: wp-content/mu-plugins/digiwin-accessibility.php
 *   (via DirectAdmin File Manager or FTP)
 *   mu-plugins auto-activate — no activation step needed.
 */

// 1. Add <main> landmark around page content
// Divi 5 wraps content in #et-main-area but doesn't use <main> element
add_action('et_before_main_content', function () {
    echo '<main id="main-content" role="main">';
});
add_action('et_after_main_content', function () {
    echo '</main>';
});

// Fallback: if Divi hooks don't fire, inject via output buffer
add_action('wp_head', function () {
    if (!is_admin()) {
        ob_start(function ($html) {
            // Only inject if <main> doesn't already exist
            if (stripos($html, '<main') !== false) {
                return $html;
            }
            // Wrap #et-main-area content in <main>
            $html = preg_replace(
                '/<div\s+id="et-main-area"([^>]*)>/i',
                '<div id="et-main-area"$1><main id="main-content" role="main">',
                $html,
                1
            );
            $html = preg_replace(
                '/<\/div>\s*<!--\s*#et-main-area\s*-->/i',
                '</main></div><!-- #et-main-area -->',
                $html,
                1
            );
            // If no #et-main-area comment, try closing before footer
            if (stripos($html, '<main') === false) {
                $html = preg_replace(
                    '/(<div\s+id="et-main-area"[^>]*>)/i',
                    '$1<main id="main-content" role="main">',
                    $html,
                    1
                );
                $html = preg_replace(
                    '/(<footer[\s>])/i',
                    '</main>$1',
                    $html,
                    1
                );
            }
            return $html;
        });
    }
});
add_action('wp_footer', function () {
    if (!is_admin() && ob_get_level() > 0) {
        ob_end_flush();
    }
}, 999);

// 2. Remove viewport zoom restrictions (WCAG 1.4.4 — Resize Text)
// Divi adds maximum-scale=1.0 and user-scalable=0 which blocks pinch-to-zoom
add_filter('et_viewport_meta', function () {
    return 'width=device-width, initial-scale=1.0';
});

// Fallback: filter the entire viewport meta tag via output
add_filter('the_content', function ($content) { return $content; }); // noop to ensure filters load
add_action('wp_head', function () {
    // Remove Divi's restrictive viewport and add our own
    add_action('wp_head', function () {
        echo '<script>document.addEventListener("DOMContentLoaded",function(){var v=document.querySelector(\'meta[name="viewport"]\');if(v&&(v.content.indexOf("maximum-scale")!==-1||v.content.indexOf("user-scalable")!==-1)){v.setAttribute("content","width=device-width, initial-scale=1.0")}});</script>' . "\n";
    }, 999);
}, 1);
