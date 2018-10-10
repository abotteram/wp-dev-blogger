import { registerBlockType } from "@wordpress/blocks";
import { Component } from "@wordpress/element";

import CodeBlockComponent from "./component";

const attributes = {
	code: {
		type: "string",
	},
	executable: {
		type: "string",
	},
	mode: {
		type: "string",
	}
};

registerBlockType( "dev-blogger/code-block", {
	title: "Code block",
	icon: "editor-code",
	category: "layout",
	attributes,
	edit: ( props ) => <CodeBlockComponent { ...props } />,
	save: ( props ) => <CodeBlockComponent.Content { ...props } />
} );
