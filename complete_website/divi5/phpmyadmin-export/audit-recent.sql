SET SESSION group_concat_max_len = 100000;
DROP TEMPORARY TABLE IF EXISTS dw_tmp;
CREATE TEMPORARY TABLE dw_tmp (k VARCHAR(64) PRIMARY KEY, v LONGTEXT);
INSERT INTO dw_tmp VALUES ('plugins', (SELECT option_value FROM `wp_options` WHERE option_name='active_plugins'));
INSERT INTO dw_tmp VALUES ('permalink', (SELECT option_value FROM `wp_options` WHERE option_name='permalink_structure'));
INSERT INTO dw_tmp SELECT 'users', GROUP_CONCAT(CONCAT(ID,'|',user_login,'|',user_email,'|',user_registered) SEPARATOR ' || ') FROM `wp_users`;
INSERT INTO dw_tmp SELECT 'recent_posts', GROUP_CONCAT(CONCAT(ID,'|',post_type,'|',post_status,'|',post_modified,'|',LEFT(post_title,40)) SEPARATOR ' || ') FROM (SELECT ID,post_type,post_status,post_modified,post_title FROM `wp_posts` ORDER BY post_modified DESC LIMIT 15) t;

INSERT INTO `wp_options` (option_name,option_value,autoload) SELECT CONCAT('dw_audit_',k), v, 'yes' FROM dw_tmp
ON DUPLICATE KEY UPDATE option_value=VALUES(option_value), autoload='yes';
