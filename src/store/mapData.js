import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const blueBusses = ["1", "2", "3", "4", "6", "172", "173", "175", "176", "177", "178", "179", "471", "474", "670", "676", "677", "873", "875"];

const apiUrl = import.meta.env.VITE_API_URL;

function createLocation(latitude = 59.405002, longitude = 17.9508139) {
	return { latitude, longitude };
}

export const fetchQuays = createAsyncThunk("mapData/fetchQuays", async (_, { getState }) => {
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
});

export const fetchStops = createAsyncThunk("mapData/fetchStops", async (_, { getState }) => {
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
});

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

export const fetchJourneyDetails = createAsyncThunk("mapData/fetchJourneyDetails", async ({service_journey_id, vehicle_id}) => {
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
});

const mapDataSlice = createSlice({
	name: "mapData",
	initialState: {
		userLocation: null,
		invalidLocation: false,
		awaitingLocation: false,
		screenBoundary: {
			topLeft: null,
			bottomRight: null,
			zoom: null,
		},
		quays: {
			status: "idle",
			error: null,
			requestId: null,
			list: {},
		},
		stops: {
			status: "idle",
			error: null,
			requestId: null,
			list: {},
		},
		selectedLiveVehicleId: null,
		liveVehicles: {
			status: "idle",
			error: null,
			requestId: null,
			list: {},
		},
		showBusJourneyInfo: false,
		journeyDetails: {
			status: "idle",
			error: null,
			requestId: null,
			details: {}
		},
	},
	reducers: {
		updateScreenTopLeft: (state, action) => {
			state.screenBoundary.topLeft = { ...state.screenBoundary.topLeft, ...action.payload };
		},
		updateScreenBottomRight: (state, action) => {
			state.screenBoundary.bottomRight = { ...state.screenBoundary.bottomRight, ...action.payload };
		},
		setStationHovered: (state, action) => {
			if (state.stops.list[action.payload.id]) {
				state.stops.list[action.payload.id].hovered = action.payload.hovered;
			} else {
				state.quays.list[action.payload.id].hovered = action.payload.hovered;
			}
		},
		setSelectedLiveVehicleId: (state, action) => {
			state.selectedLiveVehicleId = action.payload;
		},
		setLiveVehicleHovered: (state, action) => {
			if (state.liveVehicles.list[action.payload.id]) {
				state.liveVehicles.list[action.payload.id].hovered = action.payload.hovered;
			} else {
				state.liveVehicles.list[action.payload.id].hovered = action.payload.hovered;
			}
		},
		setShowBusJourneyInfo: (state, action) => {
			state.showBusJourneyInfo = action.payload;
		},
		setZoomLevel: (state, action) => {
			state.screenBoundary.zoom = action.payload;
		},
		setUserLocation: (state, action) => {
			state.userLocation = { ...state.userLocation, latitude: action.payload.latitude, longitude: action.payload.longitude, accuracy: action.payload.accuracy };
			state.invalidLocation = action.payload.accuracy > 1000;
			state.awaitingLocation = false;
		},
		setInvalidLocation: (state, action) => {
			state.invalidLocation = action.payload;
		},
		setAwaitingLocation: (state, action) => {
			state.awaitingLocation = true;
		},
	},
	extraReducers: (builder) => {
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
						routeColor: existingVehicle?.routeColor ?? "unknown"
					}});

					state.liveVehicles.list = Object.fromEntries(newLiveVehicles.map((liveVehicle) => [liveVehicle.service_journey_id + liveVehicle.vehicle_id, liveVehicle]));
					
				}
			})
			.addCase(fetchLiveVehicles.rejected, (state, action) => {
				state.liveVehicles.status = "failed";
				state.liveVehicles.error = action.error.message;
			});

		builder
			.addCase(fetchJourneyDetails.pending, (state, action) => {
				state.journeyDetails.status = "loading";
				state.journeyDetails.requestId = action.meta.requestId;
				state.showBusJourneyInfo = true;
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
	},
});

export const {
	updateScreenTopLeft,
	updateScreenBottomRight,
	addQuays,
	setStationHovered,
	setShowBusJourneyInfo,
	setLiveVehicleHovered,
	setZoomLevel,
	setUserLocation,
	setInvalidLocation,
	setAwaitingLocation,
	setSelectedLiveVehicleId
} =	mapDataSlice.actions;

export default mapDataSlice.reducer;
