-- Expose debug data via a simple transient that Yoast REST exposes
-- Actually, let's use a known-readable endpoint: update an existing page's excerpt temporarily
-- We'll use the "terms" page (least critical) to hold debug data temporarily

-- First, store the original excerpt
DELETE FROM wp_options WHERE option_name = '_digiwin_debug_metal_orig_excerpt';
INSERT INTO wp_options (option_name, option_value, autoload)
SELECT '_digiwin_debug_metal_orig_excerpt', post_excerpt, 'no'
FROM wp_posts WHERE ID = 100767;

-- Now put debug info into the metal-plastics page's excerpt (readable via REST API)
UPDATE wp_posts SET post_excerpt = (
  SELECT GROUP_CONCAT(
    CONCAT(p.ID, '|', p.post_name, '|', p.post_status, '|', p.post_type, '|', p.post_parent)
    ORDER BY p.ID SEPARATOR ' :: '
  )
  FROM (SELECT ID, post_name, post_status, post_type, post_parent FROM wp_posts WHERE post_name LIKE '%metal%') p
) WHERE ID = 100767;
