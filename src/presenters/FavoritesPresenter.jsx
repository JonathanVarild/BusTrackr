import FavoritesView from "../views/FavoritesView";
import { useDispatch, useSelector } from "react-redux";
import { setShowFavorites } from "../store/interface";

function Favorites(props) {
	const dispatch = useDispatch();
	const showFavorites = useSelector((state) => state.interface.showFavorites);
	//const trendingData = useSelector((state) => state.interface.trendingBuses);

	if (!showFavorites) {
		return <></>;
	}

	return <FavoritesView onCloseClick={onCloseClickACB} onUnfavorite={onUnfavoriteACB} />;

	function onCloseClickACB() {
		dispatch(setShowFavorites(false));
	}

	function onUnfavoriteACB(routeID) {}
}

export default Favorites;
