import { createSlice } from "@reduxjs/toolkit";

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		navigationOpen: false,
		queuedPopups: [],
		accountSettingOpen: null,
		userInfo: {
			username: "ExampleUser",
			email: "firstname.lastname@example.com",
			dateOfBirth: "2000-01-01",
			lastLoginTime: "YYYY-MM-DD HH:MM:SS",
			lastLoginFrom: "192.168.1.1",
			termsOfServiceAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
			dataPolicyAccepted: "Accepted YYYY-MM-DD HH:MM:SS from 192.168.1.1",
			accountCreated: "YYYY-MM-DD HH:MM:SS",
			lastReportGenerated: "YYYY-MM-DD HH:MM:SS",
		},
		changedUserInfo: null,
	},
	reducers: {
		toggleNavigation: (state) => {
			state.navigationOpen = !state.navigationOpen;
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
				case "LogoutUser":
					console.log("User wants to log out!");
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
	},
});

export const { toggleNavigation, queuePopup, dequeuePopup, openAccountSetting, userInfo, setChangedUserInfo } = interfaceSlice.actions;

export default interfaceSlice.reducer;
