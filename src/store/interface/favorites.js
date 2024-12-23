import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const favoritesInitialState = {
	favorites: {
		status: "idle",
        statusAdd: "idle",
        statusRemove: "idle",
		error: null,
		errorAdd: null,
		errorRemove: null,
		requestId: null,
		requestIdAdd: null,
		requestIdRemove: null,
		list: {},
	},
};

export const fetchFavorites = createAsyncThunk("interface/fetchFavorites", async (_, { getState }) => {
	return await fetch(apiUrl + "/api/favorites", {
		method: "POST",
		body: JSON.stringify({
            type: 'list',
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export const addFavorite = createAsyncThunk("interface/addFavorite", async ({ route_id }, { getState }) => {
	return await fetch(apiUrl + "/api/favorites", {
		method: "POST",
		body: JSON.stringify({
            type: 'add',
            route_id
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});


export const removeFavorite = createAsyncThunk("interface/removeFavorite", async ({ route_id }, { getState }) => {
	return await fetch(apiUrl + "/api/favorites", {
		method: "POST",
		body: JSON.stringify({
            type: 'remove',
            route_id
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export function favoritesBuilder(builder) {
	builder
		.addCase(fetchFavorites.pending, (state, action) => {
			state.favorites.status = "loading";
			state.favorites.requestId = action.meta.requestId;
		})
		.addCase(fetchFavorites.fulfilled, (state, action) => {
			if (state.favorites.requestId === action.meta.requestId) {
				state.favorites.status = "idle";
				state.favorites.requestId = null;

				state.favorites.list = action.payload.favorites;
			}
		})
		.addCase(fetchFavorites.rejected, (state, action) => {
			state.favorites.status = "failed";
			state.favorites.error = action.error.message;
		});

    builder
		.addCase(addFavorite.pending, (state, action) => {
			state.favorites.statusAdd = "loading";
			state.favorites.requestIdAdd = action.meta.requestId;
		})
		.addCase(addFavorite.fulfilled, (state, action) => {
			if (state.favorites.requestIdAdd === action.meta.requestId) {
				state.favorites.statusAdd = "idle";
				state.favorites.requestIdAdd = null;

                state.favorites.list = action.payload.favorites;
			}
		})
		.addCase(addFavorite.rejected, (state, action) => {
			state.favorites.statusAdd = "failed";
			state.favorites.errorAdd = action.error.message;
			
			if (state.authenticate.userInfo === null) {
				state.queuedPopups.push({
					title: "Please sign in",
					message: "You need to be signed in to use favorites",
					type: 0,
				});
			}
		});

    builder
		.addCase(removeFavorite.pending, (state, action) => {
			state.favorites.statusRemove = "loading";
			state.favorites.requestIdRemove = action.meta.requestId;
		})
		.addCase(removeFavorite.fulfilled, (state, action) => {
			if (state.favorites.requestIdRemove === action.meta.requestId) {
				state.favorites.statusRemove = "idle";
				state.favorites.requestIdRemove = null;

                state.favorites.list = action.payload.favorites;
			}
		})
		.addCase(removeFavorite.rejected, (state, action) => {
			state.favorites.statusRemove = "failed";
			state.favorites.errorRemove = action.error.message;

			if (state.authenticate.userInfo === null) {
				state.queuedPopups.push({
					title: "Please sign in",
					message: "You need to be signed in to use favorites",
					type: 0,
				});
			}
		});
}
