import { useState } from "react";

export default function NewCard({ onClose, onAddCard }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddCard({
      name: title,
      link: link,
    });
  };

  return (
    <div className="popup" id="new-card-popup">
      <div className="popup__content">
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">Novo local</h3>
        <form
          className="popup__form"
          id="new-card-form"
          name="cardForm"
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_type_card-name"
            name="place-name"
            id="place-name"
            placeholder="Título"
            minlength="2"
            maxlength="30"
            required
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <span className="place-name-input-error popup__input-error">
            Este campo é obrigatório.
          </span>
          <input
            className="popup__input popup__input_type_url"
            name="link"
            id="link"
            placeholder="Link de Imagem"
            required
            type="url"
            value={link}
            onChange={handleLinkChange}
          />
          <span className="link-input-error popup__input-error">
            Este campo é obrigatório.
          </span>
          <button className="button popup__button" type="submit">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}
