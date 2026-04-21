export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { card, onCardDelete, onCardLike, onCardClick } = props;

  function handleRemoveClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleImageClick() {
    if (onCardClick) {
      onCardClick(card);
    }
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />
      <button
        aria-label="Excluir cartão"
        className="card__delete-button"
        type="button"
        onClick={handleRemoveClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          type="button"
          className={`card__like-button ${isLiked ? "card__like-button_is-active" : ""}`}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
