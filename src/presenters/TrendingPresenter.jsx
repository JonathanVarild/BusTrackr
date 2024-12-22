import Trending from "../views/TrendingView";
import { useDispatch, useSelector } from "react-redux";
import { setShowTrending } from "../store/interface";

function TrendingPresenter(props) {
	const dispatch = useDispatch();
	const showTrending = useSelector((state) => state.interface.showTrending);
	const trendingData = useSelector((state) => state.interface.trendingBuses);

	if (!showTrending) {
		return <></>;
	}

	return <Trending onCloseClick={onCloseClickACB} trendingData={trendingData} buses={trendingData.buses} />;

	function onCloseClickACB() {
		dispatch(setShowTrending(false));
	}
}

export default TrendingPresenter;
