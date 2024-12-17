import NavbarView from "../components/NavbarView";

import { useSelector, useDispatch } from "react-redux";
import { toggleNavigation, openAccountSetting, setAuthPopup } from "../store/interface";

function Navbar(props) {
	const dispatch = useDispatch();
	const isNavOpen = useSelector((state) => state.interface.navigationOpen);
	const userInfo = useSelector((state) => state.interface.userInfo);

	const toggleNavACB = () => {
		dispatch(toggleNavigation());
	};

	function openAccountSettingsACB() {
		dispatch(openAccountSetting("menu"));
	}

	function openAuthenticationPopupACB() {
		dispatch(setAuthPopup("login"));
	}

	return (
		<NavbarView
			isNavOpen={isNavOpen}
			onToggleNav={toggleNavACB}
			userInfo={userInfo}
			onOpenAccountSettings={openAccountSettingsACB}
			onOpenAuthentication={openAuthenticationPopupACB}
		/>
	);
}

export default Navbar;
