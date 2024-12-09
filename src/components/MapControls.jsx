import styles from "../css/MapUI.module.css";
import { IconLocation, IconPlus, IconMinus } from "@tabler/icons-react";
import ButtonWidget from "./ButtonWidgetView";

function MapControls(props) {
	return (
		<div id={styles.mapControls} className={styles.mapWidgets}>
			<div id={styles.zoomContainer} className="drop-shadow rounded-corners">
				<ButtonWidget iconElement={<IconPlus stroke={2} onClick={zoomInACB} />} />
				<ButtonWidget iconElement={<IconMinus stroke={2} onClick={zoomOutACB} />} />
			</div>
			<ButtonWidget iconElement={<IconLocation stroke={2} onClick={props.enableUserLocation} />} />
		</div>
	);

	function zoomInACB() {
		props.adjustMapZoom(0.5);
	}

	function zoomOutACB() {
		props.adjustMapZoom(-0.5);
	}
}

export default MapControls;
