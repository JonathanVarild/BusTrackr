import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const updateAccountInitialState = {
	updateAccount: {
		status: "idle",
		requestId: null,
		error: null,
	},
};

async function updateUserAccountCB(_, { getState, abort, requestId }) {
	const state = getState().interface;
	const currentUserInfo = state.authenticate.userInfo;
	const changedUserInfo = state.changedUserInfo;

	if (state.updateAccount.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/update-account", {
		method: "POST",
		body: JSON.stringify({
			username: changedUserInfo?.username || currentUserInfo.username,
			email: changedUserInfo?.email || currentUserInfo.email,
			date_of_birth: changedUserInfo?.dateOfBirth || currentUserInfo.dateOfBirth,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
}

export const updateUserAccount = createAsyncThunk("interface/updateUserAccount", updateUserAccountCB);

export function updateAccountBuilder(builder) {
	builder
		.addCase(updateUserAccount.pending, (state, action) => {
			if (state.updateAccount.requestId === null) {
				state.updateAccount.status = "loading";
				state.updateAccount.requestId = action.meta.requestId;
			}
		})
		.addCase(updateUserAccount.fulfilled, (state, action) => {
			if (state.updateAccount.requestId === action.meta.requestId) {
				state.updateAccount.status = "idle";
				state.updateAccount.requestId = null;

				state.authenticate.userInfo.username = state.changedUserInfo.username || state.authenticate.userInfo.username;
				state.authenticate.userInfo.email = state.changedUserInfo.email || state.authenticate.userInfo.email;
				state.authenticate.userInfo.dateOfBirth = state.changedUserInfo.dateOfBirth || state.authenticate.userInfo.dateOfBirth;

				state.changedUserInfo = null;

				state.queuedPopups.push({
					title: "Successfully updated account",
					message: action.payload.message,
					type: 0,
				});
			}
		})
		.addCase(updateUserAccount.rejected, (state, action) => {
			if (state.updateAccount.requestId === action.meta.requestId) {
				state.updateAccount.status = "failed";
				state.updateAccount.requestId = null;
				state.updateAccount.error = action.error.message;

				state.queuedPopups.push({
					title: "Failed to update account",
					message: action.error.message,
					type: 0,
				});
			}
		});
}
