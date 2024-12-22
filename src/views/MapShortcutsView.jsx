import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation, IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import ButtonWidgetView from "./ButtonWidgetView";

function MapShortcutsView(props) {
	let favoriteIcon;
	if (props.invalidLocation) {
		favoriteIcon = <IconAlertTriangle stroke={2} />;
	} else if (props.awaitingLocation) {
		favoriteIcon = <IconRefresh stroke={2} className="spin-icon" />;
	} else {
		favoriteIcon = <IconLocation stroke={2} />;
	}

	let shuffleIcon;
	if (props.awaitingShuffle) {
		shuffleIcon = <IconRefresh stroke={2} className="spin-icon" />;
	} else {
		shuffleIcon = <IconArrowsShuffle stroke={2} />;
	}

	return (
		<div id={styles.mapShortcuts} className={styles.mapWidgets}>
			<ButtonWidgetView iconElement={<IconHeart stroke={2} />} onClick={openFavoritesACB} />
			<ButtonWidgetView iconElement={<IconTrendingUp stroke={2} />} onClick={openTrendingACB} />
			<ButtonWidgetView iconElement={shuffleIcon} onClick={shuffleBusACB} />
			<ButtonWidgetView iconElement={favoriteIcon} className={styles.locateButton} onClick={props.enableUserLocation} />
		</div>
	);

	function openFavoritesACB() {
		props.openFavorites();
	}

	function openTrendingACB() {
		props.openTrending();
	}

	function shuffleBusACB() {
		props.shuffleBus();
	}
}

export default MapShortcutsView;
