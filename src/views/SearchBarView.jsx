import styles from "../css/MapSearchBar.module.css";
import { IconSearch } from "@tabler/icons-react";
import ButtonWidgetView from "./ButtonWidgetView";

function SearchBarView(props) {
    function onInputACB(event) {
      props.onSearch(event.target.value, 0);
    }
    function onSearchACB(event) {
        const inputElement = event.target.parentNode.parentNode.parentNode.querySelector('input[name="searchBar"]');
        props.onSearch(inputElement?.value || '', 0);
    }
    return (
        <div id={styles.outerContainer} className={`${styles.justifyContent}`}>
            <div id={styles.container}>
                <input
                    type='text'
                    name='searchBar'
                    onInput={onInputACB}
                    placeholder='Search...'
                    className={`${styles.input} header-2-font blurred-background rounded-corners drop-shadow`}
                />
                <ButtonWidgetView id={styles.button} onClick={onSearchACB} iconElement={<IconSearch stroke={2} />} />
            </div>
        </div>
    );
}

export default SearchBarView;
