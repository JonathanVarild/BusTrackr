import styles from "../css/ButtonWidget.module.css"

function ButtonWidget(props) {
  function onClickACB(event) {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <button
      id={props.id ? props.id : undefined}
      className={`${styles.uiWidget} blurred-background rounded-corners drop-shadow`}
      onClick={onClickACB}>
      <div className={`${styles.uiIconContainer}`}>
        {props.iconElement}
      </div>
    </button>
  );
}

export default ButtonWidget;