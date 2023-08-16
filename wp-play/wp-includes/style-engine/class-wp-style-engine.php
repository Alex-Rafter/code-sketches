<?php
 final class WP_Style_Engine { const BLOCK_STYLE_DEFINITIONS_METADATA = array( 'color' => array( 'text' => array( 'property_keys' => array( 'default' => 'color', ), 'path' => array( 'color', 'text' ), 'css_vars' => array( 'color' => '--wp--preset--color--$slug', ), 'classnames' => array( 'has-text-color' => true, 'has-$slug-color' => 'color', ), ), 'background' => array( 'property_keys' => array( 'default' => 'background-color', ), 'path' => array( 'color', 'background' ), 'classnames' => array( 'has-background' => true, 'has-$slug-background-color' => 'color', ), ), 'gradient' => array( 'property_keys' => array( 'default' => 'background', ), 'path' => array( 'color', 'gradient' ), 'classnames' => array( 'has-background' => true, 'has-$slug-gradient-background' => 'gradient', ), ), ), 'border' => array( 'color' => array( 'property_keys' => array( 'default' => 'border-color', 'individual' => 'border-%s-color', ), 'path' => array( 'border', 'color' ), 'classnames' => array( 'has-border-color' => true, 'has-$slug-border-color' => 'color', ), ), 'radius' => array( 'property_keys' => array( 'default' => 'border-radius', 'individual' => 'border-%s-radius', ), 'path' => array( 'border', 'radius' ), ), 'style' => array( 'property_keys' => array( 'default' => 'border-style', 'individual' => 'border-%s-style', ), 'path' => array( 'border', 'style' ), ), 'width' => array( 'property_keys' => array( 'default' => 'border-width', 'individual' => 'border-%s-width', ), 'path' => array( 'border', 'width' ), ), 'top' => array( 'value_func' => array( self::class, 'get_individual_property_css_declarations' ), 'path' => array( 'border', 'top' ), 'css_vars' => array( 'color' => '--wp--preset--color--$slug', ), ), 'right' => array( 'value_func' => array( self::class, 'get_individual_property_css_declarations' ), 'path' => array( 'border', 'right' ), 'css_vars' => array( 'color' => '--wp--preset--color--$slug', ), ), 'bottom' => array( 'value_func' => array( self::class, 'get_individual_property_css_declarations' ), 'path' => array( 'border', 'bottom' ), 'css_vars' => array( 'color' => '--wp--preset--color--$slug', ), ), 'left' => array( 'value_func' => array( self::class, 'get_individual_property_css_declarations' ), 'path' => array( 'border', 'left' ), 'css_vars' => array( 'color' => '--wp--preset--color--$slug', ), ), ), 'dimensions' => array( 'minHeight' => array( 'property_keys' => array( 'default' => 'min-height', ), 'path' => array( 'dimensions', 'minHeight' ), 'css_vars' => array( 'spacing' => '--wp--preset--spacing--$slug', ), ), ), 'spacing' => array( 'padding' => array( 'property_keys' => array( 'default' => 'padding', 'individual' => 'padding-%s', ), 'path' => array( 'spacing', 'padding' ), 'css_vars' => array( 'spacing' => '--wp--preset--spacing--$slug', ), ), 'margin' => array( 'property_keys' => array( 'default' => 'margin', 'individual' => 'margin-%s', ), 'path' => array( 'spacing', 'margin' ), 'css_vars' => array( 'spacing' => '--wp--preset--spacing--$slug', ), ), ), 'typography' => array( 'fontSize' => array( 'property_keys' => array( 'default' => 'font-size', ), 'path' => array( 'typography', 'fontSize' ), 'classnames' => array( 'has-$slug-font-size' => 'font-size', ), ), 'fontFamily' => array( 'property_keys' => array( 'default' => 'font-family', ), 'path' => array( 'typography', 'fontFamily' ), 'classnames' => array( 'has-$slug-font-family' => 'font-family', ), ), 'fontStyle' => array( 'property_keys' => array( 'default' => 'font-style', ), 'path' => array( 'typography', 'fontStyle' ), ), 'fontWeight' => array( 'property_keys' => array( 'default' => 'font-weight', ), 'path' => array( 'typography', 'fontWeight' ), ), 'lineHeight' => array( 'property_keys' => array( 'default' => 'line-height', ), 'path' => array( 'typography', 'lineHeight' ), ), 'textDecoration' => array( 'property_keys' => array( 'default' => 'text-decoration', ), 'path' => array( 'typography', 'textDecoration' ), ), 'textTransform' => array( 'property_keys' => array( 'default' => 'text-transform', ), 'path' => array( 'typography', 'textTransform' ), ), 'letterSpacing' => array( 'property_keys' => array( 'default' => 'letter-spacing', ), 'path' => array( 'typography', 'letterSpacing' ), ), ), ); protected static function get_slug_from_preset_value( $style_value, $property_key ) { if ( is_string( $style_value ) && is_string( $property_key ) && str_contains( $style_value, "var:preset|{$property_key}|" ) ) { $index_to_splice = strrpos( $style_value, '|' ) + 1; return _wp_to_kebab_case( substr( $style_value, $index_to_splice ) ); } return ''; } protected static function get_css_var_value( $style_value, $css_vars ) { foreach ( $css_vars as $property_key => $css_var_pattern ) { $slug = static::get_slug_from_preset_value( $style_value, $property_key ); if ( static::is_valid_style_value( $slug ) ) { $var = strtr( $css_var_pattern, array( '$slug' => $slug ) ); return "var($var)"; } } return ''; } protected static function is_valid_style_value( $style_value ) { return '0' === $style_value || ! empty( $style_value ); } public static function store_css_rule( $store_name, $css_selector, $css_declarations ) { if ( empty( $store_name ) || empty( $css_selector ) || empty( $css_declarations ) ) { return; } static::get_store( $store_name )->add_rule( $css_selector )->add_declarations( $css_declarations ); } public static function get_store( $store_name ) { return WP_Style_Engine_CSS_Rules_Store::get_store( $store_name ); } public static function parse_block_styles( $block_styles, $options ) { $parsed_styles = array( 'classnames' => array(), 'declarations' => array(), ); if ( empty( $block_styles ) || ! is_array( $block_styles ) ) { return $parsed_styles; } foreach ( static::BLOCK_STYLE_DEFINITIONS_METADATA as $definition_group_key => $definition_group_style ) { if ( empty( $block_styles[ $definition_group_key ] ) ) { continue; } foreach ( $definition_group_style as $style_definition ) { $style_value = _wp_array_get( $block_styles, $style_definition['path'], null ); if ( ! static::is_valid_style_value( $style_value ) ) { continue; } $parsed_styles['classnames'] = array_merge( $parsed_styles['classnames'], static::get_classnames( $style_value, $style_definition ) ); $parsed_styles['declarations'] = array_merge( $parsed_styles['declarations'], static::get_css_declarations( $style_value, $style_definition, $options ) ); } } return $parsed_styles; } protected static function get_classnames( $style_value, $style_definition ) { if ( empty( $style_value ) ) { return array(); } $classnames = array(); if ( ! empty( $style_definition['classnames'] ) ) { foreach ( $style_definition['classnames'] as $classname => $property_key ) { if ( true === $property_key ) { $classnames[] = $classname; } $slug = static::get_slug_from_preset_value( $style_value, $property_key ); if ( $slug ) { $classnames[] = strtr( $classname, array( '$slug' => $slug ) ); } } } return $classnames; } protected static function get_css_declarations( $style_value, $style_definition, $options = array() ) { if ( isset( $style_definition['value_func'] ) && is_callable( $style_definition['value_func'] ) ) { return call_user_func( $style_definition['value_func'], $style_value, $style_definition, $options ); } $css_declarations = array(); $style_property_keys = $style_definition['property_keys']; $should_skip_css_vars = isset( $options['convert_vars_to_classnames'] ) && true === $options['convert_vars_to_classnames']; if ( is_string( $style_value ) && str_contains( $style_value, 'var:' ) ) { if ( ! $should_skip_css_vars && ! empty( $style_definition['css_vars'] ) ) { $css_var = static::get_css_var_value( $style_value, $style_definition['css_vars'] ); if ( static::is_valid_style_value( $css_var ) ) { $css_declarations[ $style_property_keys['default'] ] = $css_var; } } return $css_declarations; } if ( is_array( $style_value ) ) { if ( ! isset( $style_property_keys['individual'] ) ) { return $css_declarations; } foreach ( $style_value as $key => $value ) { if ( is_string( $value ) && str_contains( $value, 'var:' ) && ! $should_skip_css_vars && ! empty( $style_definition['css_vars'] ) ) { $value = static::get_css_var_value( $value, $style_definition['css_vars'] ); } $individual_property = sprintf( $style_property_keys['individual'], _wp_to_kebab_case( $key ) ); if ( $individual_property && static::is_valid_style_value( $value ) ) { $css_declarations[ $individual_property ] = $value; } } return $css_declarations; } $css_declarations[ $style_property_keys['default'] ] = $style_value; return $css_declarations; } protected static function get_individual_property_css_declarations( $style_value, $individual_property_definition, $options = array() ) { if ( ! is_array( $style_value ) || empty( $style_value ) || empty( $individual_property_definition['path'] ) ) { return array(); } $definition_group_key = $individual_property_definition['path'][0]; $individual_property_key = $individual_property_definition['path'][1]; $should_skip_css_vars = isset( $options['convert_vars_to_classnames'] ) && true === $options['convert_vars_to_classnames']; $css_declarations = array(); foreach ( $style_value as $css_property => $value ) { if ( empty( $value ) ) { continue; } $style_definition_path = array( $definition_group_key, $css_property ); $style_definition = _wp_array_get( static::BLOCK_STYLE_DEFINITIONS_METADATA, $style_definition_path, null ); if ( $style_definition && isset( $style_definition['property_keys']['individual'] ) ) { if ( is_string( $value ) && str_contains( $value, 'var:' ) && ! $should_skip_css_vars && ! empty( $individual_property_definition['css_vars'] ) ) { $value = static::get_css_var_value( $value, $individual_property_definition['css_vars'] ); } $individual_css_property = sprintf( $style_definition['property_keys']['individual'], $individual_property_key ); $css_declarations[ $individual_css_property ] = $value; } } return $css_declarations; } public static function compile_css( $css_declarations, $css_selector ) { if ( empty( $css_declarations ) || ! is_array( $css_declarations ) ) { return ''; } if ( $css_selector ) { $css_rule = new WP_Style_Engine_CSS_Rule( $css_selector, $css_declarations ); return $css_rule->get_css(); } $css_declarations = new WP_Style_Engine_CSS_Declarations( $css_declarations ); return $css_declarations->get_declarations_string(); } public static function compile_stylesheet_from_css_rules( $css_rules, $options = array() ) { $processor = new WP_Style_Engine_Processor(); $processor->add_rules( $css_rules ); return $processor->get_css( $options ); } } 