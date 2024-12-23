import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { reauthenticateUser } from "./store/interface/authentication";
import { updateLastInteraction } from "./store/interface";

import Navbar from "./presenters/NavbarPresenter";
import Map from "./presenters/MapPresenter";
import About from "./presenters/AboutPresenter";
import Attribution from "./presenters/AttributionPresenter";
import AccountSettings from "./presenters/AccountSettingsPresenter";
import PopupBox from "./presenters/PopupBoxPresenter";
import AuthPopup from "./presenters/AuthPopupPresenter";
import DataReport from "./presenters/DataReportPresenter";
import LoadingSpinnerView from "./views/LoadingSpinnerView";
import BoxWidget from "./presenters/BoxWidgetPresenter";

import "./css/global.css";
import FilteringPopup from "./presenters/FilteringPopupPresenter";

function App() {
	const reauthStatus = useSelector((state) => state.interface.reauthenticate.status);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reauthenticateUser());
	}, [dispatch]);

	function updateLastInteractionACB() {
		dispatch(updateLastInteraction());
	}

	return (
		<div id="contentWrapper" onClick={updateLastInteractionACB} onScrollCapture={updateLastInteractionACB}>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route index element={<Map />} />
					<Route path="about" element={<About />} />
					<Route path="attribution" element={<Attribution />} />
					<Route path="data-report" element={<DataReport />} />
				</Routes>
			</BrowserRouter>
			<AccountSettings />
			<AuthPopup />
			<BoxWidget />
			<PopupBox />
			<FilteringPopup />
			{reauthStatus === "loading" && <LoadingSpinnerView />}
		</div>
	);
}

export default App;
