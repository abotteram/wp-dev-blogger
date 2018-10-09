<?php

interface Devb_Integration {
	public function register_hooks();
}

class Devb_Integrations_Manager {
	private $integrations = array();

	public function register_integration( Devb_Integration $integration ) {
		$this->integrations[] = $integration;
	}

	public function run() {
		foreach ( $this->integrations as $integration ) {
			$integration->register_hooks();
		}
	}
}
