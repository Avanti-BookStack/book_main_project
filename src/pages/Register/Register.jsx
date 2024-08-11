import { useState } from "react";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import Title from "../../components/Title/Title";
import './Register.css'

const Cadastro = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [numero, setNumero] = useState("")
  const [cep, setCep] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [estado, setEstado] = useState("")
  const [nascimento, setNascimento] = useState("")

  return (
    <>
      <Header />
      <div className="titulo-cadastro" >
        <Title level={1}>Cadastre-se</Title>
      </div>
      <section className="main">
        <div className="container-form">
          <form>
            <TextInput inputValue={email} setInputValue={setEmail} label={"Email:"} htmlFor="email" type="email"/>
            <TextInput inputValue={password} setInputValue={setPassword} label={"Senha:"} htmlFor="password" type="password"/>
            <TextInput inputValue={nome} setInputValue={setNome} label={"Nome:"} htmlFor="nome" type="text"/>
            <TextInput inputValue={endereco} setInputValue={setEndereco} label={"Endereço:"} htmlFor="endereco" type="text"/>
            <div className="container-input">
              <TextInput inputValue={numero} setInputValue={setNumero} label={"Número:"} htmlFor="numero" type="number"/>
              <div className="separador"/>
              <TextInput inputValue={cep} setInputValue={setCep} label={"CEP:"} htmlFor="cep" type="text"/>
            </div>
            <TextInput inputValue={bairro} setInputValue={setBairro} label={"Bairro:"} htmlFor="bairro" type="text"/>

            <div className="container-input">
              <TextInput inputValue={cidade} setInputValue={setCidade} label={"Cidade:"} htmlFor="cidade" type="text"/>
              <div className="separador"/>
              <TextInput inputValue={estado} setInputValue={setEstado} label={"Estado:"} htmlFor="estado" type="text"/>
            </div>
            <TextInput inputValue={nascimento} setInputValue={setNascimento} label={"Data de nascimento:"} htmlFor="nascimento" type="date"/>
          </form>
        </div>
        <div className="container-image">
        </div>
      </section>
    </>
  )
}

export default Cadastro