import styles from './Header.module.css';
import NewLogo from '../../assets/newLogo.svg'; // Adicione a referência para o novo logo
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.section}>
          <img src={NewLogo} alt="New Logo" className={styles.logo} />
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/">Como Funciona</Link> {/* Redireciona para a página inicial */}
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/buscar-livros">Livros</Link> {/* Link correto para Livros */}
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/informacoes">Informações</Link> {/* Este link deve apontar para a rota correta */}
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/buscar-livros"><CiSearch size="20" /></Link> {/* Link para buscar livros */}
            </li>
          </ul>
        </div>
        <div>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link to="/cadastre-se">Cadastre-se</Link></li>
            <span className={styles.separator}>|</span>
            <li className={styles.navItem}><Link to="/login">Entrar</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
