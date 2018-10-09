<?php

class Devb_Api implements Devb_Integration{
	private $code_snippet = 'devbcodesnippet';

	public function register_hooks() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		$this->connect_to_database();

		register_rest_route( 'dev-blogger/v1', 'code-snippet', array(
			'methods' => array( 'GET', 'POST' ),
			'callback' => array( $this, 'handle_request' ),
			'permission_callback' => array( $this, 'handle_permissions' ),
		) );
	}

	public function handle_permissions() {
		return current_user_can( Devb_Capabilities_Manager::$edit_code_snippets );
	}

	private function connect_to_database() {
		R::setup(
			'mysql:host=localhost;dbname=' . constant( 'DB_NAME' ),
			constant( 'DB_USER' ),
			constant( 'DB_PASSWORD' )
		);
	}

	public function handle_request( WP_REST_Request $req ) {
		switch( $req->get_method() ) {
			case 'GET':
				wp_send_json( R::findAll( $this->code_snippet ) );
				break;
			case 'POST':
				$code_snippet = R::dispense( $this->code_snippet );

				$request_data = $req->get_json_params();

				$code_snippet->title = $request_data[ 'title' ];
				$code_snippet->content = $request_data[ 'content' ];
				$code_snippet->executable = $request_data[ 'executable '];
				$code_snippet->author = get_current_user_id();

				R::store( $code_snippet );

				R::freeze( true );

				wp_send_json( $code_snippet->getProperties() );
		}
	}
}
