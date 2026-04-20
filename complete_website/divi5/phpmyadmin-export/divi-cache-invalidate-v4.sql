-- Try wp_ prefix directly
UPDATE wp_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP()
WHERE ID IN (100437, 100438, 100440);
