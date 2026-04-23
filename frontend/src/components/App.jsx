import "../index.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { api } from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { setToken, removeToken } from "../utils/token.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Popup from "./Main/components/popup/Popup.jsx";
import Footer from "./Footer/Footer.jsx";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip.jsx";
import { Register } from "./Register.jsx";
import { Signin } from "./Signin.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "User",
    about: "About",
  });
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // adaptar em async/await
  useEffect(() => {
    api
      .getCards()
      .then((data) => setCards(data))
      .catch((error) => console.error("Erro ao buscar cards:", error));
  }, []);

  useEffect(() => {
    (async () => {
      await api.getUserInfo().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateUser(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error("Erro ao atualizar usuário:", error));
    })();
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const newData = await api.updateAvatar({ avatar });
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
    }
  };

  const handleUpdateNewCard = (data) => {
    (async () => {
      await api
        .addCard(data)
        .then((newData) => {
          setCards((state) => [newData, ...state]);
          handleClosePopup();
        })
        .catch((error) => console.error("Erro ao adicionar card:", error));
    })();
  };

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
      })
      .catch((error) => console.error("Erro ao deletar card:", error));
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser?._id);

    try {
      let newCard;

      if (isLiked) {
        newCard = await api.unlikeCard(card._id);
      } else {
        newCard = await api.likeCard(card._id);
      }
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      );
    } catch (error) {
      console.error("Erro ao curtir/descurtir card:", error);
    }
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    checkToken();
  }, [navigate]);

  const checkToken = () => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
        });
    }
  };

  const handleRegistration = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .register(email, password)
      .then(() => navigate("/"))
      .catch((error) => console.error("Erro ao registrar usuário:", error));
  };

  const showTooltip = (message, success = false) => {
    setTooltipMessage(message);
    setIsSuccess(success);
    setIsInfoTooltipOpen(true);
  };

  const closeTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const handleSignin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          showTooltip("Signin realizado com sucesso!", true);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        showTooltip("Ops, algo deu errado! Tente novamente.", false);
      });
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData({ email: "" });
    navigate("/signin");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CurrentUserContext.Provider
              value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
            >
              <div className="page__content">
                <Header
                  isLoggedIn={isLoggedIn}
                  userEmail={userData.email}
                  handleSignOut={handleSignOut}
                />
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardAdd={handleUpdateNewCard}
                  handleSignOut={handleSignOut}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <Footer />
              </div>
              {popup && (
                <Popup onClose={handleClosePopup} title={popup.title}>
                  {popup.children}
                </Popup>
              )}
            </CurrentUserContext.Provider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
            <InfoToolTip
              isOpen={isInfoTooltipOpen}
              onClose={closeTooltip}
              isSuccess={isSuccess}
              message={tooltipMessage}
            />
          </div>
        }
      />
      <Route
        path="/signin"
        element={
          <div className="signinContainer">
            <Signin handleSignin={handleSignin} />
            <InfoToolTip
              isOpen={isInfoTooltipOpen}
              onClose={closeTooltip}
              isSuccess={isSuccess}
              message={tooltipMessage}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
