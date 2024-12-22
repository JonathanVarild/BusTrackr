import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const logoutInitialState = {
	logout: {
		status: "idle",
		requestId: null,
		error: null,
	},
};

export const logoutUser = createAsyncThunk("interface/logoutUser", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;

	if (state.logout.requestId !== requestId) return;

	return await fetch(apiUrl + "/api/logout", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export function logoutBuilder(builder) {
	builder
		.addCase(logoutUser.pending, (state, action) => {
			if (state.logout.requestId === null) {
				state.logout.status = "loading";
				state.logout.requestId = action.meta.requestId;
			}
		})
		.addCase(logoutUser.fulfilled, (state, action) => {
			if (state.logout.requestId === action.meta.requestId) {
				state.logout.status = "idle";
				state.logout.requestId = null;

				state.accountSettingOpen = null;
				state.changedUserInfo = null;
				state.authenticate.userInfo = null;

				state.queuedPopups.push({
					title: "Successfully Logged Out",
					message: "You have been successfully logged out.",
					type: 0,
				});
			}
		})
		.addCase(logoutUser.rejected, (state, action) => {
			if (state.logout.requestId === action.meta.requestId) {
				state.logout.status = "failed";
				state.logout.requestId = null;
				state.logout.error = action.error.message;
			}
		});
}

export function getLogoutMiddleware(dequeuePopup) {
	const logoutListenerMiddleware = createListenerMiddleware();

	logoutListenerMiddleware.startListening({
		actionCreator: dequeuePopup,
		effect: async (action, listenerApi) => {
			if (action.payload === "LogoutUser") {
				listenerApi.dispatch(logoutUser());
			}
		},
	});

	return logoutListenerMiddleware.middleware;
}
