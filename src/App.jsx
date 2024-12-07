import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/global.css";
import Navbar from "./presenters/NavbarPresenter";
import Map from "./presenters/MapPresenter";
import About from "./presenters/About";
import Attribution from "./presenters/AttributionPresenter";
import CounterTest from "./presenters/CounterTest";
import MapDataDebugPresenter from "./presenters/MapDataDebugPresenter";

function App(props) {
	return (
		<>
			<Navbar />
			<BrowserRouter>
				<Routes>
					<Route index element={<Map />} />
					<Route path="about" element={<About />} />
					<Route path="attribution" element={<Attribution />} />
					<Route path="reduxtest" element={<CounterTest />} />
					<Route path="mapdebug" element={<MapDataDebugPresenter />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
