import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/global.css";
import NavbarPresenter from "./presenters/NavbarPresenter";
import MapRoute from "./routes/MapRoute";
import AboutRoute from "./routes/AboutRoute";
import AttributionRoute from "./routes/AttributionRoute";
import CounterTestRoute from "./routes/CounterTestRoute";

function App(props) {
	return (
		<>
			<NavbarPresenter />
			<BrowserRouter>
				<Routes>
					<Route index element={<MapRoute />} />
					<Route path="about" element={<AboutRoute />} />
					<Route path="attribution" element={<AttributionRoute />} />
					<Route path="reduxtest" element={<CounterTestRoute />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
