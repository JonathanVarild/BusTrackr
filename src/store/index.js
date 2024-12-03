import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { counterReducer } from "./counter";

const store = configureStore({
	reducer: combineReducers({
		counter: counterReducer,
	}),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;