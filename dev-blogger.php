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

require_once "vendor/autoload.php";
require_once "redbean/rb-mysql.php";

new Devb_Api();

$manager = new Devb_Integrations_Manager();

$manager->register_integration( new Devb_Api() );
$manager->register_integration( new Devb_Capabilities_Manager() );

$manager->run();

function devb_enqueue_block_editor_assets() {
	wp_register_script( 'devb_babel', plugins_url( '/node_modules/@babel/standalone/babel.min.js', __FILE__ ) );
	wp_register_script( 'devb_babel_preset_env', plugins_url( '/node_modules/@babel/preset-env-standalone/babel-preset-env.min.js', __FILE__ ), array( 'devb_babel' ) );
	wp_add_inline_script( 'devb_babel_preset_env', 'if ( ! window.devb ) window.devb = {}; window.devb.Babel = window.Babel; window.Babel = undefined;', 'after' );
	wp_register_script( 'devb_edit_page', plugins_url( '/js/dist/edit-page.js', __FILE__ ), array( 'devb_babel_preset_env' ), null, true );

	wp_enqueue_script( 'devb_edit_page' );
}

add_action( 'enqueue_block_editor_assets', 'devb_enqueue_block_editor_assets' );
