import styles from "../css/Navbar.module.css";
import { IconMenu2 } from '@tabler/icons-react'
import logo from "../media/logo.png"

function NavbarView(props) {
	return (
		<header id={styles.container}>
			<div id={styles.logo} className="rounded-corners drop-shadow">
				<img src={logo} alt="BusTrackr Logo (BusTrackr LIVE)" />
			</div>
			<nav id={styles.headernav} className="rounded-corners drop-shadow"><IconMenu2 height="100%" width="100%" stroke={2}/></nav>
		</header>
	);
}

export default NavbarView;
