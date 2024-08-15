import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import { useContext, useState } from "react";
import { loginUser } from "../../services/userApi";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      login(response);
      navigate("/");
    } catch (error) {
      setError(error.error);
    }
  };

  return (
    <>
      <Header />
      <section className="main-login">
        <div className="container-titulo-login">
          <h1>Bem-vindo!</h1>
          <h1>Faça login com sua conta!</h1>
        </div>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="form-login">
          <TextInput
            inputValue={email}
            setInputValue={setEmail}
            type="email"
            label="Email"
          />
          <TextInput
            inputValue={password}
            setInputValue={setPassword}
            type="password"
            label="Senha"
          />
          <Button type="submit" label="Entrar" />
          {error && <p className="error">{error}</p>}
        </form>
      </section>
    </>
  );
};

export default Login;
