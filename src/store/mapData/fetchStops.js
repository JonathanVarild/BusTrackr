import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLocation } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchStopsInitialState = {
	stops: {
		status: "idle",
		error: null,
		requestId: null,
		list: {},
	},
};

async function fetchStopsCB(_, { getState }) {
	const screenBoundary = getState().mapData.screenBoundary;

	return await fetch(apiUrl + "/api/stops", {
		method: "POST",
		body: JSON.stringify({
			lat_0: screenBoundary.topLeft.latitude,
			lon_0: screenBoundary.topLeft.longitude,
			lat_1: screenBoundary.bottomRight.latitude,
			lon_1: screenBoundary.bottomRight.longitude,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then((resp) => resp.json());
}

export const fetchStops = createAsyncThunk("mapData/fetchStops", fetchStopsCB);

export function fetchStopsBuilder(builder) {
	builder
		.addCase(fetchStops.pending, (state, action) => {
			state.stops.status = "loading";
			state.stops.requestId = action.meta.requestId;
		})
		.addCase(fetchStops.fulfilled, (state, action) => {
			if (state.stops.requestId === action.meta.requestId) {
				state.stops.status = "idle";
				state.stops.requestId = null;

				const newStops = action.payload.list.map((stops) => ({
					...stops,
					location: createLocation(parseFloat(stops.location.lat), parseFloat(stops.location.lon)),
				}));

				state.stops.list = Object.fromEntries(newStops.map((stop) => [stop.id, stop]));
			}
		})
		.addCase(fetchStops.rejected, (state, action) => {
			state.stops.status = "failed";
			state.stops.error = action.error.message;
		});
}
