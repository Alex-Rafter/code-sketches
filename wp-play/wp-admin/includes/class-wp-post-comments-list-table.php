<?php
 class WP_Post_Comments_List_Table extends WP_Comments_List_Table { protected function get_column_info() { return array( array( 'author' => __( 'Author' ), 'comment' => _x( 'Comment', 'column name' ), ), array(), array(), 'comment', ); } protected function get_table_classes() { $classes = parent::get_table_classes(); $classes[] = 'wp-list-table'; $classes[] = 'comments-box'; return $classes; } public function display( $output_empty = false ) { $singular = $this->_args['singular']; wp_nonce_field( 'fetch-list-' . get_class( $this ), '_ajax_fetch_list_nonce' ); ?>
<table class="<?php echo implode( ' ', $this->get_table_classes() ); ?>" style="display:none;">
	<tbody id="the-comment-list"
		<?php
 if ( $singular ) { echo " data-wp-lists='list:$singular'"; } ?>
		>
		<?php
 if ( ! $output_empty ) { $this->display_rows_or_placeholder(); } ?>
	</tbody>
</table>
		<?php
 } public function get_per_page( $comment_status = false ) { return 10; } } 