import NavbarView from "../components/NavbarView";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavigation } from "../store/interface";

function Navbar(props) {
  const dispatch = useDispatch();
  const isNavOpen = useSelector((state) => state.interface.navigationOpen);

  const handleToggleNav = () => {
    dispatch(toggleNavigation());
  };

  return <NavbarView isNavOpen={isNavOpen} onToggleNav={handleToggleNav} />;
}

export default Navbar;
