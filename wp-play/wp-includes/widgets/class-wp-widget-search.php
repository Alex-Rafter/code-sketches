<?php
 class WP_Widget_Search extends WP_Widget { public function __construct() { $widget_ops = array( 'classname' => 'widget_search', 'description' => __( 'A search form for your site.' ), 'customize_selective_refresh' => true, 'show_instance_in_rest' => true, ); parent::__construct( 'search', _x( 'Search', 'Search widget' ), $widget_ops ); } public function widget( $args, $instance ) { $title = ! empty( $instance['title'] ) ? $instance['title'] : ''; $title = apply_filters( 'widget_title', $title, $instance, $this->id_base ); echo $args['before_widget']; if ( $title ) { echo $args['before_title'] . $title . $args['after_title']; } get_search_form(); echo $args['after_widget']; } public function form( $instance ) { $instance = wp_parse_args( (array) $instance, array( 'title' => '' ) ); $title = $instance['title']; ?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<?php
 } public function update( $new_instance, $old_instance ) { $instance = $old_instance; $new_instance = wp_parse_args( (array) $new_instance, array( 'title' => '' ) ); $instance['title'] = sanitize_text_field( $new_instance['title'] ); return $instance; } } 