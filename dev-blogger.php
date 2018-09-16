<?php

/*
Plugin Name: Dev Blogger
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: A brief description of the Plugin.
Version: 1.0
Author: Alexander Botteram
Author URI: http://URI_Of_The_Plugin_Author
License: A "Slug" license name e.g. GPL2
*/

function devb_enqueue_block_editor_assets() {
	wp_register_script( 'devb_gutenberg_blocks', plugins_url( '/js-plugin/dist/gutenberg-blocks.js', __FILE__ ), null, true );
	wp_enqueue_script( 'devb_gutenberg_blocks' );
}

add_action( 'enqueue_block_editor_assets', 'devb_enqueue_block_editor_assets' );
