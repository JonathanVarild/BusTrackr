import styles from "../css/Navbar.module.css";
import { IconMenu2, IconX, IconUser, IconMap, IconSparkles, IconInfoCircle } from "@tabler/icons-react";
import logo from "../media/logo.png";
import ButtonWidgetView from "./ButtonWidgetView";

function NavbarView(props) {
	return (
		<header id={styles.container} className={`${props.isNavOpen ? styles.navOpen : ""}`}>
			<div id={styles.logo} className="rounded-corners drop-shadow blurred-background">
				<img src={logo} alt="BusTrackr Logo (BusTrackr LIVE)" />
			</div>
			<div id={styles.headernav}>
				<nav className={props.isNavOpen ? styles.navContainerOpen : styles.navContainerClosed}>
					<div id={styles.mapLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
						<a href="/">
							<p>Map</p>
							<div className={styles.iconContainer}>
								<IconMap stroke={2} />
							</div>
						</a>
					</div>
					<div id={styles.aboutLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
						<a href="/about">
							<p>About</p>
							<div className={styles.iconContainer}>
								<IconInfoCircle stroke={2} />
							</div>
						</a>
					</div>
					<div id={styles.attributionLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
						<a href="/attribution">
							<p>Attribution</p>
							<div className={styles.iconContainer}>
								<IconSparkles stroke={2} />
							</div>
						</a>
					</div>
					<div id={styles.accountLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
						<button onClick={onClickAccountACB}>
							<p>{props.userInfo === null ? "Login" : "Account"}</p>
							<div className={styles.iconContainer}>
								<IconUser stroke={2} />
							</div>
						</button>
					</div>
				</nav>
				<div className={`${styles.closeContainer}`}>
					{props.isNavOpen ? (
						<ButtonWidgetView iconElement={<IconX stroke={2} />} onClick={props.onToggleNav} />
					) : (
						<ButtonWidgetView iconElement={<IconMenu2 stroke={2} />} onClick={props.onToggleNav} />
					)}
				</div>
			</div>
		</header>
	);

	function onClickAccountACB() {
		if (props.userInfo === null) {
			props.onOpenAuthentication();
		} else {
			props.onOpenAccountSettings();
		}
	}
}

export default NavbarView;
