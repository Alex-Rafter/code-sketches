<?php
 $shortcode_tags = array(); function add_shortcode( $tag, $callback ) { global $shortcode_tags; if ( '' === trim( $tag ) ) { _doing_it_wrong( __FUNCTION__, __( 'Invalid shortcode name: Empty name given.' ), '4.4.0' ); return; } if ( 0 !== preg_match( '@[<>&/\[\]\x00-\x20=]@', $tag ) ) { _doing_it_wrong( __FUNCTION__, sprintf( __( 'Invalid shortcode name: %1$s. Do not use spaces or reserved characters: %2$s' ), $tag, '& / < > [ ] =' ), '4.4.0' ); return; } $shortcode_tags[ $tag ] = $callback; } function remove_shortcode( $tag ) { global $shortcode_tags; unset( $shortcode_tags[ $tag ] ); } function remove_all_shortcodes() { global $shortcode_tags; $shortcode_tags = array(); } function shortcode_exists( $tag ) { global $shortcode_tags; return array_key_exists( $tag, $shortcode_tags ); } function has_shortcode( $content, $tag ) { if ( false === strpos( $content, '[' ) ) { return false; } if ( shortcode_exists( $tag ) ) { preg_match_all( '/' . get_shortcode_regex() . '/', $content, $matches, PREG_SET_ORDER ); if ( empty( $matches ) ) { return false; } foreach ( $matches as $shortcode ) { if ( $tag === $shortcode[2] ) { return true; } elseif ( ! empty( $shortcode[5] ) && has_shortcode( $shortcode[5], $tag ) ) { return true; } } } return false; } function apply_shortcodes( $content, $ignore_html = false ) { return do_shortcode( $content, $ignore_html ); } function do_shortcode( $content, $ignore_html = false ) { global $shortcode_tags; if ( false === strpos( $content, '[' ) ) { return $content; } if ( empty( $shortcode_tags ) || ! is_array( $shortcode_tags ) ) { return $content; } preg_match_all( '@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches ); $tagnames = array_intersect( array_keys( $shortcode_tags ), $matches[1] ); if ( empty( $tagnames ) ) { return $content; } $content = do_shortcodes_in_html_tags( $content, $ignore_html, $tagnames ); $pattern = get_shortcode_regex( $tagnames ); $content = preg_replace_callback( "/$pattern/", 'do_shortcode_tag', $content ); $content = unescape_invalid_shortcodes( $content ); return $content; } function get_shortcode_regex( $tagnames = null ) { global $shortcode_tags; if ( empty( $tagnames ) ) { $tagnames = array_keys( $shortcode_tags ); } $tagregexp = implode( '|', array_map( 'preg_quote', $tagnames ) ); return '\\[' . '(\\[?)' . "($tagregexp)" . '(?![\\w-])' . '(' . '[^\\]\\/]*' . '(?:' . '\\/(?!\\])' . '[^\\]\\/]*' . ')*?' . ')' . '(?:' . '(\\/)' . '\\]' . '|' . '\\]' . '(?:' . '(' . '[^\\[]*+' . '(?:' . '\\[(?!\\/\\2\\])' . '[^\\[]*+' . ')*+' . ')' . '\\[\\/\\2\\]' . ')?' . ')' . '(\\]?)'; } function do_shortcode_tag( $m ) { global $shortcode_tags; if ( '[' === $m[1] && ']' === $m[6] ) { return substr( $m[0], 1, -1 ); } $tag = $m[2]; $attr = shortcode_parse_atts( $m[3] ); if ( ! is_callable( $shortcode_tags[ $tag ] ) ) { _doing_it_wrong( __FUNCTION__, sprintf( __( 'Attempting to parse a shortcode without a valid callback: %s' ), $tag ), '4.3.0' ); return $m[0]; } $return = apply_filters( 'pre_do_shortcode_tag', false, $tag, $attr, $m ); if ( false !== $return ) { return $return; } $content = isset( $m[5] ) ? $m[5] : null; $output = $m[1] . call_user_func( $shortcode_tags[ $tag ], $attr, $content, $tag ) . $m[6]; return apply_filters( 'do_shortcode_tag', $output, $tag, $attr, $m ); } function do_shortcodes_in_html_tags( $content, $ignore_html, $tagnames ) { $trans = array( '&#91;' => '&#091;', '&#93;' => '&#093;', ); $content = strtr( $content, $trans ); $trans = array( '[' => '&#91;', ']' => '&#93;', ); $pattern = get_shortcode_regex( $tagnames ); $textarr = wp_html_split( $content ); foreach ( $textarr as &$element ) { if ( '' === $element || '<' !== $element[0] ) { continue; } $noopen = false === strpos( $element, '[' ); $noclose = false === strpos( $element, ']' ); if ( $noopen || $noclose ) { if ( $noopen xor $noclose ) { $element = strtr( $element, $trans ); } continue; } if ( $ignore_html || '<!--' === substr( $element, 0, 4 ) || '<![CDATA[' === substr( $element, 0, 9 ) ) { $element = strtr( $element, $trans ); continue; } $attributes = wp_kses_attr_parse( $element ); if ( false === $attributes ) { if ( 1 === preg_match( '%^<\s*\[\[?[^\[\]]+\]%', $element ) ) { $element = preg_replace_callback( "/$pattern/", 'do_shortcode_tag', $element ); } $element = strtr( $element, $trans ); continue; } $front = array_shift( $attributes ); $back = array_pop( $attributes ); $matches = array(); preg_match( '%[a-zA-Z0-9]+%', $front, $matches ); $elname = $matches[0]; foreach ( $attributes as &$attr ) { $open = strpos( $attr, '[' ); $close = strpos( $attr, ']' ); if ( false === $open || false === $close ) { continue; } $double = strpos( $attr, '"' ); $single = strpos( $attr, "'" ); if ( ( false === $single || $open < $single ) && ( false === $double || $open < $double ) ) { $attr = preg_replace_callback( "/$pattern/", 'do_shortcode_tag', $attr ); } else { $count = 0; $new_attr = preg_replace_callback( "/$pattern/", 'do_shortcode_tag', $attr, -1, $count ); if ( $count > 0 ) { $new_attr = wp_kses_one_attr( $new_attr, $elname ); if ( '' !== trim( $new_attr ) ) { $attr = $new_attr; } } } } $element = $front . implode( '', $attributes ) . $back; $element = strtr( $element, $trans ); } $content = implode( '', $textarr ); return $content; } function unescape_invalid_shortcodes( $content ) { $trans = array( '&#91;' => '[', '&#93;' => ']', ); $content = strtr( $content, $trans ); return $content; } function get_shortcode_atts_regex() { return '/([\w-]+)\s*=\s*"([^"]*)"(?:\s|$)|([\w-]+)\s*=\s*\'([^\']*)\'(?:\s|$)|([\w-]+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|\'([^\']*)\'(?:\s|$)|(\S+)(?:\s|$)/'; } function shortcode_parse_atts( $text ) { $atts = array(); $pattern = get_shortcode_atts_regex(); $text = preg_replace( "/[\x{00a0}\x{200b}]+/u", ' ', $text ); if ( preg_match_all( $pattern, $text, $match, PREG_SET_ORDER ) ) { foreach ( $match as $m ) { if ( ! empty( $m[1] ) ) { $atts[ strtolower( $m[1] ) ] = stripcslashes( $m[2] ); } elseif ( ! empty( $m[3] ) ) { $atts[ strtolower( $m[3] ) ] = stripcslashes( $m[4] ); } elseif ( ! empty( $m[5] ) ) { $atts[ strtolower( $m[5] ) ] = stripcslashes( $m[6] ); } elseif ( isset( $m[7] ) && strlen( $m[7] ) ) { $atts[] = stripcslashes( $m[7] ); } elseif ( isset( $m[8] ) && strlen( $m[8] ) ) { $atts[] = stripcslashes( $m[8] ); } elseif ( isset( $m[9] ) ) { $atts[] = stripcslashes( $m[9] ); } } foreach ( $atts as &$value ) { if ( false !== strpos( $value, '<' ) ) { if ( 1 !== preg_match( '/^[^<]*+(?:<[^>]*+>[^<]*+)*+$/', $value ) ) { $value = ''; } } } } else { $atts = ltrim( $text ); } return $atts; } function shortcode_atts( $pairs, $atts, $shortcode = '' ) { $atts = (array) $atts; $out = array(); foreach ( $pairs as $name => $default ) { if ( array_key_exists( $name, $atts ) ) { $out[ $name ] = $atts[ $name ]; } else { $out[ $name ] = $default; } } if ( $shortcode ) { $out = apply_filters( "shortcode_atts_{$shortcode}", $out, $pairs, $atts, $shortcode ); } return $out; } function strip_shortcodes( $content ) { global $shortcode_tags; if ( false === strpos( $content, '[' ) ) { return $content; } if ( empty( $shortcode_tags ) || ! is_array( $shortcode_tags ) ) { return $content; } preg_match_all( '@\[([^<>&/\[\]\x00-\x20=]++)@', $content, $matches ); $tags_to_remove = array_keys( $shortcode_tags ); $tags_to_remove = apply_filters( 'strip_shortcodes_tagnames', $tags_to_remove, $content ); $tagnames = array_intersect( $tags_to_remove, $matches[1] ); if ( empty( $tagnames ) ) { return $content; } $content = do_shortcodes_in_html_tags( $content, true, $tagnames ); $pattern = get_shortcode_regex( $tagnames ); $content = preg_replace_callback( "/$pattern/", 'strip_shortcode_tag', $content ); $content = unescape_invalid_shortcodes( $content ); return $content; } function strip_shortcode_tag( $m ) { if ( '[' === $m[1] && ']' === $m[6] ) { return substr( $m[0], 1, -1 ); } return $m[1] . $m[6]; } 