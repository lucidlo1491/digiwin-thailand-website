-- Fix IAT Day 1 news posts: slugs, category, lang pair postmeta
-- Run on production via: node da-push.js --rewrite-prefix --file news-iat-fix-production.sql

-- ══════════════════════════════════════════════════════════════
-- 1. Fix slugs (old → new format)
-- ══════════════════════════════════════════════════════════════
UPDATE wp_posts SET post_name = 'intelligent-asia-thailand-20260311'
WHERE post_name = 'intelligent-asia-thailand-2026-day-1' AND post_type = 'post';

UPDATE wp_posts SET post_name = 'intelligent-asia-thailand-20260311-th'
WHERE post_name = 'intelligent-asia-thailand-2026-day-1-th' AND post_type = 'post';

-- ══════════════════════════════════════════════════════════════
-- 2. Ensure "Industry News" category exists and is assigned
-- ══════════════════════════════════════════════════════════════
SET @en_id = (SELECT ID FROM wp_posts WHERE post_name = 'intelligent-asia-thailand-20260311' AND post_type = 'post' LIMIT 1);
SET @th_id = (SELECT ID FROM wp_posts WHERE post_name = 'intelligent-asia-thailand-20260311-th' AND post_type = 'post' LIMIT 1);

-- Get or create "Industry News" category
SET @tid = (SELECT term_id FROM wp_terms WHERE slug = 'industry-news' LIMIT 1);
INSERT INTO wp_terms (name, slug, term_group)
SELECT 'Industry News', 'industry-news', 0 FROM DUAL WHERE @tid IS NULL;
SET @tid = COALESCE(@tid, LAST_INSERT_ID());

SET @ttid = (SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE term_id = @tid AND taxonomy = 'category' LIMIT 1);
INSERT INTO wp_term_taxonomy (term_id, taxonomy, description, parent, count)
SELECT @tid, 'category', '', 0, 0 FROM DUAL WHERE @ttid IS NULL;
SET @ttid = COALESCE(@ttid, LAST_INSERT_ID());

-- Assign category to both posts
INSERT IGNORE INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (@en_id, @ttid, 0);
INSERT IGNORE INTO wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (@th_id, @ttid, 0);
UPDATE wp_term_taxonomy SET count = (SELECT COUNT(*) FROM wp_term_relationships WHERE term_taxonomy_id = @ttid) WHERE term_taxonomy_id = @ttid;

-- Remove "Uncategorized" assignment if present
SET @uncat_ttid = (SELECT tt.term_taxonomy_id FROM wp_terms t JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id WHERE t.slug = 'uncategorized' AND tt.taxonomy = 'category' LIMIT 1);
DELETE FROM wp_term_relationships WHERE object_id = @en_id AND term_taxonomy_id = @uncat_ttid;
DELETE FROM wp_term_relationships WHERE object_id = @th_id AND term_taxonomy_id = @uncat_ttid;

-- ══════════════════════════════════════════════════════════════
-- 3. Cross-link bilingual posts via _digiwin_lang_pair postmeta
-- ══════════════════════════════════════════════════════════════
DELETE FROM wp_postmeta WHERE post_id = @en_id AND meta_key = '_digiwin_lang_pair';
INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (@en_id, '_digiwin_lang_pair', @th_id);

DELETE FROM wp_postmeta WHERE post_id = @th_id AND meta_key = '_digiwin_lang_pair';
INSERT INTO wp_postmeta (post_id, meta_key, meta_value) VALUES (@th_id, '_digiwin_lang_pair', @en_id);

-- Verify
SELECT @en_id AS en_post_id, @th_id AS th_post_id;
SELECT post_name, post_status FROM wp_posts WHERE ID IN (@en_id, @th_id);
