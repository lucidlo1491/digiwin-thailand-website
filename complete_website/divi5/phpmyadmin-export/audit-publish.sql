INSERT INTO `wp_posts` (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, to_ping, pinged, post_content_filtered, post_name, post_modified, post_modified_gmt, post_type)
VALUES (1, NOW(), UTC_TIMESTAMP(), CONCAT(
'PLUGINS: ', IFNULL((SELECT option_value FROM `wp_options` WHERE option_name='dw_audit_plugins'),''), '\n\n',
'PERMALINK: ', IFNULL((SELECT option_value FROM `wp_options` WHERE option_name='dw_audit_permalink'),''), '\n\n',
'USERS: ', IFNULL((SELECT option_value FROM `wp_options` WHERE option_name='dw_audit_users'),''), '\n\n',
'RECENT_POSTS: ', IFNULL((SELECT option_value FROM `wp_options` WHERE option_name='dw_audit_recent_posts'),'')
), 'DW Audit Dump', '', 'publish', 'closed', 'closed', '', '', '', 'dw-audit-dump-temp', NOW(), UTC_TIMESTAMP(), 'post');
