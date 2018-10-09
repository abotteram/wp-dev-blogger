const path = require( "path" );

module.exports = {
	entry: {
		"edit-page": "./js/src/edit-page.js",
		"vm": "./js/src/vm.js",
	},
	output: {
		path: path.resolve( __dirname, "js", "dist" ),
		filename: "[name].js",
		jsonpFunction: "devbWebpackJsonp",
	},
	externals: {
		"@wordpress/element": "window.wp.element",
		"@wordpress/blocks": "window.wp.blocks",
		"@wordpress/components": "window.wp.components",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			}
		]
	},
};
