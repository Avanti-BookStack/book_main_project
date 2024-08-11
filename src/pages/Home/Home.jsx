import styles from './Home.module.css';
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Bem-vindo à Página de Troca de Livros</h1>
      </div>
    </>
  );
};

export default Home;

