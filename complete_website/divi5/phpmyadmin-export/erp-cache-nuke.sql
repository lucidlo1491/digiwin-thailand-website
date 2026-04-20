-- Nuclear cache clear for ERP page (100561) and its template (100537)
-- Delete ALL Divi-related postmeta caches for these posts
DELETE FROM wp_postmeta WHERE post_id IN (100561, 100537) AND (
  meta_key LIKE '%et_builder%' OR
  meta_key LIKE '%et_core%' OR
  meta_key LIKE '%et_pb%' OR
  meta_key LIKE '%_et_dynamic%' OR
  meta_key LIKE '%et_enqueued%'
);

-- Delete page-level resource transients
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%100561%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%100537%';

-- Delete ALL Divi CSS cache options
DELETE FROM wp_options WHERE option_name LIKE 'et_core_page_resource_%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_timeout_et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_et_pb_static%';
DELETE FROM wp_options WHERE option_name LIKE '%_transient_timeout_et_pb_static%';
DELETE FROM wp_options WHERE option_name LIKE 'et_core_unified_cached_inline_%';
DELETE FROM wp_options WHERE option_name LIKE 'et_core_page_resource_tag%';

-- Bump post_modified to force Divi to see a change
UPDATE wp_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP()
WHERE ID IN (100561, 100537, 100437, 100438, 100440);

-- Delete ALL builder feature caches
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_builder_module_features_cache%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%et_pb_static_css_file%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%et_enqueued_post_fonts%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_dynamic_cached_inline_styles%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_core_cached_inline_styles%';
