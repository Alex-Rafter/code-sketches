<?php
 class WP_REST_Themes_Controller extends WP_REST_Controller { const PATTERN = '[^\/:<>\*\?"\|]+(?:\/[^\/:<>\*\?"\|]+)?'; public function __construct() { $this->namespace = 'wp/v2'; $this->rest_base = 'themes'; } public function register_routes() { register_rest_route( $this->namespace, '/' . $this->rest_base, array( array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( $this, 'get_items' ), 'permission_callback' => array( $this, 'get_items_permissions_check' ), 'args' => $this->get_collection_params(), ), 'schema' => array( $this, 'get_item_schema' ), ) ); register_rest_route( $this->namespace, sprintf( '/%s/(?P<stylesheet>%s)', $this->rest_base, self::PATTERN ), array( 'args' => array( 'stylesheet' => array( 'description' => __( "The theme's stylesheet. This uniquely identifies the theme." ), 'type' => 'string', 'sanitize_callback' => array( $this, '_sanitize_stylesheet_callback' ), ), ), array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( $this, 'get_item' ), 'permission_callback' => array( $this, 'get_item_permissions_check' ), ), 'schema' => array( $this, 'get_public_item_schema' ), ) ); } public function _sanitize_stylesheet_callback( $stylesheet ) { return urldecode( $stylesheet ); } public function get_items_permissions_check( $request ) { if ( current_user_can( 'switch_themes' ) || current_user_can( 'manage_network_themes' ) ) { return true; } $registered = $this->get_collection_params(); if ( isset( $registered['status'], $request['status'] ) && is_array( $request['status'] ) && array( 'active' ) === $request['status'] ) { return $this->check_read_active_theme_permission(); } return new WP_Error( 'rest_cannot_view_themes', __( 'Sorry, you are not allowed to view themes.' ), array( 'status' => rest_authorization_required_code() ) ); } public function get_item_permissions_check( $request ) { if ( current_user_can( 'switch_themes' ) || current_user_can( 'manage_network_themes' ) ) { return true; } $wp_theme = wp_get_theme( $request['stylesheet'] ); $current_theme = wp_get_theme(); if ( $this->is_same_theme( $wp_theme, $current_theme ) ) { return $this->check_read_active_theme_permission(); } return new WP_Error( 'rest_cannot_view_themes', __( 'Sorry, you are not allowed to view themes.' ), array( 'status' => rest_authorization_required_code() ) ); } protected function check_read_active_theme_permission() { if ( current_user_can( 'edit_posts' ) ) { return true; } foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) { if ( current_user_can( $post_type->cap->edit_posts ) ) { return true; } } return new WP_Error( 'rest_cannot_view_active_theme', __( 'Sorry, you are not allowed to view the active theme.' ), array( 'status' => rest_authorization_required_code() ) ); } public function get_item( $request ) { $wp_theme = wp_get_theme( $request['stylesheet'] ); if ( ! $wp_theme->exists() ) { return new WP_Error( 'rest_theme_not_found', __( 'Theme not found.' ), array( 'status' => 404 ) ); } $data = $this->prepare_item_for_response( $wp_theme, $request ); return rest_ensure_response( $data ); } public function get_items( $request ) { $themes = array(); $active_themes = wp_get_themes(); $current_theme = wp_get_theme(); $status = $request['status']; foreach ( $active_themes as $theme_name => $theme ) { $theme_status = ( $this->is_same_theme( $theme, $current_theme ) ) ? 'active' : 'inactive'; if ( is_array( $status ) && ! in_array( $theme_status, $status, true ) ) { continue; } $prepared = $this->prepare_item_for_response( $theme, $request ); $themes[] = $this->prepare_response_for_collection( $prepared ); } $response = rest_ensure_response( $themes ); $response->header( 'X-WP-Total', count( $themes ) ); $response->header( 'X-WP-TotalPages', 1 ); return $response; } public function prepare_item_for_response( $item, $request ) { $theme = $item; $data = array(); $fields = $this->get_fields_for_response( $request ); if ( rest_is_field_included( 'stylesheet', $fields ) ) { $data['stylesheet'] = $theme->get_stylesheet(); } if ( rest_is_field_included( 'template', $fields ) ) { $data['template'] = $theme->get_template(); } $plain_field_mappings = array( 'requires_php' => 'RequiresPHP', 'requires_wp' => 'RequiresWP', 'textdomain' => 'TextDomain', 'version' => 'Version', ); foreach ( $plain_field_mappings as $field => $header ) { if ( rest_is_field_included( $field, $fields ) ) { $data[ $field ] = $theme->get( $header ); } } if ( rest_is_field_included( 'screenshot', $fields ) ) { $data['screenshot'] = $theme->get_screenshot() ? $theme->get_screenshot() : ''; } $rich_field_mappings = array( 'author' => 'Author', 'author_uri' => 'AuthorURI', 'description' => 'Description', 'name' => 'Name', 'tags' => 'Tags', 'theme_uri' => 'ThemeURI', ); foreach ( $rich_field_mappings as $field => $header ) { if ( rest_is_field_included( "{$field}.raw", $fields ) ) { $data[ $field ]['raw'] = $theme->display( $header, false, true ); } if ( rest_is_field_included( "{$field}.rendered", $fields ) ) { $data[ $field ]['rendered'] = $theme->display( $header ); } } $current_theme = wp_get_theme(); if ( rest_is_field_included( 'status', $fields ) ) { $data['status'] = ( $this->is_same_theme( $theme, $current_theme ) ) ? 'active' : 'inactive'; } if ( rest_is_field_included( 'theme_supports', $fields ) && $this->is_same_theme( $theme, $current_theme ) ) { foreach ( get_registered_theme_features() as $feature => $config ) { if ( ! is_array( $config['show_in_rest'] ) ) { continue; } $name = $config['show_in_rest']['name']; if ( ! rest_is_field_included( "theme_supports.{$name}", $fields ) ) { continue; } if ( ! current_theme_supports( $feature ) ) { $data['theme_supports'][ $name ] = $config['show_in_rest']['schema']['default']; continue; } $support = get_theme_support( $feature ); if ( isset( $config['show_in_rest']['prepare_callback'] ) ) { $prepare = $config['show_in_rest']['prepare_callback']; } else { $prepare = array( $this, 'prepare_theme_support' ); } $prepared = $prepare( $support, $config, $feature, $request ); if ( is_wp_error( $prepared ) ) { continue; } $data['theme_supports'][ $name ] = $prepared; } } $data = $this->add_additional_fields_to_object( $data, $request ); $response = rest_ensure_response( $data ); if ( rest_is_field_included( '_links', $fields ) || rest_is_field_included( '_embedded', $fields ) ) { $response->add_links( $this->prepare_links( $theme ) ); } return apply_filters( 'rest_prepare_theme', $response, $theme, $request ); } protected function prepare_links( $theme ) { $links = array( 'self' => array( 'href' => rest_url( sprintf( '%s/%s/%s', $this->namespace, $this->rest_base, $theme->get_stylesheet() ) ), ), 'collection' => array( 'href' => rest_url( sprintf( '%s/%s', $this->namespace, $this->rest_base ) ), ), ); if ( $this->is_same_theme( $theme, wp_get_theme() ) ) { $id = WP_Theme_JSON_Resolver::get_user_global_styles_post_id(); } else { $user_cpt = WP_Theme_JSON_Resolver::get_user_data_from_wp_global_styles( $theme ); $id = isset( $user_cpt['ID'] ) ? $user_cpt['ID'] : null; } if ( $id ) { $links['https://api.w.org/user-global-styles'] = array( 'href' => rest_url( 'wp/v2/global-styles/' . $id ), ); } return $links; } protected function is_same_theme( $theme_a, $theme_b ) { return $theme_a->get_stylesheet() === $theme_b->get_stylesheet(); } protected function prepare_theme_support( $support, $args, $feature, $request ) { $schema = $args['show_in_rest']['schema']; if ( 'boolean' === $schema['type'] ) { return true; } if ( is_array( $support ) && ! $args['variadic'] ) { $support = $support[0]; } return rest_sanitize_value_from_schema( $support, $schema ); } public function get_item_schema() { if ( $this->schema ) { return $this->add_additional_fields_schema( $this->schema ); } $schema = array( '$schema' => 'http://json-schema.org/draft-04/schema#', 'title' => 'theme', 'type' => 'object', 'properties' => array( 'stylesheet' => array( 'description' => __( 'The theme\'s stylesheet. This uniquely identifies the theme.' ), 'type' => 'string', 'readonly' => true, ), 'template' => array( 'description' => __( 'The theme\'s template. If this is a child theme, this refers to the parent theme, otherwise this is the same as the theme\'s stylesheet.' ), 'type' => 'string', 'readonly' => true, ), 'author' => array( 'description' => __( 'The theme author.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The theme author\'s name, as found in the theme header.' ), 'type' => 'string', ), 'rendered' => array( 'description' => __( 'HTML for the theme author, transformed for display.' ), 'type' => 'string', ), ), ), 'author_uri' => array( 'description' => __( 'The website of the theme author.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The website of the theme author, as found in the theme header.' ), 'type' => 'string', 'format' => 'uri', ), 'rendered' => array( 'description' => __( 'The website of the theme author, transformed for display.' ), 'type' => 'string', 'format' => 'uri', ), ), ), 'description' => array( 'description' => __( 'A description of the theme.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The theme description, as found in the theme header.' ), 'type' => 'string', ), 'rendered' => array( 'description' => __( 'The theme description, transformed for display.' ), 'type' => 'string', ), ), ), 'name' => array( 'description' => __( 'The name of the theme.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The theme name, as found in the theme header.' ), 'type' => 'string', ), 'rendered' => array( 'description' => __( 'The theme name, transformed for display.' ), 'type' => 'string', ), ), ), 'requires_php' => array( 'description' => __( 'The minimum PHP version required for the theme to work.' ), 'type' => 'string', 'readonly' => true, ), 'requires_wp' => array( 'description' => __( 'The minimum WordPress version required for the theme to work.' ), 'type' => 'string', 'readonly' => true, ), 'screenshot' => array( 'description' => __( 'The theme\'s screenshot URL.' ), 'type' => 'string', 'format' => 'uri', 'readonly' => true, ), 'tags' => array( 'description' => __( 'Tags indicating styles and features of the theme.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The theme tags, as found in the theme header.' ), 'type' => 'array', 'items' => array( 'type' => 'string', ), ), 'rendered' => array( 'description' => __( 'The theme tags, transformed for display.' ), 'type' => 'string', ), ), ), 'textdomain' => array( 'description' => __( 'The theme\'s text domain.' ), 'type' => 'string', 'readonly' => true, ), 'theme_supports' => array( 'description' => __( 'Features supported by this theme.' ), 'type' => 'object', 'readonly' => true, 'properties' => array(), ), 'theme_uri' => array( 'description' => __( 'The URI of the theme\'s webpage.' ), 'type' => 'object', 'readonly' => true, 'properties' => array( 'raw' => array( 'description' => __( 'The URI of the theme\'s webpage, as found in the theme header.' ), 'type' => 'string', 'format' => 'uri', ), 'rendered' => array( 'description' => __( 'The URI of the theme\'s webpage, transformed for display.' ), 'type' => 'string', 'format' => 'uri', ), ), ), 'version' => array( 'description' => __( 'The theme\'s current version.' ), 'type' => 'string', 'readonly' => true, ), 'status' => array( 'description' => __( 'A named status for the theme.' ), 'type' => 'string', 'enum' => array( 'inactive', 'active' ), ), ), ); foreach ( get_registered_theme_features() as $feature => $config ) { if ( ! is_array( $config['show_in_rest'] ) ) { continue; } $name = $config['show_in_rest']['name']; $schema['properties']['theme_supports']['properties'][ $name ] = $config['show_in_rest']['schema']; } $this->schema = $schema; return $this->add_additional_fields_schema( $this->schema ); } public function get_collection_params() { $query_params = array( 'status' => array( 'description' => __( 'Limit result set to themes assigned one or more statuses.' ), 'type' => 'array', 'items' => array( 'enum' => array( 'active', 'inactive' ), 'type' => 'string', ), ), ); return apply_filters( 'rest_themes_collection_params', $query_params ); } public function sanitize_theme_status( $statuses, $request, $parameter ) { _deprecated_function( __METHOD__, '5.7.0' ); $statuses = wp_parse_slug_list( $statuses ); foreach ( $statuses as $status ) { $result = rest_validate_request_arg( $status, $request, $parameter ); if ( is_wp_error( $result ) ) { return $result; } } return $statuses; } } 