-- Nuke ALL Divi CSS caches (forces full regeneration)
DELETE FROM wp_options WHERE option_name LIKE '%et_core_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '%et-builder-cache%';
DELETE FROM wp_options WHERE option_name LIKE '%et_builder_page_resource%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_et_%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_timeout_et_%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_builder_module_features_cache%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '%_et_core_page_resource%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '_divi_dynamic_assets%';
DELETE FROM wp_postmeta WHERE meta_key LIKE '_divi_%canvas%';
