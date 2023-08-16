<?php
 function add_user() { return edit_user(); } function edit_user( $user_id = 0 ) { $wp_roles = wp_roles(); $user = new stdClass(); $user_id = (int) $user_id; if ( $user_id ) { $update = true; $user->ID = $user_id; $userdata = get_userdata( $user_id ); $user->user_login = wp_slash( $userdata->user_login ); } else { $update = false; } if ( ! $update && isset( $_POST['user_login'] ) ) { $user->user_login = sanitize_user( wp_unslash( $_POST['user_login'] ), true ); } $pass1 = ''; $pass2 = ''; if ( isset( $_POST['pass1'] ) ) { $pass1 = trim( $_POST['pass1'] ); } if ( isset( $_POST['pass2'] ) ) { $pass2 = trim( $_POST['pass2'] ); } if ( isset( $_POST['role'] ) && current_user_can( 'promote_users' ) && ( ! $user_id || current_user_can( 'promote_user', $user_id ) ) ) { $new_role = sanitize_text_field( $_POST['role'] ); $editable_roles = get_editable_roles(); if ( ! empty( $new_role ) && empty( $editable_roles[ $new_role ] ) ) { wp_die( __( 'Sorry, you are not allowed to give users that role.' ), 403 ); } $potential_role = isset( $wp_roles->role_objects[ $new_role ] ) ? $wp_roles->role_objects[ $new_role ] : false; if ( ( is_multisite() && current_user_can( 'manage_network_users' ) ) || get_current_user_id() !== $user_id || ( $potential_role && $potential_role->has_cap( 'promote_users' ) ) ) { $user->role = $new_role; } } if ( isset( $_POST['email'] ) ) { $user->user_email = sanitize_text_field( wp_unslash( $_POST['email'] ) ); } if ( isset( $_POST['url'] ) ) { if ( empty( $_POST['url'] ) || 'http://' === $_POST['url'] ) { $user->user_url = ''; } else { $user->user_url = sanitize_url( $_POST['url'] ); $protocols = implode( '|', array_map( 'preg_quote', wp_allowed_protocols() ) ); $user->user_url = preg_match( '/^(' . $protocols . '):/is', $user->user_url ) ? $user->user_url : 'http://' . $user->user_url; } } if ( isset( $_POST['first_name'] ) ) { $user->first_name = sanitize_text_field( $_POST['first_name'] ); } if ( isset( $_POST['last_name'] ) ) { $user->last_name = sanitize_text_field( $_POST['last_name'] ); } if ( isset( $_POST['nickname'] ) ) { $user->nickname = sanitize_text_field( $_POST['nickname'] ); } if ( isset( $_POST['display_name'] ) ) { $user->display_name = sanitize_text_field( $_POST['display_name'] ); } if ( isset( $_POST['description'] ) ) { $user->description = trim( $_POST['description'] ); } foreach ( wp_get_user_contact_methods( $user ) as $method => $name ) { if ( isset( $_POST[ $method ] ) ) { $user->$method = sanitize_text_field( $_POST[ $method ] ); } } if ( isset( $_POST['locale'] ) ) { $locale = sanitize_text_field( $_POST['locale'] ); if ( 'site-default' === $locale ) { $locale = ''; } elseif ( '' === $locale ) { $locale = 'en_US'; } elseif ( ! in_array( $locale, get_available_languages(), true ) ) { if ( current_user_can( 'install_languages' ) && wp_can_install_language_pack() ) { if ( ! wp_download_language_pack( $locale ) ) { $locale = ''; } } else { $locale = ''; } } $user->locale = $locale; } if ( $update ) { $user->rich_editing = isset( $_POST['rich_editing'] ) && 'false' === $_POST['rich_editing'] ? 'false' : 'true'; $user->syntax_highlighting = isset( $_POST['syntax_highlighting'] ) && 'false' === $_POST['syntax_highlighting'] ? 'false' : 'true'; $user->admin_color = isset( $_POST['admin_color'] ) ? sanitize_text_field( $_POST['admin_color'] ) : 'fresh'; $user->show_admin_bar_front = isset( $_POST['admin_bar_front'] ) ? 'true' : 'false'; } $user->comment_shortcuts = isset( $_POST['comment_shortcuts'] ) && 'true' === $_POST['comment_shortcuts'] ? 'true' : ''; $user->use_ssl = 0; if ( ! empty( $_POST['use_ssl'] ) ) { $user->use_ssl = 1; } $errors = new WP_Error(); if ( '' === $user->user_login ) { $errors->add( 'user_login', __( '<strong>Error:</strong> Please enter a username.' ) ); } if ( $update && empty( $user->nickname ) ) { $errors->add( 'nickname', __( '<strong>Error:</strong> Please enter a nickname.' ) ); } do_action_ref_array( 'check_passwords', array( $user->user_login, &$pass1, &$pass2 ) ); if ( ! $update && empty( $pass1 ) ) { $errors->add( 'pass', __( '<strong>Error:</strong> Please enter a password.' ), array( 'form-field' => 'pass1' ) ); } if ( false !== strpos( wp_unslash( $pass1 ), '\\' ) ) { $errors->add( 'pass', __( '<strong>Error:</strong> Passwords may not contain the character "\\".' ), array( 'form-field' => 'pass1' ) ); } if ( ( $update || ! empty( $pass1 ) ) && $pass1 != $pass2 ) { $errors->add( 'pass', __( '<strong>Error:</strong> Passwords do not match. Please enter the same password in both password fields.' ), array( 'form-field' => 'pass1' ) ); } if ( ! empty( $pass1 ) ) { $user->user_pass = $pass1; } if ( ! $update && isset( $_POST['user_login'] ) && ! validate_username( $_POST['user_login'] ) ) { $errors->add( 'user_login', __( '<strong>Error:</strong> This username is invalid because it uses illegal characters. Please enter a valid username.' ) ); } if ( ! $update && username_exists( $user->user_login ) ) { $errors->add( 'user_login', __( '<strong>Error:</strong> This username is already registered. Please choose another one.' ) ); } $illegal_logins = (array) apply_filters( 'illegal_user_logins', array() ); if ( in_array( strtolower( $user->user_login ), array_map( 'strtolower', $illegal_logins ), true ) ) { $errors->add( 'invalid_username', __( '<strong>Error:</strong> Sorry, that username is not allowed.' ) ); } if ( empty( $user->user_email ) ) { $errors->add( 'empty_email', __( '<strong>Error:</strong> Please enter an email address.' ), array( 'form-field' => 'email' ) ); } elseif ( ! is_email( $user->user_email ) ) { $errors->add( 'invalid_email', __( '<strong>Error:</strong> The email address is not correct.' ), array( 'form-field' => 'email' ) ); } else { $owner_id = email_exists( $user->user_email ); if ( $owner_id && ( ! $update || ( $owner_id != $user->ID ) ) ) { $errors->add( 'email_exists', __( '<strong>Error:</strong> This email is already registered. Please choose another one.' ), array( 'form-field' => 'email' ) ); } } do_action_ref_array( 'user_profile_update_errors', array( &$errors, $update, &$user ) ); if ( $errors->has_errors() ) { return $errors; } if ( $update ) { $user_id = wp_update_user( $user ); } else { $user_id = wp_insert_user( $user ); $notify = isset( $_POST['send_user_notification'] ) ? 'both' : 'admin'; do_action( 'edit_user_created_user', $user_id, $notify ); } return $user_id; } function get_editable_roles() { $all_roles = wp_roles()->roles; $editable_roles = apply_filters( 'editable_roles', $all_roles ); return $editable_roles; } function get_user_to_edit( $user_id ) { $user = get_userdata( $user_id ); if ( $user ) { $user->filter = 'edit'; } return $user; } function get_users_drafts( $user_id ) { global $wpdb; $query = $wpdb->prepare( "SELECT ID, post_title FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'draft' AND post_author = %d ORDER BY post_modified DESC", $user_id ); $query = apply_filters( 'get_users_drafts', $query ); return $wpdb->get_results( $query ); } function wp_delete_user( $id, $reassign = null ) { global $wpdb; if ( ! is_numeric( $id ) ) { return false; } $id = (int) $id; $user = new WP_User( $id ); if ( ! $user->exists() ) { return false; } if ( 'novalue' === $reassign ) { $reassign = null; } elseif ( null !== $reassign ) { $reassign = (int) $reassign; } do_action( 'delete_user', $id, $reassign, $user ); if ( null === $reassign ) { $post_types_to_delete = array(); foreach ( get_post_types( array(), 'objects' ) as $post_type ) { if ( $post_type->delete_with_user ) { $post_types_to_delete[] = $post_type->name; } elseif ( null === $post_type->delete_with_user && post_type_supports( $post_type->name, 'author' ) ) { $post_types_to_delete[] = $post_type->name; } } $post_types_to_delete = apply_filters( 'post_types_to_delete_with_user', $post_types_to_delete, $id ); $post_types_to_delete = implode( "', '", $post_types_to_delete ); $post_ids = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_author = %d AND post_type IN ('$post_types_to_delete')", $id ) ); if ( $post_ids ) { foreach ( $post_ids as $post_id ) { wp_delete_post( $post_id ); } } $link_ids = $wpdb->get_col( $wpdb->prepare( "SELECT link_id FROM $wpdb->links WHERE link_owner = %d", $id ) ); if ( $link_ids ) { foreach ( $link_ids as $link_id ) { wp_delete_link( $link_id ); } } } else { $post_ids = $wpdb->get_col( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_author = %d", $id ) ); $wpdb->update( $wpdb->posts, array( 'post_author' => $reassign ), array( 'post_author' => $id ) ); if ( ! empty( $post_ids ) ) { foreach ( $post_ids as $post_id ) { clean_post_cache( $post_id ); } } $link_ids = $wpdb->get_col( $wpdb->prepare( "SELECT link_id FROM $wpdb->links WHERE link_owner = %d", $id ) ); $wpdb->update( $wpdb->links, array( 'link_owner' => $reassign ), array( 'link_owner' => $id ) ); if ( ! empty( $link_ids ) ) { foreach ( $link_ids as $link_id ) { clean_bookmark_cache( $link_id ); } } } if ( is_multisite() ) { remove_user_from_blog( $id, get_current_blog_id() ); } else { $meta = $wpdb->get_col( $wpdb->prepare( "SELECT umeta_id FROM $wpdb->usermeta WHERE user_id = %d", $id ) ); foreach ( $meta as $mid ) { delete_metadata_by_mid( 'user', $mid ); } $wpdb->delete( $wpdb->users, array( 'ID' => $id ) ); } clean_user_cache( $user ); do_action( 'deleted_user', $id, $reassign, $user ); return true; } function wp_revoke_user( $id ) { $id = (int) $id; $user = new WP_User( $id ); $user->remove_all_caps(); } function default_password_nag_handler( $errors = false ) { global $user_ID; if ( ! get_user_option( 'default_password_nag' ) ) { return; } if ( 'hide' === get_user_setting( 'default_password_nag' ) || isset( $_GET['default_password_nag'] ) && '0' == $_GET['default_password_nag'] ) { delete_user_setting( 'default_password_nag' ); update_user_meta( $user_ID, 'default_password_nag', false ); } } function default_password_nag_edit_user( $user_ID, $old_data ) { if ( ! get_user_option( 'default_password_nag', $user_ID ) ) { return; } $new_data = get_userdata( $user_ID ); if ( $new_data->user_pass != $old_data->user_pass ) { delete_user_setting( 'default_password_nag' ); update_user_meta( $user_ID, 'default_password_nag', false ); } } function default_password_nag() { global $pagenow; if ( 'profile.php' === $pagenow || ! get_user_option( 'default_password_nag' ) ) { return; } echo '<div class="error default-password-nag">'; echo '<p>'; echo '<strong>' . __( 'Notice:' ) . '</strong> '; _e( 'You&rsquo;re using the auto-generated password for your account. Would you like to change it?' ); echo '</p><p>'; printf( '<a href="%s">' . __( 'Yes, take me to my profile page' ) . '</a> | ', get_edit_profile_url() . '#password' ); printf( '<a href="%s" id="default-password-nag-no">' . __( 'No thanks, do not remind me again' ) . '</a>', '?default_password_nag=0' ); echo '</p></div>'; } function delete_users_add_js() { ?>
<script>
jQuery( function($) {
	var submit = $('#submit').prop('disabled', true);
	$('input[name="delete_option"]').one('change', function() {
		submit.prop('disabled', false);
	});
	$('#reassign_user').focus( function() {
		$('#delete_option1').prop('checked', true).trigger('change');
	});
} );
</script>
	<?php
} function use_ssl_preference( $user ) { ?>
	<tr class="user-use-ssl-wrap">
		<th scope="row"><?php _e( 'Use https' ); ?></th>
		<td><label for="use_ssl"><input name="use_ssl" type="checkbox" id="use_ssl" value="1" <?php checked( '1', $user->use_ssl ); ?> /> <?php _e( 'Always use https when visiting the admin' ); ?></label></td>
	</tr>
	<?php
} function admin_created_user_email( $text ) { $roles = get_editable_roles(); $role = $roles[ $_REQUEST['role'] ]; if ( '' !== get_bloginfo( 'name' ) ) { $site_title = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ); } else { $site_title = parse_url( home_url(), PHP_URL_HOST ); } return sprintf( __( 'Hi,
You\'ve been invited to join \'%1$s\' at
%2$s with the role of %3$s.
If you do not want to join this site please ignore
this email. This invitation will expire in a few days.

Please click the following link to activate your user account:
%%s' ), $site_title, home_url(), wp_specialchars_decode( translate_user_role( $role['name'] ) ) ); } function wp_is_authorize_application_password_request_valid( $request, $user ) { $error = new WP_Error(); $is_local = 'local' === wp_get_environment_type(); if ( ! empty( $request['success_url'] ) ) { $scheme = wp_parse_url( $request['success_url'], PHP_URL_SCHEME ); if ( 'http' === $scheme && ! $is_local ) { $error->add( 'invalid_redirect_scheme', __( 'The success URL must be served over a secure connection.' ) ); } } if ( ! empty( $request['reject_url'] ) ) { $scheme = wp_parse_url( $request['reject_url'], PHP_URL_SCHEME ); if ( 'http' === $scheme && ! $is_local ) { $error->add( 'invalid_redirect_scheme', __( 'The rejection URL must be served over a secure connection.' ) ); } } if ( ! empty( $request['app_id'] ) && ! wp_is_uuid( $request['app_id'] ) ) { $error->add( 'invalid_app_id', __( 'The application ID must be a UUID.' ) ); } do_action( 'wp_authorize_application_password_request_errors', $error, $request, $user ); if ( $error->has_errors() ) { return $error; } return true; } 