import { Modal, Button, TextControl } from "@wordpress/components";
import { Component, Fragment } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

class SaveModal extends Component {
	constructor( props ){
		super( props );

		this.state = {
			isOpen: false,
			snippetName: "",
		};

		this.close = this.close.bind( this );
		this.open = this.open.bind( this );
		this.onSave = this.onSave.bind( this );
	}

	close() {
		this.setState( { isOpen: false } );
	}

	open() {
		this.setState( { isOpen: true } );
	}

	async onSave() {
		const snippet = this.props.getSnippet();
		const payload = {
			code: snippet.code,
			name: this.state.snippetName,
		};
		console.log( payload );
		await apiFetch( {
			path: "dev-blogger/v1/code-snippet",
			method: "POST",
			data: payload
		} );
		this.setState( {
			isOpen: false,
		} );
	}

	render() {
		return (
			<Fragment>
				<Button isLarge onClick={ this.open }>
					Save your snippet
				</Button>
				{ this.state.isOpen &&
					<Modal
						title="Save your snippet"
						onRequestClose={ this.close }>
						<TextControl
							label="Choose a name for your snippet"
							value={ this.state.snippetName }
							onChange={ value => this.setState( { snippetName: value } ) }
							/>
						<Button isLarge onClick={ this.onSave }>
							Save
						</Button>
					</Modal>
				}
			</Fragment>
		);
	}
}

export default SaveModal;
