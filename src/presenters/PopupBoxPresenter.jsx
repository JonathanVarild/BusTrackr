import PopupBoxView from "../views/PopupBoxView";
import { useSelector, useDispatch } from "react-redux";
import { dequeuePopup } from "../store/interface";

function PopupBox(props) {
	const queuedPopups = useSelector((state) => state.interface.queuedPopups);
	const dispatch = useDispatch();

	if (queuedPopups.length == 0) {
		return <></>;
	}

	const curPopup = queuedPopups[0];

	return <PopupBoxView type={curPopup.type} title={curPopup.title} message={curPopup.message} continueAction={onClickContinueACB} abortAction={onClickAbortACB} />;

	function onClickContinueACB(event) {
		event.stopPropagation();
		dispatch(dequeuePopup(curPopup.continueAction || ""));
	}

	function onClickAbortACB(event) {
		event.stopPropagation();
		dispatch(dequeuePopup(curPopup.abortAction || ""));
	}
}

export default PopupBox;
