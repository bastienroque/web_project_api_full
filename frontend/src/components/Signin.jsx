import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";
import Header from "./Header/Header";

export const Signin = ({ handleSignin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignin(data);
  };

  return (
    <>
      <Header />
      <div className="signin">
        <p className="signin__welcome">Entrar</p>
        <form className="signin__form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            required
            name="email"
            type="email"
            minLength="1"
            maxLength="20"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            required
            name="password"
            type="password"
            minLength="1"
            maxLength="20"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
          />
          <div className="signin__button-container">
            <button
              type="submit"
              className="signin__link"
              onSubmit={handleSignin}
            >
              Entrar
            </button>
          </div>
        </form>

        <div className="signin__signup">
          <Link to="/signup" className="signup__link">
            Ainda não é membro? Inscreva-se aqui
          </Link>
        </div>
      </div>
    </>
  );
};
