export default function RemoveCard({ onClose, onConfirm }) {
  return (
    <>
      <button
        className="button popup__button popup__button_type_confirm"
        type="button"
        onClick={onConfirm}
      >
        Sim
      </button>
    </>
  );
}
