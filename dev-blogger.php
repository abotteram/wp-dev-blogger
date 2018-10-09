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

define( 'DEVB_PLUGIN_FILE', __FILE__ );

$manager->register_integration( new Devb_Api() );
$manager->register_integration( new Devb_Capabilities_Manager() );
$manager->register_integration( new Devb_Gutenberg_Block_Code() );

$manager->run();

