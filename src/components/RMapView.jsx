import { RMap, RLayerVector, RFeature, RLayerTile } from "rlayers";
import { Style, Stroke, Circle, Fill, Icon } from "ol/style";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import directionPNG from "../media/directions.png";

const stopStyle = new Style({
    image: new Circle({
        radius: 4,
        fill: new Fill({ color: "white" }),
        stroke: new Stroke({ color: "#2e7aee", width: 1 }),
    }),
});
const stopStyleHovered = new Style({
    image: new Circle({
        radius: 6,
        fill: new Fill({ color: "white" }),
        stroke: new Stroke({ color: "#2e7aee", width: 1 }),
    }),
});
function getStopStyle(hovered) {
    return hovered ? stopStyleHovered : stopStyle;
}

const quayStyle = new Style({
    image: new Icon({
        src: directionPNG,
        scale: 0.3,
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
    }),
});
const quayStyleHovered = new Style({
    image: new Icon({
        src: directionPNG,
        scale: 0.35,
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
    function mapMoveACB() {
        props.mapMove()
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
				return getStopStyle(station?.hovered)
			} else {
				return getQuayStyle(station?.hovered)
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

    function renderUserLocationCB() {
            const locationPoint = new Point(fromLonLat([props.userLocation.longitude, props.userLocation.latitude]));
    
            return (
                <RLayerVector>
                    <RFeature
                        geometry={locationPoint}
                        style={locationBlipStyle}
                    />
                    {userLocation?.accuracy > 25 && (
                        <RFeature
                            geometry={locationPoint}
                            style={getLocationErrorStyle(props.userLocation, props.mapRef)}
                        />
                    )}
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

            {props.zoom > props.stationMinZoom &&
                <RLayerVector>
                    {Object.values(
                        (props.zoom > 16 && props.quays.length != 0) ? props.quays : props.stops
                    ).map(renderStationBlipCB)}
                </RLayerVector>
            }

            {props.userLocation != null && !props.invalidLocation && renderUserLocationCB()}
        </RMap>
    );
}

export default RMapView;
