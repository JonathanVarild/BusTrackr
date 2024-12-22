import { createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const deleteAccountInitialState = {
	deleteAccount: {
		status: "idle",
		requestId: null,
		error: null,
	},
};

export const deleteAccount = createAsyncThunk("interface/deleteAccount", async (_, { getState, requestId }) => {
	const state = getState().interface;

	if (state.deleteAccount.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/delete_account", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export function deleteAccountBuilder(builder) {
	builder
		.addCase(deleteAccount.pending, (state, action) => {
			if (state.deleteAccount.requestId === null) {
				state.deleteAccount.status = "loading";
				state.deleteAccount.requestId = action.meta.requestId;
			}
		})
		.addCase(deleteAccount.fulfilled, (state, action) => {
			if (state.deleteAccount.requestId === action.meta.requestId) {
				state.deleteAccount.status = "idle";
				state.deleteAccount.requestId = null;

				state.accountSettingOpen = null;
				state.changedUserInfo = null;
				state.authenticate.userInfo = null;

				state.queuedPopups.push({
					title: "Successfully Deleted Account",
					message: "Account and all related data have been deleted successfully.",
					type: 0,
				});
			}
		})
		.addCase(deleteAccount.rejected, (state, action) => {
			if (state.deleteAccount.requestId === action.meta.requestId) {
				state.deleteAccount.status = "failed";
				state.deleteAccount.requestId = null;
				state.deleteAccount.error = action.error.message;

				state.queuedPopups.push({
					title: "Account Deletion Failed",
					message: "Please contact website administrator to have your account removed.",
					type: 0,
				});
			}
		});
}

export function getDeleteAccountMiddleware(dequeuePopup) {
	const deleteAccountListenerMiddleware = createListenerMiddleware();

	deleteAccountListenerMiddleware.startListening({
		actionCreator: dequeuePopup,
		effect: async (action, listenerApi) => {
			if (action.payload === "DeleteAccount") {
				listenerApi.dispatch(deleteAccount());
			}
		},
	});

	return deleteAccountListenerMiddleware.middleware;
}
