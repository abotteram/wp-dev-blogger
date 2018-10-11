import { Component } from "@wordpress/element";

class CodeEditor extends Component {
	onChange( event ) {
		this.props.onChange( event.target.value );
	}

	render() {
		return (
			<div style={ { width: "100%", height: "100%" } } id={ this.props.id }>
			</div>
		)
	}

	forceUpdate( code ) {
		this.editor.setValue( code );
	}

	componentDidMount() {
		this.editor = ace.edit( this.props.id );

		this.editor.setTheme( "ace/theme/twilight" );
		this.editor.session.setMode( "ace/mode/jsx" );

		this.editor.on( "change", () => {
			this.props.onChange( this.editor.getValue() );
		} );

		setTimeout( () => {
			this.editor.setValue( this.props.value );
		}, 100 )
	}
}

export default CodeEditor;
