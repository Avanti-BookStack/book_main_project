import styles from './Header.module.css';
import NewLogo from '../../assets/logo-plataform.webp';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import Button from '../Button/Button';
import { FiPlusCircle } from "react-icons/fi";

const Header = () => {
  const { name, logOut } = useContext(LoginContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.section}>
          <Link to="/">
            <img src={NewLogo} alt="New Logo" className={styles.logo} />
          </Link>
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
            {name ? (
              <>
                <li className={styles.navItem}>
                  <span>{name}</span>
                  <FiPlusCircle
                      size="20"
                      className={styles.icon}
                      onClick={toggleDropdown}
                    />
                    {showDropdown && (
                      <div className={styles.dropdown}>
                        <Link to="/cadastrar-livro">Cadastrar Livro</Link>
                        <Link to="/meu-perfil">Meu perfil</Link>
                      </div>
                    )} 
                </li>  
                <li className={styles.navItem}>
                  <Button onClick={handleLogout} label="Sair"/>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}><Link to="/login">Entrar</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;