const express = require( "express" );
const app = express();

const gutenbergRoutes = require( "./api/gutenberg" );

app.use( '/gutenberg', gutenbergRoutes );

module.exports = app;
