<?php
/**
 * Plugin Name: DigiWin Debug Path Resolution (temporary)
 * Description: Debug endpoint for page path resolution
 */
add_action('rest_api_init', function() {
    register_rest_route('digiwin/v1', '/debug-path', array(
        'methods' => 'GET',
        'callback' => function($req) {
            $path = $req->get_param('path') ?: 'industries/metal-plastics';
            $page = get_page_by_path($path);

            global $wpdb;
            // Raw query: find ALL posts with slug metal-plastics
            $rows = $wpdb->get_results("
                SELECT ID, post_name, post_status, post_type, post_parent, post_title
                FROM {$wpdb->posts}
                WHERE post_name = 'metal-plastics'
                ORDER BY ID
            ");

            // Also check for revisions/attachments
            $all_metal = $wpdb->get_results("
                SELECT ID, post_name, post_status, post_type, post_parent
                FROM {$wpdb->posts}
                WHERE post_name LIKE '%metal%'
                ORDER BY ID
            ");

            // Check parent page
            $parent = get_page_by_path('industries');

            return array(
                'queried_path' => $path,
                'resolved_page' => $page ? array(
                    'ID' => $page->ID,
                    'post_name' => $page->post_name,
                    'post_status' => $page->post_status,
                    'post_parent' => $page->post_parent,
                ) : null,
                'parent_industries' => $parent ? array(
                    'ID' => $parent->ID,
                    'post_name' => $parent->post_name,
                    'post_parent' => $parent->post_parent,
                ) : null,
                'exact_slug_matches' => $rows,
                'all_metal_matches' => $all_metal,
                'wp_version' => get_bloginfo('version'),
            );
        },
        'permission_callback' => '__return_true',
    ));
});
