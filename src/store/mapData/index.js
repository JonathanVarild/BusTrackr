import { createSlice } from "@reduxjs/toolkit";
import { fetchQuaysInitialState, fetchQuaysBuilder } from "./fetchQuays";
import { fetchStopsInitialState, fetchStopsBuilder } from "./fetchStops";
import { liveVehiclesInitialState, liveVehiclesBuilder } from "./liveVehicles";
import { journeyDetailsInitialState, journeyDetailsBuilder } from "./journeyDetails";

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

		selectedLiveVehicleId: null,
		showBusJourneyInfo: false,

		...fetchQuaysInitialState,
		...fetchStopsInitialState,
		...liveVehiclesInitialState,
		...journeyDetailsInitialState,
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
		fetchQuaysBuilder(builder);
		fetchStopsBuilder(builder);
		liveVehiclesBuilder(builder);
		journeyDetailsBuilder(builder);
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
	setSelectedLiveVehicleId,
} = mapDataSlice.actions;

export default mapDataSlice.reducer;
