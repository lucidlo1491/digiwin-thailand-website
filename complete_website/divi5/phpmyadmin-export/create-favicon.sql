INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, to_ping, pinged, post_content_filtered, post_type, post_mime_type, guid, post_modified, post_modified_gmt)
VALUES (1, NOW(), UTC_TIMESTAMP(), '', 'digiwin-super-d-favicon', '', 'inherit', 'open', 'closed', 'digiwin-super-d-favicon', '', '', '', 'attachment', 'image/svg+xml', 'https://digiwin.co.th/wp-content/uploads/digiwin-super-d-favicon.svg', NOW(), UTC_TIMESTAMP());

UPDATE wp_options SET option_value = LAST_INSERT_ID() WHERE option_name = 'site_icon';

INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('site_icon', LAST_INSERT_ID(), 'yes')
ON DUPLICATE KEY UPDATE option_value = VALUES(option_value);
