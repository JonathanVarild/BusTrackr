import styles from "../css/Navbar.module.css";
import { IconMenu2 } from '@tabler/icons-react'

function NavbarView(props) {
	return (
		<header id={styles.container}>
			<h1 className="header-font rounded-corners drop-shadow">BusTrackr</h1>
			<nav id={styles.headernav} className="rounded-corners drop-shadow"><IconMenu2 height="100%" width="100%" stroke={2}/></nav>
		</header>
	);
}

export default NavbarView;
