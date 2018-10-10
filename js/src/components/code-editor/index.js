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

	componentDidMount() {
		const editor = ace.edit( this.props.id );

		editor.setTheme( "ace/theme/twilight" );
		editor.session.setMode( "ace/mode/jsx" );

		editor.on( "change", () => {
			this.props.onChange( editor.getValue() );
		} );

		setTimeout( () => {
			editor.setValue( this.props.value );
		}, 100 )
	}
}

export default CodeEditor;
