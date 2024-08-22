import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Planet from '../../assets/planet-earth.svg';
import Comunity from '../../assets/comunidade.svg';
import BookAndPlane from '../../assets/livro_com_aviao.svg';


const Home = () => {
  const navigate = useNavigate();

  const handleSignUpRedirect = () => {
    navigate('/cadastre-se'); // Ajuste para a rota correta
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Compartilhe livros & descubra novos mundos.</h1>
            <p>Nossa plataforma de troca de livros espera por você.</p>
            <button className={styles.ctaButton} onClick={handleSignUpRedirect}>
              Cadastre-se agora
            </button>
          </div>
          <div className={styles.heroImage}>
            <img src="src/assets/home-image.png" alt="Ilustração de troca de livros" />
          </div>
        </section>
        <section className={styles.container}>
          <div className={styles.titulosContainer}>
            <h2 className={styles.tituloCard}>Troque seus livros parados na estante!</h2>
            <p className={styles.textCard}>Sua troca irá beneficiar a todos e incetivar a leitura.</p>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={Planet} alt="Foto de pessoas juntas formando uma comunidade." />
              </div>
              <h3 className={styles.tituloCard}>Explore Novos Mundos.</h3>
              <p>Descubra uma infinidade de livros novos e usados disponíveis para troca. Amplie sua biblioteca pessoal sem gastar nada, trocando os livros que você já leu por novas aventuras literárias.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={Comunity} alt="Foto de pessoas juntas formando uma comunidade." />
              </div>
              <h3 className={styles.tituloCard}>Conecte-se com Leitores</h3>
              <p>Entre em uma comunidade de amantes de livros. Troque recomendações, compartilhe opiniões e faça amizades enquanto encontra o próximo livro perfeito para ler.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardImage}>
                <img src={BookAndPlane} alt="Avião de papel voando próximo a uma pilha de livro." />
              </div>
              <h3 className={styles.tituloCard}>Mais de 1000 livros disponíveis.</h3>
              <p>Explore uma vasta coleção para todos os gostos e interesses. Aproveite a oportunidade de mergulhar em novas histórias e expandir seus conhecimentos. A leitura está ao seu alcance!</p>
            </div>
          </div>
        </section>

        <section className={styles.testimonials_section}>
          <h2>O que nossos clientes dizem ao usar nossa plataforma! </h2>
          <div className={styles.testimonials_carousel}>
            <div className={styles.testimonial_item}>
              <div className={styles.testimonial_content}>
                <p>{`"Adoro a plataforma de troca de livros! É uma ótima forma de obter novos livros sem gastar muito dinheiro."`}</p>
                <p className={styles.testimonial_author}>- Maria, 32 anos</p>
              </div>
            </div>
            <div className={styles.testimonial_item}>
              <div className={styles.testimonial_content}>
                <p>{`"Eu troco meus livros antigos por outros novos há anos e sempre encontro ótimas opções. Recomendo a todos os amantes de leitura!"`}</p>
                <p className={styles.testimonial_author}>- João, 45 anos</p>
              </div>
            </div>
            <div className={styles.testimonial_item}>
              <div className={styles.testimonial_content}>
                <p>{`"Antes de conhecer essa plataforma, eu tinha uma pilha de livros que não lia mais. Agora consigo trocá_los por livros que realmente me interessam."`}</p>
                <p className={styles.testimonial_author}>- Ana, 28 anos</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
