import * as Element from "@wordpress/element";
import {
	HighlightedCode,
	resolveReact
} from "@dev-blogger/shared";

resolveReact( Element );

const virtualEl = document.createElement( "div" );

window.devBlogger = window.devBlogger || {};
window.devBlogger.element = virtualEl;

Element.render(
	<HighlightedCode>JSX TEST</HighlightedCode>,
	virtualEl
);

