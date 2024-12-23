import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

import { blueBusses } from "./utilities";
// const blueBusses = ["1", "2", "3", "4", "6", "172", "173", "175", "176", "177", "178", "179", "471", "474", "670", "676", "677", "873", "875"];

export const journeyDetailsInitialState = {
	journeyDetails: {
		status: "idle",
		error: null,
		requestId: null,
		details: {},
	},
};

async function fetchJourneyDetailsCB({ service_journey_id, vehicle_id }) {
	return await fetch(apiUrl + "/api/journey_details", {
		method: "POST",
		body: JSON.stringify({
			service_journey_id,
			vehicle_id,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then((resp) => resp.json());
}

export const fetchJourneyDetails = createAsyncThunk("mapData/fetchJourneyDetails", fetchJourneyDetailsCB);

export function journeyDetailsBuilder(builder) {
	builder
		.addCase(fetchJourneyDetails.pending, (state, action) => {
			state.journeyDetails.status = "loading";
			state.journeyDetails.requestId = action.meta.requestId;
		})
		.addCase(fetchJourneyDetails.fulfilled, (state, action) => {
			if (state.journeyDetails.requestId === action.meta.requestId) {
				state.journeyDetails.status = "idle";
				state.journeyDetails.requestId = null;

				state.journeyDetails.details = action.payload;

				if (state.liveVehicles.list[state.selectedLiveVehicleId] !== undefined) {
					if (blueBusses.includes(state.journeyDetails.details.line)) {
						state.liveVehicles.list[state.selectedLiveVehicleId].routeColor = "blue";
					} else if (state.journeyDetails.details.line !== undefined) {
						state.liveVehicles.list[state.selectedLiveVehicleId].routeColor = "red";
					}
				}
			}
		})
		.addCase(fetchJourneyDetails.rejected, (state, action) => {
			state.journeyDetails.status = "failed";
			state.journeyDetails.error = action.error.message;
		});
}
