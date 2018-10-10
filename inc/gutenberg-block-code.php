<?php

class Devb_Gutenberg_Block_Code implements Devb_Integration {

	public function register_hooks() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		wp_register_script( 'devb_babel', plugins_url( 'node_modules/@babel/standalone/babel.min.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_babel_preset_env', plugins_url( 'node_modules/@babel/preset-env-standalone/babel-preset-env.min.js', DEVB_PLUGIN_FILE ), array( 'devb_babel' ) );
		wp_register_script( 'devb_vm', plugins_url( 'js/dist/vm.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_store', plugins_url( 'js/dist/store.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_ace', plugins_url( 'js/vendor/ace/ace.js', DEVB_PLUGIN_FILE ) );

		wp_add_inline_script( 'devb_babel_preset_env', 'if ( ! window.devb ) window.devb = {}; window.devb.Babel = window.Babel; delete window.Babel;', 'after' );
		wp_register_script( 'devb_edit_page', plugins_url( 'js/dist/edit-page.js', DEVB_PLUGIN_FILE ), array( 'devb_babel_preset_env', 'devb_vm', 'devb_store', 'devb_ace' ), null, true );

		wp_enqueue_script( 'devb_edit_page' );
	}

}