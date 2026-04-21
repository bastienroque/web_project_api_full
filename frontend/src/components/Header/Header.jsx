import "../../index.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ isLoggedIn, userEmail, onSignOut }) {
  const { pathname } = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      <nav className="header__nav">
        {isLoggedIn ? (
          <div className="header__user-info">
            <span className="header__email">{userEmail}</span>
            <Link
              to="/signin"
              className="header__logout-btn"
              onClick={onSignOut}
            >
              Sair
            </Link>
          </div>
        ) : (
          <div className="header__auth-buttons">
            {pathname === "/signin" ? (
              <Link to="/signup" className="header__auth-btn">
                Inscrever-se
              </Link>
            ) : (
              <Link to="/signin" className="header__auth-btn">
                Entrar
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
