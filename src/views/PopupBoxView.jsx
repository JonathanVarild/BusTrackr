import styles from "../css/PopupBox.module.css";
import { IconAlertTriangle, IconInfoCircle } from "@tabler/icons-react";

function PopupBoxView(props) {
	return (
		<div className={styles.screenBlock} onClick={props.type == 0 ? props.continueAction : props.abortAction}>
			<div className={styles.popupBox + " rounded-corners drop-shadow"}>
				<div className={styles.iconContainer}>{(props.type == 1 && <IconAlertTriangle stroke={2} />) || <IconInfoCircle stroke={2} />}</div>
				<div>
					<h3>{props.title || "Information"}</h3>
					<h4>{props.message || "No information provided."}</h4>
					<div className={styles.buttonContainer}>
						<button className="rounded-corners" onClick={props.continueAction}>
							Continue
						</button>
						{props.type == 1 && (
							<button className="rounded-corners" onClick={props.abortAction}>
								Abort
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default PopupBoxView;
