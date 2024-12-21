import styles from "../css/BusJourneyInfo.module.css";
import { IconRefresh, IconX, IconUsers, IconSteeringWheel, IconDoorExit, IconDoorEnter, IconCompass, IconBrandSpeedtest } from "@tabler/icons-react";
import BoxWidgetView from "./BoxWidgetView";

const blueBusses = ["1", "2", "3", "4", "6", "172", "173", "175", "176", "177", "178", "179", "471", "474", "670", "676", "677", "873", "875"];

function BusJourneyInfo(props) {
    function getBusColorStyle(line) {
        if (line == null) {
            return styles.colorNone;
        }
        return blueBusses.includes(line) ? styles.colorBlue : styles.colorRed;
    }

    function renderTitleCB() {
        return (
            <h3 className={styles.titleh3}>
                <span className={`${getBusColorStyle(props.journeyDetails.line)} ${styles.lineSpan}`}>{props.journeyDetails.line ? props.journeyDetails.line : "-"}</span>
                &nbsp;
                <span className={`${styles.nameSpan}`}>{props.journeyDetails.destination ?? "Ej i trafik"}</span>
            </h3>
        );
    }

    function renderBusJourneyInfoCB() {
        return (
            <div id={styles.infoContainer}>
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

    function onFavoriteClickACB() {
        props.onFavoriteClick();
    }

    return (
        <BoxWidgetView
            onCloseClick={onCloseClickACB}
            onFavoriteClick={onFavoriteClickACB}
            dataStatus={props.journeyDetailsStatus}
            renderTitleElementCB={renderTitleCB}
            renderContentElementCB={renderBusJourneyInfoCB}
        />
    );
}

export default BusJourneyInfo;
