import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapData"
import interfaceReducer from "./interface"

const store = configureStore({
	reducer: {
		mapData: mapReducer,
		interface: interfaceReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
