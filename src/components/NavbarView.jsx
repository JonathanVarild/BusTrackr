import styles from "../css/Navbar.module.css";
import { IconMenu2, IconX, IconUser, IconMap, IconUsers, IconQuestionMark } from "@tabler/icons-react";
import logo from "../media/logo.png";
import ButtonWidget from "./ButtonWidgetView";

function NavbarView(props) {
  function renderNavigationCB() {
    return (
    <>
      <nav id={styles.navContainer}>
        <div className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
          <a href="/">
            <p>Map</p>
            <div className={styles.iconContainer}>
              <IconMap stroke={2.5} />
            </div>
          </a>
        </div>
        <div className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
          <a href="/about">
            <p>About</p>
            <div className={styles.iconContainer}>
              <IconQuestionMark stroke={2.5} />
            </div>
          </a>
        </div>
        <div className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
          <a href="/account">
            <p>Account</p>
            <div className={styles.iconContainer}>
              <IconUser stroke={2.5} />
            </div>
          </a>
        </div>
        <div className={`${styles.navItem} header-font rounded-corners drop-shadow blurred-background`}>
          <a href="/attribution">
            <p>Attribution</p>
            <div className={styles.iconContainer}>
              <IconUsers stroke={2.5} />
            </div>
          </a>
        </div>
      </nav>
      <div className={`${styles.closeContainer}`}>
        <ButtonWidget
          iconElement={<IconX stroke={2} />}
          onClick={props.onToggleNav}
        />
      </div>
    </>
    );
  }

  return (
    <header id={styles.container} className={`${props.isNavOpen ? styles.navOpen : ""}`}>
      <div id={styles.logo} className='rounded-corners drop-shadow blurred-background'>
        <img src={logo} alt='BusTrackr Logo (BusTrackr LIVE)' />
      </div>
      <div id={styles.headernav}>
        {props.isNavOpen ? renderNavigationCB() : <ButtonWidget
          iconElement={<IconMenu2 stroke={2} />}
          onClick={props.onToggleNav}
        />}
      </div>
			
    </header>
  );
}

export default NavbarView;
