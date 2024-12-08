import styles from "../css/MapUI.module.css";
import { IconLocation, IconPlus, IconMinus } from "@tabler/icons-react";

function MapControls(props) {
	return (
		<div id={styles.rightControls} className={styles.mapControls}>
			<div id="zoomContainer" className="blurred-background drop-shadow rounded-corners">
				<button>
					<IconPlus width="100%" height="100%" stroke={2} />
				</button>
				<button className="blurred-background drop-shadow rounded-corners">
					<IconMinus width="100%" height="100%" stroke={2} />
				</button>
			</div>
			<button id="locateButton" className="blurred-background drop-shadow rounded-corners">
				<IconLocation width="100%" height="100%" stroke={2} />
			</button>
		</div>
	);
}

export default MapControls;
