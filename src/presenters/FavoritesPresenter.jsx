import FavoritesView from "../views/FavoritesView";
import { useDispatch, useSelector } from "react-redux";
import { setShowFavorites } from "../store/interface";
import { removeFavorite } from "../store/interface/favorites";
import { setShowOnlyRouteId } from "../store/mapData";
import { fetchLiveVehicles } from "../store/mapData/liveVehicles";

function Favorites(props) {
	const dispatch = useDispatch();
	const showFavorites = useSelector((state) => state.interface.showFavorites);
	const favorites = useSelector((state) => state.interface.favorites.list);

	if (!showFavorites) {
		return <></>;
	}

	return (
		<FavoritesView
			favorites={favorites}
			onCloseClick={onCloseClickACB}
			onUnfavorite={onUnfavoriteACB}
			showOnly={showOnlyACB}
		/>
	);

	function showOnlyACB(route_id) {
		dispatch(setShowOnlyRouteId(route_id));
		dispatch(fetchLiveVehicles());
	}

	function onCloseClickACB() {
		dispatch(setShowFavorites(false));
		dispatch(setShowOnlyRouteId(null));
		dispatch(fetchLiveVehicles());
	}

	function onUnfavoriteACB(route_id) {
		dispatch(removeFavorite({route_id}));
	}
}

export default Favorites;
