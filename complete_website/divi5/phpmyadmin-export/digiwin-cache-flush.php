<?php
/**
 * Plugin Name: DigiWin Cache Flush (self-destructing)
 * Description: Clears Divi et-cache directory and removes itself.
 */
add_action('init', function () {
    $cache_dir = WP_CONTENT_DIR . '/et-cache';
    if (is_dir($cache_dir)) {
        $it = new RecursiveDirectoryIterator($cache_dir, RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $f) {
            if ($f->isDir()) {
                rmdir($f->getRealPath());
            } else {
                unlink($f->getRealPath());
            }
        }
        error_log('DigiWin: et-cache cleared');
    }
    // Self-destruct
    @unlink(__FILE__);
}, 1);
