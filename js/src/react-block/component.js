import { Component, Fragment } from "@wordpress/element";
import { debounce } from "lodash-es";
import { InspectorControls } from "@wordpress/editor";
import { Button } from "@wordpress/components";

import EditorWithPreview from "../components/code-editor-with-preview";
import SaveModal from "../components/save-modal";
import LoadModal from "../components/load-modal";

const BABEL_CONFIG = { presets: ["react"] };

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	} );
}

class CodeBlock extends Component {
	constructor( props ) {
		super( props );

		this.onChange = debounce( this.onChange.bind( this ), 1000 );
		this.compile = this.compile.bind( this );
	}

	static Content = ( { attributes } ) => {
		return <div>{ attributes.code }</div>;
	};

	onChange( { code, compiled } ) {
		this.props.setAttributes( { code, executable: compiled } );
	}

	compile( code ) {
		return window.devb.Babel.transform( code, BABEL_CONFIG ).code;
	}

	getId() {
		if ( this.props.attributes.id ) {
			return this.props.attributes.id;
		}
		const id = uuidv4();
		this.props.setAttributes( { id } );
		return id;
	}

	render() {
		const {
			attributes: {
				code,
			},
		} = this.props;

		return (
			<Fragment>
				<EditorWithPreview
					id={ this.getId() }
					code={ code }
					onCatch={ ( type, error ) => console.warn( type, error ) }
					compile={ this.compile }
					onChange={ this.onChange } />
				<InspectorControls>
					<SaveModal getSnippet={ () => {
						return {
							code: this.props.attributes.code
						}
					} } />
					<LoadModal />
				</InspectorControls>
			</Fragment>
		);
	}
}

export default CodeBlock;
