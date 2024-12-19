import AccountSettings from "../components/AccountSettings";

import { useSelector, useDispatch } from "react-redux";
import { openAccountSetting, setChangedUserInfo, queuePopup, updateUserAccount } from "../store/interface";

function AccountSettingsPresenter(props) {
	const accountSettingOpen = useSelector((state) => state.interface.accountSettingOpen);
	const userInfo = useSelector((state) => state.interface.authenticate.userInfo);
	const changedUserInfo = useSelector((state) => state.interface.changedUserInfo);
	const dispatch = useDispatch();

	return (
		<AccountSettings
			settingOpen={accountSettingOpen}
			openSettingID={openSettingItemACB}
			userInfo={userInfo}
			changedUserInfo={changedUserInfo}
			setChangedUserInfo={updateChangedDataACB}
			reverseChanges={revertSettingChangedACB}
			showUnsavedWarning={showUnsavedWarningACB}
			showDeleteAccountWarning={showDeleteAccountWarningACB}
			logout={logoutUserACB}
			saveAccountChanges={saveAccountChangesACB}
		/>
	);

	function updateChangedDataACB(data) {
		dispatch(setChangedUserInfo(data));
	}

	function openSettingItemACB(itemID) {
		dispatch(openAccountSetting(itemID));
	}

	function revertSettingChangedACB() {
		dispatch(
			queuePopup({
				title: "Revert changes",
				message: "Are you sure that you want to revert the changes you have made?",
				type: 1,
				continueAction: "RevertSettingChanges",
			})
		);
	}

	function showUnsavedWarningACB() {
		dispatch(
			queuePopup({
				title: "Unsaved changes",
				message: "Please save or revert your changes before going back.",
				type: 0,
			})
		);
	}

	function showDeleteAccountWarningACB() {
		dispatch(
			queuePopup({
				title: "Delete Account",
				message:
					"Are you sure that you want to delete your account? This action will remove all your account information including personal details, favorites, etc. This action is impossible to revert once fullfilled.",
				type: 1,
				continueAction: "DeleteAccount",
				abortAction: "AbortDeleteAccount",
			})
		);
	}

	function saveAccountChangesACB() {
		dispatch(updateUserAccount())
	}

	function logoutUserACB() {
		dispatch(
			queuePopup({
				title: "Sign out",
				message:
					"Are you sure that you want to sign out from your user account?",
				type: 1,
				continueAction: "LogoutUser",
			})
		);
	}
}

export default AccountSettingsPresenter;
