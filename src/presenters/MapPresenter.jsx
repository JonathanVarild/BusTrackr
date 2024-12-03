import React from "react";
import MapControls from "../components/MapControls";
import SearchBar from "../components/MapSearchBar";
import MapShortcuts from "../components/MapShortcuts";

function Map(props) {
	return (
		<>
			<div>This is the map...</div>
			<MapControls />
			<SearchBar />
			<MapShortcuts />
		</>
	);
}

export default Map;
