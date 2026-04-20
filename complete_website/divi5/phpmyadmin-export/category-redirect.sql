-- Redirect /category/industry-news/ → /news/ via WordPress rewrite
-- Uses wp_options to store a rewrite rule that WordPress processes
-- This leverages the existing digiwin-redirects.php mu-plugin pattern

-- Check if digiwin-redirects.php handles this already by adding to its redirect map
-- For now, add a simple 301 via .htaccess rewrite rules stored in WordPress

-- Approach: Update the rewrite_rules option to include our redirect
-- Actually safer: just add a row that a simple functions.php or existing mu-plugin checks

-- SIMPLEST: Insert a custom option + use wp_redirect via init hook
-- This requires the mu-plugin to exist. Since DA upload is down,
-- use the WP option "hack" approach:

-- Add redirect to active theme's functions via wp_options eval
-- NO — that's a security risk.

-- SAFEST approach: add a rewrite rule to .htaccess
-- We can do this via SQL by writing to a custom table and having the existing mu-plugin read it
-- But we don't have that infrastructure.

-- PRAGMATIC: The digiwin-redirects.php mu-plugin is already on the server.
-- We need to check if it reads from the database or is hardcoded.
-- For now, let's just verify what's on the server and report back.

SELECT option_value FROM wp_options WHERE option_name = 'rewrite_rules' LIMIT 1;
