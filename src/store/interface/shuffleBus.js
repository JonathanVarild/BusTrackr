import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const shuffleBusInitialState = {
	shuffleBus: {
		status: "idle",
		requestId: null,
		error: null,
		currentBus: null,
	},
};

export const fetchRandomBus = createAsyncThunk("interface/shuffleBus", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;

	if (state.shuffleBus.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/shuffle_bus", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export function shuffleBusBuilder(builder) {
	builder
		.addCase(fetchRandomBus.pending, (state, action) => {
			if (state.shuffleBus.requestId === null) {
				state.shuffleBus.status = "loading";
				state.shuffleBus.requestId = action.meta.requestId;
			}
		})
		.addCase(fetchRandomBus.fulfilled, (state, action) => {
			if (state.shuffleBus.requestId === action.meta.requestId) {
				state.shuffleBus.status = "idle";
				state.shuffleBus.requestId = null;

				if (action.payload.list.length === 0) {
					state.shuffleBus.currentBus = null;
					state.queuedPopups.push({
						title: "Please wait",
						message: "We are still fetching the live data on our server. Please try again in a few seconds!",
						type: 0,
					});
				} else {
					state.shuffleBus.currentBus = action.payload.list[0];
				}
			}
		})
		.addCase(fetchRandomBus.rejected, (state, action) => {
			if (state.shuffleBus.requestId === action.meta.requestId) {
				state.shuffleBus.status = "failed";
				state.shuffleBus.requestId = null;
				state.shuffleBus.error = action.error.message;
				state.shuffleBus.currentBus = null;
			}
		});
}
