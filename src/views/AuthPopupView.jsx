import { IconChevronLeft, IconUserScan, IconUserPlus, IconX } from "@tabler/icons-react";
import styles from "../css/AuthPopup.module.css";
import LoadingSpinnerView from "./LoadingSpinnerView";

function AuthPopupView(props) {
	if (props.currentView === null) return;

	const loading = props.loginLoading || props.signupLoading;

	return (
		<div id={styles.authPopupBackground}>
			<div id={styles.authWindow} className="rounded-corners drop-shadow">
				<div className={styles.header}>
					<button onClick={closeAuthWindowACB} id={styles.mobileBackButton} disabled={loading}>
						<IconChevronLeft stroke={2} />
						Exit
					</button>
					<button onClick={closeAuthWindowACB} id={styles.desktopBackButton} disabled={loading}>
						<IconX stroke={2} />
					</button>
				</div>
				{props.currentView == "login" ? renderLoginForm() : renderSignupForm()}
			</div>
		</div>
	);

	function renderInputCB(input) {
		function onChangeACB(event) {
			if (input.isSignUp) {
				props.onChangeSignupInput(input.state, input.type === "checkbox" ? event.target.checked : event.target.value);
			} else {
				props.onChangeLoginInput(input.state, input.type === "checkbox" ? event.target.checked : event.target.value);
			}
		}

		let value;

		if (input.isSignUp) {
			value = props.authPopupForm.signup[input.state];
		} else {
			value = props.authPopupForm.login[input.state];
		}

		if (input.type === "checkbox") {
			return (
				<label key={input.id} className={input.noBottomMargin && styles.noBottomMargin}>
					<input type={input.type} name={input.id} className="input-checkmark" autoComplete={input.autoComplete} onChange={onChangeACB} checked={value} />
					{input.content || input.renderContent()}
				</label>
			);
		}

		return (
			<label key={input.id} htmlFor={input.id}>
				{input.title}
				<input type={input.type} id={input.id} className="form-input" autoComplete={input.autoComplete} maxLength={input.maxLength} onChange={onChangeACB} value={value} />
			</label>
		);
	}

	function renderLoginForm() {
		const inputs = [
			{ state: "email", id: "email", title: "Email:", type: "text", autoComplete: "email", maxLength: 120 },
			{ state: "password", id: "password", title: "Password:", type: "password", autoComplete: "current-password", maxLength: 120 },
			{ state: "rememberMe", id: "rememberMe", content: "Keep me logged in longer", type: "checkbox" },
		];

		return (
			<>
				<div className={styles.iconContainer}>
					<IconUserScan stroke={1.2} />
					Account Login
				</div>
				<form id={styles.loginForm} className={styles.contentContainer}>
					{inputs.map(renderInputCB)}

					{props.loginFault && <div className="input-text warning-text">{props.loginFault}</div>}

					<div id={styles.authActions}>
						<button onClick={authenticateUserACB} type="button">
							Login
						</button>
						<button onClick={openSignUpACB} type="button">
							Sign up
						</button>
					</div>
					{props.loginLoading && <LoadingSpinnerView />}
				</form>
			</>
		);
	}

	function renderSignupForm() {
		function renderTermsOfService() {
			return (
				<>
					I accept the{" "}
					<a href="/terms-of-service" target="blank_">
						{"Terms of Service"}
					</a>
				</>
			);
		}

		function renderDataPolicy() {
			return (
				<>
					I accept the{" "}
					<a href="/data-policy" target="blank_">
						{"Data Policy"}
					</a>
				</>
			);
		}

		const inputs = [
			{ state: "username", id: "new-username", title: "Username:", type: "text", autoComplete: "username", maxLength: 20, isSignUp: true },
			{ state: "email", id: "new-email", title: "Email:", type: "text", autoComplete: "email", maxLength: 120, isSignUp: true },
			{ state: "dateOfBirth", id: "dateOfBirth", title: "Date of birth:", type: "date", autoComplete: "bday", isSignUp: true },
			{ state: "password", id: "password-new", title: "Password:", type: "password", autoComplete: "new-password", maxLength: 120, isSignUp: true },
			{ state: "repeatPassword", id: "password-repeat", title: "Repeat password:", type: "password", autoComplete: "new-password", maxLength: 120, isSignUp: true },
			{ state: "termsOfService", id: "termsOfService", renderContent: renderTermsOfService, type: "checkbox", noBottomMargin: true, isSignUp: true },
			{ state: "dataPolicy", id: "dataPolicy", renderContent: renderDataPolicy, type: "checkbox", isSignUp: true },
			{ state: "rememberMe", id: "rememberMe", content: "Keep me logged in longer", type: "checkbox", isSignUp: true },
		];

		return (
			<>
				<div className={styles.iconContainer}>
					<IconUserPlus stroke={1.2} />
					Create Account
				</div>
				<form id={styles.loginForm} className={styles.contentContainer}>
					{inputs.map(renderInputCB)}

					{props.signupFault && <div className="input-text warning-text">{props.signupFault}</div>}
					<div id={styles.authActions}>
						<button onClick={createUserACB} type="button">
							Create account
						</button>
						<button onClick={openLoginACB} type="button">
							Use existing account
						</button>
					</div>
					{props.signupLoading && <LoadingSpinnerView />}
				</form>
			</>
		);
	}

	function closeAuthWindowACB() {
		props.setCurrentView(null);
	}

	function openSignUpACB() {
		props.setCurrentView("signup");
	}

	function openLoginACB() {
		props.setCurrentView("login");
	}

	function authenticateUserACB() {
		props.onLoginUser();
	}

	function createUserACB() {
		props.onCreateUser();
	}
}

export default AuthPopupView;
