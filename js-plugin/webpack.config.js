const path = require( "path" );

module.exports = {
	context: __dirname,
	entry: {
		"gutenberg-blocks": "./src/gutenberg-blocks.js",
	},
	output: {
		path: path.resolve( __dirname, "dist" ),
		filename: "[name].js",
		jsonpFunction: "devbWebpackJsonp",
	},
	externals: {
		"@wordpress/element": "window.wp.element",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
			}
		]
	},
	resolve: {
		alias: {
			"@dev-blogger/shared": path.resolve( __dirname, "..", "js-shared", "dist" ),
		},
	},
};
