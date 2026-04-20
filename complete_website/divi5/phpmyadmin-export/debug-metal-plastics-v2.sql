-- Compare postmeta between metal-plastics (100767) and automotive (100565)
-- Looking for _wp_page_path or other routing-related meta

-- Metal-plastics EN page meta
SELECT pm.post_id, pm.meta_key, LEFT(pm.meta_value, 200) as meta_val
FROM wp_postmeta pm
WHERE pm.post_id = 100767
AND pm.meta_key IN ('_wp_page_template', '_wp_trash_meta_status', '_wp_old_slug', '_wp_page_path')
ORDER BY pm.meta_key;

-- Automotive EN page meta (works fine)
SELECT pm.post_id, pm.meta_key, LEFT(pm.meta_value, 200) as meta_val
FROM wp_postmeta pm
WHERE pm.post_id = 100565
AND pm.meta_key IN ('_wp_page_template', '_wp_trash_meta_status', '_wp_old_slug', '_wp_page_path')
ORDER BY pm.meta_key;

-- Check if there's a _wp_old_slug that might confuse routing
SELECT post_id, meta_key, meta_value
FROM wp_postmeta
WHERE meta_key = '_wp_old_slug' AND meta_value LIKE '%metal%';

-- Nuclear debug: check the actual rewrite rules for this path pattern
-- (This returns the serialized rewrite_rules option - very large)
SELECT LENGTH(option_value) as rules_length FROM wp_options WHERE option_name = 'rewrite_rules';
