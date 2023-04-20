import "./Button.css";

function Button(props) {
  return (
    <button
      key={"button-" + props.label}
      className={
        (isNaN(parseInt(props.label))
          ? props.label.length > 3 ? "my-button-scientific " : "my-button-operation "
          :  "my-button-numerical ") + "item"
      }
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default Button;
