<?php
 abstract class WP_REST_Controller { protected $namespace; protected $rest_base; protected $schema; public function register_routes() { _doing_it_wrong( 'WP_REST_Controller::register_routes', sprintf( __( "Method '%s' must be overridden." ), __METHOD__ ), '4.7.0' ); } public function get_items_permissions_check( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function get_items( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function get_item_permissions_check( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function get_item( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function create_item_permissions_check( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function create_item( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function update_item_permissions_check( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function update_item( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function delete_item_permissions_check( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function delete_item( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } protected function prepare_item_for_database( $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function prepare_item_for_response( $item, $request ) { return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) ); } public function prepare_response_for_collection( $response ) { if ( ! ( $response instanceof WP_REST_Response ) ) { return $response; } $data = (array) $response->get_data(); $server = rest_get_server(); $links = $server::get_compact_response_links( $response ); if ( ! empty( $links ) ) { $data['_links'] = $links; } return $data; } public function filter_response_by_context( $response_data, $context ) { $schema = $this->get_item_schema(); return rest_filter_response_by_context( $response_data, $schema, $context ); } public function get_item_schema() { return $this->add_additional_fields_schema( array() ); } public function get_public_item_schema() { $schema = $this->get_item_schema(); if ( ! empty( $schema['properties'] ) ) { foreach ( $schema['properties'] as &$property ) { unset( $property['arg_options'] ); } } return $schema; } public function get_collection_params() { return array( 'context' => $this->get_context_param(), 'page' => array( 'description' => __( 'Current page of the collection.' ), 'type' => 'integer', 'default' => 1, 'sanitize_callback' => 'absint', 'validate_callback' => 'rest_validate_request_arg', 'minimum' => 1, ), 'per_page' => array( 'description' => __( 'Maximum number of items to be returned in result set.' ), 'type' => 'integer', 'default' => 10, 'minimum' => 1, 'maximum' => 100, 'sanitize_callback' => 'absint', 'validate_callback' => 'rest_validate_request_arg', ), 'search' => array( 'description' => __( 'Limit results to those matching a string.' ), 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field', 'validate_callback' => 'rest_validate_request_arg', ), ); } public function get_context_param( $args = array() ) { $param_details = array( 'description' => __( 'Scope under which the request is made; determines fields present in response.' ), 'type' => 'string', 'sanitize_callback' => 'sanitize_key', 'validate_callback' => 'rest_validate_request_arg', ); $schema = $this->get_item_schema(); if ( empty( $schema['properties'] ) ) { return array_merge( $param_details, $args ); } $contexts = array(); foreach ( $schema['properties'] as $attributes ) { if ( ! empty( $attributes['context'] ) ) { $contexts = array_merge( $contexts, $attributes['context'] ); } } if ( ! empty( $contexts ) ) { $param_details['enum'] = array_unique( $contexts ); rsort( $param_details['enum'] ); } return array_merge( $param_details, $args ); } protected function add_additional_fields_to_object( $response_data, $request ) { $additional_fields = $this->get_additional_fields(); $requested_fields = $this->get_fields_for_response( $request ); foreach ( $additional_fields as $field_name => $field_options ) { if ( ! $field_options['get_callback'] ) { continue; } if ( ! rest_is_field_included( $field_name, $requested_fields ) ) { continue; } $response_data[ $field_name ] = call_user_func( $field_options['get_callback'], $response_data, $field_name, $request, $this->get_object_type() ); } return $response_data; } protected function update_additional_fields_for_object( $data_object, $request ) { $additional_fields = $this->get_additional_fields(); foreach ( $additional_fields as $field_name => $field_options ) { if ( ! $field_options['update_callback'] ) { continue; } if ( ! isset( $request[ $field_name ] ) ) { continue; } $result = call_user_func( $field_options['update_callback'], $request[ $field_name ], $data_object, $field_name, $request, $this->get_object_type() ); if ( is_wp_error( $result ) ) { return $result; } } return true; } protected function add_additional_fields_schema( $schema ) { if ( empty( $schema['title'] ) ) { return $schema; } $object_type = $schema['title']; $additional_fields = $this->get_additional_fields( $object_type ); foreach ( $additional_fields as $field_name => $field_options ) { if ( ! $field_options['schema'] ) { continue; } $schema['properties'][ $field_name ] = $field_options['schema']; } return $schema; } protected function get_additional_fields( $object_type = null ) { global $wp_rest_additional_fields; if ( ! $object_type ) { $object_type = $this->get_object_type(); } if ( ! $object_type ) { return array(); } if ( ! $wp_rest_additional_fields || ! isset( $wp_rest_additional_fields[ $object_type ] ) ) { return array(); } return $wp_rest_additional_fields[ $object_type ]; } protected function get_object_type() { $schema = $this->get_item_schema(); if ( ! $schema || ! isset( $schema['title'] ) ) { return null; } return $schema['title']; } public function get_fields_for_response( $request ) { $schema = $this->get_item_schema(); $properties = isset( $schema['properties'] ) ? $schema['properties'] : array(); $additional_fields = $this->get_additional_fields(); foreach ( $additional_fields as $field_name => $field_options ) { if ( is_null( $field_options['schema'] ) ) { $properties[ $field_name ] = $field_options; } } $context = $request['context']; if ( $context ) { foreach ( $properties as $name => $options ) { if ( ! empty( $options['context'] ) && ! in_array( $context, $options['context'], true ) ) { unset( $properties[ $name ] ); } } } $fields = array_keys( $properties ); $fields[] = '_links'; if ( $request->has_param( '_embed' ) ) { $fields[] = '_embedded'; } $fields = array_unique( $fields ); if ( ! isset( $request['_fields'] ) ) { return $fields; } $requested_fields = wp_parse_list( $request['_fields'] ); if ( 0 === count( $requested_fields ) ) { return $fields; } $requested_fields = array_map( 'trim', $requested_fields ); if ( in_array( 'id', $fields, true ) ) { $requested_fields[] = 'id'; } return array_reduce( $requested_fields, static function( $response_fields, $field ) use ( $fields ) { if ( in_array( $field, $fields, true ) ) { $response_fields[] = $field; return $response_fields; } $nested_fields = explode( '.', $field ); if ( in_array( $nested_fields[0], $fields, true ) ) { $response_fields[] = $field; } return $response_fields; }, array() ); } public function get_endpoint_args_for_item_schema( $method = WP_REST_Server::CREATABLE ) { return rest_get_endpoint_args_for_schema( $this->get_item_schema(), $method ); } public function sanitize_slug( $slug ) { return sanitize_title( $slug ); } } 