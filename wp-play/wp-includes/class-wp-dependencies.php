<?php
 class WP_Dependencies { public $registered = array(); public $queue = array(); public $to_do = array(); public $done = array(); public $args = array(); public $groups = array(); public $group = 0; private $all_queued_deps; private $queued_before_register = array(); public function do_items( $handles = false, $group = false ) { $handles = false === $handles ? $this->queue : (array) $handles; $this->all_deps( $handles ); foreach ( $this->to_do as $key => $handle ) { if ( ! in_array( $handle, $this->done, true ) && isset( $this->registered[ $handle ] ) ) { if ( $this->do_item( $handle, $group ) ) { $this->done[] = $handle; } unset( $this->to_do[ $key ] ); } } return $this->done; } public function do_item( $handle, $group = false ) { return isset( $this->registered[ $handle ] ); } public function all_deps( $handles, $recursion = false, $group = false ) { $handles = (array) $handles; if ( ! $handles ) { return false; } foreach ( $handles as $handle ) { $handle_parts = explode( '?', $handle ); $handle = $handle_parts[0]; $queued = in_array( $handle, $this->to_do, true ); if ( in_array( $handle, $this->done, true ) ) { continue; } $moved = $this->set_group( $handle, $recursion, $group ); $new_group = $this->groups[ $handle ]; if ( $queued && ! $moved ) { continue; } $keep_going = true; if ( ! isset( $this->registered[ $handle ] ) ) { $keep_going = false; } elseif ( $this->registered[ $handle ]->deps && array_diff( $this->registered[ $handle ]->deps, array_keys( $this->registered ) ) ) { $keep_going = false; } elseif ( $this->registered[ $handle ]->deps && ! $this->all_deps( $this->registered[ $handle ]->deps, true, $new_group ) ) { $keep_going = false; } if ( ! $keep_going ) { if ( $recursion ) { return false; } else { continue; } } if ( $queued ) { continue; } if ( isset( $handle_parts[1] ) ) { $this->args[ $handle ] = $handle_parts[1]; } $this->to_do[] = $handle; } return true; } public function add( $handle, $src, $deps = array(), $ver = false, $args = null ) { if ( isset( $this->registered[ $handle ] ) ) { return false; } $this->registered[ $handle ] = new _WP_Dependency( $handle, $src, $deps, $ver, $args ); if ( array_key_exists( $handle, $this->queued_before_register ) ) { if ( ! is_null( $this->queued_before_register[ $handle ] ) ) { $this->enqueue( $handle . '?' . $this->queued_before_register[ $handle ] ); } else { $this->enqueue( $handle ); } unset( $this->queued_before_register[ $handle ] ); } return true; } public function add_data( $handle, $key, $value ) { if ( ! isset( $this->registered[ $handle ] ) ) { return false; } return $this->registered[ $handle ]->add_data( $key, $value ); } public function get_data( $handle, $key ) { if ( ! isset( $this->registered[ $handle ] ) ) { return false; } if ( ! isset( $this->registered[ $handle ]->extra[ $key ] ) ) { return false; } return $this->registered[ $handle ]->extra[ $key ]; } public function remove( $handles ) { foreach ( (array) $handles as $handle ) { unset( $this->registered[ $handle ] ); } } public function enqueue( $handles ) { foreach ( (array) $handles as $handle ) { $handle = explode( '?', $handle ); if ( ! in_array( $handle[0], $this->queue, true ) && isset( $this->registered[ $handle[0] ] ) ) { $this->queue[] = $handle[0]; $this->all_queued_deps = null; if ( isset( $handle[1] ) ) { $this->args[ $handle[0] ] = $handle[1]; } } elseif ( ! isset( $this->registered[ $handle[0] ] ) ) { $this->queued_before_register[ $handle[0] ] = null; if ( isset( $handle[1] ) ) { $this->queued_before_register[ $handle[0] ] = $handle[1]; } } } } public function dequeue( $handles ) { foreach ( (array) $handles as $handle ) { $handle = explode( '?', $handle ); $key = array_search( $handle[0], $this->queue, true ); if ( false !== $key ) { $this->all_queued_deps = null; unset( $this->queue[ $key ] ); unset( $this->args[ $handle[0] ] ); } elseif ( array_key_exists( $handle[0], $this->queued_before_register ) ) { unset( $this->queued_before_register[ $handle[0] ] ); } } } protected function recurse_deps( $queue, $handle ) { if ( isset( $this->all_queued_deps ) ) { return isset( $this->all_queued_deps[ $handle ] ); } $all_deps = array_fill_keys( $queue, true ); $queues = array(); $done = array(); while ( $queue ) { foreach ( $queue as $queued ) { if ( ! isset( $done[ $queued ] ) && isset( $this->registered[ $queued ] ) ) { $deps = $this->registered[ $queued ]->deps; if ( $deps ) { $all_deps += array_fill_keys( $deps, true ); array_push( $queues, $deps ); } $done[ $queued ] = true; } } $queue = array_pop( $queues ); } $this->all_queued_deps = $all_deps; return isset( $this->all_queued_deps[ $handle ] ); } public function query( $handle, $status = 'registered' ) { switch ( $status ) { case 'registered': case 'scripts': if ( isset( $this->registered[ $handle ] ) ) { return $this->registered[ $handle ]; } return false; case 'enqueued': case 'queue': if ( in_array( $handle, $this->queue, true ) ) { return true; } return $this->recurse_deps( $this->queue, $handle ); case 'to_do': case 'to_print': return in_array( $handle, $this->to_do, true ); case 'done': case 'printed': return in_array( $handle, $this->done, true ); } return false; } public function set_group( $handle, $recursion, $group ) { $group = (int) $group; if ( isset( $this->groups[ $handle ] ) && $this->groups[ $handle ] <= $group ) { return false; } $this->groups[ $handle ] = $group; return true; } } 