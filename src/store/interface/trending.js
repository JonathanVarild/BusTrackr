import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const trendingInitalState = {
	trendingBuses: {
		status: "idle",
		requestId: null,
		error: null,
		buses: [],
	},
};

export const fetchTrendingBuses = createAsyncThunk("interface/trendingBuses", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;

	if (state.trendingBuses.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/trending_buses", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export function trendingBuilder(builder) {
	builder
		.addCase(fetchTrendingBuses.pending, (state, action) => {
			if (state.trendingBuses.requestId === null) {
				state.trendingBuses.status = "loading";
				state.trendingBuses.requestId = action.meta.requestId;
			}
		})
		.addCase(fetchTrendingBuses.fulfilled, (state, action) => {
			if (state.trendingBuses.requestId === action.meta.requestId) {
				state.trendingBuses.status = "idle";
				state.trendingBuses.requestId = null;
				state.trendingBuses.buses = action.payload.map(convertArrayCb);
			}
		})
		.addCase(fetchTrendingBuses.rejected, (state, action) => {
			if (state.trendingBuses.requestId === action.meta.requestId) {
				state.trendingBuses.status = "failed";
				state.trendingBuses.requestId = null;
				state.trendingBuses.error = action.error.message;
			}
		});
}

function convertArrayCb(bus) {
	return {
		busLine: bus.bus_line,
		clickCount: bus.click_count,
	};
}
