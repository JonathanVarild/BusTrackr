import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapData";
import interfaceReducer from "./interface";
import { logoutMiddlewareFunction, deleteAccountMiddlewareFunction } from "./interface";

function middlewareCB(getDefaultMiddleware) {
	return getDefaultMiddleware().concat(logoutMiddlewareFunction, deleteAccountMiddlewareFunction);
}

const store = configureStore({
	reducer: {
		mapData: mapReducer,
		interface: interfaceReducer,
	},
	middleware: middlewareCB,
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
