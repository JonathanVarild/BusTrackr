import NavbarView from "../components/NavbarView";

import { useSelector, useDispatch } from "react-redux";
import { toggleNavigation, openAccountSetting } from "../store/interface";

function Navbar(props) {
	const dispatch = useDispatch();
	const isNavOpen = useSelector((state) => state.interface.navigationOpen);

	const toggleNavACB = () => {
		dispatch(toggleNavigation());
	};

	function openAccountSettingsACB() {
		dispatch(openAccountSetting("menu"));
	}

	return <NavbarView isNavOpen={isNavOpen} onToggleNav={toggleNavACB} onOpenAccountSettings={openAccountSettingsACB} />;
}

export default Navbar;
