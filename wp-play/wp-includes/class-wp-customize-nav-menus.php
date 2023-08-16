<?php
 final class WP_Customize_Nav_Menus { public $manager; protected $original_nav_menu_locations; public function __construct( $manager ) { $this->manager = $manager; $this->original_nav_menu_locations = get_nav_menu_locations(); add_action( 'customize_register', array( $this, 'customize_register' ), 11 ); add_filter( 'customize_dynamic_setting_args', array( $this, 'filter_dynamic_setting_args' ), 10, 2 ); add_filter( 'customize_dynamic_setting_class', array( $this, 'filter_dynamic_setting_class' ), 10, 3 ); add_action( 'customize_save_nav_menus_created_posts', array( $this, 'save_nav_menus_created_posts' ) ); if ( ! current_user_can( 'edit_theme_options' ) ) { return; } add_filter( 'customize_refresh_nonces', array( $this, 'filter_nonces' ) ); add_action( 'wp_ajax_load-available-menu-items-customizer', array( $this, 'ajax_load_available_items' ) ); add_action( 'wp_ajax_search-available-menu-items-customizer', array( $this, 'ajax_search_available_items' ) ); add_action( 'wp_ajax_customize-nav-menus-insert-auto-draft', array( $this, 'ajax_insert_auto_draft_post' ) ); add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_scripts' ) ); add_action( 'customize_controls_print_footer_scripts', array( $this, 'print_templates' ) ); add_action( 'customize_controls_print_footer_scripts', array( $this, 'available_items_template' ) ); add_action( 'customize_preview_init', array( $this, 'customize_preview_init' ) ); add_action( 'customize_preview_init', array( $this, 'make_auto_draft_status_previewable' ) ); add_filter( 'customize_dynamic_partial_args', array( $this, 'customize_dynamic_partial_args' ), 10, 2 ); } public function filter_nonces( $nonces ) { $nonces['customize-menus'] = wp_create_nonce( 'customize-menus' ); return $nonces; } public function ajax_load_available_items() { check_ajax_referer( 'customize-menus', 'customize-menus-nonce' ); if ( ! current_user_can( 'edit_theme_options' ) ) { wp_die( -1 ); } $all_items = array(); $item_types = array(); if ( isset( $_POST['item_types'] ) && is_array( $_POST['item_types'] ) ) { $item_types = wp_unslash( $_POST['item_types'] ); } elseif ( isset( $_POST['type'] ) && isset( $_POST['object'] ) ) { $item_types[] = array( 'type' => wp_unslash( $_POST['type'] ), 'object' => wp_unslash( $_POST['object'] ), 'page' => empty( $_POST['page'] ) ? 0 : absint( $_POST['page'] ), ); } else { wp_send_json_error( 'nav_menus_missing_type_or_object_parameter' ); } foreach ( $item_types as $item_type ) { if ( empty( $item_type['type'] ) || empty( $item_type['object'] ) ) { wp_send_json_error( 'nav_menus_missing_type_or_object_parameter' ); } $type = sanitize_key( $item_type['type'] ); $object = sanitize_key( $item_type['object'] ); $page = empty( $item_type['page'] ) ? 0 : absint( $item_type['page'] ); $items = $this->load_available_items_query( $type, $object, $page ); if ( is_wp_error( $items ) ) { wp_send_json_error( $items->get_error_code() ); } $all_items[ $item_type['type'] . ':' . $item_type['object'] ] = $items; } wp_send_json_success( array( 'items' => $all_items ) ); } public function load_available_items_query( $object_type = 'post_type', $object_name = 'page', $page = 0 ) { $items = array(); if ( 'post_type' === $object_type ) { $post_type = get_post_type_object( $object_name ); if ( ! $post_type ) { return new WP_Error( 'nav_menus_invalid_post_type' ); } $important_pages = array(); $suppress_page_ids = array(); if ( 0 === $page && 'page' === $object_name ) { $front_page = 'page' === get_option( 'show_on_front' ) ? (int) get_option( 'page_on_front' ) : 0; if ( ! empty( $front_page ) ) { $front_page_obj = get_post( $front_page ); $important_pages[] = $front_page_obj; $suppress_page_ids[] = $front_page_obj->ID; } else { $items[] = array( 'id' => 'home', 'title' => _x( 'Home', 'nav menu home label' ), 'type' => 'custom', 'type_label' => __( 'Custom Link' ), 'object' => '', 'url' => home_url(), ); } $posts_page = 'page' === get_option( 'show_on_front' ) ? (int) get_option( 'page_for_posts' ) : 0; if ( ! empty( $posts_page ) ) { $posts_page_obj = get_post( $posts_page ); $important_pages[] = $posts_page_obj; $suppress_page_ids[] = $posts_page_obj->ID; } $privacy_policy_page_id = (int) get_option( 'wp_page_for_privacy_policy' ); if ( ! empty( $privacy_policy_page_id ) ) { $privacy_policy_page = get_post( $privacy_policy_page_id ); if ( $privacy_policy_page instanceof WP_Post && 'publish' === $privacy_policy_page->post_status ) { $important_pages[] = $privacy_policy_page; $suppress_page_ids[] = $privacy_policy_page->ID; } } } elseif ( 'post' !== $object_name && 0 === $page && $post_type->has_archive ) { $items[] = array( 'id' => $object_name . '-archive', 'title' => $post_type->labels->archives, 'type' => 'post_type_archive', 'type_label' => __( 'Post Type Archive' ), 'object' => $object_name, 'url' => get_post_type_archive_link( $object_name ), ); } $posts = array(); if ( 0 === $page && $this->manager->get_setting( 'nav_menus_created_posts' ) ) { foreach ( $this->manager->get_setting( 'nav_menus_created_posts' )->value() as $post_id ) { $auto_draft_post = get_post( $post_id ); if ( $post_type->name === $auto_draft_post->post_type ) { $posts[] = $auto_draft_post; } } } $args = array( 'numberposts' => 10, 'offset' => 10 * $page, 'orderby' => 'date', 'order' => 'DESC', 'post_type' => $object_name, ); if ( ! empty( $suppress_page_ids ) ) { $args['post__not_in'] = $suppress_page_ids; } $posts = array_merge( $posts, $important_pages, get_posts( $args ) ); foreach ( $posts as $post ) { $post_title = $post->post_title; if ( '' === $post_title ) { $post_title = sprintf( __( '#%d (no title)' ), $post->ID ); } $post_type_label = get_post_type_object( $post->post_type )->labels->singular_name; $post_states = get_post_states( $post ); if ( ! empty( $post_states ) ) { $post_type_label = implode( ',', $post_states ); } $items[] = array( 'id' => "post-{$post->ID}", 'title' => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ), 'type' => 'post_type', 'type_label' => $post_type_label, 'object' => $post->post_type, 'object_id' => (int) $post->ID, 'url' => get_permalink( (int) $post->ID ), ); } } elseif ( 'taxonomy' === $object_type ) { $terms = get_terms( array( 'taxonomy' => $object_name, 'child_of' => 0, 'exclude' => '', 'hide_empty' => false, 'hierarchical' => 1, 'include' => '', 'number' => 10, 'offset' => 10 * $page, 'order' => 'DESC', 'orderby' => 'count', 'pad_counts' => false, ) ); if ( is_wp_error( $terms ) ) { return $terms; } foreach ( $terms as $term ) { $items[] = array( 'id' => "term-{$term->term_id}", 'title' => html_entity_decode( $term->name, ENT_QUOTES, get_bloginfo( 'charset' ) ), 'type' => 'taxonomy', 'type_label' => get_taxonomy( $term->taxonomy )->labels->singular_name, 'object' => $term->taxonomy, 'object_id' => (int) $term->term_id, 'url' => get_term_link( (int) $term->term_id, $term->taxonomy ), ); } } $items = apply_filters( 'customize_nav_menu_available_items', $items, $object_type, $object_name, $page ); return $items; } public function ajax_search_available_items() { check_ajax_referer( 'customize-menus', 'customize-menus-nonce' ); if ( ! current_user_can( 'edit_theme_options' ) ) { wp_die( -1 ); } if ( empty( $_POST['search'] ) ) { wp_send_json_error( 'nav_menus_missing_search_parameter' ); } $p = isset( $_POST['page'] ) ? absint( $_POST['page'] ) : 0; if ( $p < 1 ) { $p = 1; } $s = sanitize_text_field( wp_unslash( $_POST['search'] ) ); $items = $this->search_available_items_query( array( 'pagenum' => $p, 's' => $s, ) ); if ( empty( $items ) ) { wp_send_json_error( array( 'message' => __( 'No results found.' ) ) ); } else { wp_send_json_success( array( 'items' => $items ) ); } } public function search_available_items_query( $args = array() ) { $items = array(); $post_type_objects = get_post_types( array( 'show_in_nav_menus' => true ), 'objects' ); $query = array( 'post_type' => array_keys( $post_type_objects ), 'suppress_filters' => true, 'update_post_term_cache' => false, 'update_post_meta_cache' => false, 'post_status' => 'publish', 'posts_per_page' => 20, ); $args['pagenum'] = isset( $args['pagenum'] ) ? absint( $args['pagenum'] ) : 1; $query['offset'] = $args['pagenum'] > 1 ? $query['posts_per_page'] * ( $args['pagenum'] - 1 ) : 0; if ( isset( $args['s'] ) ) { $query['s'] = $args['s']; } $posts = array(); $nav_menus_created_posts_setting = $this->manager->get_setting( 'nav_menus_created_posts' ); if ( 1 === $args['pagenum'] && $nav_menus_created_posts_setting && count( $nav_menus_created_posts_setting->value() ) > 0 ) { $stub_post_query = new WP_Query( array_merge( $query, array( 'post_status' => 'auto-draft', 'post__in' => $nav_menus_created_posts_setting->value(), 'posts_per_page' => -1, ) ) ); $posts = array_merge( $posts, $stub_post_query->posts ); } $get_posts = new WP_Query( $query ); $posts = array_merge( $posts, $get_posts->posts ); foreach ( $posts as $post ) { $post_title = $post->post_title; if ( '' === $post_title ) { $post_title = sprintf( __( '#%d (no title)' ), $post->ID ); } $post_type_label = $post_type_objects[ $post->post_type ]->labels->singular_name; $post_states = get_post_states( $post ); if ( ! empty( $post_states ) ) { $post_type_label = implode( ',', $post_states ); } $items[] = array( 'id' => 'post-' . $post->ID, 'title' => html_entity_decode( $post_title, ENT_QUOTES, get_bloginfo( 'charset' ) ), 'type' => 'post_type', 'type_label' => $post_type_label, 'object' => $post->post_type, 'object_id' => (int) $post->ID, 'url' => get_permalink( (int) $post->ID ), ); } $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'names' ); $terms = get_terms( array( 'taxonomies' => $taxonomies, 'name__like' => $args['s'], 'number' => 20, 'hide_empty' => false, 'offset' => 20 * ( $args['pagenum'] - 1 ), ) ); if ( ! empty( $terms ) ) { foreach ( $terms as $term ) { $items[] = array( 'id' => 'term-' . $term->term_id, 'title' => html_entity_decode( $term->name, ENT_QUOTES, get_bloginfo( 'charset' ) ), 'type' => 'taxonomy', 'type_label' => get_taxonomy( $term->taxonomy )->labels->singular_name, 'object' => $term->taxonomy, 'object_id' => (int) $term->term_id, 'url' => get_term_link( (int) $term->term_id, $term->taxonomy ), ); } } if ( isset( $args['s'] ) ) { $front_page = 'page' === get_option( 'show_on_front' ) ? (int) get_option( 'page_on_front' ) : 0; if ( empty( $front_page ) ) { $title = _x( 'Home', 'nav menu home label' ); $matches = function_exists( 'mb_stripos' ) ? false !== mb_stripos( $title, $args['s'] ) : false !== stripos( $title, $args['s'] ); if ( $matches ) { $items[] = array( 'id' => 'home', 'title' => $title, 'type' => 'custom', 'type_label' => __( 'Custom Link' ), 'object' => '', 'url' => home_url(), ); } } } $items = apply_filters( 'customize_nav_menu_searched_items', $items, $args ); return $items; } public function enqueue_scripts() { wp_enqueue_style( 'customize-nav-menus' ); wp_enqueue_script( 'customize-nav-menus' ); $temp_nav_menu_setting = new WP_Customize_Nav_Menu_Setting( $this->manager, 'nav_menu[-1]' ); $temp_nav_menu_item_setting = new WP_Customize_Nav_Menu_Item_Setting( $this->manager, 'nav_menu_item[-1]' ); $num_locations = count( get_registered_nav_menus() ); if ( 1 === $num_locations ) { $locations_description = __( 'Your theme can display menus in one location.' ); } else { $locations_description = sprintf( _n( 'Your theme can display menus in %s location.', 'Your theme can display menus in %s locations.', $num_locations ), number_format_i18n( $num_locations ) ); } $settings = array( 'allMenus' => wp_get_nav_menus(), 'itemTypes' => $this->available_item_types(), 'l10n' => array( 'untitled' => _x( '(no label)', 'missing menu item navigation label' ), 'unnamed' => _x( '(unnamed)', 'Missing menu name.' ), 'custom_label' => __( 'Custom Link' ), 'page_label' => get_post_type_object( 'page' )->labels->singular_name, 'menuLocation' => _x( '(Currently set to: %s)', 'menu' ), 'locationsTitle' => 1 === $num_locations ? __( 'Menu Location' ) : __( 'Menu Locations' ), 'locationsDescription' => $locations_description, 'menuNameLabel' => __( 'Menu Name' ), 'newMenuNameDescription' => __( 'If your theme has multiple menus, giving them clear names will help you manage them.' ), 'itemAdded' => __( 'Menu item added' ), 'itemDeleted' => __( 'Menu item deleted' ), 'menuAdded' => __( 'Menu created' ), 'menuDeleted' => __( 'Menu deleted' ), 'movedUp' => __( 'Menu item moved up' ), 'movedDown' => __( 'Menu item moved down' ), 'movedLeft' => __( 'Menu item moved out of submenu' ), 'movedRight' => __( 'Menu item is now a sub-item' ), 'customizingMenus' => sprintf( __( 'Customizing &#9656; %s' ), esc_html( $this->manager->get_panel( 'nav_menus' )->title ) ), 'invalidTitleTpl' => __( '%s (Invalid)' ), 'pendingTitleTpl' => __( '%s (Pending)' ), 'itemsFound' => __( 'Number of items found: %d' ), 'itemsFoundMore' => __( 'Additional items found: %d' ), 'itemsLoadingMore' => __( 'Loading more results... please wait.' ), 'reorderModeOn' => __( 'Reorder mode enabled' ), 'reorderModeOff' => __( 'Reorder mode closed' ), 'reorderLabelOn' => esc_attr__( 'Reorder menu items' ), 'reorderLabelOff' => esc_attr__( 'Close reorder mode' ), ), 'settingTransport' => 'postMessage', 'phpIntMax' => PHP_INT_MAX, 'defaultSettingValues' => array( 'nav_menu' => $temp_nav_menu_setting->default, 'nav_menu_item' => $temp_nav_menu_item_setting->default, ), 'locationSlugMappedToName' => get_registered_nav_menus(), ); $data = sprintf( 'var _wpCustomizeNavMenusSettings = %s;', wp_json_encode( $settings ) ); wp_scripts()->add_data( 'customize-nav-menus', 'data', $data ); $nav_menus_l10n = array( 'oneThemeLocationNoMenus' => null, 'moveUp' => __( 'Move up one' ), 'moveDown' => __( 'Move down one' ), 'moveToTop' => __( 'Move to the top' ), 'moveUnder' => __( 'Move under %s' ), 'moveOutFrom' => __( 'Move out from under %s' ), 'under' => __( 'Under %s' ), 'outFrom' => __( 'Out from under %s' ), 'menuFocus' => __( '%1$s. Menu item %2$d of %3$d.' ), 'subMenuFocus' => __( '%1$s. Sub item number %2$d under %3$s.' ), ); wp_localize_script( 'nav-menu', 'menus', $nav_menus_l10n ); } public function filter_dynamic_setting_args( $setting_args, $setting_id ) { if ( preg_match( WP_Customize_Nav_Menu_Setting::ID_PATTERN, $setting_id ) ) { $setting_args = array( 'type' => WP_Customize_Nav_Menu_Setting::TYPE, 'transport' => 'postMessage', ); } elseif ( preg_match( WP_Customize_Nav_Menu_Item_Setting::ID_PATTERN, $setting_id ) ) { $setting_args = array( 'type' => WP_Customize_Nav_Menu_Item_Setting::TYPE, 'transport' => 'postMessage', ); } return $setting_args; } public function filter_dynamic_setting_class( $setting_class, $setting_id, $setting_args ) { unset( $setting_id ); if ( ! empty( $setting_args['type'] ) && WP_Customize_Nav_Menu_Setting::TYPE === $setting_args['type'] ) { $setting_class = 'WP_Customize_Nav_Menu_Setting'; } elseif ( ! empty( $setting_args['type'] ) && WP_Customize_Nav_Menu_Item_Setting::TYPE === $setting_args['type'] ) { $setting_class = 'WP_Customize_Nav_Menu_Item_Setting'; } return $setting_class; } public function customize_register() { $changeset = $this->manager->unsanitized_post_values(); $nav_menus_setting_ids = array(); foreach ( array_keys( $changeset ) as $setting_id ) { if ( preg_match( '/^(nav_menu_locations|nav_menu|nav_menu_item)\[/', $setting_id ) ) { $nav_menus_setting_ids[] = $setting_id; } } $settings = $this->manager->add_dynamic_settings( $nav_menus_setting_ids ); if ( $this->manager->settings_previewed() ) { foreach ( $settings as $setting ) { $setting->preview(); } } $this->manager->register_panel_type( 'WP_Customize_Nav_Menus_Panel' ); $this->manager->register_control_type( 'WP_Customize_Nav_Menu_Control' ); $this->manager->register_control_type( 'WP_Customize_Nav_Menu_Name_Control' ); $this->manager->register_control_type( 'WP_Customize_Nav_Menu_Locations_Control' ); $this->manager->register_control_type( 'WP_Customize_Nav_Menu_Auto_Add_Control' ); $this->manager->register_control_type( 'WP_Customize_Nav_Menu_Item_Control' ); $description = '<p>' . __( 'This panel is used for managing navigation menus for content you have already published on your site. You can create menus and add items for existing content such as pages, posts, categories, tags, formats, or custom links.' ) . '</p>'; if ( current_theme_supports( 'widgets' ) ) { $description .= '<p>' . sprintf( __( 'Menus can be displayed in locations defined by your theme or in <a href="%s">widget areas</a> by adding a &#8220;Navigation Menu&#8221; widget.' ), "javascript:wp.customize.panel( 'widgets' ).focus();" ) . '</p>'; } else { $description .= '<p>' . __( 'Menus can be displayed in locations defined by your theme.' ) . '</p>'; } $this->manager->add_panel( new WP_Customize_Nav_Menus_Panel( $this->manager, 'nav_menus', array( 'title' => __( 'Menus' ), 'description' => $description, 'priority' => 100, ) ) ); $menus = wp_get_nav_menus(); $locations = get_registered_nav_menus(); $num_locations = count( $locations ); if ( 1 === $num_locations ) { $description = '<p>' . __( 'Your theme can display menus in one location. Select which menu you would like to use.' ) . '</p>'; } else { $description = '<p>' . sprintf( _n( 'Your theme can display menus in %s location. Select which menu you would like to use.', 'Your theme can display menus in %s locations. Select which menu appears in each location.', $num_locations ), number_format_i18n( $num_locations ) ) . '</p>'; } if ( current_theme_supports( 'widgets' ) ) { $description .= '<p>' . sprintf( __( 'If your theme has widget areas, you can also add menus there. Visit the <a href="%s">Widgets panel</a> and add a &#8220;Navigation Menu widget&#8221; to display a menu in a sidebar or footer.' ), "javascript:wp.customize.panel( 'widgets' ).focus();" ) . '</p>'; } $this->manager->add_section( 'menu_locations', array( 'title' => 1 === $num_locations ? _x( 'View Location', 'menu locations' ) : _x( 'View All Locations', 'menu locations' ), 'panel' => 'nav_menus', 'priority' => 30, 'description' => $description, ) ); $choices = array( '0' => __( '&mdash; Select &mdash;' ) ); foreach ( $menus as $menu ) { $choices[ $menu->term_id ] = wp_html_excerpt( $menu->name, 40, '&hellip;' ); } $mapped_nav_menu_locations = array(); if ( ! $this->manager->is_theme_active() ) { $theme_mods = get_option( 'theme_mods_' . $this->manager->get_stylesheet(), array() ); if ( empty( $theme_mods['nav_menu_locations'] ) ) { $theme_mods['nav_menu_locations'] = array(); } $mapped_nav_menu_locations = wp_map_nav_menu_locations( $theme_mods['nav_menu_locations'], $this->original_nav_menu_locations ); } foreach ( $locations as $location => $description ) { $setting_id = "nav_menu_locations[{$location}]"; $setting = $this->manager->get_setting( $setting_id ); if ( $setting ) { $setting->transport = 'postMessage'; remove_filter( "customize_sanitize_{$setting_id}", 'absint' ); add_filter( "customize_sanitize_{$setting_id}", array( $this, 'intval_base10' ) ); } else { $this->manager->add_setting( $setting_id, array( 'sanitize_callback' => array( $this, 'intval_base10' ), 'theme_supports' => 'menus', 'type' => 'theme_mod', 'transport' => 'postMessage', 'default' => 0, ) ); } if ( empty( $changeset[ $setting_id ] ) && isset( $mapped_nav_menu_locations[ $location ] ) ) { $this->manager->set_post_value( $setting_id, $mapped_nav_menu_locations[ $location ] ); } $this->manager->add_control( new WP_Customize_Nav_Menu_Location_Control( $this->manager, $setting_id, array( 'label' => $description, 'location_id' => $location, 'section' => 'menu_locations', 'choices' => $choices, ) ) ); } if ( ! function_exists( 'get_post_states' ) ) { require_once ABSPATH . 'wp-admin/includes/template.php'; } foreach ( $menus as $menu ) { $menu_id = $menu->term_id; $section_id = 'nav_menu[' . $menu_id . ']'; $this->manager->add_section( new WP_Customize_Nav_Menu_Section( $this->manager, $section_id, array( 'title' => html_entity_decode( $menu->name, ENT_QUOTES, get_bloginfo( 'charset' ) ), 'priority' => 10, 'panel' => 'nav_menus', ) ) ); $nav_menu_setting_id = 'nav_menu[' . $menu_id . ']'; $this->manager->add_setting( new WP_Customize_Nav_Menu_Setting( $this->manager, $nav_menu_setting_id, array( 'transport' => 'postMessage', ) ) ); $menu_items = (array) wp_get_nav_menu_items( $menu_id ); foreach ( array_values( $menu_items ) as $i => $item ) { $menu_item_setting_id = 'nav_menu_item[' . $item->ID . ']'; $value = (array) $item; if ( empty( $value['post_title'] ) ) { $value['title'] = ''; } $value['nav_menu_term_id'] = $menu_id; $this->manager->add_setting( new WP_Customize_Nav_Menu_Item_Setting( $this->manager, $menu_item_setting_id, array( 'value' => $value, 'transport' => 'postMessage', ) ) ); $this->manager->add_control( new WP_Customize_Nav_Menu_Item_Control( $this->manager, $menu_item_setting_id, array( 'label' => $item->title, 'section' => $section_id, 'priority' => 10 + $i, ) ) ); } } $this->manager->add_section( 'add_menu', array( 'type' => 'new_menu', 'title' => __( 'New Menu' ), 'panel' => 'nav_menus', 'priority' => 20, ) ); $this->manager->add_setting( new WP_Customize_Filter_Setting( $this->manager, 'nav_menus_created_posts', array( 'transport' => 'postMessage', 'type' => 'option', 'default' => array(), 'sanitize_callback' => array( $this, 'sanitize_nav_menus_created_posts' ), ) ) ); } public function intval_base10( $value ) { return intval( $value, 10 ); } public function available_item_types() { $item_types = array(); $post_types = get_post_types( array( 'show_in_nav_menus' => true ), 'objects' ); if ( $post_types ) { foreach ( $post_types as $slug => $post_type ) { $item_types[] = array( 'title' => $post_type->labels->name, 'type_label' => $post_type->labels->singular_name, 'type' => 'post_type', 'object' => $post_type->name, ); } } $taxonomies = get_taxonomies( array( 'show_in_nav_menus' => true ), 'objects' ); if ( $taxonomies ) { foreach ( $taxonomies as $slug => $taxonomy ) { if ( 'post_format' === $taxonomy && ! current_theme_supports( 'post-formats' ) ) { continue; } $item_types[] = array( 'title' => $taxonomy->labels->name, 'type_label' => $taxonomy->labels->singular_name, 'type' => 'taxonomy', 'object' => $taxonomy->name, ); } } $item_types = apply_filters( 'customize_nav_menu_available_item_types', $item_types ); return $item_types; } public function insert_auto_draft_post( $postarr ) { if ( ! isset( $postarr['post_type'] ) ) { return new WP_Error( 'unknown_post_type', __( 'Invalid post type.' ) ); } if ( empty( $postarr['post_title'] ) ) { return new WP_Error( 'empty_title', __( 'Empty title.' ) ); } if ( ! empty( $postarr['post_status'] ) ) { return new WP_Error( 'status_forbidden', __( 'Status is forbidden.' ) ); } $postarr['post_status'] = 'auto-draft'; if ( empty( $postarr['post_name'] ) ) { $postarr['post_name'] = sanitize_title( $postarr['post_title'] ); } if ( ! isset( $postarr['meta_input'] ) ) { $postarr['meta_input'] = array(); } $postarr['meta_input']['_customize_draft_post_name'] = $postarr['post_name']; $postarr['meta_input']['_customize_changeset_uuid'] = $this->manager->changeset_uuid(); unset( $postarr['post_name'] ); add_filter( 'wp_insert_post_empty_content', '__return_false', 1000 ); $r = wp_insert_post( wp_slash( $postarr ), true ); remove_filter( 'wp_insert_post_empty_content', '__return_false', 1000 ); if ( is_wp_error( $r ) ) { return $r; } else { return get_post( $r ); } } public function ajax_insert_auto_draft_post() { if ( ! check_ajax_referer( 'customize-menus', 'customize-menus-nonce', false ) ) { wp_send_json_error( 'bad_nonce', 400 ); } if ( ! current_user_can( 'customize' ) ) { wp_send_json_error( 'customize_not_allowed', 403 ); } if ( empty( $_POST['params'] ) || ! is_array( $_POST['params'] ) ) { wp_send_json_error( 'missing_params', 400 ); } $params = wp_unslash( $_POST['params'] ); $illegal_params = array_diff( array_keys( $params ), array( 'post_type', 'post_title' ) ); if ( ! empty( $illegal_params ) ) { wp_send_json_error( 'illegal_params', 400 ); } $params = array_merge( array( 'post_type' => '', 'post_title' => '', ), $params ); if ( empty( $params['post_type'] ) || ! post_type_exists( $params['post_type'] ) ) { status_header( 400 ); wp_send_json_error( 'missing_post_type_param' ); } $post_type_object = get_post_type_object( $params['post_type'] ); if ( ! current_user_can( $post_type_object->cap->create_posts ) || ! current_user_can( $post_type_object->cap->publish_posts ) ) { status_header( 403 ); wp_send_json_error( 'insufficient_post_permissions' ); } $params['post_title'] = trim( $params['post_title'] ); if ( '' === $params['post_title'] ) { status_header( 400 ); wp_send_json_error( 'missing_post_title' ); } $r = $this->insert_auto_draft_post( $params ); if ( is_wp_error( $r ) ) { $error = $r; if ( ! empty( $post_type_object->labels->singular_name ) ) { $singular_name = $post_type_object->labels->singular_name; } else { $singular_name = __( 'Post' ); } $data = array( 'message' => sprintf( __( '%1$s could not be created: %2$s' ), $singular_name, $error->get_error_message() ), ); wp_send_json_error( $data ); } else { $post = $r; $data = array( 'post_id' => $post->ID, 'url' => get_permalink( $post->ID ), ); wp_send_json_success( $data ); } } public function print_templates() { ?>
		<script type="text/html" id="tmpl-available-menu-item">
			<li id="menu-item-tpl-{{ data.id }}" class="menu-item-tpl" data-menu-item-id="{{ data.id }}">
				<div class="menu-item-bar">
					<div class="menu-item-handle">
						<span class="item-type" aria-hidden="true">{{ data.type_label }}</span>
						<span class="item-title" aria-hidden="true">
							<span class="menu-item-title<# if ( ! data.title ) { #> no-title<# } #>">{{ data.title || wp.customize.Menus.data.l10n.untitled }}</span>
						</span>
						<button type="button" class="button-link item-add">
							<span class="screen-reader-text">
							<?php
 printf( __( 'Add to menu: %1$s (%2$s)' ), '{{ data.title || wp.customize.Menus.data.l10n.untitled }}', '{{ data.type_label }}' ); ?>
							</span>
						</button>
					</div>
				</div>
			</li>
		</script>

		<script type="text/html" id="tmpl-menu-item-reorder-nav">
			<div class="menu-item-reorder-nav">
				<?php
 printf( '<button type="button" class="menus-move-up">%1$s</button><button type="button" class="menus-move-down">%2$s</button><button type="button" class="menus-move-left">%3$s</button><button type="button" class="menus-move-right">%4$s</button>', __( 'Move up' ), __( 'Move down' ), __( 'Move one level up' ), __( 'Move one level down' ) ); ?>
			</div>
		</script>

		<script type="text/html" id="tmpl-nav-menu-delete-button">
			<div class="menu-delete-item">
				<button type="button" class="button-link button-link-delete">
					<?php _e( 'Delete Menu' ); ?>
				</button>
			</div>
		</script>

		<script type="text/html" id="tmpl-nav-menu-submit-new-button">
			<p id="customize-new-menu-submit-description"><?php _e( 'Click &#8220;Next&#8221; to start adding links to your new menu.' ); ?></p>
			<button id="customize-new-menu-submit" type="button" class="button" aria-describedby="customize-new-menu-submit-description"><?php _e( 'Next' ); ?></button>
		</script>

		<script type="text/html" id="tmpl-nav-menu-locations-header">
			<span class="customize-control-title customize-section-title-menu_locations-heading">{{ data.l10n.locationsTitle }}</span>
			<p class="customize-control-description customize-section-title-menu_locations-description">{{ data.l10n.locationsDescription }}</p>
		</script>

		<script type="text/html" id="tmpl-nav-menu-create-menu-section-title">
			<p class="add-new-menu-notice">
				<?php _e( 'It does not look like your site has any menus yet. Want to build one? Click the button to start.' ); ?>
			</p>
			<p class="add-new-menu-notice">
				<?php _e( 'You&#8217;ll create a menu, assign it a location, and add menu items like links to pages and categories. If your theme has multiple menu areas, you might need to create more than one.' ); ?>
			</p>
			<h3>
				<button type="button" class="button customize-add-menu-button">
					<?php _e( 'Create New Menu' ); ?>
				</button>
			</h3>
		</script>
		<?php
 } public function available_items_template() { ?>
		<div id="available-menu-items" class="accordion-container">
			<div class="customize-section-title">
				<button type="button" class="customize-section-back" tabindex="-1">
					<span class="screen-reader-text">
						<?php
 _e( 'Back' ); ?>
					</span>
				</button>
				<h3>
					<span class="customize-action">
						<?php
 printf( __( 'Customizing &#9656; %s' ), esc_html( $this->manager->get_panel( 'nav_menus' )->title ) ); ?>
					</span>
					<?php _e( 'Add Menu Items' ); ?>
				</h3>
			</div>
			<div id="available-menu-items-search" class="accordion-section cannot-expand">
				<div class="accordion-section-title">
					<label class="screen-reader-text" for="menu-items-search">
						<?php
 _e( 'Search Menu Items' ); ?>
					</label>
					<input type="text" id="menu-items-search" placeholder="<?php esc_attr_e( 'Search menu items&hellip;' ); ?>" aria-describedby="menu-items-search-desc" />
					<p class="screen-reader-text" id="menu-items-search-desc">
						<?php
 _e( 'The search results will be updated as you type.' ); ?>
					</p>
					<span class="spinner"></span>
				</div>
				<div class="search-icon" aria-hidden="true"></div>
				<button type="button" class="clear-results"><span class="screen-reader-text">
					<?php
 _e( 'Clear Results' ); ?>
				</span></button>
				<ul class="accordion-section-content available-menu-items-list" data-type="search"></ul>
			</div>
			<?php
 $item_types = $this->available_item_types(); $page_item_type = null; foreach ( $item_types as $i => $item_type ) { if ( isset( $item_type['object'] ) && 'page' === $item_type['object'] ) { $page_item_type = $item_type; unset( $item_types[ $i ] ); } } $this->print_custom_links_available_menu_item(); if ( $page_item_type ) { $this->print_post_type_container( $page_item_type ); } foreach ( $item_types as $item_type ) { $this->print_post_type_container( $item_type ); } ?>
		</div><!-- #available-menu-items -->
		<?php
 } protected function print_post_type_container( $available_item_type ) { $id = sprintf( 'available-menu-items-%s-%s', $available_item_type['type'], $available_item_type['object'] ); ?>
		<div id="<?php echo esc_attr( $id ); ?>" class="accordion-section">
			<h4 class="accordion-section-title" role="presentation">
				<?php echo esc_html( $available_item_type['title'] ); ?>
				<span class="spinner"></span>
				<span class="no-items"><?php _e( 'No items' ); ?></span>
				<button type="button" class="button-link" aria-expanded="false">
					<span class="screen-reader-text">
					<?php
 printf( __( 'Toggle section: %s' ), esc_html( $available_item_type['title'] ) ); ?>
						</span>
					<span class="toggle-indicator" aria-hidden="true"></span>
				</button>
			</h4>
			<div class="accordion-section-content">
				<?php if ( 'post_type' === $available_item_type['type'] ) : ?>
					<?php $post_type_obj = get_post_type_object( $available_item_type['object'] ); ?>
					<?php if ( current_user_can( $post_type_obj->cap->create_posts ) && current_user_can( $post_type_obj->cap->publish_posts ) ) : ?>
						<div class="new-content-item">
							<label for="<?php echo esc_attr( 'create-item-input-' . $available_item_type['object'] ); ?>" class="screen-reader-text"><?php echo esc_html( $post_type_obj->labels->add_new_item ); ?></label>
							<input type="text" id="<?php echo esc_attr( 'create-item-input-' . $available_item_type['object'] ); ?>" class="create-item-input" placeholder="<?php echo esc_attr( $post_type_obj->labels->add_new_item ); ?>">
							<button type="button" class="button add-content"><?php _e( 'Add' ); ?></button>
						</div>
					<?php endif; ?>
				<?php endif; ?>
				<ul class="available-menu-items-list" data-type="<?php echo esc_attr( $available_item_type['type'] ); ?>" data-object="<?php echo esc_attr( $available_item_type['object'] ); ?>" data-type_label="<?php echo esc_attr( isset( $available_item_type['type_label'] ) ? $available_item_type['type_label'] : $available_item_type['type'] ); ?>"></ul>
			</div>
		</div>
		<?php
 } protected function print_custom_links_available_menu_item() { ?>
		<div id="new-custom-menu-item" class="accordion-section">
			<h4 class="accordion-section-title" role="presentation">
				<?php _e( 'Custom Links' ); ?>
				<button type="button" class="button-link" aria-expanded="false">
					<span class="screen-reader-text">
						<?php
 _e( 'Toggle section: Custom Links' ); ?>
					</span>
					<span class="toggle-indicator" aria-hidden="true"></span>
				</button>
			</h4>
			<div class="accordion-section-content customlinkdiv">
				<input type="hidden" value="custom" id="custom-menu-item-type" name="menu-item[-1][menu-item-type]" />
				<p id="menu-item-url-wrap" class="wp-clearfix">
					<label class="howto" for="custom-menu-item-url"><?php _e( 'URL' ); ?></label>
					<input id="custom-menu-item-url" name="menu-item[-1][menu-item-url]" type="text" class="code menu-item-textbox" placeholder="https://">
				</p>
				<p id="menu-item-name-wrap" class="wp-clearfix">
					<label class="howto" for="custom-menu-item-name"><?php _e( 'Link Text' ); ?></label>
					<input id="custom-menu-item-name" name="menu-item[-1][menu-item-title]" type="text" class="regular-text menu-item-textbox">
				</p>
				<p class="button-controls">
					<span class="add-to-menu">
						<input type="submit" class="button submit-add-to-menu right" value="<?php esc_attr_e( 'Add to Menu' ); ?>" name="add-custom-menu-item" id="custom-menu-item-submit">
						<span class="spinner"></span>
					</span>
				</p>
			</div>
		</div>
		<?php
 } public $preview_nav_menu_instance_args = array(); public function customize_dynamic_partial_args( $partial_args, $partial_id ) { if ( preg_match( '/^nav_menu_instance\[[0-9a-f]{32}\]$/', $partial_id ) ) { if ( false === $partial_args ) { $partial_args = array(); } $partial_args = array_merge( $partial_args, array( 'type' => 'nav_menu_instance', 'render_callback' => array( $this, 'render_nav_menu_partial' ), 'container_inclusive' => true, 'settings' => array(), 'capability' => 'edit_theme_options', ) ); } return $partial_args; } public function customize_preview_init() { add_action( 'wp_enqueue_scripts', array( $this, 'customize_preview_enqueue_deps' ) ); add_filter( 'wp_nav_menu_args', array( $this, 'filter_wp_nav_menu_args' ), 1000 ); add_filter( 'wp_nav_menu', array( $this, 'filter_wp_nav_menu' ), 10, 2 ); add_action( 'wp_footer', array( $this, 'export_preview_data' ), 1 ); add_filter( 'customize_render_partials_response', array( $this, 'export_partial_rendered_nav_menu_instances' ) ); } public function make_auto_draft_status_previewable() { global $wp_post_statuses; $wp_post_statuses['auto-draft']->protected = true; } public function sanitize_nav_menus_created_posts( $value ) { $post_ids = array(); foreach ( wp_parse_id_list( $value ) as $post_id ) { if ( empty( $post_id ) ) { continue; } $post = get_post( $post_id ); if ( 'auto-draft' !== $post->post_status && 'draft' !== $post->post_status ) { continue; } $post_type_obj = get_post_type_object( $post->post_type ); if ( ! $post_type_obj ) { continue; } if ( ! current_user_can( $post_type_obj->cap->publish_posts ) || ! current_user_can( 'edit_post', $post_id ) ) { continue; } $post_ids[] = $post->ID; } return $post_ids; } public function save_nav_menus_created_posts( $setting ) { $post_ids = $setting->post_value(); if ( ! empty( $post_ids ) ) { foreach ( $post_ids as $post_id ) { $current_status = get_post_status( $post_id ); if ( 'auto-draft' !== $current_status && 'draft' !== $current_status ) { continue; } $target_status = 'attachment' === get_post_type( $post_id ) ? 'inherit' : 'publish'; $args = array( 'ID' => $post_id, 'post_status' => $target_status, ); $post_name = get_post_meta( $post_id, '_customize_draft_post_name', true ); if ( $post_name ) { $args['post_name'] = $post_name; } wp_update_post( wp_slash( $args ) ); delete_post_meta( $post_id, '_customize_draft_post_name' ); } } } public function filter_wp_nav_menu_args( $args ) { $can_partial_refresh = ( ! empty( $args['echo'] ) && ( empty( $args['fallback_cb'] ) || is_string( $args['fallback_cb'] ) ) && ( empty( $args['walker'] ) || is_string( $args['walker'] ) ) && ( ! empty( $args['theme_location'] ) || ( ! empty( $args['menu'] ) && ( is_numeric( $args['menu'] ) || is_object( $args['menu'] ) ) ) ) && ( ! empty( $args['container'] ) || ( isset( $args['items_wrap'] ) && '<' === substr( $args['items_wrap'], 0, 1 ) ) ) ); $args['can_partial_refresh'] = $can_partial_refresh; $exported_args = $args; if ( ! $can_partial_refresh ) { $exported_args['fallback_cb'] = ''; $exported_args['walker'] = ''; } if ( ! empty( $exported_args['menu'] ) && is_object( $exported_args['menu'] ) ) { $exported_args['menu'] = $exported_args['menu']->term_id; } ksort( $exported_args ); $exported_args['args_hmac'] = $this->hash_nav_menu_args( $exported_args ); $args['customize_preview_nav_menus_args'] = $exported_args; $this->preview_nav_menu_instance_args[ $exported_args['args_hmac'] ] = $exported_args; return $args; } public function filter_wp_nav_menu( $nav_menu_content, $args ) { if ( isset( $args->customize_preview_nav_menus_args['can_partial_refresh'] ) && $args->customize_preview_nav_menus_args['can_partial_refresh'] ) { $attributes = sprintf( ' data-customize-partial-id="%s"', esc_attr( 'nav_menu_instance[' . $args->customize_preview_nav_menus_args['args_hmac'] . ']' ) ); $attributes .= ' data-customize-partial-type="nav_menu_instance"'; $attributes .= sprintf( ' data-customize-partial-placement-context="%s"', esc_attr( wp_json_encode( $args->customize_preview_nav_menus_args ) ) ); $nav_menu_content = preg_replace( '#^(<\w+)#', '$1 ' . str_replace( '\\', '\\\\', $attributes ), $nav_menu_content, 1 ); } return $nav_menu_content; } public function hash_nav_menu_args( $args ) { return wp_hash( serialize( $args ) ); } public function customize_preview_enqueue_deps() { wp_enqueue_script( 'customize-preview-nav-menus' ); } public function export_preview_data() { $exports = array( 'navMenuInstanceArgs' => $this->preview_nav_menu_instance_args, ); printf( '<script>var _wpCustomizePreviewNavMenusExports = %s;</script>', wp_json_encode( $exports ) ); } public function export_partial_rendered_nav_menu_instances( $response ) { $response['nav_menu_instance_args'] = $this->preview_nav_menu_instance_args; return $response; } public function render_nav_menu_partial( $partial, $nav_menu_args ) { unset( $partial ); if ( ! isset( $nav_menu_args['args_hmac'] ) ) { return false; } $nav_menu_args_hmac = $nav_menu_args['args_hmac']; unset( $nav_menu_args['args_hmac'] ); ksort( $nav_menu_args ); if ( ! hash_equals( $this->hash_nav_menu_args( $nav_menu_args ), $nav_menu_args_hmac ) ) { return false; } ob_start(); wp_nav_menu( $nav_menu_args ); $content = ob_get_clean(); return $content; } } 