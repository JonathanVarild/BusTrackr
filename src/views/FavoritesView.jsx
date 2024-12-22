import BoxWidgetView from "./BoxWidgetView";
import { isBlueBus } from "../store/mapData/utilities";
import styles from "../css/Favorites.module.css";
import { IconHeartFilled } from "@tabler/icons-react";

function FavoritesView(props) {
	return <BoxWidgetView onCloseClick={onCloseClickACB} dataStatus={"idle"} renderTitleElementCB={renderTitleCB} renderContentElementCB={renderContenCB} />;

	function renderTitleCB() {
		return <h3 className={styles.headerTitle}>Favorite Buses</h3>;
	}

	function renderContenCB() {
		if (/*props.trendingData.error */ false) {
			return <div>There seems like an error occured. Please try again..</div>;
		}

		return (
			<div id={styles.contentWrapper}>
				<div id={styles.infoHeader}>Click on a bus to show all such buses on the map.</div>
				<div id={styles.busGrid}>
					{[
						{ line: "474", destination: "Hemmesta", routeID: 1 },
						{ line: "111", destination: "Någonstans", routeID: 2 },
						{ line: "111", destination: "dsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdffsd", routeID: 3 },
						{ line: "474", destination: "Hemmesta asdasd asdasd asdasda asdas dasdasd asdasda sd", routeID: 4 },
						{ line: "474", destination: "Hemmesta", routeID: 5 },
					].map(renderFavoriteCB)}
				</div>
			</div>
		);
	}

	function renderFavoriteCB(bus) {
		const classNames = [styles.busNumber];

		if (isBlueBus(bus.line)) {
			classNames.push(styles.blueBus);
		}

		function onUnfavoriteACB() {
			props.onUnfavorite(bus.routeID);
		}

		return (
			<div key={bus.routeID} className={styles.busItem}>
				<button onClick={onUnfavoriteACB}>
					<IconHeartFilled stroke={2} />
				</button>
				<button className={classNames.join(" ")}>
					{bus.line}
					<div className={styles.destination}>{bus.destination}</div>
				</button>
			</div>
		);
	}

	function onCloseClickACB() {
		props.onCloseClick();
	}
}

export default FavoritesView;
