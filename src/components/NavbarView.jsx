import styles from "../css/Navbar.module.css";
import { IconMenu2, IconX, IconUser, IconMap, IconUsers, IconQuestionMark } from "@tabler/icons-react";
import logo from "../media/logo.png";
import ButtonWidget from "./ButtonWidgetView";

function NavbarView(props) {
  return (
    <header id={styles.container} className={`${props.isNavOpen ? styles.navOpen : ""}`}>
      <div id={styles.logo} className='rounded-corners drop-shadow blurred-background'>
        <img src={logo} alt='BusTrackr Logo (BusTrackr LIVE)' />
      </div>
      <div id={styles.headernav}>
        <nav className={props.isNavOpen ? styles.navContainerOpen : styles.navContainerClosed}>
          <div id={styles.mapLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
            <a href="/">
              <p>Map</p>
              <div className={styles.iconContainer}>
                <IconMap stroke={2.5} />
              </div>
            </a>
          </div>
          <div id={styles.aboutLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
            <a href="/about">
              <p>About</p>
              <div className={styles.iconContainer}>
                <IconQuestionMark stroke={2.5} />
              </div>
            </a>
          </div>
          <div id={styles.accountLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
            <a href="/account">
              <p>Account</p>
              <div className={styles.iconContainer}>
                <IconUser stroke={2.5} />
              </div>
            </a>
          </div>
          <div id={styles.attributionLink} className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
            <a href="/attribution">
              <p>Attribution</p>
              <div className={styles.iconContainer}>
                <IconUsers stroke={2.5} />
              </div>
            </a>
          </div>
        </nav>
        <div className={`${styles.closeContainer}`}>
          {props.isNavOpen ?
            <ButtonWidget
              iconElement={<IconX stroke={2} />}
              onClick={props.onToggleNav}
            />
            :
            <ButtonWidget
              iconElement={<IconMenu2 stroke={2} />}
              onClick={props.onToggleNav}
            />
          }
        </div>
      </div>
    </header>
  );
}

export default NavbarView;
