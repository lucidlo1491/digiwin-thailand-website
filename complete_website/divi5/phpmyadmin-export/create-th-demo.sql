INSERT INTO wp_posts (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_parent, post_type, post_modified, post_modified_gmt, to_ping, pinged, post_content_filtered)
VALUES (100810, 1, '2026-03-09 12:00:00', '2026-03-09 12:00:00', '', 'ติดต่อเรา', '', 'publish', 'closed', 'closed', 'demo', 100771, 'page', '2026-03-09 12:00:00', '2026-03-09 12:00:00', '', '', '')
ON DUPLICATE KEY UPDATE post_status='publish', post_name='demo', post_parent=100771, post_type='page';

DELETE FROM wp_options WHERE option_name = 'rewrite_rules';
