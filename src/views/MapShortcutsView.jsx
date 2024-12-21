import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation, IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import ButtonWidgetView from "./ButtonWidgetView";

function MapShortcutsView(props) {
	return (
		<div id={styles.mapShortcuts} className={styles.mapWidgets}>
			<ButtonWidgetView iconElement={<IconHeart stroke={2} onClick={props.openFavorites} />} />
			<ButtonWidgetView iconElement={<IconTrendingUp stroke={2} onClick={props.openTrending} />} />
			<ButtonWidgetView iconElement={<IconArrowsShuffle stroke={2} onClick={props.shuffleRandomBus} />} />
			<ButtonWidgetView
				iconElement={
					(props.invalidLocation && <IconAlertTriangle stroke={2} />) ||
					(props.awaitingLocation && <IconRefresh stroke={2} className="spin-icon" />) || <IconLocation stroke={2} />
				}
				className={styles.locateButton}
				onClick={props.enableUserLocation}
			/>
		</div>
	);
}

export default MapShortcutsView;
