import styles from "../css/AccountSettings.module.css";
import { IconUser, IconLock, IconContract, IconDatabase, IconDatabaseX, IconSettings, IconChevronLeft, IconLogout } from "@tabler/icons-react";

function AccountSettings(props) {
	const settingsNavTop = [
		{ id: "details", icon: <IconUser stroke={2} />, text: "Account details", renderFunction: renderAccountDetails },
		{ id: "security", icon: <IconLock stroke={2} />, text: "Security", renderFunction: renderSecurity },
		{ id: "agreements", icon: <IconContract stroke={2} />, text: "Agreements", renderFunction: renderAgreements },
	];

	const settingsNavBottom = [
		{ id: "data", icon: <IconDatabase stroke={2} />, text: "My data", renderFunction: renderMyData },
		{ id: "delete", icon: <IconDatabaseX stroke={2} />, text: "Delete account", renderFunction: renderDeleteAcount },
		{ id: "logout", icon: <IconLogout stroke={2} />, text: "Sign out", actionFunction: logoutUserACB },
	];

	return (
		<>
			{props.settingOpen != null && renderMobileView()}
			{props.settingOpen != null && renderDesktopView()}
		</>
	);

	function renderMobileView() {
		function renderSettingsMenu() {
			return (
				<div id={styles.settingsMenu}>
					<div className={styles.header}>
						<button onClick={onExitACB}>
							<IconChevronLeft stroke={2} />
							Exit
						</button>
					</div>
					<div className={styles.iconContainer}>
						<IconSettings stroke={1.2} />
						Account Settings
					</div>
					<div className={styles.settingsList}>{[...settingsNavTop, ...settingsNavBottom].map(renderSettingItemCB)}</div>
				</div>
			);
		}

		function renderSettingPage(item) {
			function onReturnACB() {
				if (props.changedUserInfo !== null) {
					props.showUnsavedWarning();
				} else {
					props.openSettingID("menu");
				}
			}

			return (
				<div className={styles.settingPage}>
					<div className={styles.header}>
						<button onClick={onReturnACB}>
							<IconChevronLeft stroke={2} />
						</button>
						<div className={styles.settingPageTitle}>{item.text}</div>
					</div>
					<div className={styles.settingsContainer}>
						{item.renderFunction()}
						<div className={styles.actionButtonContainer}>{renderActionButton()}</div>
					</div>
				</div>
			);
		}

		return (
			<div id={styles.accountSettingsMobileView} className={styles.accountSettings}>
				{props.settingOpen === "menu" ? renderSettingsMenu() : renderSettingPage([...settingsNavTop, ...settingsNavBottom].find(findSettingByIDCB))}
			</div>
		);
	}

	function renderDesktopView() {
		function renderSettingPage(item) {
			return (
				<div className={styles.settingPage}>
					<div className={styles.header}>
						<div className={styles.settingPageTitle}>{item.text}</div>
					</div>
					<div className={styles.settingsContainer}>
						{item.renderFunction()}
						<div className={styles.actionButtonContainer}>{renderActionButton()}</div>
					</div>
				</div>
			);
		}

		return (
			<div id={styles.accountSettingsDesktopView} className={styles.accountSettings}>
				<div id={styles.settingWindow} className="rounded-corners drop-shadow">
					<div className={styles.settingsListContainer}>
						<div className={styles.settingsList}>{settingsNavTop.map(renderSettingItemCB)}</div>
						<div className={styles.settingsList}>{settingsNavBottom.map(renderSettingItemCB)}</div>
					</div>
					{props.settingOpen === "menu" ? renderSettingPage(settingsNavTop[0]) : renderSettingPage([...settingsNavTop, ...settingsNavBottom].find(findSettingByIDCB))}
				</div>
			</div>
		);
	}

	function onExitACB() {
		props.openSettingID(null);
	}

	function findSettingByIDCB(setting) {
		return setting.id === props.settingOpen;
	}

	function renderActionButton() {
		function onSaveACB() {}

		function onRevertACB() {
			props.reverseChanges();
		}

		if (props.changedUserInfo !== null) {
			return (
				<>
					<button className={styles.revertButton} onClick={onRevertACB}>
						Revert changes
					</button>
					<button className={styles.saveButton} onClick={onSaveACB}>
						Save changes
					</button>
				</>
			);
		} else {
			return (
				<button className={styles.closeButton} onClick={onExitACB}>
					Exit settings
				</button>
			);
		}
	}

	function renderSettingItemCB(item) {
		function onClickItemACB() {
			if (item.renderFunction != null) {
				props.openSettingID(item.id);
			} else {
				item.actionFunction();
			}
		}

		return (
			<button
				key={item.id}
				onClick={onClickItemACB}
				className={item.id === props.settingOpen || (props.settingOpen === "menu" && item.id === settingsNavTop[0].id) ? styles.selectedItem : ""}
			>
				{item.icon}
				{item.text}
			</button>
		);
	}

	function renderOptionCB(option) {
		function onChangeACB(event) {
			props.setChangedUserInfo({ [option.id]: event.target.value });
		}

		return (
			<div key={option.id}>
				<div className={styles.inputHeader}>{option.header}</div>
				<input
					type={option.type}
					value={props.changedUserInfo?.[option.id] || props.userInfo[option.id] || ""}
					onChange={onChangeACB}
					disabled={option.disabled}
					maxLength={option.maxLength}
					autoComplete={option.autoComplete}
				/>
			</div>
		);
	}

	function renderAccountDetails() {
		const options = [
			{ id: "username", type: "text", header: "Username:", maxLength: 20, autoComplete: "username" },
			{ id: "email", type: "text", header: "Email:", maxLength: 120, autoComplete: "email" },
			{ id: "dateOfBirth", type: "date", header: "Date of birth:", autoComplete: "dateOfBirth" },
		];

		return <form>{options.map(renderOptionCB)}</form>;
	}

	function renderSecurity() {
		const options = [
			{ id: "lastLoginTime", type: "text", header: "Last logged in:", disabled: true, autoComplete: "off" },
			{ id: "lastLoginFrom", type: "text", header: "Last logged in from:", disabled: true, autoComplete: "off" },
			{ id: "oldPassword", type: "password", header: "Old password:", autoComplete: "current-password" },
			{ id: "newPassword", type: "password", header: "New password:", autoComplete: "new-password" },
			{ id: "repeatPassword", type: "password", header: "Repeat new password:", autoComplete: "new-password" },
		];

		return <form>{options.map(renderOptionCB)}</form>;
	}

	function renderAgreements() {
		const options = [
			{ id: "termsOfServiceAccepted", type: "text", header: "Terms of service:", disabled: true, autoComplete: "off" },
			{ id: "dataPolicyAccepted", type: "text", header: "Data security policy:", disabled: true, autoComplete: "off" },
		];

		return (
			<form>
				{options.map(renderOptionCB)}
				<a href="/terms-of-service" target="blank_">
					Terms of service
				</a>
				<a href="/data-policy" target="blank_">
					Data security policy
				</a>
			</form>
		);
	}

	function renderMyData() {
		const options = [
			{ id: "accountCreated", type: "text", header: "Account created:", disabled: true, autoComplete: "off" },
			{ id: "lastReportGenerated", type: "text", header: "Last report generated:", disabled: true, autoComplete: "off" },
		];

		return (
			<form>
				{options.map(renderOptionCB)}
				<div className={styles.settingText}>
					Generating a data report will give you an overview of all data that we keep which is related to your BusTrackr account. It will not contain internal server
					logs, system diagnostics, or data that cannot be directly linked to your personal account.
				</div>
				<a href="/data-report" target="blank_">
					Generate user data report
				</a>
			</form>
		);
	}

	function renderDeleteAcount() {
		return (
			<div>
				<div className={styles.settingText}>
					<span className={styles.warningText}>Warning:</span> Deleting your account will delete all data which is related to your account and cannot be undone.
				</div>
				<div className={styles.settingText}>Deleted data includes account information, favorites, and account related logs.</div>
				<div className={styles.settingText}>
					We may still keep certain logs such as server logs, agreement logs, and security logs to ensure the safety of our services. These logs will be deleted when
					possible.
				</div>
				<div className={styles.settingText}>For full inforation about our data policy, see the link below.</div>
				<a href="/data-policy" target="blank_">
					Data security policy
				</a>
				<button className={styles.warningText} id={styles.deleteAccountButton} onClick={deleteAccountACB}>
					Delete user account
				</button>
			</div>
		);
	}

	function deleteAccountACB() {
		props.showDeleteAccountWarning();
	}

	function logoutUserACB() {
		props.logout();
	}
}

export default AccountSettings;
