import { createSlice } from "@reduxjs/toolkit";

import { authInitialState, authenticateUserBuilder, reauthenticateUserBuilder } from "./authentication";
import { logoutInitialState, logoutBuilder, getLogoutMiddleware } from "./logout";
import { createAccountInitialState, createAccountBuilder } from "./createAccount";
import { updateAccountInitialState, updateAccountBuilder } from "./updateAccount";
import { updatePasswordInitialState, updatePasswordBuilder } from "./updatePassword";

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

		...authInitialState,
		...logoutInitialState,
		...createAccountInitialState,
		...updateAccountInitialState,
		...updatePasswordInitialState,
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
		authenticateUserBuilder(builder);
		reauthenticateUserBuilder(builder);
		logoutBuilder(builder);
		createAccountBuilder(builder);
		updateAccountBuilder(builder);
		updatePasswordBuilder(builder);
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

export const logoutMiddlewareFunction = getLogoutMiddleware(dequeuePopup);
