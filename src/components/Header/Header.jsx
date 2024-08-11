import styles from './Header.module.css';
import NewLogo from '../../assets/newLogo.svg'; // Adicione a referência para o novo logo
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.section}>
          <img src={NewLogo} alt="New Logo" className={styles.logo} />
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><a href="#">Como Funciona</a></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><a href='#'>Livros</a></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><a href='#'>Informações</a></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><a href='#'><CiSearch size="20"/></a></li>
          </ul>
        </div>
        <div>
          <ul className={styles.navList}>
            <li className={styles.navItem}><a href="#cadastre-se">Cadastre-se</a></li>
            <span className={styles.separator}>|</span>
            <li className={styles.navItem}><a href="#entrar">Entrar</a></li>
          </ul>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;





