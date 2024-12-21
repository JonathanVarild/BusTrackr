import styles from "../css/MapUI.module.css";
import { IconLocation, IconPlus, IconMinus, IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import ButtonWidgetView from "./ButtonWidgetView";

function MapControlsView(props) {
	let icon;

	if (props.invalidLocation) {
		icon = <IconAlertTriangle stroke={2} />;
	} else if (props.awaitingLocation) {
		icon = <IconRefresh stroke={2} className="spin-icon" />;
	} else {
		icon = <IconLocation stroke={2} />;
	}

	return (
		<div id={styles.mapControls} className={styles.mapWidgets}>
			<div id={styles.zoomContainer} className="drop-shadow rounded-corners">
				<ButtonWidgetView iconElement={<IconPlus stroke={2} onClick={zoomInACB} />} />
				<ButtonWidgetView iconElement={<IconMinus stroke={2} onClick={zoomOutACB} />} />
			</div>
			<ButtonWidgetView iconElement={icon} onClick={props.enableUserLocation} />
		</div>
	);

	function zoomInACB() {
		props.adjustMapZoom(0.5);
	}

	function zoomOutACB() {
		props.adjustMapZoom(-0.5);
	}
}

export default MapControlsView;
