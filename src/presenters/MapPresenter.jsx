import { useRef } from "react";

import RMapView from "../components/RMapView";
import MapControls from "../components/MapControls";
import SearchBar from "../components/MapSearchBar";
import MapShortcuts from "../components/MapShortcuts";

import { fromLonLat, toLonLat } from "ol/proj";
import { boundingExtent } from "ol/extent";

import { useSelector, useDispatch } from "react-redux";
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

const center = fromLonLat([18.06478765050284, 59.3262518657495]);

let mapMoveHandlerIsThrottled = false;
const stationMinZoom = 12.3;

function Map(props) {
	const mapRef = useRef(null);

	const stops = useSelector((state) => state.mapData.stops.list);
	const quays = useSelector((state) => state.mapData.quays.list);
	const zoom = useSelector((state) => state.mapData.screenBoundary.zoom);
	const userLocation = useSelector((state) => state.mapData.userLocation);
	const invalidLocation = useSelector((state) => state.mapData.invalidLocation);
	const awaitingLocation = useSelector((state) => state.mapData.awaitingLocation);
	const dispatch = useDispatch();

	const extent = boundingExtent([fromLonLat([16.08748, 59.90015]), fromLonLat([19.4616, 58.60894])]);

	return (
		<>
			<RMapView
				mapRef={mapRef}
				center={center}
				extent={extent}
				tileUrl={"https://tiles.bustrackr.io/styles/basic/256/{z}/{x}/{y}.webp"}
				zoom={zoom}
				stationMinZoom={stationMinZoom}
				quays={quays}
				stops={stops}
				userLocation={userLocation}
				invalidLocation={invalidLocation}
				mapMove={mapMoveACB}
				setStationHovered={setStationHoveredACB}
			/>

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

	function setStationHoveredACB(payload) {
		dispatch(setStationHovered(payload));
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
