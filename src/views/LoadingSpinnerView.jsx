import styles from "../css/LoadingSpinner.module.css"
import { IconRefresh } from "@tabler/icons-react";

function LoadingSpinnerView() {
	return (
		<div className={styles.spinnerContainer}>
			<IconRefresh stroke={2} className="spin-icon" />
		</div>
	);
}

export default LoadingSpinnerView;
