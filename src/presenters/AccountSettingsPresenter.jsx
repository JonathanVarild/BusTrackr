import AccountSettingsView from "../views/AccountSettingsView";

import { useSelector, useDispatch } from "react-redux";
import { openAccountSetting, setChangedUserInfo, queuePopup } from "../store/interface";
import { updateUserAccount } from "../store/interface/updateAccount";
import { updateUserPassword } from "../store/interface/updatePassword";

function AccountSettingsPresenter(props) {
	const accountSettingOpen = useSelector((state) => state.interface.accountSettingOpen);
	const userInfo = useSelector((state) => state.interface.authenticate.userInfo);
	const changedUserInfo = useSelector((state) => state.interface.changedUserInfo);
	const dispatch = useDispatch();

	return (
		<AccountSettingsView
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
			updateAccountPassword={updateAccountPasswordACB}
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
		dispatch(updateUserAccount());
	}

	function updateAccountPasswordACB() {
		if (!changedUserInfo.oldPassword) {
			dispatch(
				queuePopup({
					title: "Failed to update password",
					message: "Please enter your current password.",
					type: 0,
				})
			);
			return;
		}

		if (!changedUserInfo.newPassword) {
			dispatch(
				queuePopup({
					title: "Failed to update password",
					message: "Please enter a new password.",
					type: 0,
				})
			);
			return;
		}

		if (!changedUserInfo.repeatPassword || changedUserInfo.newPassword != changedUserInfo.repeatPassword) {
			dispatch(
				queuePopup({
					title: "Failed to update password",
					message: "New password does not match with repeated password.",
					type: 0,
				})
			);
			return;
		}

		dispatch(updateUserPassword());
	}

	function logoutUserACB() {
		dispatch(
			queuePopup({
				title: "Sign out",
				message: "Are you sure that you want to sign out from your user account?",
				type: 1,
				continueAction: "LogoutUser",
			})
		);
	}
}

export default AccountSettingsPresenter;
