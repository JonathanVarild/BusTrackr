import styles from "../css/MapUI.module.css";
import { IconHeart, IconTrendingUp, IconArrowsShuffle, IconLocation } from "@tabler/icons-react";

function MapShortcuts(props) {
	return (
		<div id={styles.leftControls} className={styles.mapControls}>
			<button id="favoritesButton" className="blurred-background drop-shadow rounded-corners">
				<IconHeart width="100%" height="100%" stroke={2} />
			</button>
			<button id="trendingButton" className="blurred-background drop-shadow rounded-corners">
				<IconTrendingUp width="100%" height="100%" stroke={2} />
			</button>
			<button id="shuffleButton" className="blurred-background drop-shadow rounded-corners">
				<IconArrowsShuffle width="100%" height="100%" stroke={2} />
			</button>
			<button id="locateButton" className="blurred-background drop-shadow rounded-corners">
				<IconLocation width="100%" height="100%" stroke={2} />
			</button>
		</div>
	);
}

export default MapShortcuts;
