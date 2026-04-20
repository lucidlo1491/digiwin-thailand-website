DELETE FROM wp_options WHERE option_name LIKE '%et_core_page_resource%' OR option_name LIKE '%et-builder-cache%' OR option_name LIKE '%et_builder_page_resource%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_builder_module_features_cache%' OR meta_key LIKE '%_et_core_page_resource%';
