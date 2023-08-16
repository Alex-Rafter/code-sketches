<?php
 class WP_Style_Engine_CSS_Declarations { protected $declarations = array(); public function __construct( $declarations = array() ) { $this->add_declarations( $declarations ); } public function add_declaration( $property, $value ) { $property = $this->sanitize_property( $property ); if ( empty( $property ) ) { return $this; } $value = trim( $value ); if ( '' === $value ) { return $this; } $this->declarations[ $property ] = $value; return $this; } public function remove_declaration( $property ) { unset( $this->declarations[ $property ] ); return $this; } public function add_declarations( $declarations ) { foreach ( $declarations as $property => $value ) { $this->add_declaration( $property, $value ); } return $this; } public function remove_declarations( $properties = array() ) { foreach ( $properties as $property ) { $this->remove_declaration( $property ); } return $this; } public function get_declarations() { return $this->declarations; } protected static function filter_declaration( $property, $value, $spacer = '' ) { $filtered_value = wp_strip_all_tags( $value, true ); if ( '' !== $filtered_value ) { return safecss_filter_attr( "{$property}:{$spacer}{$filtered_value}" ); } return ''; } public function get_declarations_string( $should_prettify = false, $indent_count = 0 ) { $declarations_array = $this->get_declarations(); $declarations_output = ''; $indent = $should_prettify ? str_repeat( "\t", $indent_count ) : ''; $suffix = $should_prettify ? ' ' : ''; $suffix = $should_prettify && $indent_count > 0 ? "\n" : $suffix; $spacer = $should_prettify ? ' ' : ''; foreach ( $declarations_array as $property => $value ) { $filtered_declaration = static::filter_declaration( $property, $value, $spacer ); if ( $filtered_declaration ) { $declarations_output .= "{$indent}{$filtered_declaration};$suffix"; } } return rtrim( $declarations_output ); } protected function sanitize_property( $property ) { return sanitize_key( $property ); } } 