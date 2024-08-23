import styles from './Footer.module.css';
import Logo from '../../assets/logo-plataform.webp';
import { SlSocialFacebook, SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";
import { Link } from 'react-router-dom';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useState } from 'react';

const Footer = () => {
  const [register, setRegister] = useState("");
  return (
    <footer className={`${styles.footer} ${styles.fixedFooter}`}>
      <div className={styles.componentMain}>
        <div className={styles.logoComponent}>
          <div className={styles.imageComponent}> 
            <img src={Logo} alt="Logo" />
            <h5 className={styles.main_title}>Book Stack</h5></div>
            <h6 className={styles.sub_title}>Sua plataforma de livros.</h6>
            <p className={styles.text}>O livro que você tanto quer por seu livro parado!</p>
         </div>

        
        <div className={styles.infoComponent}>
          <div className={styles.subInfoComponent}>
            <h4 className={styles.titleInfo}>Precisando de ajuda ?</h4>
            <Link to="/" className={styles.text}>Home</Link>
            <Link to="/login" className={styles.text}>Login</Link>
            <Link to="/informacoes" className={styles.text}>Informacões</Link>
          </div>

          <div className={styles.subInfoComponent}>
            <h4 className={styles.titleInfo}>O que você encontrara aqui ?</h4>
            <p className={styles.text}>Trocas de livros</p>
            <p className={styles.text}>Amizades</p>
            <p className={styles.text}>Trocar experiência</p>
          </div>
        </div>

       <div className={styles.updatesComponent}>
        <div className={styles.subUpadatesComponent}>
          <h5>Deseja receber atualizações ?</h5>
          <TextInput inputValue={register} setInputValue={setRegister} placeholder={"Informe seu email"}/>
          <div className={styles.updateButton}>
            <Button label={"Cadastre-se"}></Button>
          </div>
        </div>
        <div className={styles.componentSocialMedia}>
            <div className={styles.socialIco}>
              <SlSocialFacebook size={20}/>
            </div>
            <div className={styles.socialIco}>
              <SlSocialInstagram size={20}/>
            </div>
            <div className={styles.socialIco}>
              <SlSocialLinkedin size={20}/>
            </div>
          </div>
       </div>
      </div> 
      <div className={styles.copyrightComponent}>
        <p className={styles.copyright}>&copy; 2024 Bookstack. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer;