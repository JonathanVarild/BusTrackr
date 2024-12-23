import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

export const searchInitialState = {
	search: {
		status: "idle",
		error: null,
		requestId: null,
		results: {},
	},
};

async function fetchSearchResultCB({ query, page }, { getState }) {
	const mode = getState().interface.searchMode;

	return await fetch(apiUrl + "/api/search", {
		method: "POST",
		body: JSON.stringify({
			type: mode,
			query,
			page,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then((resp) => resp.json());
}

export const fetchSearchResult = createAsyncThunk("interface/fetchSearchResult", fetchSearchResultCB);

export function searchBuilder(builder) {
	builder
		.addCase(fetchSearchResult.pending, (state, action) => {
			state.search.status = "loading";
			state.search.requestId = action.meta.requestId;
		})
		.addCase(fetchSearchResult.fulfilled, (state, action) => {
			if (state.search.requestId === action.meta.requestId) {
				state.search.status = "idle";
				state.search.requestId = null;

				state.search.results = action.payload;
			}
		})
		.addCase(fetchSearchResult.rejected, (state, action) => {
			state.search.status = "failed";
			state.search.error = action.error.message;
		});
}
