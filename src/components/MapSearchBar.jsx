import styles from "../css/MapSearchBar.module.css";
import { IconSearch } from '@tabler/icons-react';

function SearchBar(props) {
  return (
    <div id={styles.container}>
      <input type="text" placeholder="Search..." className={`${styles.input} header-2-font blurred-background rounded-corners drop-shadow`}/>
      <button className={`${styles.button} rounded-corners blurred-background drop-shadow`} onClick={onSearchACB}><IconSearch height="80%" width="80%" stroke={2} /></button>
    </div>
  );
}
function onSearchACB(){
	/* TODO */
}

export default SearchBar;

