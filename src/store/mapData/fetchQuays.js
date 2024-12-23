import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLocation } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchQuaysInitialState = {
	quays: {
		status: "idle",
		error: null,
		requestId: null,
		list: {},
	},
};

async function fetchQuaysCB(_, { getState }) {
	const screenBoundary = getState().mapData.screenBoundary;

	return await fetch(apiUrl + "/api/quays", {
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
export const fetchQuays = createAsyncThunk("mapData/fetchQuays", fetchQuaysCB);

export function fetchQuaysBuilder(builder) {
	builder
		.addCase(fetchQuays.pending, (state, action) => {
			state.quays.status = "loading";
			state.quays.requestId = action.meta.requestId;
		})
		.addCase(fetchQuays.fulfilled, (state, action) => {
			if (state.quays.requestId === action.meta.requestId) {
				state.quays.status = "idle";
				state.quays.requestId = null;

				const newQuays = action.payload.list.map((quay) => ({
					...quay,
					location: createLocation(parseFloat(quay.location.lat), parseFloat(quay.location.lon)),
				}));

				state.quays.list = Object.fromEntries(newQuays.map((quay) => [quay.id, quay]));
			}
		})
		.addCase(fetchQuays.rejected, (state, action) => {
			state.quays.status = "failed";
			state.quays.error = action.error.message;
		});
}
