import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));

  const login = (data) => {
    setUserId(data.id);
    setToken(data.token);
    setName(data.name);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
  }

  const logOut = () => {
    setUserId("");
    setToken("");
    setName("");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  return (
    <LoginContext.Provider value={{ userId, token, name, login, logOut }}>
      {children}
    </LoginContext.Provider>
  )
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validação de 'children'
};

export default LoginProvider;