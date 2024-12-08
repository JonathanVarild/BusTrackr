import styles from "../css/MapSearchBar.module.css";
import { IconSearch } from '@tabler/icons-react';
import ButtonWidget from "./ButtonWidgetView";

function SearchBar(props) {
  return (
    <div id={styles.outerContainer} className={`${styles.justifyContent}`}>
      <div id={styles.container}>
        <input type="text" placeholder="Search..." className={`${styles.input} header-2-font blurred-background rounded-corners drop-shadow`}/>
        <ButtonWidget
          id={styles.button}
          onClick={onSearchACB}
          iconElement={<IconSearch stroke={2} />}
        />
      </div>
    </div>
  );
}
function onSearchACB(){
	/* TODO */
}

export default SearchBar;

