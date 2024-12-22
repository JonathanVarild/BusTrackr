import styles from "../css/AttributionBar.module.css";

function AttributionBarView() {
	return (
		<div id={styles.attributionBar}>
			<div className={styles.attributionText}>© OpenStreetMap contributors</div>
			<span> | </span>
			<div className={styles.attributionText}>© OpenMapTiles styles</div>
		</div>
	);
}

export default AttributionBarView;
