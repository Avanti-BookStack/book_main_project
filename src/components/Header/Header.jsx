import styles from './Header.module.css';
import NewLogo from '../../assets/logo-plataform.webp';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Button from '../Button/Button';

const Header = () => {
  const { name, logOut } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.section}>
          <img src={NewLogo} alt="New Logo" className={styles.logo} />
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/buscar-livros">Loja de livros</Link>
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/informacoes">Sobre a plataforma</Link>
            </li>
            <li className={`${styles.navItem} ${styles.navItemCenter}`}>
              <Link to="/buscar-livros"><CiSearch size="20" /></Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className={styles.navList}>
            {
              name ?
                <>
                  <li className={styles.navItem}>                
                    <Link>{name}</Link> 
                  </li>  
                  <li className={styles.navItem}>
                    <Button onClick={handleLogout} label="Sair"/>
                  </li>
                </>
                :
                <>
                  {/* <li className={styles.navItem}><Link to="/cadastre-se">Cadastre-se</Link></li>
                  <span className={styles.separator}>|</span> */}
                  <li className={styles.navItem}><Link to="/login">Entrar</Link></li>
                </>
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;