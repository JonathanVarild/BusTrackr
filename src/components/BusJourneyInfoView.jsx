import styles from "../css/BusJourneyInfo.module.css";
import { IconRefresh, IconX } from '@tabler/icons-react';
import ButtonWidget from "./ButtonWidgetView";

function BusJourneyInfo(props) {
  function renderBusJourneySuspense() {
    return (
      <div className={`${styles.centerContent}`}>
        <IconRefresh stroke={1.25} className={`${styles.spinnerIcon} spin-icon`} />
      </div>
    )
  }

  function renderBusJourneyInfoCB() {
    return (
      <div id={styles.infoContainer}>
        This will be the info
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

