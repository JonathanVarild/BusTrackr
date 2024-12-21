import styles from "../css/SearchBox.module.css";
import { IconCaretLeft, IconCaretRight } from "@tabler/icons-react";
import BoxWidgetView from "./BoxWidgetView";
import { blueBusses } from "../store/mapData/utilities";

function SearchResultsView(props) {
    function getBusColorStyle(line) {
        if (line == null) {
            return styles.colorNone;
        }
        return blueBusses.includes(line) ? styles.colorBlue : styles.colorRed;
    }

    function onCloseClickACB() {
        props.onCloseClick();
    }

    function getRelativePageACB(direction) {
        props.performSearchRelative(direction);
    }

    function getPrevPageACB() {
        if (props.searchResults?.page > 0) {
            getRelativePageACB(-1);
        }
    }

    function getNextPageACB() {
        if (!props.searchResults?.is_last_page) {
            getRelativePageACB(1);
        }
    }

    function titleCB() {
        return (
            <div id={styles.resultTitle}>
                <div className={styles.pageSwitcherContainer}>
                    <button className={styles.pageSwitcherBtn} onClick={getPrevPageACB} disabled={props.searchResults?.page <= 0}>
                        <IconCaretLeft className={styles.pageSwitcherIcon} stroke={1.25} />
                    </button>
                </div>
                <div className={styles.pageVisualizer}>
                    <p>{props.searchResults.page + 1 + " / " + Math.ceil(props.searchResults.total / 5)}</p>
                </div>
                <div className={styles.pageSwitcherContainer}>
                    <button className={styles.pageSwitcherBtn} onClick={getNextPageACB} disabled={props.searchResults?.is_last_page}>
                        <IconCaretRight className={styles.pageSwitcherIcon} stroke={1.25} />
                    </button>
                </div>
            </div>
        );
    }

    function renderBusResult(result, index) {
        return (
            <div key={index} className={styles.resultRow}>
                <h3 className={`${styles.busDisplay} ${getBusColorStyle(result.line)}`}>
                    <span className={styles.lineDisp}>{result.line}</span>
                    <span className={styles.displaySim}>{result.destination}</span>
                </h3>
                <p>stops at {result.stop_name}</p>
            </div>
        );
    }

    function contentCB() {
        return <div id={styles.resultsContainer}>{props.searchResults?.results?.map(renderBusResult)}</div>;
    }

    return <BoxWidgetView onCloseClick={onCloseClickACB} dataStatus={props.searchStatus} renderTitleElementCB={titleCB} renderContentElementCB={contentCB} />;
}

export default SearchResultsView;
