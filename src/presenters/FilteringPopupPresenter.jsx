import { useDispatch, useSelector } from "react-redux";
import FilteringPopupView from "../views/FilteringPopupView";
import { setShowOnlyRouteId } from "../store/mapData";
import { fetchLiveVehicles } from "../store/mapData/liveVehicles";

function FilteringPopup(props) {
	const dispatch = useDispatch();
	const routeID = useSelector((state) => state.mapData.showOnlyRouteId);

	if (routeID === null) {
		return <></>;
	}

	return <FilteringPopupView stopFiltering={stopFilteringACB} />;

	function stopFilteringACB() {
		dispatch(setShowOnlyRouteId(null));
		dispatch(fetchLiveVehicles());
	}
}

export default FilteringPopup;
