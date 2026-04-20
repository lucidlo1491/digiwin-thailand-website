<?php
/**
 * Plugin Name: DigiWin Rewrite Guard
 * Description: Self-heals WordPress rewrite rules when wp_options.rewrite_rules goes empty. Prevents site-wide 404s after mu-plugin deploys, cache evictions, or panel-triggered flushes. Logs each recovery.
 * Version: 1.0.0
 * Author: DigiWin Thailand
 */

if (!defined('ABSPATH')) exit;

/**
 * On init priority 99 — after all plugins/theme have registered their
 * rewrite rules. If rewrite_rules option is empty, flush_rewrite_rules()
 * will rebuild it from the registered rules. The flush runs during init,
 * which fires BEFORE WP::parse_request(), so the current request benefits
 * from the restored rules — no second request needed to fix 404s.
 */
add_action('init', function () {
    $rules = get_option('rewrite_rules');
    if (!empty($rules) && is_array($rules)) return;

    // Mutex: prevent concurrent requests from all flushing at once.
    if (get_transient('digiwin_rewrite_guard_flushing')) return;
    set_transient('digiwin_rewrite_guard_flushing', 1, 30);

    flush_rewrite_rules(false); // soft flush — nginx, no .htaccess

    $count = (int) get_option('digiwin_rewrite_guard_count', 0) + 1;
    update_option('digiwin_rewrite_guard_count', $count, false);
    update_option('digiwin_rewrite_guard_last', current_time('mysql'), false);

    error_log('[DigiWin Rewrite Guard] rewrite_rules was empty — rebuilt. Recovery #' . $count);

    delete_transient('digiwin_rewrite_guard_flushing');
}, 99);

/**
 * Admin notice so the team sees when this fired and how often — if it
 * keeps triggering, the root cause needs investigation (mu-plugin deploy
 * not flushing, cache plugin evicting options, panel action wiping DB).
 */
add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) return;
    $count = (int) get_option('digiwin_rewrite_guard_count', 0);
    if ($count === 0) return;
    $last = esc_html(get_option('digiwin_rewrite_guard_last', 'unknown'));
    echo '<div class="notice notice-warning is-dismissible"><p>';
    echo '<strong>DigiWin Rewrite Guard:</strong> auto-rebuilt rewrite rules ';
    echo (int) $count . ' time(s). Last: ' . $last . '. ';
    echo 'Repeat triggers = investigate (usually mu-plugin deploy or cache eviction).';
    echo '</p></div>';
});
