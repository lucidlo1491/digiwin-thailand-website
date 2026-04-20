-- Store diagnostic info about metal-plastics slug collision in wp_options
-- We can then read it via REST API: /wp-json/wp/v2/settings or wp_options

DELETE FROM wp_options WHERE option_name = '_digiwin_debug_metal';

INSERT INTO wp_options (option_name, option_value, autoload)
SELECT '_digiwin_debug_metal',
  GROUP_CONCAT(
    CONCAT(p.ID, '|', p.post_name, '|', p.post_status, '|', p.post_type, '|', p.post_parent)
    ORDER BY p.ID SEPARATOR '\n'
  ),
  'no'
FROM wp_posts p
WHERE p.post_name LIKE '%metal%'
ORDER BY p.ID;
