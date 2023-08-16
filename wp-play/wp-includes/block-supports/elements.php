<?php
 function wp_get_elements_class_name( $block ) { return 'wp-elements-' . md5( serialize( $block ) ); } function wp_render_elements_support( $block_content, $block ) { if ( ! $block_content ) { return $block_content; } $block_type = WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] ); $skip_link_color_serialization = wp_should_skip_block_supports_serialization( $block_type, 'color', 'link' ); if ( $skip_link_color_serialization ) { return $block_content; } $link_color = null; if ( ! empty( $block['attrs'] ) ) { $link_color = _wp_array_get( $block['attrs'], array( 'style', 'elements', 'link', 'color', 'text' ), null ); } if ( null === $link_color ) { return $block_content; } $tags = new WP_HTML_Tag_Processor( $block_content ); if ( $tags->next_tag() ) { $tags->add_class( wp_get_elements_class_name( $block ) ); } return $tags->get_updated_html(); } function wp_render_elements_support_styles( $pre_render, $block ) { $block_type = WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] ); $element_block_styles = isset( $block['attrs']['style']['elements'] ) ? $block['attrs']['style']['elements'] : null; $skip_link_color_serialization = wp_should_skip_block_supports_serialization( $block_type, 'color', 'link' ); if ( $skip_link_color_serialization ) { return null; } $class_name = wp_get_elements_class_name( $block ); $link_block_styles = isset( $element_block_styles['link'] ) ? $element_block_styles['link'] : null; wp_style_engine_get_styles( $link_block_styles, array( 'selector' => ".$class_name a", 'context' => 'block-supports', ) ); return null; } add_filter( 'render_block', 'wp_render_elements_support', 10, 2 ); add_filter( 'pre_render_block', 'wp_render_elements_support_styles', 10, 2 ); 