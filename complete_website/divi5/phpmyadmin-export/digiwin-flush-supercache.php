<?php
/**
 * Plugin Name: DigiWin Flush WP-Super-Cache (one-time)
 * Description: Flush all WP-Super-Cache files, then self-delete
 */
add_action('init', function() {
    if (function_exists('wp_cache_clear_cache')) {
        wp_cache_clear_cache();
    }
    // Also delete cache files directly
    $cache_dir = WP_CONTENT_DIR . '/cache/supercache/';
    if (is_dir($cache_dir)) {
        $it = new RecursiveDirectoryIterator($cache_dir, RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $file) {
            if ($file->isDir()) @rmdir($file->getRealPath());
            else @unlink($file->getRealPath());
        }
    }
    @unlink(__FILE__);
}, 1);
