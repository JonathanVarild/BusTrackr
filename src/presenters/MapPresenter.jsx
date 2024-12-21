import { useRef, useEffect } from "react";

import RMapView from "../views/RMapView";
import MapControlsView from "../views/MapControlsView";
import SearchBarView from "../views/SearchBarView";
import MapShortcutsView from "../views/MapShortcutsView";
import BusJourneyInfo from "../views/BusJourneyInfoView";

import { fromLonLat, toLonLat } from "ol/proj";
import { boundingExtent } from "ol/extent";

import { useSelector, useDispatch } from "react-redux";
import {
	updateScreenTopLeft,
	updateScreenBottomRight,
	setStationHovered,
	setLiveVehicleHovered,
	setZoomLevel,
	setUserLocation,
	setInvalidLocation,
	setAwaitingLocation,
	setShowBusJourneyInfo,
	setSelectedLiveVehicleId,
	setLastClickedType,
} from "../store/mapData";
import { lastClickedTypes } from "../store/mapData/utilities";
import { fetchQuays } from "../store/mapData/fetchQuays";
import { fetchStops } from "../store/mapData/fetchStops";
import { fetchLiveVehicles } from "../store/mapData/liveVehicles";
import { fetchJourneyDetails } from "../store/mapData/journeyDetails";
import { queuePopup, updateLastInteraction } from "../store/interface";

const center = fromLonLat([18.06478765050284, 59.3262518657495]);

let mapMoveHandlerIsThrottled = false;
let fetchLiveVehiclesIsThrottled = false;
const stationMinZoom = 12.3;

function Map(props) {
	const mapRef = useRef(null);

	const stops = useSelector((state) => state.mapData.stops.list);
	const quays = useSelector((state) => state.mapData.quays.list);
	const selectedLiveVehicleId = useSelector((state) => state.mapData.selectedLiveVehicleId);
	const liveVehicles = useSelector((state) => state.mapData.liveVehicles.list);
	const journeyDetails = useSelector((state) => state.mapData.journeyDetails.details);
	const journeyDetailsStatus = useSelector((state) => state.mapData.journeyDetails.status);
	const showBusJourneyInfo = useSelector((state) => state.mapData.showBusJourneyInfo);
	const zoom = useSelector((state) => state.mapData.screenBoundary.zoom);
	const userLocation = useSelector((state) => state.mapData.userLocation);
	const invalidLocation = useSelector((state) => state.mapData.invalidLocation);
	const awaitingLocation = useSelector((state) => state.mapData.awaitingLocation);
	const lastInteraction = useSelector((state) => state.interface.lastInteraction);
	const lastClickedType = useSelector((state) => state.mapData.lastClickedType);
	const dispatch = useDispatch();

	useEffect(() => {
		// This should prrobably be cleaned up, but works for now
		const intervalId = setInterval(() => {
			const timeSinceLastInteraction = Date.now() - lastInteraction;

			if (timeSinceLastInteraction > 2 * 60 * 1000) {
				dispatch(
					queuePopup({
						title: "Inactivity Detected",
						message: "Servers are expensive, buses will be live again after this popup is closed.",
						type: 0,
						continueAction: "NoLongerInactive",
					})
				);
				clearInterval(intervalId); // Stop polling when inactive
			} else {
				dispatch(fetchLiveVehicles());
			}
		}, 2000);

		return () => clearInterval(intervalId); // Cleanup on unmount
	}, [lastInteraction, dispatch]);

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
				liveVehicles={liveVehicles}
				userLocation={userLocation}
				invalidLocation={invalidLocation}
				mapMove={mapMoveACB}
				setStationHovered={setStationHoveredACB}
				setVehicleHovered={setVehicleHoveredACB}
				setVehicleClicked={setVehicleClickedACB}
			/>

			{renderCorrectBoxWidgetCB()}

			<SearchBarView />
			<MapControlsView adjustMapZoom={mapZoomACB} enableUserLocation={enableUserLocationACB} invalidLocation={invalidLocation} awaitingLocation={awaitingLocation} />
			<MapShortcutsView
				enableUserLocation={enableUserLocationACB}
				openFavorites={openFavoritesACB}
				openTrending={openTrendingACB}
				invalidLocation={invalidLocation}
				awaitingLocation={awaitingLocation}
			/>
		</>
	);

	function renderCorrectBoxWidgetCB() {
		switch (lastClickedType) {
			case lastClickedTypes.VEHICLE:
				return (
					showBusJourneyInfo && (
						<BusJourneyInfo
							journeyDetails={journeyDetails}
							journeyDetailsStatus={journeyDetailsStatus}
							selectedLiveVehicleId={selectedLiveVehicleId}
							liveVehicles={liveVehicles}
							onCloseClick={closeBusInfoACB}
							onFavoriteClick={closeBusInfoACB} /* This should be the favorite function in the future */
						/>
					)
				)
			default:
				return <></>
		}
	}

	function openFavoritesACB() {}

	function openTrendingACB() {}

	function closeBusInfoACB() {
		dispatch(setShowBusJourneyInfo(false));
	}

	function setStationHoveredACB(payload) {
		dispatch(updateLastInteraction());
		dispatch(setStationHovered(payload));
	}

	function setVehicleHoveredACB(payload) {
		dispatch(updateLastInteraction());
		dispatch(setLiveVehicleHovered(payload));
	}

	function setVehicleClickedACB(payload) {
		dispatch(setLastClickedType(lastClickedTypes.VEHICLE));
		const combined = payload["service_journey_id"] + payload["vehicle_id"];
		dispatch(setSelectedLiveVehicleId(combined));
		dispatch(fetchJourneyDetails(payload));
	}

	function mapMoveACB() {
		dispatch(updateLastInteraction());

		if (mapMoveHandlerIsThrottled) return;
		const map = mapRef.current?.ol;
		if (!map) return;

		const mapView = map.getView();
		const zoom = mapView.getZoom();

		storeZoomLevelACB(mapView);

		if (zoom > stationMinZoom) {
			updateStationsACB(mapView, map, zoom);
		}

		dispatch(fetchLiveVehicles()); // Always fetch buses after movement of map

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
		dispatch(updateLastInteraction());

		const map = mapRef.current?.ol;
		if (map) {
			const mapView = map.getView();
			mapView.animate({ zoom: mapView.getZoom() + zoomDelta, duration: 200 });
		}
	}

	function enableUserLocationACB() {
		if (invalidLocation) {
			dispatch(
				queuePopup({
					title: "Unreliable Location",
					message: "Your location accuracy is not good enough to determine an accurate location. Please check your browser permissions, reload the page, and try again.",
					type: 0,
				})
			);
			return;
		}

		if (!navigator.geolocation) {
			dispatch(
				queuePopup({
					title: "Location Failed",
					message: "Your location could not be determined. Please check your browser permissions and that you have GPS coverage.",
					type: 0,
				})
			);
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
