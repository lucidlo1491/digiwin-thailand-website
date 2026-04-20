SELECT LENGTH(post_content) as content_len, 
  CASE WHEN post_content LIKE '%Super D favicon%' THEN 'HAS_FAVICON' ELSE 'NO_FAVICON' END as favicon_check,
  CASE WHEN post_content LIKE '%dw-footer-year%' THEN 'HAS_FOOTER' ELSE 'NO_FOOTER' END as footer_check
FROM wp_posts WHERE ID = 100438;
