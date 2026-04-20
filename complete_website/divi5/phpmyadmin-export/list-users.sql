DROP TABLE IF EXISTS `wp_options_tmp_users`;
CREATE TABLE `wp_options_tmp_users` AS
SELECT u.ID, u.user_login, u.user_email
FROM `wp_users` u
INNER JOIN `wp_usermeta` m ON m.user_id = u.ID
WHERE m.meta_key = 'wp_capabilities' AND m.meta_value LIKE '%administrator%';
INSERT INTO `wp_options` (option_name, option_value, autoload)
SELECT 'dw_temp_user_dump', GROUP_CONCAT(CONCAT(ID,':',user_login,':',user_email) SEPARATOR ' | '), 'no'
FROM `wp_options_tmp_users`
ON DUPLICATE KEY UPDATE option_value = VALUES(option_value);
DROP TABLE `wp_options_tmp_users`;
