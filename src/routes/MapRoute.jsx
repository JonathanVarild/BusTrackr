import React from "react";
import MapControlsPresenter from "../presenters/MapControlsPresenter";
import SearchBarPresenter from "../presenters/MapSearchBarPresenter";
import MapShortcutsPresenter from "../presenters/MapShortcutsPresenter";

function MapRoute(props) {
	return (
		<>
			<div>This is the map...</div>
			<MapControlsPresenter />
			<SearchBarPresenter />
			<MapShortcutsPresenter />
		</>
	);
}

export default MapRoute;
