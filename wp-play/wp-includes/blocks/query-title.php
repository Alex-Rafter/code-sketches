<?php
 function render_block_core_query_title( $attributes ) { $type = isset( $attributes['type'] ) ? $attributes['type'] : null; $is_archive = is_archive(); $is_search = is_search(); if ( ! $type || ( 'archive' === $type && ! $is_archive ) || ( 'search' === $type && ! $is_search ) ) { return ''; } $title = ''; if ( $is_archive ) { $show_prefix = isset( $attributes['showPrefix'] ) ? $attributes['showPrefix'] : true; if ( ! $show_prefix ) { $filter_title = function( $title, $original_title ) { return $original_title; }; add_filter( 'get_the_archive_title', $filter_title, 10, 2 ); $title = get_the_archive_title(); remove_filter( 'get_the_archive_title', $filter_title, 10, 2 ); } else { $title = get_the_archive_title(); } } if ( $is_search ) { $title = __( 'Search results' ); if ( isset( $attributes['showSearchTerm'] ) && $attributes['showSearchTerm'] ) { $title = sprintf( __( 'Search results for: "%s"' ), get_search_query() ); } } $tag_name = isset( $attributes['level'] ) ? 'h' . (int) $attributes['level'] : 'h1'; $align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}"; $wrapper_attributes = get_block_wrapper_attributes( array( 'class' => $align_class_name ) ); return sprintf( '<%1$s %2$s>%3$s</%1$s>', $tag_name, $wrapper_attributes, $title ); } function register_block_core_query_title() { register_block_type_from_metadata( __DIR__ . '/query-title', array( 'render_callback' => 'render_block_core_query_title', ) ); } add_action( 'init', 'register_block_core_query_title' ); 