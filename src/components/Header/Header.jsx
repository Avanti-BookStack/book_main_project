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
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><Link to="#">Como Funciona</Link></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><Link to='/buscar-livros'>Livros</Link></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><Link to='#'>Informações</Link></li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}><Link to='#'><CiSearch size="20"/></Link></li>
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





