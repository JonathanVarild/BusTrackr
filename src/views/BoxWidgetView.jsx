import styles from "../css/BoxWidget.module.css";
import { IconHeart, IconX, IconRefresh } from "@tabler/icons-react";

function BoxWidgetView(props) {
    function onCloseClickACB(event) {
        if (props.onCloseClick) {
            props.onCloseClick(event);
        }
    }

    function onFavoriteClickACB(event) {
        if (props.onFavoriteClick) {
            props.onFavoriteClick(event);
        }
    }

    function boxWidgetSuspenseCB() {
        return (
            <div className={`${styles.suspenseContent}`}>
                <IconRefresh stroke={1.25} className={`${styles.spinnerIcon} spin-icon`} />
            </div>
        );
    }

    return (
        <div id={styles.containerOuter}>
            <div id={styles.container}>
                <div className={`${styles.content} header-2-font blurred-background rounded-corners drop-shadow`}>
                    <div id={styles.widgetHeader}>
                        {props.onFavoriteClick ? (
                            <div id={styles.favoriteContainer} className={`${styles.iconContainer}`}>
                                <button type='button' className={styles.iconButton} onClick={onFavoriteClickACB}>
                                    <div className={styles.iconInnerContainer}>
                                        <IconHeart stroke={1.25} className={`${styles.iconFullColor}`} />
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        {props.dataStatus !== "loading" && <div id={styles.titleContainer}>{props.renderTitleElementCB()}</div>}
                        <div id={styles.closeContainer} className={`${styles.iconContainer}`}>
                            <button type='button' className={styles.iconButton} onClick={onCloseClickACB}>
                                <div className={styles.iconInnerContainer}>
                                    <IconX stroke={1.25} className={`${styles.iconFullColor}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div id={styles.contentInner}>{props.dataStatus == "loading" ? boxWidgetSuspenseCB() : props.renderContentElementCB()}</div>
                </div>
            </div>
        </div>
    );
}

export default BoxWidgetView;
