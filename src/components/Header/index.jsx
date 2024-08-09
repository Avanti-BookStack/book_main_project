import styles from './Header.module.css';
import NewLogo from '../../assets/newLogo.svg'; // Adicione a referência para o novo logo

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.leftSection}>
          <img src={NewLogo} alt="New Logo" className={styles.logo} />
        </div>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.navItemCenter}`}><a href="#como-funciona">Como Funciona</a></li>
          <div className={styles.navRight}>
            <li className={styles.navItem}><a href="#cadastre-se">Cadastre-se</a></li>
            <span className={styles.separator}>|</span>
            <li className={styles.navItem}><a href="#entrar">Entrar</a></li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;





