import AuthPopup from "../components/AuthPopup";

import { setAuthPopup, updateLoginForm, updateSignupForm } from "../store/interface";
import { useSelector, useDispatch } from "react-redux";

function AuthPopupPresenter(props) {
	const currentView = useSelector((state) => state.interface.authPopup);
	const authPopupForm = useSelector((state) => state.interface.authPopupForm);
	const dispatch = useDispatch();

	return (
		<AuthPopup
			setCurrentView={SetCurrentViewACB}
			currentView={currentView}
			authPopupForm={authPopupForm}
			onChangeLoginInput={onChangeLoginInputACB}
			onChangeSignupInput={onChangeSignupInputACB}
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
}

export default AuthPopupPresenter;
