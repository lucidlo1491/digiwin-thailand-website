-- Create a transient that triggers file creation via a one-time wp_loaded action
-- Actually, let's just use the WordPress uploads approach
-- Upload the SVG as a media attachment, then set it as site icon

-- Step 1: Insert the favicon SVG as a post (attachment)
INSERT INTO wp_posts (post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_type, post_mime_type, guid)
VALUES (1, NOW(), UTC_TIMESTAMP(), '', 'digiwin-super-d-favicon', '', 'inherit', 'open', 'closed', 'digiwin-super-d-favicon', 'attachment', 'image/svg+xml', 'https://digiwin.co.th/wp-content/uploads/digiwin-super-d-favicon.svg')
ON DUPLICATE KEY UPDATE post_mime_type = 'image/svg+xml';

-- Get the ID we just inserted (we'll use LAST_INSERT_ID in the next statement)
-- Step 2: Set as site icon
INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('site_icon', LAST_INSERT_ID(), 'yes')
ON DUPLICATE KEY UPDATE option_value = LAST_INSERT_ID();
