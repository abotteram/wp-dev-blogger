import {
	combineReducers
} from "@wordpress/data";

import codeSnippetsReducer from "./code-snippets";

export default combineReducers( {
	codeSnippets: codeSnippetsReducer,
} );
