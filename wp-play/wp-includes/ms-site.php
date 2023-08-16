<?php
 function wp_insert_site( array $data ) { global $wpdb; $now = current_time( 'mysql', true ); $defaults = array( 'domain' => '', 'path' => '/', 'network_id' => get_current_network_id(), 'registered' => $now, 'last_updated' => $now, 'public' => 1, 'archived' => 0, 'mature' => 0, 'spam' => 0, 'deleted' => 0, 'lang_id' => 0, ); $prepared_data = wp_prepare_site_data( $data, $defaults ); if ( is_wp_error( $prepared_data ) ) { return $prepared_data; } if ( false === $wpdb->insert( $wpdb->blogs, $prepared_data ) ) { return new WP_Error( 'db_insert_error', __( 'Could not insert site into the database.' ), $wpdb->last_error ); } $site_id = (int) $wpdb->insert_id; clean_blog_cache( $site_id ); $new_site = get_site( $site_id ); if ( ! $new_site ) { return new WP_Error( 'get_site_error', __( 'Could not retrieve site data.' ) ); } do_action( 'wp_insert_site', $new_site ); $args = array_diff_key( $data, $defaults ); if ( isset( $args['site_id'] ) ) { unset( $args['site_id'] ); } do_action( 'wp_initialize_site', $new_site, $args ); if ( has_action( 'wpmu_new_blog' ) ) { $user_id = ! empty( $args['user_id'] ) ? $args['user_id'] : 0; $meta = ! empty( $args['options'] ) ? $args['options'] : array(); if ( ! array_key_exists( 'WPLANG', $meta ) ) { $meta['WPLANG'] = get_network_option( $new_site->network_id, 'WPLANG' ); } $allowed_data_fields = array( 'public', 'archived', 'mature', 'spam', 'deleted', 'lang_id' ); $meta = array_merge( array_intersect_key( $data, array_flip( $allowed_data_fields ) ), $meta ); do_action_deprecated( 'wpmu_new_blog', array( $new_site->id, $user_id, $new_site->domain, $new_site->path, $new_site->network_id, $meta ), '5.1.0', 'wp_initialize_site' ); } return (int) $new_site->id; } function wp_update_site( $site_id, array $data ) { global $wpdb; if ( empty( $site_id ) ) { return new WP_Error( 'site_empty_id', __( 'Site ID must not be empty.' ) ); } $old_site = get_site( $site_id ); if ( ! $old_site ) { return new WP_Error( 'site_not_exist', __( 'Site does not exist.' ) ); } $defaults = $old_site->to_array(); $defaults['network_id'] = (int) $defaults['site_id']; $defaults['last_updated'] = current_time( 'mysql', true ); unset( $defaults['blog_id'], $defaults['site_id'] ); $data = wp_prepare_site_data( $data, $defaults, $old_site ); if ( is_wp_error( $data ) ) { return $data; } if ( false === $wpdb->update( $wpdb->blogs, $data, array( 'blog_id' => $old_site->id ) ) ) { return new WP_Error( 'db_update_error', __( 'Could not update site in the database.' ), $wpdb->last_error ); } clean_blog_cache( $old_site ); $new_site = get_site( $old_site->id ); do_action( 'wp_update_site', $new_site, $old_site ); return (int) $new_site->id; } function wp_delete_site( $site_id ) { global $wpdb; if ( empty( $site_id ) ) { return new WP_Error( 'site_empty_id', __( 'Site ID must not be empty.' ) ); } $old_site = get_site( $site_id ); if ( ! $old_site ) { return new WP_Error( 'site_not_exist', __( 'Site does not exist.' ) ); } $errors = new WP_Error(); do_action( 'wp_validate_site_deletion', $errors, $old_site ); if ( ! empty( $errors->errors ) ) { return $errors; } do_action_deprecated( 'delete_blog', array( $old_site->id, true ), '5.1.0' ); do_action( 'wp_uninitialize_site', $old_site ); if ( is_site_meta_supported() ) { $blog_meta_ids = $wpdb->get_col( $wpdb->prepare( "SELECT meta_id FROM $wpdb->blogmeta WHERE blog_id = %d ", $old_site->id ) ); foreach ( $blog_meta_ids as $mid ) { delete_metadata_by_mid( 'blog', $mid ); } } if ( false === $wpdb->delete( $wpdb->blogs, array( 'blog_id' => $old_site->id ) ) ) { return new WP_Error( 'db_delete_error', __( 'Could not delete site from the database.' ), $wpdb->last_error ); } clean_blog_cache( $old_site ); do_action( 'wp_delete_site', $old_site ); do_action_deprecated( 'deleted_blog', array( $old_site->id, true ), '5.1.0' ); return $old_site; } function get_site( $site = null ) { if ( empty( $site ) ) { $site = get_current_blog_id(); } if ( $site instanceof WP_Site ) { $_site = $site; } elseif ( is_object( $site ) ) { $_site = new WP_Site( $site ); } else { $_site = WP_Site::get_instance( $site ); } if ( ! $_site ) { return null; } $_site = apply_filters( 'get_site', $_site ); return $_site; } function _prime_site_caches( $ids, $update_meta_cache = true ) { global $wpdb; $non_cached_ids = _get_non_cached_ids( $ids, 'sites' ); if ( ! empty( $non_cached_ids ) ) { $fresh_sites = $wpdb->get_results( sprintf( "SELECT * FROM $wpdb->blogs WHERE blog_id IN (%s)", implode( ',', array_map( 'intval', $non_cached_ids ) ) ) ); update_site_cache( $fresh_sites, $update_meta_cache ); } } function update_site_cache( $sites, $update_meta_cache = true ) { if ( ! $sites ) { return; } $site_ids = array(); $site_data = array(); $blog_details_data = array(); foreach ( $sites as $site ) { $site_ids[] = $site->blog_id; $site_data[ $site->blog_id ] = $site; $blog_details_data[ $site->blog_id . 'short' ] = $site; } wp_cache_add_multiple( $site_data, 'sites' ); wp_cache_add_multiple( $blog_details_data, 'blog-details' ); if ( $update_meta_cache ) { update_sitemeta_cache( $site_ids ); } } function update_sitemeta_cache( $site_ids ) { if ( ! has_filter( 'update_blog_metadata_cache', 'wp_check_site_meta_support_prefilter' ) ) { add_filter( 'update_blog_metadata_cache', 'wp_check_site_meta_support_prefilter' ); } return update_meta_cache( 'blog', $site_ids ); } function get_sites( $args = array() ) { $query = new WP_Site_Query(); return $query->query( $args ); } function wp_prepare_site_data( $data, $defaults, $old_site = null ) { if ( isset( $data['site_id'] ) ) { if ( ! empty( $data['site_id'] ) && empty( $data['network_id'] ) ) { $data['network_id'] = $data['site_id']; } unset( $data['site_id'] ); } $data = apply_filters( 'wp_normalize_site_data', $data ); $allowed_data_fields = array( 'domain', 'path', 'network_id', 'registered', 'last_updated', 'public', 'archived', 'mature', 'spam', 'deleted', 'lang_id' ); $data = array_intersect_key( wp_parse_args( $data, $defaults ), array_flip( $allowed_data_fields ) ); $errors = new WP_Error(); do_action( 'wp_validate_site_data', $errors, $data, $old_site ); if ( ! empty( $errors->errors ) ) { return $errors; } $data['site_id'] = $data['network_id']; unset( $data['network_id'] ); return $data; } function wp_normalize_site_data( $data ) { if ( array_key_exists( 'domain', $data ) ) { $data['domain'] = trim( $data['domain'] ); $data['domain'] = preg_replace( '/\s+/', '', sanitize_user( $data['domain'], true ) ); if ( is_subdomain_install() ) { $data['domain'] = str_replace( '@', '', $data['domain'] ); } } if ( array_key_exists( 'path', $data ) ) { $data['path'] = trailingslashit( '/' . trim( $data['path'], '/' ) ); } if ( array_key_exists( 'network_id', $data ) ) { $data['network_id'] = (int) $data['network_id']; } $status_fields = array( 'public', 'archived', 'mature', 'spam', 'deleted' ); foreach ( $status_fields as $status_field ) { if ( array_key_exists( $status_field, $data ) ) { $data[ $status_field ] = (int) $data[ $status_field ]; } } $date_fields = array( 'registered', 'last_updated' ); foreach ( $date_fields as $date_field ) { if ( ! array_key_exists( $date_field, $data ) ) { continue; } if ( empty( $data[ $date_field ] ) || '0000-00-00 00:00:00' === $data[ $date_field ] ) { unset( $data[ $date_field ] ); } } return $data; } function wp_validate_site_data( $errors, $data, $old_site = null ) { if ( empty( $data['domain'] ) ) { $errors->add( 'site_empty_domain', __( 'Site domain must not be empty.' ) ); } if ( empty( $data['path'] ) ) { $errors->add( 'site_empty_path', __( 'Site path must not be empty.' ) ); } if ( empty( $data['network_id'] ) ) { $errors->add( 'site_empty_network_id', __( 'Site network ID must be provided.' ) ); } $date_fields = array( 'registered', 'last_updated' ); foreach ( $date_fields as $date_field ) { if ( empty( $data[ $date_field ] ) ) { $errors->add( 'site_empty_' . $date_field, __( 'Both registration and last updated dates must be provided.' ) ); break; } if ( '0000-00-00 00:00:00' !== $data[ $date_field ] ) { $month = substr( $data[ $date_field ], 5, 2 ); $day = substr( $data[ $date_field ], 8, 2 ); $year = substr( $data[ $date_field ], 0, 4 ); $valid_date = wp_checkdate( $month, $day, $year, $data[ $date_field ] ); if ( ! $valid_date ) { $errors->add( 'site_invalid_' . $date_field, __( 'Both registration and last updated dates must be valid dates.' ) ); break; } } } if ( ! empty( $errors->errors ) ) { return; } if ( ! $old_site || $data['domain'] !== $old_site->domain || $data['path'] !== $old_site->path || $data['network_id'] !== $old_site->network_id ) { if ( domain_exists( $data['domain'], $data['path'], $data['network_id'] ) ) { $errors->add( 'site_taken', __( 'Sorry, that site already exists!' ) ); } } } function wp_initialize_site( $site_id, array $args = array() ) { global $wpdb, $wp_roles; if ( empty( $site_id ) ) { return new WP_Error( 'site_empty_id', __( 'Site ID must not be empty.' ) ); } $site = get_site( $site_id ); if ( ! $site ) { return new WP_Error( 'site_invalid_id', __( 'Site with the ID does not exist.' ) ); } if ( wp_is_site_initialized( $site ) ) { return new WP_Error( 'site_already_initialized', __( 'The site appears to be already initialized.' ) ); } $network = get_network( $site->network_id ); if ( ! $network ) { $network = get_network(); } $args = wp_parse_args( $args, array( 'user_id' => 0, 'title' => sprintf( __( 'Site %d' ), $site->id ), 'options' => array(), 'meta' => array(), ) ); $args = apply_filters( 'wp_initialize_site_args', $args, $site, $network ); $orig_installing = wp_installing(); if ( ! $orig_installing ) { wp_installing( true ); } $switch = false; if ( get_current_blog_id() !== $site->id ) { $switch = true; switch_to_blog( $site->id ); } require_once ABSPATH . 'wp-admin/includes/upgrade.php'; make_db_current_silent( 'blog' ); $home_scheme = 'http'; $siteurl_scheme = 'http'; if ( ! is_subdomain_install() ) { if ( 'https' === parse_url( get_home_url( $network->site_id ), PHP_URL_SCHEME ) ) { $home_scheme = 'https'; } if ( 'https' === parse_url( get_network_option( $network->id, 'siteurl' ), PHP_URL_SCHEME ) ) { $siteurl_scheme = 'https'; } } populate_options( array_merge( array( 'home' => untrailingslashit( $home_scheme . '://' . $site->domain . $site->path ), 'siteurl' => untrailingslashit( $siteurl_scheme . '://' . $site->domain . $site->path ), 'blogname' => wp_unslash( $args['title'] ), 'admin_email' => '', 'upload_path' => get_network_option( $network->id, 'ms_files_rewriting' ) ? UPLOADBLOGSDIR . "/{$site->id}/files" : get_blog_option( $network->site_id, 'upload_path' ), 'blog_public' => (int) $site->public, 'WPLANG' => get_network_option( $network->id, 'WPLANG' ), ), $args['options'] ) ); clean_blog_cache( $site ); populate_roles(); $wp_roles = new WP_Roles(); populate_site_meta( $site->id, $args['meta'] ); $table_prefix = $wpdb->get_blog_prefix(); delete_metadata( 'user', 0, $table_prefix . 'user_level', null, true ); delete_metadata( 'user', 0, $table_prefix . 'capabilities', null, true ); wp_install_defaults( $args['user_id'] ); add_user_to_blog( $site->id, $args['user_id'], 'administrator' ); if ( ! user_can( $args['user_id'], 'manage_network' ) && ! get_user_meta( $args['user_id'], 'primary_blog', true ) ) { update_user_meta( $args['user_id'], 'primary_blog', $site->id ); } if ( $switch ) { restore_current_blog(); } wp_installing( $orig_installing ); return true; } function wp_uninitialize_site( $site_id ) { global $wpdb; if ( empty( $site_id ) ) { return new WP_Error( 'site_empty_id', __( 'Site ID must not be empty.' ) ); } $site = get_site( $site_id ); if ( ! $site ) { return new WP_Error( 'site_invalid_id', __( 'Site with the ID does not exist.' ) ); } if ( ! wp_is_site_initialized( $site ) ) { return new WP_Error( 'site_already_uninitialized', __( 'The site appears to be already uninitialized.' ) ); } $users = get_users( array( 'blog_id' => $site->id, 'fields' => 'ids', ) ); if ( ! empty( $users ) ) { foreach ( $users as $user_id ) { remove_user_from_blog( $user_id, $site->id ); } } $switch = false; if ( get_current_blog_id() !== $site->id ) { $switch = true; switch_to_blog( $site->id ); } $uploads = wp_get_upload_dir(); $tables = $wpdb->tables( 'blog' ); $drop_tables = apply_filters( 'wpmu_drop_tables', $tables, $site->id ); foreach ( (array) $drop_tables as $table ) { $wpdb->query( "DROP TABLE IF EXISTS `$table`" ); } $dir = apply_filters( 'wpmu_delete_blog_upload_dir', $uploads['basedir'], $site->id ); $dir = rtrim( $dir, DIRECTORY_SEPARATOR ); $top_dir = $dir; $stack = array( $dir ); $index = 0; while ( $index < count( $stack ) ) { $dir = $stack[ $index ]; $dh = @opendir( $dir ); if ( $dh ) { $file = @readdir( $dh ); while ( false !== $file ) { if ( '.' === $file || '..' === $file ) { $file = @readdir( $dh ); continue; } if ( @is_dir( $dir . DIRECTORY_SEPARATOR . $file ) ) { $stack[] = $dir . DIRECTORY_SEPARATOR . $file; } elseif ( @is_file( $dir . DIRECTORY_SEPARATOR . $file ) ) { @unlink( $dir . DIRECTORY_SEPARATOR . $file ); } $file = @readdir( $dh ); } @closedir( $dh ); } $index++; } $stack = array_reverse( $stack ); foreach ( (array) $stack as $dir ) { if ( $dir != $top_dir ) { @rmdir( $dir ); } } if ( $switch ) { restore_current_blog(); } return true; } function wp_is_site_initialized( $site_id ) { global $wpdb; if ( is_object( $site_id ) ) { $site_id = $site_id->blog_id; } $site_id = (int) $site_id; $pre = apply_filters( 'pre_wp_is_site_initialized', null, $site_id ); if ( null !== $pre ) { return (bool) $pre; } $switch = false; if ( get_current_blog_id() !== $site_id ) { $switch = true; remove_action( 'switch_blog', 'wp_switch_roles_and_user', 1 ); switch_to_blog( $site_id ); } $suppress = $wpdb->suppress_errors(); $result = (bool) $wpdb->get_results( "DESCRIBE {$wpdb->posts}" ); $wpdb->suppress_errors( $suppress ); if ( $switch ) { restore_current_blog(); add_action( 'switch_blog', 'wp_switch_roles_and_user', 1, 2 ); } return $result; } function clean_blog_cache( $blog ) { global $_wp_suspend_cache_invalidation; if ( ! empty( $_wp_suspend_cache_invalidation ) ) { return; } if ( empty( $blog ) ) { return; } $blog_id = $blog; $blog = get_site( $blog_id ); if ( ! $blog ) { if ( ! is_numeric( $blog_id ) ) { return; } $blog = new WP_Site( (object) array( 'blog_id' => $blog_id, 'domain' => null, 'path' => null, ) ); } $blog_id = $blog->blog_id; $domain_path_key = md5( $blog->domain . $blog->path ); wp_cache_delete( $blog_id, 'sites' ); wp_cache_delete( $blog_id, 'site-details' ); wp_cache_delete( $blog_id, 'blog-details' ); wp_cache_delete( $blog_id . 'short', 'blog-details' ); wp_cache_delete( $domain_path_key, 'blog-lookup' ); wp_cache_delete( $domain_path_key, 'blog-id-cache' ); wp_cache_delete( $blog_id, 'blog_meta' ); do_action( 'clean_site_cache', $blog_id, $blog, $domain_path_key ); wp_cache_set( 'last_changed', microtime(), 'sites' ); do_action_deprecated( 'refresh_blog_details', array( $blog_id ), '4.9.0', 'clean_site_cache' ); } function add_site_meta( $site_id, $meta_key, $meta_value, $unique = false ) { return add_metadata( 'blog', $site_id, $meta_key, $meta_value, $unique ); } function delete_site_meta( $site_id, $meta_key, $meta_value = '' ) { return delete_metadata( 'blog', $site_id, $meta_key, $meta_value ); } function get_site_meta( $site_id, $key = '', $single = false ) { return get_metadata( 'blog', $site_id, $key, $single ); } function update_site_meta( $site_id, $meta_key, $meta_value, $prev_value = '' ) { return update_metadata( 'blog', $site_id, $meta_key, $meta_value, $prev_value ); } function delete_site_meta_by_key( $meta_key ) { return delete_metadata( 'blog', null, $meta_key, '', true ); } function wp_maybe_update_network_site_counts_on_update( $new_site, $old_site = null ) { if ( null === $old_site ) { wp_maybe_update_network_site_counts( $new_site->network_id ); return; } if ( $new_site->network_id != $old_site->network_id ) { wp_maybe_update_network_site_counts( $new_site->network_id ); wp_maybe_update_network_site_counts( $old_site->network_id ); } } function wp_maybe_transition_site_statuses_on_update( $new_site, $old_site = null ) { $site_id = $new_site->id; if ( ! $old_site ) { $old_site = new WP_Site( new stdClass() ); } if ( $new_site->spam != $old_site->spam ) { if ( 1 == $new_site->spam ) { do_action( 'make_spam_blog', $site_id ); } else { do_action( 'make_ham_blog', $site_id ); } } if ( $new_site->mature != $old_site->mature ) { if ( 1 == $new_site->mature ) { do_action( 'mature_blog', $site_id ); } else { do_action( 'unmature_blog', $site_id ); } } if ( $new_site->archived != $old_site->archived ) { if ( 1 == $new_site->archived ) { do_action( 'archive_blog', $site_id ); } else { do_action( 'unarchive_blog', $site_id ); } } if ( $new_site->deleted != $old_site->deleted ) { if ( 1 == $new_site->deleted ) { do_action( 'make_delete_blog', $site_id ); } else { do_action( 'make_undelete_blog', $site_id ); } } if ( $new_site->public != $old_site->public ) { do_action( 'update_blog_public', $site_id, $new_site->public ); } } function wp_maybe_clean_new_site_cache_on_update( $new_site, $old_site ) { if ( $old_site->domain !== $new_site->domain || $old_site->path !== $new_site->path ) { clean_blog_cache( $new_site ); } } function wp_update_blog_public_option_on_site_update( $site_id, $is_public ) { if ( ! wp_is_site_initialized( $site_id ) ) { return; } update_blog_option( $site_id, 'blog_public', $is_public ); } function wp_cache_set_sites_last_changed() { wp_cache_set( 'last_changed', microtime(), 'sites' ); } function wp_check_site_meta_support_prefilter( $check ) { if ( ! is_site_meta_supported() ) { _doing_it_wrong( __FUNCTION__, sprintf( __( 'The %s table is not installed. Please run the network database upgrade.' ), $GLOBALS['wpdb']->blogmeta ), '5.1.0' ); return false; } return $check; } 