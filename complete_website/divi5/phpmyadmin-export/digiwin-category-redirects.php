<?php
/**
 * Plugin Name: DigiWin Category Redirects
 * Description: Redirect WordPress category archive pages to styled equivalents
 */

add_action('template_redirect', function () {
    if (!is_category()) return;

    $map = [
        'industry-news' => '/news/',
    ];

    $cat = get_queried_object();
    if ($cat && isset($map[$cat->slug])) {
        wp_redirect(home_url($map[$cat->slug]), 301);
        exit;
    }
});
