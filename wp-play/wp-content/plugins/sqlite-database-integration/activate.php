<?php
 function sqlite_plugin_activation_redirect( $plugin ) { if ( plugin_basename( SQLITE_MAIN_FILE ) === $plugin ) { wp_redirect( admin_url( 'options-general.php?page=sqlite-integration' ) ); exit; } } add_action( 'activated_plugin', 'sqlite_plugin_activation_redirect' ); function sqlite_activation() { global $current_screen; if ( isset( $current_screen->base ) && 'settings_page_sqlite-integration' === $current_screen->base ) { return; } if ( isset( $_GET['confirm-install'] ) && wp_verify_nonce( $_GET['_wpnonce'], 'sqlite-install' ) ) { if ( isset( $_GET['upgrade-from-pl'] ) ) { global $wp_filesystem; require_once ABSPATH . '/wp-admin/includes/file.php'; $wp_filesystem->delete( WP_CONTENT_DIR . '/db.php' ); $pl_option_name = defined( 'PERFLAB_MODULES_SETTING' ) ? PERFLAB_MODULES_SETTING : 'perflab_modules_settings'; $pl_option = get_option( $pl_option_name, array() ); unset( $pl_option['database/sqlite'] ); update_option( $pl_option_name, $pl_option ); } sqlite_plugin_copy_db_file(); wp_redirect( admin_url() ); exit; } } add_action( 'admin_init', 'sqlite_activation' ); add_filter( 'x_redirect_by', function ( $result ) { wp_cache_flush(); return $result; }, PHP_INT_MAX, 1 ); function sqlite_plugin_copy_db_file() { if ( ! class_exists( 'SQLite3' ) ) { return; } $destination = WP_CONTENT_DIR . '/db.php'; if ( ! defined( 'SQLITE_DB_DROPIN_VERSION' ) && ! file_exists( $destination ) ) { global $wp_filesystem; require_once ABSPATH . '/wp-admin/includes/file.php'; if ( ( $wp_filesystem || WP_Filesystem() ) && $wp_filesystem->touch( $destination ) ) { $file_contents = str_replace( array( '{SQLITE_IMPLEMENTATION_FOLDER_PATH}', '{SQLITE_PLUGIN}', ), array( __DIR__, str_replace( WP_PLUGIN_DIR . '/', '', SQLITE_MAIN_FILE ), ), file_get_contents( __DIR__ . '/db.copy' ) ); $wp_filesystem->put_contents( $destination, $file_contents ); } } } 