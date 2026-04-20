<?php
/**
 * Plugin Name: DigiWin Flush Rewrite Rules (one-time)
 * Description: Hard flush rewrite rules on next admin load, then self-delete
 */
add_action('init', function() {
    flush_rewrite_rules(true);
    // Self-delete after flushing
    @unlink(__FILE__);
}, 1);
