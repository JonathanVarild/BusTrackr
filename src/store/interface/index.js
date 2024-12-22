import { createSlice } from "@reduxjs/toolkit";

import { authInitialState, authenticateUserBuilder, reauthenticateUserBuilder } from "./authentication";
import { logoutInitialState, logoutBuilder, getLogoutMiddleware } from "./logout";
import { createAccountInitialState, createAccountBuilder } from "./createAccount";
import { updateAccountInitialState, updateAccountBuilder } from "./updateAccount";
import { updatePasswordInitialState, updatePasswordBuilder } from "./updatePassword";
import { searchInitialState, searchBuilder } from "./search";
import { trendingBuilder, trendingInitalState } from "./trending";
import { deleteAccountBuilder, deleteAccountInitialState, getDeleteAccountMiddleware } from "./deleteAccount";
import { dataReportBuilder, dataReportInitalState } from "./dataReport";
import { favoritesBuilder, favoritesInitialState } from "./favorites";
import { shuffleBusBuilder, shuffleBusInitialState } from "./shuffleBus";

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
		searchMode: "stop",
		searchQuery: null,
		showBoxWidget: false,
		lastClickedType: null,
		showTrending: false,
		showFavorites: false,

		...authInitialState,
		...logoutInitialState,
		...createAccountInitialState,
		...updateAccountInitialState,
		...updatePasswordInitialState,
		...searchInitialState,
		...trendingInitalState,
		...deleteAccountInitialState,
		...dataReportInitalState,
		...favoritesInitialState,
		...shuffleBusInitialState,
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
				case "RevertSettingChanges":
					state.changedUserInfo = null;
					break;
				case "NoLongerInactive":
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
		setShowBoxWidget: (state, action) => {
			state.showBoxWidget = action.payload;
		},
		setLastClickedType: (state, action) => {
			state.lastClickedType = action.payload;
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
		setShowTrending: (state, action) => {
			state.showTrending = action.payload;
		},
		setShowFavorites: (state, action) => {
			state.showFavorites = action.payload;
		},
	},
	extraReducers: (builder) => {
		authenticateUserBuilder(builder);
		reauthenticateUserBuilder(builder);
		logoutBuilder(builder);
		createAccountBuilder(builder);
		updateAccountBuilder(builder);
		updatePasswordBuilder(builder);
		searchBuilder(builder);
		trendingBuilder(builder);
		deleteAccountBuilder(builder);
		dataReportBuilder(builder);
		favoritesBuilder(builder);
		shuffleBusBuilder(builder);
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
	setShowBoxWidget,
	setLastClickedType,
	setSearchQuery,
	setShowTrending,
	setShowFavorites,
} = interfaceSlice.actions;

export default interfaceSlice.reducer;

export const logoutMiddlewareFunction = getLogoutMiddleware(dequeuePopup);
export const deleteAccountMiddlewareFunction = getDeleteAccountMiddleware(dequeuePopup);
