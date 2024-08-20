import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Compartilhe livros & descubra novos mundos.</h1>
            <p>Nossa plataforma de troca de livros espera por você.</p>
            <button className={styles.ctaButton}>Cadastre-se agora</button>
          </div>
          <div className={styles.heroImage}>
            <img src="src/assets/home-image.png" alt="Ilustração de troca de livros" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
