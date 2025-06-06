import BoxWidgetView from "./BoxWidgetView";
import { isBlueBus } from "../store/mapData/utilities";
import styles from "../css/Trending.module.css";

function TrendingView(props) {
	return <BoxWidgetView onCloseClick={onCloseClickACB} dataStatus={props.trendingData.status} renderTitleElementCB={renderTitleCB} renderContentElementCB={renderContenCB} />;

	function renderTitleCB() {
		return <h3 className={styles.headerTitle}>Trending Buses</h3>;
	}

	function renderContenCB() {

        if (props.trendingData.error) {
            return <div>There seems like an error occured. Please try again..</div>
        }

		return <div id={styles.trendingGrid}>{props.trendingData.buses.map(renderBusCB)}</div>;
	}

	function renderBusCB(bus, index) {
		const classNames = [styles.busNumber];

		if (isBlueBus(bus.busLine)) {
			classNames.push(styles.blueBus);
		}

		return (
			<div key={bus.busLine} className={styles.busItem}>
                <div className={styles.numberID}>{index + 1}:</div>
				<div className={classNames.join(" ")}>{bus.busLine}</div>
				<div className={styles.textContainer}>{bus.clickCount} clicks</div>
			</div>
		);
	}

	function onCloseClickACB() {
		props.onCloseClick();
	}
}

export default TrendingView;
