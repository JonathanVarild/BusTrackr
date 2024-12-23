import { lastClickedTypes } from "../store/interface/utilities";
import { useDispatch, useSelector } from "react-redux";

import { setShowBoxWidget, updateLastInteraction } from "../store/interface";
import { addFavorite, removeFavorite } from "../store/interface/favorites";
import { fetchSearchResult } from "../store/interface/search";

import { setShowOnlyRouteId } from "../store/mapData";
import { fetchLiveVehicles } from "../store/mapData/liveVehicles";

import BusJourneyInfo from "../views/BusJourneyInfoView";
import SearchResultsView from "../views/SearchResultsView";
import TrendingView from "../views/TrendingView";
import FavoritesView from "../views/FavoritesView";

function BoxWidget(props) {
	const dispatch = useDispatch();

	const showBoxWidget = useSelector((state) => state.interface.showBoxWidget);
	const lastClickedType = useSelector((state) => state.interface.lastClickedType);
	const trendingData = useSelector((state) => state.interface.trendingBuses);
	const favoritesStatus = useSelector((state) => state.interface.favorites.status);
	const favoritesError = useSelector((state) => state.interface.favorites.error);
	const favoritesData = useSelector((state) => state.interface.favorites.list);
	const searchStatus = useSelector((state) => state.interface.search.status);
	const searchQuery = useSelector((state) => state.interface.searchQuery);
	const searchResults = useSelector((state) => state.interface.search.results);

	const liveVehicles = useSelector((state) => state.mapData.liveVehicles.list);
	const journeyDetails = useSelector((state) => state.mapData.journeyDetails.details);
	const journeyDetailsStatus = useSelector((state) => state.mapData.journeyDetails.status);
	const selectedLiveVehicleId = useSelector((state) => state.mapData.selectedLiveVehicleId);

	if (!showBoxWidget) {
		return <></>;
	}

	switch (lastClickedType) {
		case lastClickedTypes.VEHICLE:
			return (
				<BusJourneyInfo
					journeyDetails={journeyDetails}
					journeyDetailsStatus={journeyDetailsStatus}
					selectedLiveVehicleId={selectedLiveVehicleId}
					liveVehicles={liveVehicles}
					onCloseClick={closeBoxWidgetACB}
					onFavoriteClick={favoriteClickedACB}
					favoriteRoutes={favoritesData}
				/>
			);
		case lastClickedTypes.SEARCH:
			return (
				<SearchResultsView
					searchStatus={searchStatus}
					onCloseClick={closeBoxWidgetACB}
					onFavoriteClick={closeBoxWidgetACB}
					searchResults={searchResults}
					performSearchRelative={performSearchRelativeACB}
                    searchQuery={searchQuery}
				/>
			);
		case lastClickedTypes.TRENDING:
			return <TrendingView onCloseClick={closeBoxWidgetACB} trendingData={trendingData} />;
		case lastClickedTypes.FAVORITES:
			return <FavoritesView status={favoritesStatus} error={favoritesError} favorites={favoritesData} onCloseClick={closeBoxWidgetACB} onUnfavorite={onUnfavoriteACB} showOnly={showOnlyACB} />;
		default:
			return <></>;
	}

	function favoriteClickedACB() {
		const route_id = journeyDetails.route_id;
		if (favoritesData && route_id in favoritesData) {
			dispatch(removeFavorite({ route_id }));
		} else {
			dispatch(addFavorite({ route_id }));
		}
		dispatch(updateLastInteraction());
	}

	function performSearchRelativeACB(direction) {
		dispatch(updateLastInteraction());
		const newPage = searchResults.page + direction;
		dispatch(fetchSearchResult({ query: searchQuery, page: newPage }));
	}

	function showOnlyACB(route_id) {
		dispatch(setShowOnlyRouteId(route_id));
		dispatch(fetchLiveVehicles());
		dispatch(setShowBoxWidget(false));
	}

	function onUnfavoriteACB(route_id) {
		dispatch(removeFavorite({ route_id }));
	}

	function closeBoxWidgetACB() {
		dispatch(setShowBoxWidget(false));
		dispatch(fetchLiveVehicles());
	}
}

export default BoxWidget;
