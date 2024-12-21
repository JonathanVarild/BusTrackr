import styles from "../css/BusJourneyInfo.module.css";
import { IconRefresh, IconX, IconUsers, IconSteeringWheel, IconDoorExit, IconDoorEnter, IconCompass, IconBrandSpeedtest } from "@tabler/icons-react";

const blueBusses = ["1", "2", "3", "4", "6", "172", "173", "175", "176", "177", "178", "179", "471", "474", "670", "676", "677", "873", "875"];

function BusJourneyInfo(props) {
	function renderBusJourneySuspense() {
		return (
			<div className={`${styles.centerContent}`}>
				<IconRefresh stroke={1.25} className={`${styles.spinnerIcon} spin-icon`} />
			</div>
		);
	}

	function getBusColorStyle(line) {
		if (line == null) {
			return styles.colorNone;
		}
		return blueBusses.includes(line) ? styles.colorBlue : styles.colorRed;
	}

	function renderBusJourneyInfoCB() {
		return (
			<div id={styles.infoContainer}>
				<div id={styles.infoTitleContainer}>
					<h3>
						<span className={`${getBusColorStyle(props.journeyDetails.line)} ${styles.lineSpan}`}>{props.journeyDetails.line ? props.journeyDetails.line : "-"}</span>
						&nbsp;
						{props.journeyDetails.destination ? props.journeyDetails.destination : "Ej i trafik"}
					</h3>
				</div>
				{props.journeyDetails.line ? (
					<div className={styles.busInfoConatainer}>
						<div id={styles.containerFrom} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconDoorExit className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>From:</p>
								<p>{props.journeyDetails.stops[0].name}</p>
							</div>
						</div>
						<div id={styles.containerTo} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconDoorEnter className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>To:</p>
								<p>{props.journeyDetails.destination}</p>
							</div>
						</div>
						<div id={styles.containerCapacity} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconUsers className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>Capacity:</p>
								<p>{props.journeyDetails.seated ? props.journeyDetails.seated + props.journeyDetails.standing : "-"}</p>
							</div>
						</div>
						<div id={styles.containerOperator} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconSteeringWheel className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>Operator:</p>
								<p>{props.journeyDetails.operator ? props.journeyDetails.operator : "-"}</p>
							</div>
						</div>
						<div id={styles.containerSpeed} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconBrandSpeedtest className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>Speed:</p>
								<p>{props.liveVehicles[props.selectedLiveVehicleId]?.velocity} km/h</p>
							</div>
						</div>
						<div id={styles.containerHeading} className={styles.infoContainerOuter}>
							<div className={styles.infoIconContainer}>
								<IconCompass className={styles.infoIconClass} stroke={1.5} />
							</div>
							<div className={styles.infoContainerInner}>
								<p>Heading:</p>
								<p>{props.liveVehicles[props.selectedLiveVehicleId]?.bearing} °</p>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.notInTraficContainer}>
						<p>This bus doesn't seem to currently be on a route</p>
					</div>
				)}
			</div>
		);
	}

	function onCloseClickACB() {
		props.onCloseClick();
	}

	return (
		<div id={styles.outerContainer} className={`${styles.justifyContent}`}>
			<div id={styles.container}>
				<div className={`${styles.content} header-2-font blurred-background rounded-corners drop-shadow`}>
					<div id={styles.closeContainer}>
						<button type="button" id={styles.closeButton} onClick={onCloseClickACB}>
							<div id={styles.closeInnerContainer}>
								<IconX stroke={1.25} className={`${styles.spinnerIcon} ${styles.closeIcon}`} />
							</div>
						</button>
					</div>
					{props.journeyDetailsStatus == "loading" ? renderBusJourneySuspense() : renderBusJourneyInfoCB()}
				</div>
			</div>
		</div>
	);
}

export default BusJourneyInfo;
