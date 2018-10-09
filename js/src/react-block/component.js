import { Component } from "@wordpress/element";

class CodeBlock extends Component {

	static Content = ( { attributes } ) => {
		return <div>Content</div>;
	};

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		return <div>Editor</div>;
	}
}

export default CodeBlock;
