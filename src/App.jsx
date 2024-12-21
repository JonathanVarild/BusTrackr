import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { reauthenticateUser } from "./store/interface/authentication";

import Navbar from "./presenters/NavbarPresenter";
import Map from "./presenters/MapPresenter";
import About from "./presenters/AboutPresenter";
import Attribution from "./presenters/AttributionPresenter";
import AccountSettingsPresenter from "./presenters/AccountSettingsPresenter";
import PopupBox from "./presenters/PopupBoxPresenter";
import AuthPopupPresenter from "./presenters/AuthPopupPresenter";
import DataReport from "./presenters/DataReportPresenter";
import LoadingSpinnerView from "./views/LoadingSpinnerView";

import "./css/global.css";

function App() {
	const reauthStatus = useSelector((state) => state.interface.reauthenticate.status);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(reauthenticateUser());
	}, [dispatch]);

	console.log(reauthStatus);

	return (
		<>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route index element={<Map />} />
					<Route path="about" element={<About />} />
					<Route path="attribution" element={<Attribution />} />
					<Route path="data-report" element={<DataReport />} />
				</Routes>
			</BrowserRouter>
			<AccountSettingsPresenter />
			<AuthPopupPresenter />
			<PopupBox />
			{reauthStatus === "loading" && <LoadingSpinnerView />}
		</>
	);
}

export default App;
