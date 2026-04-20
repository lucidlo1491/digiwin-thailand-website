-- Force Divi to regenerate CSS cache
-- Run: node da-push.js --file divi-cache-invalidate.sql

-- 1. Delete Divi cache transients
DELETE FROM wp_options WHERE option_name LIKE '%_transient_et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_timeout_et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_et_pb_static%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_timeout_et_pb_static%';

-- 2. Delete Divi static CSS tracking options
DELETE FROM wp_options WHERE option_name LIKE 'et_core_page_resource_%';

-- 3. Bump post_modified on Theme Builder layouts
UPDATE wp_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP()
WHERE ID IN (100437, 100438, 100440);

-- 4. Delete cached builder features for these layouts
DELETE FROM wp_postmeta WHERE post_id IN (100437, 100438, 100440)
AND meta_key LIKE '%_et_builder_module_features_cache%';

-- 5. Delete Divi unified CSS version tracking
DELETE FROM wp_options WHERE option_name LIKE 'et_core_unified_cached_inline_%';
DELETE FROM wp_options WHERE option_name LIKE 'et_core_page_resource_tag%';

-- 6. Delete ALL et_core / et_pb options that might cache CSS
DELETE FROM wp_options WHERE option_name LIKE '%et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%et_pb_static_css_file%';
DELETE FROM wp_options WHERE option_name LIKE '%et_core_css_output%';

-- 7. Delete postmeta caches for all posts (body layout applies to all)
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_builder_module_features_cache%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_pb_static_css_file%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%et_enqueued_post_fonts%';

-- 8. Bump Theme Builder template itself (not just layouts)
UPDATE wp_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP()
WHERE post_type = 'et_template' OR post_type = 'et_tb_item' OR ID IN (100437, 100438, 100440);
