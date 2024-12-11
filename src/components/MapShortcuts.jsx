import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation, IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import ButtonWidget from "./ButtonWidgetView";

function MapShortcuts(props) {
	return (
		<div id={styles.mapShortcuts} className={styles.mapWidgets}>
			<ButtonWidget iconElement={<IconHeart stroke={2} onClick={props.openFavorites} />} />
			<ButtonWidget iconElement={<IconTrendingUp stroke={2} onClick={props.openTrending} />} />
			<ButtonWidget iconElement={<IconArrowsShuffle stroke={2} onClick={props.shuffleRandomBus} />} />
			<ButtonWidget
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

export default MapShortcuts;
