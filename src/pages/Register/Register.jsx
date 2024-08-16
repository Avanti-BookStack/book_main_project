import { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import Title from "../../components/Title/Title";
import './Register.css'
import { registerUser } from "../../services/userApi";
import Button from "../../components/Button/Button";
import getCurrentDataAndTime from "../../utils/dateUtil";
import { useNavigate } from "react-router-dom";


const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [number, setNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const registrationDate = new Date().getFullYear();
  const positiveRatings = 0;
  const negativeRatings = 0;
  const blocked = false;
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    setAdmin(false);
    const birthDateFormated = getCurrentDataAndTime(birthDate);
    const registrationDateFormated = getCurrentDataAndTime(registrationDate);

    try {
      const response = await registerUser(email, password, name, zipCode, adress, number, neighborhood, city, state, birthDateFormated, registrationDateFormated, positiveRatings, negativeRatings, blocked, admin);
      console.log(response);
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");  
    }catch(error){
      setError("Error ao cadastrar usuário!");
    }
  };

  return (
    <>
      <Header />
      <div className="titulo-cadastro-register" >
        <Title level={1}>Cadastre-se</Title>
      </div>
      <section className="main-register">
        <div className="container-form-register">
          <form onSubmit={handleSubmit}>
            <TextInput inputValue={email} setInputValue={setEmail} label={"Email:"} htmlFor="email" type="email"/>
            <TextInput inputValue={password} setInputValue={setPassword} label={"Senha:"} htmlFor="password" type="password"/>
            <TextInput inputValue={name} setInputValue={setName} label={"Nome:"} htmlFor="nome" type="text"/>
            <TextInput inputValue={adress} setInputValue={setAdress} label={"Endereço:"} htmlFor="endereco" type="text"/>
            <div className="container-input-register">
              <TextInput inputValue={number} setInputValue={setNumber} label={"Número:"} htmlFor="numero" type="number"/>
              <div className="separador"/>
              <TextInput inputValue={zipCode} setInputValue={setZipCode} label={"CEP:"} htmlFor="cep" type="text"/>
            </div>
            <TextInput inputValue={neighborhood} setInputValue={setNeighborhood} label={"Bairro:"} htmlFor="bairro" type="text"/>

            <div className="container-input-register">
              <TextInput inputValue={city} setInputValue={setCity} label={"Cidade:"} htmlFor="cidade" type="text"/>
              <div className="separador"/>
              <TextInput inputValue={state} setInputValue={setState} label={"Estado:"} htmlFor="estado" type="text"/>
            </div>
            <TextInput inputValue={birthDate} setInputValue={setBirthDate} label={"Data de nascimento:"} htmlFor="nascimento" type="date"/>
            {error && <p>{error}</p>}
            <Button label={"Cadastrar"} type="submit"></Button>
          </form>
        </div>
        <div className="container-image-register">
        </div>
      </section>
    </>
  )
}

export default Cadastro