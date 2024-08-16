import styles from './Home.module.css';
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
      <h1>Bem-vindo á nossa plataforma de troca de livros</h1>     
      </div>
    </>
  );
};

export default Home;

