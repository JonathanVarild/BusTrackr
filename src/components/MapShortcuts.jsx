import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation } from "@tabler/icons-react";
import ButtonWidget from "./ButtonWidgetView";

function MapShortcuts(props) {
	return (
		<div id={styles.mapShortcuts} className={styles.mapWidgets}>
			<ButtonWidget iconElement={<IconHeart stroke={2} />} />
			<ButtonWidget iconElement={<IconTrendingUp stroke={2} />} />
			<ButtonWidget iconElement={<IconArrowsShuffle stroke={2} />} />
			<ButtonWidget iconElement={<IconLocation stroke={2} />} className={styles.locateButton} onClick={props.enableUserLocation} />
		</div>
	);
}

export default MapShortcuts;
