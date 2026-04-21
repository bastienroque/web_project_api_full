export default function EditAvatar({ onClose }) {
  return (
    <div className="popup" id="avatar-popup">
      <div className="popup__content">
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">Atualizar avatar</h3>
        <form className="popup__form" id="avatar-form" name="avatarForm">
          <input
            className="popup__input popup__input_type_url"
            name="avatar"
            id="avatar"
            placeholder="Link da nova foto"
            required
            type="url"
          />
          <span className="avatar-input-error popup__input-error">
            Este campo é obrigatório.
          </span>
          <button className="button popup__button" type="submit">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
