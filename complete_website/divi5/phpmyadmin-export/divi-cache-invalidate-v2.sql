-- Force Divi CSS cache invalidation
-- Bump post_modified on Theme Builder layouts (no prefix needed — uses dgwthl_ directly)
UPDATE dgwthl_posts SET post_modified = NOW(), post_modified_gmt = UTC_TIMESTAMP()
WHERE ID IN (100437, 100438, 100440);

-- Delete cached builder features
DELETE FROM dgwthl_postmeta WHERE post_id IN (100437, 100438, 100440)
AND meta_key LIKE '%_et_builder_module_features_cache%';
