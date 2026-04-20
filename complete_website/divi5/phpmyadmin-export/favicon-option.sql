-- Set site icon to DigiWin Super D via Divi theme options
-- This injects a custom favicon via the theme customizer setting
UPDATE wp_options SET option_value = '' WHERE option_name = 'site_icon';

-- Add inline favicon via a custom option + inject via active theme's header
-- Use the Divi integration body/head field
UPDATE wp_options 
SET option_value = REPLACE(option_value, '</head>', 
  '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16.73 16.89%27%3E%3Cpath fill=%27%2300AFF0%27 d=%27M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z%27/%3E%3Cpath fill=%27%2300AFF0%27 d=%27M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0%27/%3E%3C/svg%3E">\n</head>')
WHERE option_name = 'divi_integration_head';
