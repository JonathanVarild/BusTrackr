import styles from "../css/ButtonWidget.module.css";

function ButtonWidget(props) {
	function onClickACB(event) {
		if (props.onClick) {
			props.onClick(event);
		}
	}

	let classNames = props?.className?.split(" ") || [];
	classNames = [...classNames, styles.uiWidget, "blurred-background", "rounded-corners", "drop-shadow"];

	return (
		<button id={props.id} className={classNames.join(" ")} onClick={onClickACB}>
			<div className={`${styles.uiIconContainer}`}>{props.iconElement}</div>
		</button>
	);
}

export default ButtonWidget;
