import { useRef } from "react";

import MapControls from "../components/MapControls";
import SearchBar from "../components/MapSearchBar";
import MapShortcuts from "../components/MapShortcuts";

import { RMap, RLayerVector, RFeature, RLayerTile } from "rlayers";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Stroke, Circle, Fill, Icon } from "ol/style";
import { LineString, Point } from "ol/geom";
import { boundingExtent } from "ol/extent";

import { useSelector, useDispatch } from "react-redux";
import { increment } from "../store/counter";
import { updateScreenTopLeft, updateScreenBottomRight, fetchQuays, setQuayHovered, setZoomLevel } from "../store/mapData";

import directionPNG from "../media/directions.png";
import coordinates from "../tmp/lineCords";

const center = fromLonLat([18.06478765050284, 59.3262518657495]);

function Map(props) {
	const mapRef = useRef(null);

	const count = useSelector((state) => state.counter.count);
	const quays = useSelector((state) => state.mapData.quays.list);
	const zoom = useSelector((state) => state.mapData.screenBoundary.zoom);
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

	let mapMoveHandlerIsThrottled = false;

	const extent = boundingExtent([fromLonLat([16.08748, 59.90015]), fromLonLat([19.4616, 58.60894])]);

	return (
		<>
			<RMap
				ref={mapRef}
				width={"100%"}
				height={"100vh"}
				initial={{ center: center, zoom: 11 }}
				noDefaultControls={true}
				onPointerDrag={mapMoveACB}
				onMoveEnd={mapMoveACB}
				minZoom={10}
				extent={extent}
			>
				<RLayerTile url={"https://tiles.bustrackr.io/styles/basic/256/{z}/{x}/{y}.webp"} />
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

				<RLayerVector>{Object.values(quays).map(renderQuayBlip)}</RLayerVector>
			</RMap>

			<SearchBar />
			<MapControls />
			<MapShortcuts />
		</>
	);

	function renderQuayBlip(quay) {
		function quayHoverACB() {
			dispatch(setQuayHovered({ id: quay.id, hovered: true }));
			document.body.style.cursor = "pointer";
		}

		function quayUnhoverACB() {
			dispatch(setQuayHovered({ id: quay.id, hovered: false }));
			document.body.style.cursor = "";
		}

		function getBlipCB() {
			if (zoom < 16) {
				return new Style({
					image: new Circle({
						radius: quay?.hovered ? 6 : 4,
						fill: new Fill({ color: "white" }),
						stroke: new Stroke({ color: "#2e7aee", width: 1 }),
					}),
				});
			} else {
				return new Style({
					image: new Icon({
						src: directionPNG,
						scale: quay?.hovered ? 0.35 : 0.3,
						anchor: [0.5, 0.5],
						anchorXUnits: "fraction",
						anchorYUnits: "fraction",
					}),
				});
			}
		}

		return (
			<RFeature
				key={quay.id}
				geometry={new Point(fromLonLat([quay.location.longitude, quay.location.latitude]))}
				style={getBlipCB()}
				onPointerEnter={quayHoverACB}
				onPointerLeave={quayUnhoverACB}
			/>
		);
	}

	function mapMoveACB() {
		if (mapMoveHandlerIsThrottled) { return; }

		const map = mapRef.current?.ol;
		if (!map) { return; }

		const mapView = map.getView();
		const zoom = mapView.getZoom();

		if (zoom > 12.3) {
			updateQuaysACB(mapView, map)
		}
		storeZoomLevelACB(mapView);

		mapMoveHandlerIsThrottled = true;
		setTimeout(() => {
			mapMoveHandlerIsThrottled = false;
		}, 250);
	}

	function updateQuaysACB(mapView, map) {
		const mapExtent = mapView.calculateExtent(map.getSize());

		const topLeft = toLonLat([mapExtent[0], mapExtent[3]]);
		const bottomRight = toLonLat([mapExtent[2], mapExtent[1]]);

		dispatch(updateScreenTopLeft({ latitude: topLeft[1], longitude: topLeft[0] }));
		dispatch(updateScreenBottomRight({ latitude: bottomRight[1], longitude: bottomRight[0] }));
		dispatch(fetchQuays());
	}

	function storeZoomLevelACB(mapView) {
		dispatch(setZoomLevel(mapView.getZoom()));
	}
}

export default Map;
