-- Step 1: Insert attachment post for favicon
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, to_ping, pinged, post_content_filtered, post_type, post_mime_type, guid, post_modified, post_modified_gmt)
VALUES (1, NOW(), UTC_TIMESTAMP(), '', 'digiwin-super-d-favicon-512', '', 'inherit', 'open', 'closed', 'digiwin-super-d-favicon-512', '', '', '', 'attachment', 'image/png', 'https://digiwin.co.th/wp-content/uploads/2026/03/digiwin-favicon.png', NOW(), UTC_TIMESTAMP());

-- Step 2: Set site_icon to the new attachment ID
UPDATE wp_options SET option_value = LAST_INSERT_ID() WHERE option_name = 'site_icon';
INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('site_icon', LAST_INSERT_ID(), 'yes') ON DUPLICATE KEY UPDATE option_value = VALUES(option_value);

-- Step 3: Add attachment metadata
INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (LAST_INSERT_ID(), '_wp_attached_file', '2026/03/digiwin-favicon.png');
