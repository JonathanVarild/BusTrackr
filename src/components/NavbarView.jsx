import styles from "../css/Navbar.module.css";
import { IconMenu2 } from "@tabler/icons-react";
import logo from "../media/logo.png";
import ButtonWidget from "./ButtonWidgetView";

function NavbarView(props) {
  return (
    <header id={styles.container}>
      <div id={styles.logo} className='rounded-corners drop-shadow blurred-background'>
        <img src={logo} alt='BusTrackr Logo (BusTrackr LIVE)' />
      </div>
			<ButtonWidget
        id={styles.headernav}
        iconElement={<IconMenu2 stroke={2} />}
      />
            {/* // <nav id={styles.headernav} className='rounded-corners drop-shadow blurred-background'>
            //     <IconMenu2 height='100%' width='100%' stroke={2} />
            // </nav> */}
    </header>
  );
}

export default NavbarView;
