import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "../blocks/register.css";
import Header from "./Header/Header";

export const Register = ({ handleRegistration }) => {
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
    handleRegistration(data);
  };

  return (
    <>
      <Header />
      <div className="register">
        <p className="register__welcome">Inscrever-se</p>
        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            minLength="2"
            maxLength="50"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="2"
            maxLength="50"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
          />
          <div className="register__button-container">
            <button
              type="submit"
              className="register__link"
              onSubmit={handleRegistration}
            >
              Inscrever-se
            </button>
          </div>
        </form>
        <div className="register__signin">
          <Link to="/signin" className="register__signin-link">
            Já é um membro? Faça o signin
          </Link>
        </div>
      </div>
    </>
  );
};
