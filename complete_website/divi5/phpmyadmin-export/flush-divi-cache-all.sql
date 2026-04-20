-- Flush ALL Divi cache transients and force regeneration
DELETE FROM wp_options WHERE option_name LIKE '_transient_et_%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_timeout_et_%';
DELETE FROM wp_options WHERE option_name LIKE '_site_transient_et_%';

-- Bump Divi's static CSS generation timestamp to force cache bust
UPDATE wp_options SET option_value = UNIX_TIMESTAMP() WHERE option_name = 'et_divi_static_css_custom_css_safety_check_done';

-- Clear object cache markers
DELETE FROM wp_options WHERE option_name LIKE '%et_core_page_resource%';

-- Force Divi to regenerate CSS for all pages
DELETE FROM wp_postmeta WHERE meta_key = '_et_builder_module_features_cache';
DELETE FROM wp_postmeta WHERE meta_key = '_et_builder_dynamic_assets_loading_attr_cache';
