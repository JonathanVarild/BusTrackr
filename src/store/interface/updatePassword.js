import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const updatePasswordInitialState = {
	updatePassword: {
		status: "idle",
		requestId: null,
		error: null,
	},
};

export const updateUserPassword = createAsyncThunk("interface/updateUserPassword", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;
	const changedUserInfo = state.changedUserInfo;

	if (state.updatePassword.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/update-password", {
		method: "POST",
		body: JSON.stringify({
			old_password: changedUserInfo?.oldPassword || "",
			new_password: changedUserInfo?.newPassword || "",
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export function updatePasswordBuilder(builder) {
	builder
		.addCase(updateUserPassword.pending, (state, action) => {
			if (state.updatePassword.requestId === null) {
				state.updatePassword.status = "loading";
				state.updatePassword.requestId = action.meta.requestId;
			}
		})
		.addCase(updateUserPassword.fulfilled, (state, action) => {
			if (state.updatePassword.requestId === action.meta.requestId) {
				state.updatePassword.status = "idle";
				state.updatePassword.requestId = null;

				state.changedUserInfo = null;

				state.queuedPopups.push({
					title: "Successfully updated account",
					message: action.payload.message,
					type: 0,
				});
			}
		})
		.addCase(updateUserPassword.rejected, (state, action) => {
			if (state.updatePassword.requestId === action.meta.requestId) {
				state.updatePassword.status = "failed";
				state.updatePassword.requestId = null;
				state.updatePassword.error = action.error.message;

				state.queuedPopups.push({
					title: "Failed to update password",
					message: action.error.message,
					type: 0,
				});
			}
		});
}
