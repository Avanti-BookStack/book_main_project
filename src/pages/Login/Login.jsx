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
      <div className="content">
        <div className="form-container">
          <h1>Trocar seus livros antigos por novos nunca esteve tão fácil.</h1>
          {/* <h2>Faça login com sua conta</h2> */}
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
            <div className="options">
              <label>
                <input type="checkbox" /> Lembrar minha senha
              </label>
              <a href="#">Esqueci minha senha</a>
            </div>
            <div className="buttons">
              <Button type="submit" label="Entrar" />
              <Button type="button" label="Cadastrar-me" />
            </div>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
        <div className="image-container">
          <img src="src/assets/imagem-cadastro.png" alt="Imagem de troca de livros" />
        </div>
      </div>
    </>
  );
};

export default Login;