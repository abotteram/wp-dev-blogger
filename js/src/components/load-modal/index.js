import { Modal, Button } from "@wordpress/components";
import { Component, Fragment } from "@wordpress/element";

class LoadModal extends Component {
	constructor( props ){
		super( props );

		this.state = {
			isOpen: false,
		}

		this.close = this.close.bind( this );
		this.open = this.open.bind( this );
	}

	close() {
		this.setState( { isOpen: false } );
	}

	open() {
		this.setState( { isOpen: true } );
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
					Test
				</Modal>
				}
			</Fragment>
		);
	}
}

export default LoadModal;
