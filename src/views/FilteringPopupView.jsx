import styles from "../css/FilteringPopup.module.css";

function FilteringPopupView(props) {
	return (
		<button id={styles.popupWindow} className={"blurred-background rounded-corners drop-shadow"} onClick={stopFilteringACB}>
			<div className={styles.title}>You are filtering live buses</div>
			<div className={styles.subTitle}>Click this box to disable</div>
		</button>
	);

	function stopFilteringACB() {
		props.stopFiltering();
	}
}

export default FilteringPopupView;
