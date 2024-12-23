import BoxWidgetView from "./BoxWidgetView";
import { isBlueBus } from "../store/mapData/utilities";
import styles from "../css/Favorites.module.css";
import { IconHeartFilled } from "@tabler/icons-react";

function FavoritesView(props) {
	return <BoxWidgetView onCloseClick={onCloseClickACB} dataStatus={props.status} renderTitleElementCB={renderTitleCB} renderContentElementCB={renderContenCB} />;

	function renderTitleCB() {
		return <h3 className={styles.headerTitle}>Favorite Buses</h3>;
	}

	function renderContenCB() {
		if (props.error !== null) {
			return <div>There seems like an error occured. Please try again..</div>;
		}

		return (
			<div id={styles.contentWrapper}>
				<div id={styles.infoHeader}>Click on a bus to show all such buses on the map.</div>
				<div id={styles.busGrid}>
					{props.favorites && Object.entries(props.favorites).sort((a, b) => ('' + a[1].line).localeCompare(b[1].line)).map(renderFavoriteCB)}
				</div>
			</div>
		);
	}

	function renderFavoriteCB([route_id, data]) {
		const classNames = [styles.busNumber];

		if (isBlueBus(data.line)) {
			classNames.push(styles.blueBus);
		}

		function onUnfavoriteACB() {
			props.onUnfavorite(route_id);
		}

		function showOnlyACB() {
			props.showOnly(route_id);
		}

		return (
			<div key={route_id} className={styles.busItem}>
				<button onClick={onUnfavoriteACB}>
					<IconHeartFilled stroke={2} />
				</button>
				<button className={classNames.join(" ")} onClick={showOnlyACB}>
					<span className={styles.lineNumber}>{data.line}</span> 
					<div className={styles.destination}>{data.destination}</div>
				</button>
			</div>
		);
	}

	function onCloseClickACB() {
		props.onCloseClick();
	}
}

export default FavoritesView;
