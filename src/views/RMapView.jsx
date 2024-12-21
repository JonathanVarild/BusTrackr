import { RMap, RLayerVector, RFeature, RLayerTile } from "rlayers";
import { Style, Stroke, Circle, Fill, Icon } from "ol/style";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

import stopPNG from "../media/stop.png";
import quayPNG from "../media/quay.png";
import blackBusPNG from "../media/blackBus.png";
import blueBusPNG from "../media/blueBus.png";
import redBusPNG from "../media/redBus.png";

const stopStyleFar = new Style({
	image: new Circle({
		radius: 2,
		fill: new Fill({ color: "#eda68e" }),
	}),
});
const stopStyle = new Style({
	image: new Icon({
		src: stopPNG,
		scale: 0.25,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const stopStyleHovered = new Style({
	image: new Icon({
		src: stopPNG,
		scale: 0.3,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});

const vehicleStyle = new Style({
	image: new Icon({
		src: blackBusPNG,
		scale: 0.25,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const vehicleStyleHovered = new Style({
	image: new Icon({
		src: blackBusPNG,
		scale: 0.3,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const vehicleStyleBlue = new Style({
	image: new Icon({
		src: blueBusPNG,
		scale: 0.25,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const vehicleStyleBlueHovered = new Style({
	image: new Icon({
		src: blueBusPNG,
		scale: 0.3,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const vehicleStyleRed = new Style({
	image: new Icon({
		src: redBusPNG,
		scale: 0.25,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const vehicleStyleRedHovered = new Style({
	image: new Icon({
		src: redBusPNG,
		scale: 0.3,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
function getVehicleStyle(hovered, color) {
	if (color === "blue") return hovered ? vehicleStyleBlueHovered : vehicleStyleBlue;
	if (color === "red") return hovered ? vehicleStyleRedHovered : vehicleStyleRed;
	return hovered ? vehicleStyleHovered : vehicleStyle;
}

const quayStyle = new Style({
	image: new Icon({
		src: quayPNG,
		scale: 0.25,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
const quayStyleHovered = new Style({
	image: new Icon({
		src: quayPNG,
		scale: 0.3,
		anchor: [0.5, 0.5],
		anchorXUnits: "fraction",
		anchorYUnits: "fraction",
	}),
});
function getQuayStyle(hovered) {
	return hovered ? quayStyleHovered : quayStyle;
}

const locationBlipStyle = new Style({
	image: new Circle({
		radius: 8,
		fill: new Fill({ color: "#2e7aee" }),
		stroke: new Stroke({ color: "#afc8ed", width: 4 }),
	}),
});

function getLocationErrorStyle(location, mapRef) {
	return new Style({
		image: new Circle({
			radius: (location?.accuracy * 2) / mapRef.current?.ol.getView().getResolution(),
			fill: new Fill({ color: "rgba(0, 93, 230, 0.2)" }),
			stroke: new Stroke({ color: "#afc8ed", width: 1 }),
		}),
	});
}

function RMapView(props) {
	function getStopStyle(hovered) {
		return hovered ? stopStyleHovered : props.zoom > 14.5 ? stopStyle : stopStyleFar;
	}

	function mapMoveACB() {
		props.mapMove();
	}

	function renderStationBlipCB(station) {
		function stationHoverACB() {
			props.setStationHovered({ id: station.id, hovered: true });
			document.body.style.cursor = "pointer";
		}

		function stationUnhoverACB() {
			props.setStationHovered({ id: station.id, hovered: false });
			document.body.style.cursor = "";
		}

		function getBlipCB() {
			if (props.zoom < 16) {
				return getStopStyle(station?.hovered);
			} else {
				return getQuayStyle(station?.hovered);
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

	function renderVehicleBlipCB(vehicle) {
		function vehicleHoverACB() {
			props.setVehicleHovered({ id: vehicle.service_journey_id + vehicle.vehicle_id, hovered: true });
			document.body.style.cursor = "pointer";
		}

		function vehicleUnhoverACB() {
			props.setVehicleHovered({ id: vehicle.service_journey_id + vehicle.vehicle_id, hovered: false });
			document.body.style.cursor = "";
		}

		function vehicleClickACB() {
			props.setVehicleClicked({ service_journey_id: vehicle.service_journey_id, vehicle_id: vehicle.vehicle_id });
		}

		return (
			<RFeature
				key={vehicle.service_journey_id + vehicle.vehicle_id}
				geometry={new Point(fromLonLat([vehicle.location.longitude, vehicle.location.latitude]))}
				style={getVehicleStyle(vehicle?.hovered, vehicle?.routeColor)}
				onPointerEnter={vehicleHoverACB}
				onPointerLeave={vehicleUnhoverACB}
				onClick={vehicleClickACB}
			/>
		);
	}

	function renderUserLocationCB() {
		const locationPoint = new Point(fromLonLat([props.userLocation.longitude, props.userLocation.latitude]));

		return (
			<RLayerVector>
				<RFeature geometry={locationPoint} style={locationBlipStyle} />
				{props.userLocation?.accuracy > 25 && <RFeature geometry={locationPoint} style={getLocationErrorStyle(props.userLocation, props.mapRef)} />}
			</RLayerVector>
		);
	}

	return (
		<RMap
			ref={props.mapRef}
			width={"100%"}
			height={"100vh"}
			initial={{ center: props.center, zoom: 11 }}
			noDefaultControls={true}
			onPointerDrag={mapMoveACB}
			onMoveEnd={mapMoveACB}
			minZoom={10}
			extent={props.extent}
		>
			<RLayerTile url={props.tileUrl} />

			{props.zoom > props.stationMinZoom && (
				<RLayerVector>
					{Object.values(props.zoom > 16 && props.quays.length != 0 ? props.quays : props.stops).map(renderStationBlipCB)}
					{Object.values(props.liveVehicles).map(renderVehicleBlipCB)}
				</RLayerVector>
			)}

			{props.userLocation != null && !props.invalidLocation && renderUserLocationCB()}
		</RMap>
	);
}

export default RMapView;
