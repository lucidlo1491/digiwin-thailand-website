-- Debug: find ALL posts/pages with metal-plastics slug (including revisions, drafts, trash)
SELECT ID, post_name, post_status, post_type, post_parent, post_title, guid
FROM wp_posts
WHERE post_name LIKE '%metal%'
ORDER BY post_type, ID;

-- Compare: automotive pages (same dual-slug pattern, but works)
SELECT ID, post_name, post_status, post_type, post_parent, post_title, guid
FROM wp_posts
WHERE post_name LIKE '%automotive%'
ORDER BY post_type, ID;

-- Check for redirects in wp_options matching metal
SELECT option_name, LEFT(option_value, 200) as val_preview
FROM wp_options
WHERE option_name LIKE '%redirect%' AND option_value LIKE '%metal%';
