-- Fix: Delete trashed page 100567 (metal-plastics) that's blocking the real page (100767)
-- Also delete its postmeta
DELETE FROM wp_postmeta WHERE post_id = 100567;
DELETE FROM wp_posts WHERE ID = 100567;

-- Also clean up the nav_menu_item duplicate if it's stale (100587)
-- (nav_menu_items with same slug shouldn't cause issues, but let's check its status)

-- Restore the metal-plastics page excerpt we used for debugging
UPDATE wp_posts SET post_excerpt = '' WHERE ID = 100767;

-- Clean up debug options
DELETE FROM wp_options WHERE option_name IN ('_digiwin_debug_metal', '_digiwin_debug_metal_orig_excerpt');

-- Flush rewrite rules to be safe
DELETE FROM wp_options WHERE option_name = 'rewrite_rules';
