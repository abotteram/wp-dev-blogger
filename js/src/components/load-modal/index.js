import { Modal, Button } from "@wordpress/components";
import { Component, Fragment } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

class LoadModal extends Component {
	constructor( props ){
		super( props );

		this.state = {
			isOpen: false,
			snippets: [],
		};

		this.close = this.close.bind( this );
		this.open = this.open.bind( this );
		this.select = this.select.bind( this );
	}

	close() {
		this.setState( { isOpen: false } );
	}

	open() {
		this.setState( { isOpen: true } );
		apiFetch( {
			path: "dev-blogger/v1/code-snippet",
		} ).then( data => {
			this.setState( {
				snippets: Object.values( data )
			} );
		} );
	}

	select( snippet ) {
		this.props.onSelect( snippet.code );
		this.setState( { isOpen: false } );
	}

	render() {
		return (
			<Fragment>
				<Button isLarge onClick={ this.open }>
					Load a snippet
				</Button>
				{ this.state.isOpen &&
				<Modal
					title="Load your snippet"
					onRequestClose={ this.close }>
					<ol>
						{ this.state.snippets.map( snippet => {
							return (
								<Button
									onClick={ () => this.select( snippet ) }
									isLarge
									key={ snippet.id }>
									{ snippet.name }
								</Button>
							);
						} ) }
					</ol>
				</Modal>
				}
			</Fragment>
		);
	}
}

export default LoadModal;
