-- Inject DigiWin Super D favicon via Divi's "Add code to the < head >" integration field
-- Check if et_divi option has integration_head
-- First, add as a standalone option that we can read
INSERT INTO wp_options (option_name, option_value, autoload)
VALUES ('et_divi_integration_head_code', '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16.73 16.89%27%3E%3Cpath fill=%27%2300AFF0%27 d=%27M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z%27/%3E%3Cpath fill=%27%2300AFF0%27 d=%27M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0%27/%3E%3C/svg%3E">', 'yes')
ON DUPLICATE KEY UPDATE option_value = VALUES(option_value);

-- Also set via Divi's actual integration head option
UPDATE wp_options SET option_value = '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16.73 16.89%27%3E%3Cpath fill=%27%2300AFF0%27 d=%27M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z%27/%3E%3Cpath fill=%27%2300AFF0%27 d=%27M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0%27/%3E%3C/svg%3E">'
WHERE option_name = 'divi_integration_head';

-- If the option doesn't exist, insert it
INSERT IGNORE INTO wp_options (option_name, option_value, autoload)
VALUES ('divi_integration_head', '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16.73 16.89%27%3E%3Cpath fill=%27%2300AFF0%27 d=%27M0 16.89C0 15.21 1.36 13.85 3.04 13.85h5.24c2.98 0 5.41-2.42 5.41-5.41 0-2.99-2.42-5.41-5.41-5.41H3.04C1.36 3.04 0 1.68 0 0h8.28c4.66 0 8.44 3.78 8.44 8.44s-3.78 8.45-8.44 8.45z%27/%3E%3Cpath fill=%27%2300AFF0%27 d=%27M.89 8.45a2.18 2.18 0 114.36 0 2.18 2.18 0 01-4.36 0%27/%3E%3C/svg%3E">', 'yes');
