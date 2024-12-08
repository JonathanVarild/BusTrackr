import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation } from "@tabler/icons-react";
import ButtonWidget from "./ButtonWidgetView";

function MapShortcuts(props) {
	return (
		<div id={styles.leftControls} className={styles.mapControls}>
			<ButtonWidget
				id="favoritesButton"
				iconElement={<IconHeart stroke={2} />}
			/>
			<ButtonWidget
				id="trendingButton"
				iconElement={<IconTrendingUp stroke={2} />}
			/>
			<ButtonWidget
				id="shuffleButton"
				iconElement={<IconArrowsShuffle stroke={2} />}
			/>
			<ButtonWidget
				id="locateButton"
				iconElement={<IconLocation stroke={2} />}
			/>
		</div>
	);
}

export default MapShortcuts;
