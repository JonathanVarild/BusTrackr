import { createSlice, createAsyncThunk, createListenerMiddleware } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchResolvedCB(resp) {
	if (resp.status !== 200) {
		const error = await resp.json();
		return Promise.reject(new Error(error.message));
	}
	return resp.json();
}

export const authenticateUser = createAsyncThunk("interface/authenticateUser", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;
	const loginForm = state.authPopupForm.login;

	if (state.authenticate.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/login", {
		method: "POST",
		body: JSON.stringify({
			email: loginForm.email,
			password: loginForm.password,
			long_expire: loginForm.rememberMe
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export const reauthenticateUser = createAsyncThunk("interface/reauthenticateUser", async () => {
	return await fetch(apiUrl + "/api/re-auth", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"X-Silence-Unauthorized": "true",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export const logoutUser = createAsyncThunk("interface/logoutUser", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;

	if (state.logout.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/logout", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

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
			long_expire: signupForm.rememberMe
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(fetchResolvedCB);
});

export const makeChangeTest = createAsyncThunk("interface/makeChangeTest", async () => {
	return await fetch(apiUrl + "/api/make-change", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		lastInteraction: Date.now(),
		navigationOpen: false,
		queuedPopups: [],
		accountSettingOpen: null,
		authPopup: null,
		authPopupForm: {
			login: {
				email: "",
				password: "",
				rememberMe: false,
				fault: "",
			},
			signup: {
				username: "",
				email: "",
				dateOfBirth: "2000-01-01",
				password: "",
				repeatPassword: "",
				termsOfService: false,
				dataPolicy: false,
				rememberMe: false,
				fault: "",
			},
		},
		changedUserInfo: null,
		authenticate: {
			status: "idle",
			requestId: null,
			error: null,
			userInfo: null,
		},
		reauthenticate: {
			status: "idle",
			error: null,
		},
		logout: {
			status: "idle",
			requestId: null,
			error: null,
		},
		createUser: {
			status: "idle",
			requestId: null,
			error: null,
		},
		makeChange: {
			status: "idle",
			error: null,
		},
	},
	reducers: {
		toggleNavigation: (state) => {
			state.navigationOpen = !state.navigationOpen;
		},
		updateLastInteraction: (state) => {
			state.lastInteraction = Date.now();
		},
		queuePopup: (state, action) => {
			state.queuedPopups.push({
				title: action.payload.title,
				message: action.payload.message,
				type: action.payload.type,
				continueAction: action.payload.continueAction,
				abortAction: action.payload.abortAction,
			});
		},
		dequeuePopup: (state, action) => {
			switch (action.payload) {
				case "DeleteAccount":
					console.log("Deleted account.");
					break;
				case "AbortDeleteAccount":
					console.log("Account not deleted.");
					break;
				case "ClosedWelcomeMessage":
					console.log("Welcome message was closed.");
					break;
				case "RevertSettingChanges":
					state.changedUserInfo = null;
					break;
				case "NoLongerInactive":
					console.log("User is active again!");
					state.lastInteraction = Date.now();
					break;
			}

			state.queuedPopups.shift();
		},
		openAccountSetting: (state, action) => {
			state.accountSettingOpen = action.payload;
		},
		setChangedUserInfo: (state, action) => {
			state.changedUserInfo = action.payload.length === 0 ? null : { ...state.changedUserInfo, ...action.payload };
		},
		setAuthPopup: (state, action) => {
			state.authPopup = action.payload;
			state.authPopupForm.login.fault = "";
			state.authPopupForm.signup.fault = "";
			state.authPopupForm.login.password = "";
			state.authPopupForm.signup.password = "";
			state.authPopupForm.signup.repeatPassword = "";
		},
		updateLoginForm: (state, action) => {
			state.authPopupForm.login = { ...state.authPopupForm.login, ...action.payload };
		},
		updateSignupForm: (state, action) => {
			state.authPopupForm.signup = { ...state.authPopupForm.signup, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state, action) => {
				if (state.authenticate.requestId === null) {
					state.authenticate.status = "loading";
					state.authPopupForm.login.fault = "";
					state.authenticate.requestId = action.meta.requestId;
				}
			})
			.addCase(authenticateUser.fulfilled, (state, action) => {
				if (state.authenticate.requestId === action.meta.requestId) {
					state.authenticate.status = "idle";
					state.authenticate.requestId = null;

					state.authPopup = null;

					const userData = action.payload.userData;

					state.authenticate.userInfo = {
						id: userData.id,
						username: userData.username,
						email: userData.email,
						dateOfBirth: userData.date_of_birth,
						lastLoginTime: "YYYY-MM-DD HH:MM:SS",
						lastLoginFrom: "192.168.1.1",
						termsOfServiceAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
						dataPolicyAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
						accountCreated: "YYYY-MM-DD HH:MM:SS",
						registrationDate: new Date(userData.registration_date).toISOString().replace("T", " ").substring(0, 19),
						lastReportGenerated: "YYYY-MM-DD HH:MM:SS",
					};

					state.queuedPopups.push({
						title: "Login Successful",
						message: "You have been successfully logged in and can now make use of more features.",
						type: 0,
					});
				}
			})
			.addCase(authenticateUser.rejected, (state, action) => {
				if (state.authenticate.requestId === action.meta.requestId) {
					state.authenticate.status = "failed";
					state.authenticate.requestId = null;
					state.authenticate.error = action.error.message;
					state.authPopupForm.login.fault = action.error.message;
				}
			});

		builder
			.addCase(reauthenticateUser.pending, (state, action) => {
				state.reauthenticate.status = "loading";
			})
			.addCase(reauthenticateUser.fulfilled, (state, action) => {
				state.reauthenticate.status = "idle";

				const userData = action.payload.userData;

				if (!userData) return;

				state.authenticate.userInfo = {
					id: userData.id,
					username: userData.username,
					email: userData.email,
					dateOfBirth: userData.date_of_birth,
					lastLoginTime: "YYYY-MM-DD HH:MM:SS",
					lastLoginFrom: "192.168.1.1",
					termsOfServiceAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
					dataPolicyAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
					accountCreated: "YYYY-MM-DD HH:MM:SS",
					registrationDate: new Date(userData.registration_date).toISOString().replace("T", " ").substring(0, 19),
					lastReportGenerated: "YYYY-MM-DD HH:MM:SS",
				};
			})
			.addCase(reauthenticateUser.rejected, (state, action) => {
				state.reauthenticate.status = "failed";
				state.reauthenticate.error = action.error.message;
			});

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

		builder
			.addCase(makeChangeTest.pending, (state, action) => {
				state.makeChange.status = "loading";
			})
			.addCase(makeChangeTest.fulfilled, (state, action) => {
				state.makeChange.status = "idle";
			})
			.addCase(makeChangeTest.rejected, (state, action) => {
				state.makeChange.status = "failed";
				state.makeChange.error = action.error.message;
			});

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

					const userData = action.payload.userData;

					if (!userData) return;

					state.authenticate.userInfo = {
						id: userData.id,
						username: userData.username,
						email: userData.email,
						dateOfBirth: userData.date_of_birth,
						lastLoginTime: "YYYY-MM-DD HH:MM:SS",
						lastLoginFrom: "192.168.1.1",
						termsOfServiceAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
						dataPolicyAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
						accountCreated: "YYYY-MM-DD HH:MM:SS",
						registrationDate: new Date(userData.registration_date).toISOString().replace("T", " ").substring(0, 19),
						lastReportGenerated: "YYYY-MM-DD HH:MM:SS",
					};

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
					state.authPopupForm.signup.fault = action.error.message;;
				}
			});
	},
});

export const {
	toggleNavigation,
	queuePopup,
	dequeuePopup,
	openAccountSetting,
	userInfo,
	setChangedUserInfo,
	setAuthPopup,
	updateLoginForm,
	updateSignupForm,
	updateLastInteraction,
} = interfaceSlice.actions;

export default interfaceSlice.reducer;

const logoutListenerMiddleware = createListenerMiddleware();
logoutListenerMiddleware.startListening({
	actionCreator: dequeuePopup,
	effect: async (action, listenerApi) => {
		if (action.payload === "LogoutUser") {
			listenerApi.dispatch(logoutUser());
		}
	},
});
export const logoutMiddlewareFunction = logoutListenerMiddleware.middleware;
