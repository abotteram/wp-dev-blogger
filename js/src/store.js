import {
	registerStore,
} from "@wordpress/data";

import reducer from "./store/reducers";

registerStore( "devb", { reducer } );

