UPDATE wp_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP() WHERE ID IN (100571, 100787, 100568, 100785);
DELETE FROM wp_options WHERE option_name LIKE 'et_core_page_resource_%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_et_%';
DELETE FROM wp_options WHERE option_name LIKE '_transient_timeout_et_%';
