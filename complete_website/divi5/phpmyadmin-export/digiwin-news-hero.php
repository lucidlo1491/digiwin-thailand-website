<?php
/**
 * Plugin Name: DigiWin News Hero
 * Description: Injects featured image as hero background on single posts + hreflang for bilingual posts.
 * Version: 1.0
 * Author: DigiWin Thailand
 */

// Featured image hero background — only on single posts with a thumbnail
add_action('wp_head', function () {
    if (!is_single() || !has_post_thumbnail()) {
        return;
    }
    $url = esc_url(get_the_post_thumbnail_url(null, 'full'));
    if (!$url) {
        return;
    }
    echo '<style>.dw-blog-hero-wrap{background-image:linear-gradient(to bottom,rgba(0,4,50,0.6),rgba(0,8,100,0.85)),url(' . $url . ');background-size:cover;background-position:center}</style>' . "\n";
}, 20);

// hreflang for bilingual posts — uses _digiwin_lang_pair postmeta
add_action('wp_head', function () {
    if (!is_single()) {
        return;
    }
    $post_id = get_the_ID();
    $pair_id = get_post_meta($post_id, '_digiwin_lang_pair', true);
    if (!$pair_id || get_post_status($pair_id) !== 'publish') {
        return;
    }

    $current_url = get_permalink($post_id);
    $pair_url    = get_permalink($pair_id);
    $current_slug = get_post_field('post_name', $post_id);

    // Determine which is EN and which is TH based on -th suffix
    if (substr($current_slug, -3) === '-th') {
        $th_url = $current_url;
        $en_url = $pair_url;
    } else {
        $en_url = $current_url;
        $th_url = $pair_url;
    }

    echo '<link rel="alternate" hreflang="en" href="' . esc_url($en_url) . '">' . "\n";
    echo '<link rel="alternate" hreflang="th" href="' . esc_url($th_url) . '">' . "\n";
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($en_url) . '">' . "\n";
}, 5);
