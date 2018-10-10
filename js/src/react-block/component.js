import { Component } from "@wordpress/element";
import { debounce } from "lodash-es";

import EditorWithPreview from "../components/code-editor-with-preview";


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
		return <div>{ attributes.content }</div>;
	};

	onChange( { code, compiled } ) {
		this.props.setAttributes( { code, executable: compiled } );
	}

	compile( code ) {
		return window.devb.Babel.transform( code, { presets: ["react"] } ).code;
	}

	render() {
		const {
			attributes: {
				id,
				code,
			},
		} = this.props;

		return (
			<EditorWithPreview
				id={ id }
				code={ code }
				onCatch={ ( type, error ) => console.warn( type, error ) }
				compile={ this.compile }
				onChange={ this.onChange } />
		);
	}

	componentDidMount() {
		if ( ! this.props.attributes.id ) {
			this.props.setAttributes( { id: uuidv4() } );
		}
	}
}

export default CodeBlock;
