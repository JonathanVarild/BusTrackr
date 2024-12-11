import { createSlice } from "@reduxjs/toolkit";

const interfaceSlice = createSlice({
	name: "interface",
	initialState: {
		navigationOpen: false,
		queuedPopups: [],
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
			}

			state.queuedPopups.shift();
		},
	},
});

export const { toggleNavigation, queuePopup, dequeuePopup } = interfaceSlice.actions;

export default interfaceSlice.reducer;
