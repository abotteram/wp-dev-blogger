<?php

class Devb_Capabilities_Manager implements Devb_Integration {

	static public $edit_code_snippets = 'devb_edit_code_snippets';

	public function register_hooks() {
		add_action( 'init', array( $this, 'register_capabilities' ) );
	}

	public function register_capabilities() {
		$admin_role = get_role( 'administrator' );

		$admin_role->add_cap( 'devb_edit_code_snippets' );
	}
}