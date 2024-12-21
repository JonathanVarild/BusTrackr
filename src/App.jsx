import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { reauthenticateUser } from "./store/interface/authentication";

import Navbar from "./presenters/NavbarPresenter";
import Map from "./presenters/MapPresenter";
import About from "./presenters/About";
import Attribution from "./presenters/AttributionPresenter";
import AccountSettingsPresenter from "./presenters/AccountSettingsPresenter";
import PopupBox from "./presenters/PopupBoxPresenter";
import AuthPopupPresenter from "./presenters/AuthPopupPresenter";

import "./css/global.css";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reauthenticateUser());
	}, [dispatch]);

	return (
		<>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route index element={<Map />} />
					<Route path="about" element={<About />} />
					<Route path="attribution" element={<Attribution />} />
				</Routes>
			</BrowserRouter>
			<AccountSettingsPresenter />
			<AuthPopupPresenter />
			<PopupBox />
		</>
	);
}

export default App;
