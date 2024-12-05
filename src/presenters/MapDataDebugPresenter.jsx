import { useSelector, useDispatch } from "react-redux";
import { updateScreenTopLeft, updateScreenBottomRight, fetchQuays } from "../store/mapData";
import MapDataDebug from "../components/MapDataDebug";

function MapDataDebugPresenter() {
    const screenBoundary = useSelector((state) => state.mapData.screenBoundary);
    const quays = useSelector((state) => state.mapData.quays.list);
    const dispatch = useDispatch();

    return (
        <MapDataDebug
                screenBoundary={screenBoundary}
                updateTopLeft={updateTopLeftACB}
                updateBottomRight={updateBottomRightACB}
                quays={quays} />
    )

    function updateTopLeftACB(value) {
        dispatch(updateScreenTopLeft(value));
        dispatch(fetchQuays());
    }

    function updateBottomRightACB(value) {
        dispatch(updateScreenBottomRight(value));
        dispatch(fetchQuays());
    }
}


export default MapDataDebugPresenter;