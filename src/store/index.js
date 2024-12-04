import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import mapReducer from "./mapData"

const store = configureStore({
	reducer: {
		counter: counterReducer,
		mapData: mapReducer,
	},
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
