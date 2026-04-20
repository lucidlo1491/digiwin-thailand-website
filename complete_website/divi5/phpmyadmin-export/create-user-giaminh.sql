-- Create WordPress admin account for 梁家銘 (giaminh_vn)
-- Password: 1234 (MD5 hash — WordPress auto-upgrades to phpass on first login)

INSERT INTO wp_users (user_login, user_pass, user_nicename, user_email, user_registered, user_status, display_name)
VALUES (
  'giaminh_vn',
  MD5('1234'),
  'giaminh_vn',
  'giaminh_vn@digiwin.com',
  NOW(),
  0,
  '梁家銘'
);

SET @uid = LAST_INSERT_ID();

INSERT INTO wp_usermeta (user_id, meta_key, meta_value) VALUES
(@uid, 'wp_capabilities', 'a:1:{s:13:"administrator";b:1;}'),
(@uid, 'wp_user_level', '10'),
(@uid, 'nickname', '梁家銘'),
(@uid, 'first_name', '家銘'),
(@uid, 'last_name', '梁'),
(@uid, 'locale', '');
