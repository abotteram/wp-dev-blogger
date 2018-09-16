const express = require( "express" );
const router = express.Router();

const React = require( "react" );
const ReactDOM = require( "react-dom/server" );

console.log( React );

const HightlightedCode = require( "@dev-blogger/shared" ).HighlightedCode;

router.get( "/", ( req, res, next ) => {
	console.log( HightlightedCode );
	const app = ReactDOM.renderToString( React.createElement( HightlightedCode, null, "Hello world!" ), "Argument" );

	res.status( 200 ).send( app );
} );

router.post( "/", ( req, res, next ) => {
	res.status( 200 ).json( { message: "gutenberg post handler" } );
} );

module.exports = router;