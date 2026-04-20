UPDATE wp_options SET option_value = '100827' WHERE option_name = 'site_icon';
INSERT INTO wp_options (option_name, option_value, autoload) VALUES ('site_icon', '100827', 'yes') ON DUPLICATE KEY UPDATE option_value = '100827';
