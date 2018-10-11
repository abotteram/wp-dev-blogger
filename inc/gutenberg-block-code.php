<?php

class Devb_Gutenberg_Block_Code implements Devb_Integration {

	private $data = array();

	public function register_hooks() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_scripts' ) );
		add_action( 'init', array( $this, 'register_scripts' ) );
		add_action( 'init', array( $this, 'init' ) );
	}

	public function register_scripts() {
		wp_register_script( 'devb_babel', plugins_url( 'node_modules/@babel/standalone/babel.min.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_babel_preset_env', plugins_url( 'node_modules/@babel/preset-env-standalone/babel-preset-env.min.js', DEVB_PLUGIN_FILE ), array( 'devb_babel' ) );
		wp_register_script( 'devb_store', plugins_url( 'js/dist/store.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_ace', plugins_url( 'js/vendor/ace/ace.js', DEVB_PLUGIN_FILE ) );
		wp_register_script( 'devb_edit_page', plugins_url( 'js/dist/edit-page.js', DEVB_PLUGIN_FILE ), array( 'devb_babel_preset_env', 'devb_store', 'devb_ace' ), null, true );
		wp_register_script( 'devb_frontend', plugins_url( 'js/dist/frontend.js', DEVB_PLUGIN_FILE ), array( 'devb_babel_preset_env', 'devb_ace', 'react', 'react-dom', 'wp-element' ), null, true );

		wp_add_inline_script( 'devb_babel_preset_env', 'if ( ! window.devb ) window.devb = {}; window.devb.Babel = window.Babel; delete window.Babel;', 'after' );
	}

	public function enqueue_editor_scripts() {
		wp_enqueue_script( 'devb_edit_page' );
	}

	public function enqueue_frontend_scripts() {
		wp_enqueue_script( 'devb_frontend' );
		wp_localize_script( 'devb_frontend', 'devbCodeBlocks', $this->data );
	}

	public function init() {
		if ( is_admin() ) {
			return;
		}

		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		register_block_type( 'dev-blogger/code-block', array(
			'render_callback' => array( $this, 'render' ),
		) );
	}

	public function render( $attributes ) {
		$block_data = array(
			'id'         => 'dev-blogger-code-block-' . $attributes[ 'id' ],
			'attributes' => $attributes
		);

		$this->data[] = $block_data;

		$this->enqueue_frontend_scripts();

		$content = '<div id="' . $block_data[ 'id' ] . '"></div>';
		return $content;
	}

}