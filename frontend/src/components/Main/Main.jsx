import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Card from "./components/Card/Card";
import Popup from "./components/popup/Popup";
import ImagePopup from "./components/popup/ImagePopup/ImagePopup";
import EditProfile from "./components/popup/EditProfile/EditProfile";
import EditAvatar from "./components/popup/EditAvatar/EditAvatar";
import NewCard from "./components/popup/NewCard/NewCard";
import RemoveCard from "./components/popup/RemoveCard/RemoveCard";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardAdd,
  onOpenPopup,
  onClosePopup,
  popup,
  onUpdateAvatar,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeImagePopup() {
    setSelectedCard(null);
  }

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar onClose={onClosePopup} onSubmit={onUpdateAvatar} />,
  };

  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onClose={onClosePopup} onAddCard={onCardAdd} />,
  };

  function handleCardDelete(card) {
    const removeCardPopup = {
      title: "Tem certeza?",
      children: (
        <RemoveCard
          onClose={onClosePopup}
          onConfirm={() => {
            onCardDelete(card._id);
            onClosePopup();
          }}
        />
      ),
    };
    onOpenPopup(removeCardPopup);
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div
          className="profile__image"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <button
            aria-label="Edit avatar"
            className="profile__avatar-button"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
          <img
            alt="Avatar do usuário"
            className="profile__avatar"
            src={currentUser?.avatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Edit profile"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="places page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              onCardAdd={onCardAdd}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={closeImagePopup} />
      )}
    </main>
  );
}
