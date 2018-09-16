import {
	render
} from "@wordpress/element";

const virtualEl = document.createElement( "div" );

window.devBlogger = {};
window.devBlogger.element = virtualEl;

render(
	<h1>JSX TEST</h1>,
	virtualEl
);

