-- Close comments and pings on ALL existing posts and pages
-- This prevents spam comments on older content
UPDATE wp_posts SET comment_status = 'closed', ping_status = 'closed' WHERE post_status IN ('publish', 'draft', 'private');
