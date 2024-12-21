import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB, parseUserData } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const createAccountInitialState = {
	createUser: {
		status: "idle",
		requestId: null,
		error: null,
	},
};

export const createUserAccount = createAsyncThunk("interface/createUserAccount", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;
	const signupForm = state.authPopupForm.signup;

	if (state.createUser.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/register", {
		method: "POST",
		body: JSON.stringify({
			username: signupForm.username,
			email: signupForm.email,
			date_of_birth: signupForm.dateOfBirth,
			password: signupForm.password,
			terms_of_service: signupForm.termsOfService,
			data_policy: signupForm.dataPolicy,
			long_expire: signupForm.rememberMe,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export function createAccountBuilder(builder) {
	builder
		.addCase(createUserAccount.pending, (state, action) => {
			if (state.createUser.requestId === null) {
				state.createUser.status = "loading";
				state.createUser.requestId = action.meta.requestId;
				state.authPopupForm.signup.fault = "";
			}
		})
		.addCase(createUserAccount.fulfilled, (state, action) => {
			if (state.createUser.requestId === action.meta.requestId) {
				state.createUser.status = "idle";
				state.createUser.requestId = null;

				state.authPopup = null;

				parseUserData(action, state);

				state.queuedPopups.push({
					title: "Account Created",
					message: "You have successfully created an account and been logged in. You can now make use of more features.",
					type: 0,
				});
			}
		})
		.addCase(createUserAccount.rejected, (state, action) => {
			if (state.createUser.requestId === action.meta.requestId) {
				state.createUser.status = "failed";
				state.createUser.requestId = null;
				state.createUser.error = action.error.message;
				state.authPopupForm.signup.fault = action.error.message;
			}
		});
}
