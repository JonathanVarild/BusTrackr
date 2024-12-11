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
import {
	updateScreenTopLeft,
	updateScreenBottomRight,
	fetchQuays,
	fetchStops,
	setStationHovered,
	setZoomLevel,
	setUserLocation,
	setInvalidLocation,
	setAwaitingLocation,
} from "../store/mapData";
import { queuePopup } from "../store/interface";

import directionPNG from "../media/directions.png";
import coordinates from "../tmp/lineCords";

const center = fromLonLat([18.06478765050284, 59.3262518657495]);

let mapMoveHandlerIsThrottled = false;
const stationMinZoom = 12.3;

function Map(props) {
	const mapRef = useRef(null);

	const count = useSelector((state) => state.counter.count);
	const stops = useSelector((state) => state.mapData.stops.list);
	const quays = useSelector((state) => state.mapData.quays.list);
	const zoom = useSelector((state) => state.mapData.screenBoundary.zoom);
	const userLocation = useSelector((state) => state.mapData.userLocation);
	const invalidLocation = useSelector((state) => state.mapData.invalidLocation);
	const awaitingLocation = useSelector((state) => state.mapData.awaitingLocation);
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

				{zoom > stationMinZoom && <RLayerVector>{Object.values(zoom > 16 && quays.length != 0 ? quays : stops).map(renderStationBlip)}</RLayerVector>}

				{userLocation != null && !invalidLocation && renderUserLocation()}
			</RMap>

			<SearchBar />
			<MapControls adjustMapZoom={mapZoomACB} enableUserLocation={enableUserLocationACB} invalidLocation={invalidLocation} awaitingLocation={awaitingLocation} />
			<MapShortcuts
				enableUserLocation={enableUserLocationACB}
				openFavorites={testWarningPopup}
				openTrending={testInformationPopup}
				invalidLocation={invalidLocation}
				awaitingLocation={awaitingLocation}
			/>
		</>
	);

	function testWarningPopup() {
		dispatch(
			queuePopup({
				title: "Delete Account",
				message:
					"Are you sure that you want to delete your account? This action will remove all your account information including personal details, favorites, etc. This cannot be undone.",
				type: 1,
				continueAction: "DeleteAccount",
				abortAction: "AbortDeleteAccount",
			})
		);
	}

	function testInformationPopup() {
		dispatch(
			queuePopup({
				title: "Welcome Back",
				message: "We haven't seen you in a long time! What do you think of this popup feature that we implemented while you were gone?",
				type: 0,
				continueAction: "ClosedWelcomeMessage",
			})
		);
	}

	function renderStationBlip(station) {
		function stationHoverACB() {
			dispatch(setStationHovered({ id: station.id, hovered: true }));
			document.body.style.cursor = "pointer";
		}

		function stationUnhoverACB() {
			dispatch(setStationHovered({ id: station.id, hovered: false }));
			document.body.style.cursor = "";
		}

		function getBlipCB() {
			if (zoom < 16) {
				return new Style({
					image: new Circle({
						radius: station?.hovered ? 6 : 4,
						fill: new Fill({ color: "white" }),
						stroke: new Stroke({ color: "#2e7aee", width: 1 }),
					}),
				});
			} else {
				return new Style({
					image: new Icon({
						src: directionPNG,
						scale: station?.hovered ? 0.35 : 0.3,
						anchor: [0.5, 0.5],
						anchorXUnits: "fraction",
						anchorYUnits: "fraction",
					}),
				});
			}
		}

		return (
			<RFeature
				key={station.id}
				geometry={new Point(fromLonLat([station.location.longitude, station.location.latitude]))}
				style={getBlipCB()}
				onPointerEnter={stationHoverACB}
				onPointerLeave={stationUnhoverACB}
			/>
		);
	}

	function renderUserLocation() {
		const locationPoint = new Point(fromLonLat([userLocation.longitude, userLocation.latitude]));

		return (
			<RLayerVector>
				<RFeature
					geometry={locationPoint}
					style={
						new Style({
							image: new Circle({
								radius: 8,
								fill: new Fill({ color: "#2e7aee" }),
								stroke: new Stroke({ color: "#afc8ed", width: 4 }),
							}),
						})
					}
				/>
				{userLocation?.accuracy > 25 && (
					<RFeature
						geometry={locationPoint}
						style={
							new Style({
								image: new Circle({
									radius: (userLocation?.accuracy * 2) / mapRef.current?.ol.getView().getResolution(),
									fill: new Fill({ color: "rgba(0, 93, 230, 0.2)" }),
									stroke: new Stroke({ color: "#afc8ed", width: 1 }),
								}),
							})
						}
					/>
				)}
			</RLayerVector>
		);
	}

	function mapMoveACB() {
		if (mapMoveHandlerIsThrottled) return;
		const map = mapRef.current?.ol;
		if (!map) return;

		const mapView = map.getView();
		const zoom = mapView.getZoom();

		storeZoomLevelACB(mapView);

		if (zoom > stationMinZoom) {
			updateStationsACB(mapView, map, zoom);
		}

		mapMoveHandlerIsThrottled = true;
		setTimeout(() => {
			mapMoveHandlerIsThrottled = false;
		}, 250);
	}

	function updateStationsACB(mapView, map, latestZoom) {
		const mapExtent = mapView.calculateExtent(map.getSize());

		const topLeft = toLonLat([mapExtent[0], mapExtent[3]]);
		const bottomRight = toLonLat([mapExtent[2], mapExtent[1]]);

		dispatch(updateScreenTopLeft({ latitude: topLeft[1], longitude: topLeft[0] }));
		dispatch(updateScreenBottomRight({ latitude: bottomRight[1], longitude: bottomRight[0] }));

		if (latestZoom > 16) {
			dispatch(fetchQuays());
		} else {
			dispatch(fetchStops());
		}
	}

	function storeZoomLevelACB(mapView) {
		dispatch(setZoomLevel(mapView.getZoom()));
	}

	function mapZoomACB(zoomDelta) {
		const map = mapRef.current?.ol;
		if (map) {
			const mapView = map.getView();
			mapView.animate({ zoom: mapView.getZoom() + zoomDelta, duration: 200 });
		}
	}

	function enableUserLocationACB() {
		if (invalidLocation) {
			alert("Could not get reliable location data.. Reload the page and try again.");
			return;
		}

		if (!navigator.geolocation) {
			alert("Could not get your location.. Please check your browser permissions!");
			return;
		}

		if (userLocation == null) {
			dispatch(setAwaitingLocation());
		}

		navigator.geolocation.clearWatch(navigator.geolocation.watchPosition.length);
		navigator.geolocation.watchPosition((position) => {
			dispatch(setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy }));
		}),
			(error) => {
				setInvalidLocation(true);
			};

		const coords = userLocation != null ? fromLonLat([userLocation.longitude, userLocation.latitude]) : center;
		const zoom = userLocation != null ? 18 : 12;

		const map = mapRef.current?.ol;
		if (map) {
			const mapView = map.getView();
			mapView.animate({ zoom: zoom, center: coords });
		}
	}
}

export default Map;
