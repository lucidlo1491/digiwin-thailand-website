INSERT INTO wp_posts (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_parent, post_type, post_modified, post_modified_gmt, to_ping, pinged, post_content_filtered)
VALUES (100767, 1, '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', 'Metal and Plastics Processing Solutions', '', 'publish', 'closed', 'closed', 'metal-plastics', 100557, 'page', '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', '', '')
ON DUPLICATE KEY UPDATE post_status='publish', post_name='metal-plastics', post_parent=100557, post_type='page';
INSERT INTO wp_posts (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_parent, post_type, post_modified, post_modified_gmt, to_ping, pinged, post_content_filtered)
VALUES (100569, 1, '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', 'Contact Us', '', 'publish', 'closed', 'closed', 'demo', 0, 'page', '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', '', '')
ON DUPLICATE KEY UPDATE post_status='publish', post_name='demo', post_parent=0, post_type='page';
INSERT INTO wp_posts (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_parent, post_type, post_modified, post_modified_gmt, to_ping, pinged, post_content_filtered)
VALUES (100768, 1, '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', 'Privacy Policy', '', 'publish', 'closed', 'closed', 'privacy-policy', 0, 'page', '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', '', '')
ON DUPLICATE KEY UPDATE post_status='publish', post_name='privacy-policy', post_parent=0, post_type='page';
INSERT INTO wp_posts (ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_name, post_parent, post_type, post_modified, post_modified_gmt, to_ping, pinged, post_content_filtered)
VALUES (100795, 1, '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', 'Privacy Policy TH', '', 'publish', 'closed', 'closed', 'privacy-policy', 100771, 'page', '2026-03-08 11:54:03', '2026-03-08 11:54:03', '', '', '')
ON DUPLICATE KEY UPDATE post_status='publish', post_name='privacy-policy', post_parent=100771, post_type='page';
DELETE FROM wp_options WHERE option_name = 'rewrite_rules';