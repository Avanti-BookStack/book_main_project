import Header from '../../components/Header/Header';
import './About.css';

const About = () => {
  return (
    <>
    < Header/>
    <div className="about">
      <div className="about-section">
        <h1>Sobre a Nossa Plataforma</h1>
        <p>Bem-vindo à nossa plataforma de troca de livros! Aqui, 
          você pode cadastrar seus livros 
          e trocar por outros disponíveis
        com usuários de todo o país. Nossa missão é promover a 
        leitura e facilitar o acesso a livros de todos os gêneros..</p>
        <div className="about-image">
        <img src='src\assets\reading-book.svg' alt="Troca de livros" />
      </div>
       <h2>Como funciona ?</h2>
        <p>É simples! Basta cadastrar o livro que você deseja trocar e navegar por outros livros disponíveis. Quando
        encontrar um livro que lhe interessa, você pode iniciar a 
        troca com o outro usuário. Nossa plataforma conecta leitores 
        e torna a troca de livros fácil e segura.</p>
      </div>
      <p className='phrase'>Junte-se à nossa comunidade e comece a trocar seus livros hoje mesmo!</p>
      
    </div>
    </>
  );
};

export default About;