import EditorWithPreview from "./components/code-editor-with-preview";
import { render } from "@wordpress/element";

if ( devbCodeBlocks ) {
	initializeCodeBlocks( devbCodeBlocks );
}

function initializeCodeBlocks( devbCodeBlocks ) {
	devbCodeBlocks.forEach( block => {
		const element = document.getElementById( block.id );
		render(
			<EditorWithPreview
				compile={ code => window.devb.Babel.transform( code, { presets: ["react"] } ).code }
				id={ block.attributes.id }
				didCatch={ console.warn }
				code={ block.attributes.code }/>,
			element
		);
	} );
}
