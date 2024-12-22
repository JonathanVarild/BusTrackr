import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapData";
import interfaceReducer from "./interface";
import { logoutMiddlewareFunction, deleteAccountMiddlewareFunction } from "./interface";

const store = configureStore({
	reducer: {
		mapData: mapReducer,
		interface: interfaceReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logoutMiddlewareFunction, deleteAccountMiddlewareFunction),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
