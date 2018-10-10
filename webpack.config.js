const path = require( "path" );

module.exports = {
	entry: {
		"edit-page": "./js/src/edit-page.js",
		"frontend": "./js/src/frontend.js",
		"store": "./js/src/store.js",
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
		"@wordpress/data": "window.wp.data",
		"@wordpress/editor": "window.wp.editor",
		"@wordpress/api-fetch": "window.wp.apiFetch",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	},
};
