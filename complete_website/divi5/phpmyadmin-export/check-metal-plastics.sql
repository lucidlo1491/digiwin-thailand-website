SELECT ID, post_name, post_status, post_type, post_parent, post_title
FROM wp_posts
WHERE ID = 100767 OR post_name = 'metal-plastics' OR post_name LIKE '%metal%'
ORDER BY ID;
