import TrendingView from "../views/TrendingView";
import { useDispatch, useSelector } from "react-redux";
import { setShowTrending } from "../store/interface";

function Trending(props) {
	const dispatch = useDispatch();
	const showTrending = useSelector((state) => state.interface.showTrending);
	const trendingData = useSelector((state) => state.interface.trendingBuses);

	if (!showTrending) {
		return <></>;
	}

	return <TrendingView onCloseClick={onCloseClickACB} trendingData={trendingData} />;

	function onCloseClickACB() {
		dispatch(setShowTrending(false));
	}
}

export default Trending;
