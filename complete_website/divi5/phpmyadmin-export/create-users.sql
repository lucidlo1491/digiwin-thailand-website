-- Create 6 WordPress users for digiwin.co.th
-- Password: 12345 (MD5 hash — WordPress auto-upgrades to phpass on first login)
-- Table prefix: wp_

-- User 1: daphne (Editor) — 蔡叡瑩
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('daphne', MD5('12345'), 'daphne', 'daphne@digiwin.com', '', NOW(), '', 0, '蔡叡瑩');
SET @uid1 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid1, 'wp_capabilities', 'a:1:{s:6:\"editor\";b:1;}'),
(@uid1, 'wp_user_level', '7'),
(@uid1, 'nickname', 'daphne'),
(@uid1, 'first_name', '叡瑩'),
(@uid1, 'last_name', '蔡'),
(@uid1, 'locale', '');

-- User 2: mirrolee (Administrator) — 李孟純
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('mirrolee', MD5('12345'), 'mirrolee', 'mirrolee@digiwin.com', '', NOW(), '', 0, '李孟純');
SET @uid2 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid2, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(@uid2, 'wp_user_level', '10'),
(@uid2, 'nickname', 'mirrolee'),
(@uid2, 'first_name', '孟純'),
(@uid2, 'last_name', '李'),
(@uid2, 'locale', '');

-- User 3: sudarat (Administrator) — 文青雅
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('sudarat', MD5('12345'), 'sudarat', 'sudarat@digiwin.com', '', NOW(), '', 0, '文青雅');
SET @uid3 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid3, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(@uid3, 'wp_user_level', '10'),
(@uid3, 'nickname', 'sudarat'),
(@uid3, 'first_name', '青雅'),
(@uid3, 'last_name', '文'),
(@uid3, 'locale', '');

-- User 4: danai (Editor) — 官明
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('danai', MD5('12345'), 'danai', 'danai@digiwin.com', '', NOW(), '', 0, '官明');
SET @uid4 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid4, 'wp_capabilities', 'a:1:{s:6:\"editor\";b:1;}'),
(@uid4, 'wp_user_level', '7'),
(@uid4, 'nickname', 'danai'),
(@uid4, 'first_name', '明'),
(@uid4, 'last_name', '官'),
(@uid4, 'locale', '');

-- User 5: ngocvy_vn (Administrator) — 錢玉薇
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('ngocvy_vn', MD5('12345'), 'ngocvy_vn', 'ngocvy_vn@digiwin.com', '', NOW(), '', 0, '錢玉薇');
SET @uid5 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid5, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(@uid5, 'wp_user_level', '10'),
(@uid5, 'nickname', 'ngocvy_vn'),
(@uid5, 'first_name', '玉薇'),
(@uid5, 'last_name', '錢'),
(@uid5, 'locale', '');

-- User 6: tangthienbao_vn (Administrator) — 曾天寶
INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_url, user_registered, user_activation_key, user_status, display_name)
VALUES ('tangthienbao_vn', MD5('12345'), 'tangthienbao_vn', 'tangthienbao_vn@digiwin.com', '', NOW(), '', 0, '曾天寶');
SET @uid6 = LAST_INSERT_ID();
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid6, 'wp_capabilities', 'a:1:{s:13:\"administrator\";b:1;}'),
(@uid6, 'wp_user_level', '10'),
(@uid6, 'nickname', 'tangthienbao_vn'),
(@uid6, 'first_name', '天寶'),
(@uid6, 'last_name', '曾'),
(@uid6, 'locale', '');
