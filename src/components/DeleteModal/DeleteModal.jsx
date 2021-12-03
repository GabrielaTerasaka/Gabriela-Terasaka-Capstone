import "./DeleteModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

export default function DeleteModal(props) {
  // console.log(props.selectedItem);

  const { title } = props.selectedItem;
  return (
    <section className="modal">
      <div
        className="modal__overlay"
        onClick={() => {
          props.cancelDeleteOption();
        }}
      ></div>
      <div className="modal__box" style={{ top: window.scrollY + "px" }}>
        {/* <div className="modal__box"> */}
        <img
          src={closeIcon}
          alt="close icon"
          className="modal__icon"
          onClick={() => {
            props.cancelDeleteOption();
          }}
        />
        <h2 className="modal__title">Delete {title}?</h2>
        <p className="modal__content">
          Please confirm that you’d like to delete the grocery list: {title}.
          You won’t be able to undo this action.
        </p>
        <div className="modal__buttons-wrapper">
          <button
            className="modal__cancel"
            onClick={() => {
              props.cancelDeleteOption();
            }}
          >
            Cancel
          </button>
          <button
            className="modal__delete"
            onClick={() => {
              props.handleDeleteElement();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}
