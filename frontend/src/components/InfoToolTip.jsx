import "../index.css";
import "../blocks/infotooltip.css";

function InfoToolTip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button className="modal__close-btn" type="button" onClick={onClose} />

        <div className="modal__content">
          <div
            className={`modal__icon ${isSuccess ? "modal__icon_type_success" : "modal__icon_type_error"}`}
          >
            {isSuccess ? "✓" : "✗"}
          </div>
          <h2 className="modal__title modal__title_type_tooltip">{message}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoToolTip;
