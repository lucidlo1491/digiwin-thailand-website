-- favicon-cleanup.sql — Set site_icon to Super D PNG
UPDATE wp_options SET option_value = '100827' WHERE option_name = 'site_icon';
