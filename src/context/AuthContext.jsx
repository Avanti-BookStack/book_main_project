import PropTypes from 'prop-types';
import { createContext, useState, useEffect, useCallback } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = useCallback(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    setUserId(storedUserId);
    setToken(storedToken);
    setName(storedName);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const login = (data) => {
    setUserId(data.id.toString());
    setToken(data.token);
    setName(data.name);
    localStorage.setItem("userId", data.id.toString());
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
  }

  const logOut = () => {
    setUserId(null);
    setToken(null);
    setName(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  };

  return (
    <LoginContext.Provider value={{ userId, token, name, login, logOut, isLoading, loadUserData }}>
      {children}
    </LoginContext.Provider>
  )
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
