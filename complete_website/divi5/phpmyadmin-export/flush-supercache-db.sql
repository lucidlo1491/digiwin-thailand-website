-- Temporarily disable WP-Super-Cache to force fresh pages
-- (The cache will regenerate with updated content on next visit)
UPDATE wp_options SET option_value = '0' WHERE option_name = 'wp_super_cache_disabled';

-- Delete all cached page records from Super Cache's tracking
DELETE FROM wp_options WHERE option_name LIKE '%supercache%';
DELETE FROM wp_options WHERE option_name LIKE '%wp_cache%' AND option_name NOT IN ('wp_super_cache_disabled');

-- Force cache to be considered stale
UPDATE wp_options SET option_value = UNIX_TIMESTAMP() WHERE option_name = 'wp_cache_gc_timestamp';
