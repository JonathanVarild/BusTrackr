import { createAsyncThunk } from "@reduxjs/toolkit";
import { createLocation } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const liveVehiclesInitialState = {
	liveVehicles: {
		status: "idle",
		error: null,
		requestId: null,
		list: {},
	},
};

export const fetchLiveVehicles = createAsyncThunk("mapData/fetchLiveVehicles", async (_, { getState }) => {
	const screenBoundary = getState().mapData.screenBoundary;

	return await fetch(apiUrl + "/api/live", {
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
});

export function liveVehiclesBuilder(builder) {
	builder
		.addCase(fetchLiveVehicles.pending, (state, action) => {
			state.liveVehicles.status = "loading";
			state.liveVehicles.requestId = action.meta.requestId;
		})
		.addCase(fetchLiveVehicles.fulfilled, (state, action) => {
			if (state.liveVehicles.requestId === action.meta.requestId) {
				state.liveVehicles.status = "idle";
				state.liveVehicles.requestId = null;

				const newLiveVehicles = action.payload.list.map((liveVehicle) => {
					const existingVehicle = state.liveVehicles.list[liveVehicle.service_journey_id + liveVehicle.vehicle_id];
					return {
						...liveVehicle,
						location: createLocation(parseFloat(liveVehicle.location.lat), parseFloat(liveVehicle.location.lon)),
						routeColor: existingVehicle?.routeColor ?? "unknown",
					};
				});

				state.liveVehicles.list = Object.fromEntries(newLiveVehicles.map((liveVehicle) => [liveVehicle.service_journey_id + liveVehicle.vehicle_id, liveVehicle]));
			}
		})
		.addCase(fetchLiveVehicles.rejected, (state, action) => {
			state.liveVehicles.status = "failed";
			state.liveVehicles.error = action.error.message;
		});
}
