import { Component } from "@wordpress/element";
import { debounce } from "lodash-es";

import CodeEditor from "../code-editor";

import "./style.css";

class CodeEditorWithPreview extends Component {

	constructor( props ) {
		super( props );

		this.onChange = debounce( this.onChange.bind( this ), 1000 );
	}

	getPreviewId() {
		return `devb-preview-${ this.props.id }`;
	}

	getEditorId() {
		return `devb-editor-${ this.props.id }`;
	}

	onChange( newCode ) {
		const compiled = this.compile( newCode );

		this.execute( compiled );

		if ( this.props.onChange ) {
			this.props.onChange( {
				code: newCode,
				compiled: compiled,
			} );
		}
	}

	compile( code ) {
		if ( ! this.props.compile ) {
			return code;
		}

		if ( ! this.props.onCatch ) {
			return this.props.compile( code );
		}

		try {
			return this.props.compile( code );
		} catch ( err ) {
			this.props.onCatch( "compile", err );
		}
	}

	execute( code ) {
		const mountNode = document.createElement( "div" );

		if ( ! this.props.onCatch ) {
			eval( code );
		}

		try {
			eval( code );
		} catch ( err ) {
			this.props.onCatch( "execute", err );
		}

		const target = document.getElementById( this.getPreviewId() );
		target.innerHTML = '';
		target.appendChild( mountNode );
	}

	componentDidMount() {
		this.onChange( this.props.code );
	}

	render() {
		const {
			code,
		} = this.props;

		return (
			<div className="devb-code-editor__container">
				<div className="devb-code-editor__editor-container">
					<CodeEditor
						ref={ this.props.editorRef }
						id={ this.getEditorId() }
						value={ code || "" }
						onChange={ this.onChange } />
				</div>
				<div id={ this.getPreviewId() } className="devb-code-editor__preview-container">
				</div>
			</div>
		);
	}
}

export default CodeEditorWithPreview;
