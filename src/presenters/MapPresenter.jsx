import { useRef } from "react";

import MapControls from "../components/MapControls";
import SearchBar from "../components/MapSearchBar";
import MapShortcuts from "../components/MapShortcuts";

import { RMap, ROSM, RLayerVector, RFeature } from "rlayers";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Stroke, Circle, Fill } from "ol/style";
import { LineString, Point } from "ol/geom";
import "ol/ol.css";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/counter";
import { updateScreenTopLeft, updateScreenBottomRight, fetchQuays } from "../store/mapData";

import coordinates from "../tmp/lineCords";

const center = fromLonLat([18.06478765050284, 59.3262518657495]);

function Map(props) {
	const mapRef = useRef(null);

	const count = useSelector((state) => state.counter.count);
	const quays = useSelector((state) => state.mapData.quays.list);
	const dispatch = useDispatch();

	const lineString = new LineString(coordinates.map((coord) => fromLonLat(coord)));
	const blipCircle = new Point(fromLonLat(coordinates[count]));

	const lineStyle = new Style({
		stroke: new Stroke({
			color: "red",
			width: 8,
		}),
	});

	const blipStyle = new Style({
		image: new Circle({
			radius: 7,
			fill: new Fill({ color: "red" }),
			stroke: new Stroke({ color: "darkred", width: 2 }),
		}),
	});

	return (
		<>
			<RMap ref={mapRef} width={"100%"} height={"100vh"} initial={{ center: center, zoom: 11 }} noDefaultControls={true} onMoveEnd={updateQuaysACB}>
				<ROSM />
				<RLayerVector>
					<RFeature
						geometry={lineString}
						style={lineStyle}
						onClick={() => {
							dispatch(increment());
						}}
					/>
					<RFeature geometry={blipCircle} style={blipStyle} />
				</RLayerVector>

				<RLayerVector>
					{Object.values(quays).map((quay) => (
						<RFeature
							key={quay.id}
							geometry={new Point(fromLonLat([quay.location.longitude, quay.location.latitude]))}
							style={
								new Style({
									image: new Circle({
										radius: 3,
										fill: new Fill({ color: "blue" }),
										stroke: new Stroke({ color: "darkblue", width: 1 }),
									}),
								})
							}
						/>
					))}
				</RLayerVector>
			</RMap>
			<MapControls />
			<SearchBar />
			<MapShortcuts />
		</>
	);

	function updateQuaysACB() {
		const map = mapRef.current?.ol;

		if (map) {
			const mapExtent = map.getView().calculateExtent(map.getSize());

			const topLeft = toLonLat([mapExtent[0], mapExtent[3]]);
			const bottomRight = toLonLat([mapExtent[2], mapExtent[1]]);

			dispatch(updateScreenTopLeft({ latitude: topLeft[1], longitude: topLeft[0] }));
			dispatch(updateScreenBottomRight({ latitude: bottomRight[1], longitude: bottomRight[0] }));
			dispatch(fetchQuays());
		}
	}
}

export default Map;
