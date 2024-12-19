import AuthPopup from "../components/AuthPopup";

import { authenticateUser, createUserAccount, setAuthPopup, updateLoginForm, updateSignupForm } from "../store/interface";
import { useSelector, useDispatch } from "react-redux";

function AuthPopupPresenter(props) {
	const currentView = useSelector((state) => state.interface.authPopup);
	const authPopupForm = useSelector((state) => state.interface.authPopupForm);
	const loginFault = useSelector((state) => state.interface.authenticate.error);
	const signupFault = useSelector((state) => state.interface.createUser.error);
	const dispatch = useDispatch();

	return (
		<AuthPopup
			setCurrentView={SetCurrentViewACB}
			currentView={currentView}
			authPopupForm={authPopupForm}
			onChangeLoginInput={onChangeLoginInputACB}
			onChangeSignupInput={onChangeSignupInputACB}
			onLoginUser={onLoginUserACB}
			onCreateUser={onCreateUserACB}
			loginFault={authPopupForm.login.fault}
			signupFault={authPopupForm.signup.fault}
		/>
	);

	function SetCurrentViewACB(view) {
		dispatch(setAuthPopup(view));
	}

	function onChangeLoginInputACB(id, value) {
		dispatch(updateLoginForm({ [id]: value }));
	}

	function onChangeSignupInputACB(id, value) {
		dispatch(updateSignupForm({ [id]: value }));
	}

	function onLoginUserACB() {
		dispatch(authenticateUser());
	}

	function onCreateUserACB() {
		if (authPopupForm.signup.username.length < 3) {
			dispatch(updateSignupForm({ fault: "Username must be at least 3 characters." }));
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(authPopupForm.signup.email)) {
			dispatch(updateSignupForm({ fault: "Invalid email format." }));
			return;
		}

		if (authPopupForm.signup.password.length < 5) {
			dispatch(updateSignupForm({ fault: "Password must be at least 5 characters." }));
			return;
		}

		if (authPopupForm.signup.password !== authPopupForm.signup.repeatPassword) {
			dispatch(updateSignupForm({ fault: "Repeated password is not the same password." }));
			return;
		}

		if (!authPopupForm.signup.termsOfService || !authPopupForm.signup.dataPolicy) {
			dispatch(updateSignupForm({ fault: "You must accept the Terms of Service and Data Policy." }));
			return;
		}
		

		dispatch(createUserAccount());
	}
}

export default AuthPopupPresenter;