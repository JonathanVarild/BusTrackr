import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import mapReducer from "./mapData"
import interfaceReducer, { logoutMiddlewareFunction } from "./interface"

const store = configureStore({
	reducer: {
		counter: counterReducer,
		mapData: mapReducer,
		interface: interfaceReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logoutMiddlewareFunction),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
